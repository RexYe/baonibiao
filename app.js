//app.js
App({
  onLaunch: function() {
    const that = this
    //调用API从本地缓存中获取数据
    wx.login({
      success: function(res) {
        that._getWxUserInfo(function(uinfo){
          uinfo.code = res.code
          // console.log('uinfo--->',uinfo);
          that._storeUserInfo(uinfo, function(res1){
            // console.log('res1--->',res1);
            that.G.userInfo = res1;
            console.log('global',that.G.userInfo);
          })
        })
      }
    });

  },
  _getWxUserInfo: function(cb){
    //调用登录接口
    wx.getUserInfo({
      withCredentials: false,
      success: function(res) {
        cb && cb(res.userInfo)
      }
    })
  },
  _storeUserInfo: function(rdata, cb){
    const t = this
    wx.request({
      url: `${t.G.REQPREFIX}/api/user/store`,
      method: 'POST',
      data: rdata,
      success: function(res) {
        if(res.statusCode === 200){
          var res1 = res.data
          if(!res1.error){
            cb && cb(res1)
          }
        }
      },
      fail: t._error
    })
  },
  _error: function(err) {
      console.log(err)
  },
  GetReqParam: function(data){
      var t = this
      return Object.assign({}, {
          _id: t.G.userInfo._id
      }, (data||{}))
  },
  G: {
    userInfo: null,
    REQPREFIX:'https://baonibiao.nightwatch.xin'
  }
})
