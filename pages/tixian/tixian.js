//获取应用实例
var app = getApp()
Page({
    data: {
        available_balance:0.00,//余额
        ti_xian_jin_e:'',//提现金额
        input_type:'digit',//数字键盘
        warningShow:false,//警告文案是否显示
        warning:''//警告文案
    },
    onLoad: function () {
        //请求余额
        const t = this;
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/hongbao`,
            data:app.GetReqParam(),
            method:'GET',
            success:function(res) {
                const dt = res.data;
                t.setData({
                    available_balance:(dt.yue/100).toFixed(2)
                })
            }
        })
    },
    //举报
    jubao:function() {
        console.log("举报");
    },
    //全部提现
    qubutixian:function() {
        this.setData({
            //提现金额设置成余额
            ti_xian_jin_e:this.data.available_balance
        })
    },
    //点击提现按钮时的操作
    tixian:function() {
        //如果提现金额大于余额的话,警告文案出现,并且return
        if(this.data.ti_xian_jin_e > this.data.available_balance) {
            this.setData({
                warningShow:!this.data.warningShow,
                warning:'提取的金额不能大于余额!'
            })
            return;
        } else {
            const t = this;
            // 发起一个提现金额的请求
            // 请求参数为提现金额
            let reqParam = {
                cash: parseInt(t.data.ti_xian_jin_e*100)
            }
            wx.request({
                url: `${app.G.REQPREFIX}/api/user/tixian`,
                data:app.GetReqParam(reqParam),
                method:'POST',
                //当成功提现后弹出模态框
                success:function(res) {
                    console.log(res);
                    wx.showModal({
                        title: '提示',
                        content: '提现成功,预计1-5个工作日内到账',
                    })
                }
            })
        }
    },
    //得到你所要提现的金额
    getValue:function(e) {
        this.setData({
            ti_xian_jin_e:e.detail.value
        })
    },
    //常见问题,点击常见问题跳转到常见问题页面
    changjianwenti:function() {
      wx.navigateTo({
        url: '../problems/problems'
      })
    }
})
