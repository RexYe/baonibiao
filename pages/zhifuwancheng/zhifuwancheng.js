//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},//用户信息
        redid:'',//红包id
        flag:true,//红包是否领取完成,
        type:'',//红包类型
        typeList:{
            'bgy':'飙高音',
            'chb':'唱红包',
            'twhb':'提问红包',
            'xshb':'悬赏红包'
        }
    },

    onLoad: function (option) {
        //获取到用户信息,红包Id,红包是否已经抢完的状态和红包类型
        this.setData({
            userInfo:app.G.userInfo,
            redid:option._redid,
            flag:option.flag,
            type:option._type
        })
        // console.log(option);
        //获取二维码
    },
    //转发到群聊
    onShareAppMessage: function (res) {
        const t = this;
        if (res.from === 'button') {
          // 来自页面内转发按钮
          //将抢红包的url分享出去,用户点击这个分享出去的链接就可以直接抢红包了
            return {
                title: '送福利来咯',
                path: `/pages/hongbao/hongbao?_redid=${this.data.redid}`,
                success: function(res) {
                    wx.showShareMenu({
                        withShareTicket: true
                    })
                },
                fail: function(res) {
                    wx.showModal({
                        title: '提示',
                        content: '转发失败,请重新转发',
                    })
                }
            }
        }
    },

    //生成朋友圈分享图
    zhuanfa_pengyq:function() {
        wx.navigateTo({
            url:`/pages/sharepage/sharepage?_redid=${this.data.redid}&_type=${this.data.type}`,
        })
    },
    //我也试一试或者返回,跳转到抢红包页面
    shiyishi:function() {
        wx.navigateTo({
            url:`/pages/hongbao/hongbao?_redid=${this.data.redid}`
        })
    },
})
