//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        ACCESS_TOKEN:''
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
        })
    },
    //获取二维码
    // wx.request({
    //     url:`'https://api.weixin.qq.com/wxa/getwxacode?access_token='${ACCESS_TOKEN}`,
    //     data:{
    //         //path:'吕智兵页面的url',
    //         "width":430s
    //     },
    //     success:function(res) {
    //         console.log(res.data);
    //     }
    // })
    zhuanfa_qunliao:function() {
        console.log("转发到群聊");
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    zhuanfa_pengyq:function() {
        console.log(123);
        wx.navigateTo({
            url:'../sharepage/sharepage'
        })
    },
    //我也试一试
    shiyishi:function() {
        //跳转到吕智兵写的那个页面
        wx.navigateTo({
            url:'../hongbao/hongbao'
        })
    },
    onShareAppMessage: function (res) {
        return {
          title: '包你飚',
          //path:"吕智兵的页面的url"
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
    }
})
