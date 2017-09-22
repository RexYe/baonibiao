//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        //获取到用户信息
        this.setData({
            userInfo:app.G.userInfo
        })
        //获取二维码
        // wx.request({
        // url:"https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN",
        //     data:{
        //        path:'../hongbao/hongbao',
        //         "width":430
        //     },
        //     success:function(res) {
        //         console.log(res.data);
        //     }
        // })
    },
    //转发到群聊
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
            //带上红包的id
            // let id = app.GetReqParam()
            return {
                title: '送福利来咯',
                // path: `/pages/hongbao/hongbao?${id}`,
                path: "/pages/hongbao/hongbao",
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
        // 获取朋友圈分享图
        // const reqParam = {
        //     userInfo:this.data.userInfo,
        //     code:
        // }
        // wx.request({
        //     // url:
        //     data:app.GetReqParam(reqParam),
        //     success:function(res) {
        //         //跳转到分享图片页面
        //         wx.navigateTo({
        //             url://合成图片地址
        //         })
        //     }
        //
        // })
        wx.navigateTo({
            url:'../sharepage/sharepage',
        })
    },
    //我也试一试,跳转到抢红包页面
    shiyishi:function() {
        wx.navigateTo({
            url:'../hongbao/hongbao'
        })
    },
})
