//index.js
//发送红包页面
var app = getApp()
var jine={
    menu_name:'金额（元）',
    id:'je',
    placeholder:'填写金额',
    input_type:'digit',
    confirm_type:'next',
    maxlength:4
  }
Page({
  data: {
    inputTxt:[
      '',
      '',
      ''
      // inputValue_kl:'',
      // inputValue_je:'',
      // inputValue_sl:'',
    ],
    //服务费
    charge_money:'0.00',
    //按钮内的文本
    build_buttonValue:'生成红包',
    warning:'',
    //是否显示警告栏
    warningShow:false,
    //用户余额
    available_balance:2.00,
    //付款总金额,单位为分
    cash:0,
    choose_type_img:'./img/红包.png',
    choose_type_text:'飙高音',
    choose_type_div_if:false,
    red_packet_input_type:'0',
    hongbao_type:[
      {
        type:'飙高音',
        imgsrc:'./img/红包.png'
      },
      {
        type:'唱红包',
        imgsrc:'./img/红包.png'
      },
      {
        type:'提问红包',
        imgsrc:'./img/红包.png'
      },
      {
        type:'悬赏红包',
        imgsrc:'./img/红包.png'
      }
    ],
    red_packet_input:[
      // {
      //   menu_name:'设置口令',
      //   id:'kl',
      //   placeholder:'请输入口令',
      //   input_type:'text',
      //   confirm_type:'next',
      //   maxlength:8,
      //   tips:'小伙伴们说对口令即可获得随机红包 ',
      //   tips_src:'./img/问号.png'
      // },
      [
        jine,
        {
          menu_name:'人数',
          id:'rs',
          placeholder:'填写人数',
          input_type:'number',
          maxlength:2
        }
      ],
      [
        {
          menu_name:'选择歌词',
          placeholder:'请输入歌词',
          id:'geci',
          maxlength:8,
        },
        jine,
        {
          menu_name:'数量',
          id:'sl',
          placeholder:'填写数量',
          input_type:'number',
          maxlength:2
        }
      ],
      [
        {
          menu_name:'填写问题',
          placeholder:'请输入问题',
          id:'wenti',
          id:'wenti',
          maxlength:8,
        },
        jine,
        {
          menu_name:'数量',
          id:'sl',
          placeholder:'填写数量',
          input_type:'number',
          maxlength:2
        }
      ],
      [
        {
          menu_name:'填写悬赏问题',
          placeholder:'请输入悬赏问题',
          id:'xs_wenti',
          maxlength:8,
        },
        jine,
        {
          menu_name:'数量',
          id:'sl',
          placeholder:'填写数量',
          input_type:'number',
          maxlength:2
        }
      ]
    ],
    userInfo: {}
  },
  //事件处理函数
  choose_type_div: function(){
      const t = this;
      t.setData({
        choose_type_div_if:true
      })
  },
  choose_type_done: function(e){
    const t = this;
    t.data.choose_type_text={'0':'飙红包','1':'唱红包','3':'猜红包','4':'提问红包'}[e.currentTarget.dataset.id] || '飙红包';
    t.setData({
      choose_type_div_if:false,
      choose_type_text:t.data.choose_type_text,
      red_packet_input_type:e.currentTarget.dataset.id,
      inputTxt:''
    })
  },
  build_red_packet: function() {
        const t = this;
        // wx.navigateTo({
        //   url: '../hongbao/hongbao'
        // })

        //点击支付前需判断是否符合支付条件
        let pre_money = Number(t.data.inputValue_je)/Number(t.data.inputValue_sl)
        if(pre_money>=1 && t.data.inputValue_je<=10){
            t.setData({
              warning:''
            })
        }
        if(this.data.warning.length>0) {
            wx.showModal({
              title: '提示',
              content: this.data.warning,
              showCancel: false,
            })
        }
        if(this.data.warning.length === 0){
          //如余额大于等于支付金额，则无需调用微信支付。
          if(t.data.cash <= t.data.available_balance){

          }
          //如余额小于需支付金额，则调用微信支付，并且支付的金额为抵消余额后的金额
          else{

          }
            // console.log(this.data);
            // 将时间戳从number转成string
            // let timestamp = (Date.parse(new Date())/1000).toString();
            // wx.request({
            //       url: `${app.G.REQPREFIX}/api/wx/payment`,
            //       method: 'GET',
            //       data: {
            //         cash:t.data.cash,   //订单金额
            //         openid: self.data.openid
            //       },
            //       header: {
            //           'content-type': 'application/json'
            //       },
            //       success: function(res) {
            //         //调起微信支付
            //         wx.requestPayment({
            //           'timeStamp': timestamp,
            //           'nonceStr': '',
            //           'package': 'prepay_id='+res.data.prepay_id,
            //           'signType': 'MD5',
            //           'paySign': res.data._paySignjs,
            //           'success':function(res){
            //             wx.showToast({
            //                 title: '支付成功',
            //                 icon: 'success',
            //                 duration: 2000
            //             })
            //           },
            //           'fail':function(res){
            //             wx.showToast({
            //                 title: '支付失败',
            //                 icon: 'loading',
            //                 duration: 2000
            //             })
            //           },
            //           'complete':function(res){}
            //         })
            //       },
            //       fail: function(err) {
            //           console.log(err)
            //       }
            //         })
        }
  },
  how_to_use: function() {
    wx.navigateTo({
      url: '../problems/problems'
    })
  },
  bindKeyInput: function(e) {
    console.log(e);
    const t = this

    //口令
    if(e.target.id === 'kl'){
      // t.data.inputTxt[0]= e.detail.value
      // t.setData({
      //   inputTxt: t.data.inputTxt
      // })
    }

    //红包金额
    if(e.target.id === 'je') {
      t.data.inputTxt[1]= e.detail.value
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
      let charge_money = (Number(e.detail.value)/16.6).toFixed(2)
      //需要支付的总额=服务费+红包金额
      let all_money = Number(charge_money)+Number(e.detail.value)-Number(t.data.available_balance)
      if(isNaN(all_money)){
        all_money = 0
      }
      t.data.inputTxt[0]= e.detail.value
      //当计算出总额后，生成红包的按钮文本改成 ‘还需支付**元’
      if(all_money !== 0){
        t.setData({
          // inputTxt: t.data.inputTxt,
          inputValue_je: Number(e.detail.value),
          charge_money: charge_money,
          build_buttonValue: '还需支付'+all_money+'元',
          cash: all_money*100
        },function () {
            console.log(t.data.inputTxt);
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
    that.setData({
      userInfo: app.G.userInfo
    })
  }
})
