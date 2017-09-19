//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        available_balance:0.00,
        ti_xian_jin_e:'',
        input_type:'digit',
        warningShow:false,
        warning:''
    },
    onLoad: function () {
      var that = this
      //获取全局变量==>余额
      that.setData({
        available_balance:app.globalData.balance
      })
        // console.log('onLoad')
        // var that = this
        // //调用应用实例的方法获取全局数据
        // app.getUserInfo(function(userInfo){
        //   //更新数据
        //   that.setData({
        //     userInfo:userInfo
        //   })
        // })
    },
    //举报
    jubao:function() {
        console.log("举报");
    },
    //全部提现
    qubutixian:function() {
        this.setData({
            ti_xian_jin_e:this.data.available_balance
        })
    },
    //点击提现按钮时的操作
    tixian:function() {
        //将提现金额发给后台
        if(this.data.ti_xian_jin_e > this.data.available_balance) {
            this.setData({
                warningShow:!this.data.warningShow,
                warning:'提取的金额不能大于余额!'
            })
            // return;
        }
        console.log(this.data.ti_xian_jin_e);
    },
    //得到你所要提现的金额
    getValue:function(e) {
        this.setData({
            ti_xian_jin_e:e.detail.value
        })
    },
    //常见问题
    changjianwenti:function() {
      wx.navigateTo({
        url: '../problems/problems'
      })
    }
})
