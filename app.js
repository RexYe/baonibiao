//app.js
App({
    onLaunch: function() {
        const t = this
        //调用API从本地缓存中获取数据
        wx.login({
            success: function(res) {
                let code = res.code
                if(code){
                    t._getUserInfo(code)
                }
            }
        });
    },
    // 通过code换取userifno
    // 如果userinfo在系统中存在就无需再请求微信
    _getUserInfo: function(code) {
        let t = this
        wx.request({
            url: `${t.G.REQPREFIX}/api/user/get`,
            method: 'GET',
            data: {
                code: code
            },
            success: function(res) {
                if (res.statusCode === 200) {
                    var info = res.data
                    if(info && !info.error){
                        if(info.nickName && info.avatarUrl){
                            t.G.userInfo = info
                        }else{
                            t._setUserInfo(info._id)
                        }
                    }
                }
            },
            fail: t._error
        })
    },
    // 如果userifno不存在，获取信息并存储
    _setUserInfo: function(uid) {
        var t = this
        //调用登录接口
        wx.getUserInfo({
            withCredentials: false,
            success: function(res) {
                var info = res.userInfo
                info._id = uid
                wx.request({
                    url: `${t.G.REQPREFIX}/api/user/store`,
                    method: 'POST',
                    data: info,
                    success: function(res) {
                        if (res.statusCode === 200) {
                            var uinfo = res.data
                            if (!uinfo.error) {
                                t.G.userInfo = uinfo
                            }
                        }
                    },
                    fail: t._error
                })
            }
        })
    },
    _error: function(err) {
        console.log(err)
    },
    GetReqParam: function(data) {
        var t = this
        return Object.assign({}, {
            _id: t.G.userInfo._id
        }, (data || {}))
    },
    G: {
        userInfo: null,
        __event__: {},
        REQPREFIX: 'https://baonibiao.nightwatch.xin'
    }
})
