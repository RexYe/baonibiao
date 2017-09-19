// myrecords.js
var util=require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    shoudao_redmoney:100,
    shoudao_rednumber: 10,
    fachu_redmoney:200,
    fachu_rednumber:9,
    current: 0
  },
  onLoad: function(options) {
    console.log('onLoad')
    var that = this
    // let fachu_redmoney=util.formatMoney(that.data.fachu_redmoney)
    // let shoudao_redmoney=util.formatMoney(that.data.shoudao_redmoney)
    // console.log('money=>>>',util.formatMoney(that.data.fachu_redmoney))
    // //金钱格式化保留两位小数
    // that.setData({
    //   shoudao_redmoney:shoudao_redmoney,
    //   fachu_redmoney:fachu_redmoney
    // })
    //用户信息
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //我发出的
  bindFachuTap: function() {
    var that = this
    that.setData({
      current: 0
    })
  },
  //我收到的
  bindShoudaoTap: function() {
    var that = this
    that.setData({
      current: 1
    })
  },
  bindCurrentChange: function(e) {
    var that = this;
    that.setData({
      current: e.detail.current
    })
  },
  //常见问题 点击事件处理函数
  bindProblemTap: function() {
    wx.navigateTo({
      url: '../problems/problems'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
