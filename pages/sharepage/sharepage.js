//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
            title: '包你彪',
            path:"../hongbao/hongbao",
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    }
})
