//index.js
//发送红包页面
var app = getApp()
Page({
  data: {
    inputValue_kl:'',
    inputValue_je:'',
    inputValue_sl:'',
    //服务费
    charge_money:'0.00',
    //按钮内的文本
    build_buttonValue:'生成红包',
    warning:'',
    //是否显示警告栏
    warningShow:false,
    //用户余额
    available_balance:0.00,
    red_packet_input:[
      {
        menu_name:'设置口令',
        id:'kl',
        placeholder:'请输入口令',
        input_type:'text',
        confirm_type:'next',
        maxlength:8,
        tips:'小伙伴们说对口令即可获得随机红包 ',
        tips_src:'./img/问号.png'
      },
      {
        menu_name:'金额（元）',
        id:'je',
        placeholder:'填写金额',
        input_type:'digit',
        confirm_type:'next',
        maxlength:4
      },
      {
        menu_name:'数量（个）',
        id:'sl',
        placeholder:'填写数量',
        input_type:'number',
        maxlength:2
      }
    ],
    userInfo: {}
  },
  //事件处理函数
  build_red_packet: function() {
    wx.navigateTo({
      url: '../hongbao/hongbao'
    })
    // const t = this
    // //将时间戳从number转成string
    // // let timestamp = (Date.parse(new Date())/1000).toString();
    // //调起微信支付
    // wx.requestPayment({
    //   //均从后台获取
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success':function(res){
    //     wx.showToast({
    //         title: '支付成功',
    //         icon: 'success',
    //         duration: 2000
    //     })
    //   },
    //   'fail':function(res){},
    //   'complete':function(res){}
    // })
    // //点击支付前需判断是否符合支付条件
    // let pre_money = Number(t.data.inputValue_je)/Number(t.data.inputValue_sl)
    // if(pre_money>=1 && t.data.inputValue_je<=10){
    //   t.setData({
    //     warning:''
    //   })
    // }
    // if(this.data.warning.length>0) {
    //   wx.showModal({
    //     title: '提示',
    //     content: this.data.warning,
    //     showCancel: false,
    //   })
    // }
    // console.log(this.data);
  },
  how_to_use: function() {
    console.log('how to use');
  },
  bindKeyInput: function(e) {
    const t = this
    //口令
    if(e.target.id === 'kl'){
      t.setData({
        inputValue_kl: e.detail.value
      })
    }
    //红包金额
    if(e.target.id === 'je') {
      //红包金额为空时,0或者未填
      if(e.detail.value == false) {
        t.setData({
          warning:'请填写正确的红包金额'
        })
      }
      //若红包金额不为空
      else{
        //金额>10时
        if(Number(e.detail.value)>10) {
          t.setData({
            warningShow: true,
            warning:'红包金额不能超过10元！'
          })
        }
        //金额<1时
        else if(Number(e.detail.value)<1){
          t.setData({
            warningShow: true,
            warning:'每人可得的平均红包金额不能少于1元！'
          })
        }
        //金额为1~10之间时
        else{
          let enoughFlag1 = Number(e.detail.value)/Number(t.data.inputValue_sl)
          if(enoughFlag1<1){
            t.setData({
              warningShow: true,
              warning:'每人可得的平均红包金额不能少于1元'
            })
          }
          else{
            t.setData({
              warningShow: false,
            })
          }
        }
      }
      //服务费为4%，保留两位小数
      let charge_money = (Number(e.detail.value)/25).toFixed(2)
      //需要支付的总额=服务费+红包金额
      let all_money = Number(charge_money)+Number(e.detail.value)
      if(isNaN(all_money)){
        all_money = 0
      }
      //当计算出总额后，生成红包的按钮文本改成 ‘还需支付**元’
      if(all_money !== 0){
        t.setData({
          inputValue_je: Number(e.detail.value),
          charge_money: charge_money,
          build_buttonValue: '还需支付'+all_money+'元'
        })
      }
      else{
        t.setData({
          inputValue_je: Number(e.detail.value),
          charge_money: charge_money,
          build_buttonValue: '生成红包'
        })
      }
    }
    //红包数量
    if(e.target.id === 'sl') {
      //数量为0或者空
      if(e.detail.value == false) {
        t.setData({
          warning:'请填写正确的红包个数'
        })
      }
      //红包个数已填
      else {
        //判断最低金额
        let enoughFlag2 = t.data.inputValue_je/Number(e.detail.value)
        if(enoughFlag2 < 1) {
          t.setData({
            warningShow: true,
            warning:'每人可得的平均红包金额不能少于1元'
          })
        }
        if(enoughFlag2 >= 1) {
          t.setData({
            warningShow: false,
          })
        }
        t.setData({
          inputValue_sl: e.detail.value
        })
      }
    }
},
  onLoad: function () {
    var that = this
    //获取全局变量==>余额
    that.setData({
      available_balance:app.G.balance
    })
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})
