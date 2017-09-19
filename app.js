//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    wx.login({
    success: function(res) {
      const t = this;
      if (res.code) {
        //发起网络请求
          // wx.request({
          //   url: 'https://yourwebsit/onLogin',
          //   method: 'POST',
          //   data: {
          //     code: res.code
          //   },
          //   success: function(res) {
          //       var openid = res.data.openid;
          //       //发送请求，拿到用户的余额
          //       t.globalData.balance = 10.2
          //   },
          //   fail: function(err) {
          //       console.log(err)
          //   }
          // })
            console.log(res.code);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    balance: 10.2
  }
})
