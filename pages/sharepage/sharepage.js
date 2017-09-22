//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {}
    },
    onLoad: function () {
        this.setData({
            userInfo:app.G.userInfo
        })
        //获取二维码
        // wx.request({
        //     url:`'https://api.weixin.qq.com/wxa/getwxacode?access_token='${ACCESS_TOKEN}`,
        //     data:{
                    // path:'../hongbao/hongbao',
        //         "width":430
        //     },
        //     success:function(res) {
        //         console.log(res);
        //     }
        // })
    },
    onShareAppMessage: function (res) {
        // 来自页面内转发按钮
        // if (res.from === 'button') {
            // wx.canvasToTempFilePath({
            //   x: 100,
            //   y: 200,
            //   width: 50,
            //   height: 50,
            //   destWidth: 100,
            //   destHeight: 100,
            //   canvasId: 'myCanvas',
            //   success: function(res) {
            //     console.log(res.tempFilePath)
            //   }
            // })
        // }
    }
})
