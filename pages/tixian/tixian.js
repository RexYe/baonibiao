//index.js
//获取应用实例
var util=require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        yu_e:0,
        ti_xian_jin_e:'',
        input_type:'digit',
        warningShow:false,
        warning:''
    },
    onLoad: function () {
        this.setData({
            yu_e:util.formatMoney(this.data.yu_e),
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
            ti_xian_jin_e:this.data.yu_e
        })
    },
    //点击提现按钮时的操作
    tixian:function() {
        //将提现金额发给后台
        if(this.data.ti_xian_jin_e > this.data.yu_e) {
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
