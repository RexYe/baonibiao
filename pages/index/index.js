//index.js
//发送红包页面
var app = getApp()

Page({
  data: {
    input_div_if:'飙红包',//初始的红包类型
    inputTxt_jine:'',
    inputTxt_renshu:'',
    inputTxt_shuliang:'',
    inputTxt_wenti:'',
    inputTxt_xswenti:'',
    cannotsend_jine:1,//判断金额是否符合发送红包要求
    cannotsend_renshu:1,//判断人数是否符合发送红包要求
    cannotsend_shuliang:1,//判断红包数量是否符合发送红包要求
    type:'',//传给服务器的红包类型
    is_need_wxpay:'',//是否需要微信支付
    //服务费
    charge_money:'0.00',
    //用户余额
    available_balance:2.00,
    //付款总金额,单位为分
    cash:0,
    choose_type_img:'./img/飙红包.png',
    choose_type_text:'飙红包',
    choose_type_div_if:false,
    red_packet_input_type:'0',
    hongbao_type:[
      {
        type:'飙红包',
        imgsrc:'./img/飙红包.png'
      },
      {
        type:'唱红包',
        imgsrc:'./img/唱红包.png'
      },
      {
        type:'提问红包',
        imgsrc:'./img/提问红包.png'
      },
      {
        type:'悬赏红包',
        imgsrc:'./img/悬赏红包.png'
      }
    ],
    wx_request_data:{},
    animationData:{},//动画数据
    userInfo: {}
  },
  //点击选择红包类型触发
  choose_type_div: function(){
      const t = this;
      //播放打开动画
      t._open_animation()
      t.setData({
        choose_type_div_if:true,
      })
  },
  //点击选择红包类型后弹出窗口的动画
  _open_animation: function(){
      var animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
      })
    this.animation = animation
    animation.translate(0.1, -900).step()
    this.setData({
        animationData:animation.export()
    })
    setTimeout(() =>{
        animation.translate(1).step()
        this.setData({
        animationData:animation.export()
    })}, 10)
  },
  //点击选择红包类型结束后关闭窗口的动画
  _close_animation: function(){
      const t = this
      var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
      })
      t.animation = animation
      animation.translate(0.1,900).opacity(0.1).step()
      t.setData({
          animationData:animation.export()
      })
      setTimeout(() =>{
          animation.translate(1).step()
          t.setData({
          animationData:animation.export()
      })}, 400)
  },
  //点击红包类型，完成选择后触发
  choose_type_done: function(e){
    const t = this;
    //播放关闭动画
    t._close_animation()
    //0.3秒后隐藏选择菜单
    setTimeout(()=>{
        t.setData({
            choose_type_div_if:false
        })
    },300)
    t.data.choose_type_text={'0':'飙红包','1':'唱红包','2':'提问红包','3':'悬赏红包'}[e.currentTarget.dataset.id] || '飙红包';
    let imgsrc_text = t.data.choose_type_text
    let imgsrc = './img/'+imgsrc_text+'.png'
    t.setData({
      input_div_if:t.data.choose_type_text,
      choose_type_img:imgsrc,//图片路径
      choose_type_text:t.data.choose_type_text,
      red_packet_input_type:e.currentTarget.dataset.id,
      //选择红包类型时清空data中的input值
      inputTxt_jine:'',
      inputTxt_renshu:'',
      inputTxt_shuliang:'',
      inputTxt_wenti:'',
      inputTxt_xswenti:'',
      charge_money:'0.00'
    })
  },
  //点击生成红包按钮触发
  build_red_packet: function() {
        const t = this;
        //先判断红包类型，根据红包类型判断是否符合条件
        if(t.data.input_div_if == '飙红包'){
              t.data.type = 'bgy'
              t._jineAvailable(t.data.inputTxt_jine)
              t._renshuAvailable(t.data.inputTxt_renshu)
              if(t.data.cannotsend_jine==0 && t.data.cannotsend_renshu==0){
                      t._is_need_wxpay() //判断是否需要微信支付
                      t.data.wx_request_data={
                            is_need_wxpay:t.data.is_need_wxpay,
                            cash:t.data.cash,
                            type:t.data.type,
                            inputTxt_renshu:t.data.inputTxt_renshu
                      },
                      t._gotoPay()
              }
        }
        if(t.data.input_div_if == '唱红包'){
              t.data.type = 'chb'
              t._jineAvailable(t.data.inputTxt_jine)
              t._shuliangAvailable(t.data.inputTxt_shuliang)
              if(t.data.cannotsend_jine==0 && t.data.cannotsend_shuliang==0){
                      t._is_need_wxpay()
                      t.data.wx_request_data={
                            is_need_wxpay:t.data.is_need_wxpay,
                            cash:t.data.cash,
                            type:t.data.type,
                            inputTxt_shuliang:t.data.inputTxt_shuliang
                      }
                      t._gotoPay()
              }
        }
        if(t.data.input_div_if == '提问红包'){
              t.data.type = 'twhb'
              t._jineAvailable(t.data.inputTxt_jine)
              t._shuliangAvailable(t.data.inputTxt_shuliang)
              if(t.data.cannotsend_jine==0 && t.data.cannotsend_shuliang==0){
                      t._is_need_wxpay()
                      t.data.wx_request_data={
                            wenti:t.data.inputTxt_wenti,
                            is_need_wxpay:t.data.is_need_wxpay,
                            cash:t.data.cash,
                            type:t.data.type,
                            inputTxt_shuliang:t.data.inputTxt_shuliang
                      }
                      t._gotoPay()
              }
        }
        if(t.data.input_div_if == '悬赏红包'){
              t.data.type = 'xshb'
              t._jineAvailable(t.data.inputTxt_jine)
              t._shuliangAvailable(t.data.inputTxt_shuliang)
              if(t.data.cannotsend_jine==0 && t.data.cannotsend_shuliang==0){
                      t._is_need_wxpay()
                      t.data.wx_request_data={
                            xswenti:t.data.inputTxt_xswenti,
                            is_need_wxpay:t.data.is_need_wxpay,
                            cash:t.data.cash,
                            type:t.data.type,
                            inputTxt_shuliang:t.data.inputTxt_shuliang
                      }
                      t._gotoPay()
              }
        }
  },
  //点击取消选择红包类型的X
  cancel_choose_type: function(){
      const t = this
      t._close_animation()
      //0.3秒后隐藏选择菜单
      setTimeout(()=>{
          t.setData({
              choose_type_div_if:false
          })
      },300)
  },
  //弹出提示框
  _showModal: function(content) {
      wx.showModal({
          title: '提示',
          content: content,
          showCancel: false,
      })
  },
  //判断金额是否符合规则
  _jineAvailable: function(jine){
      if(jine > 10) {
              this.data.cannotsend_jine += 1
              this._showModal('红包金额不能超过10元')
      }
      else if(jine < 1) {
              this.data.cannotsend_jine += 1
              this._showModal('红包最低金额不得少于1元')
      }
      else{
              this.data.cannotsend_jine = 0
      }
  },
  //判断人数是否符合要求
  _renshuAvailable: function(renshu){
      if(renshu > 20) {
              this.data.cannotsend_renshu += 1
              this._showModal('参与人数不得超过20人')
      }
      else if(renshu < 1) {
              this.data.cannotsend_renshu += 1
              this._showModal('请填写参与人数')
      }
      else{
              this.data.cannotsend_renshu = 0
      }
  },
  //判断数量是否符合要求
  _shuliangAvailable: function(shuliang){
      if(shuliang > 10) {
              this.data.cannotsend_shuliang += 1
              this._showModal('红包数量不得超过10个')
      }
      else if(shuliang < 1) {
              this.data.cannotsend_shuliang += 1
              this._showModal('请填写红包个数')
      }
      else{
              this.data.cannotsend_shuliang = 0
      }
  },
  //判断是否需要微信支付
  _is_need_wxpay: function(type){
          const t = this
          //如余额大于等于支付金额，则无需调用微信支付。
          if(t.data.all_money <= t.data.available_balance){
              t.data.is_need_wxpay = false;
          }
          //如余额小于需支付金额，则调用微信支付，并且支付的金额不抵消余额，为全额
          else{
              t.data.is_need_wxpay = true;
          }
  },
  _gotoPay: function(){
      const t = this
      // console.log(1);
       let type = t.data.type
       let _redid = '201709220325'
      wx.navigateTo({
        //将参数传进去
        url: '../zhifuwancheng/zhifuwancheng?_redid='+_redid+'&_type='+type
      })
      return
      console.log(t.data.wx_request_data);
                // 将时间戳从number转成string
                // let timestamp = (Date.parse(new Date())/1000).toString();
                wx.request({
                      // url: `${app.G.REQPREFIX}/api/wx/payment`,
                      method: 'GET',
                      data: t.data.wx_request_data,
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                          if(res.data.weizhifu){
                              t._requestPayment(res)
                          }
                          else{
                              let _redid = res.data._redid
                              //若已支付，则直接跳转到支付完成页面
                              wx.navigateTo({
                                  //将_redid参数传进去
                                  url: '../zhifuwancheng/zhifuwancheng?_redid='+_redid
                              })
                          }
                      },
                      fail: function(err) {
                        wx.showToast({
                            title: '创建订单失败',
                            icon: 'loading',
                            duration: 2000
                        })
                          console.log(err)
                      }
                })
  },
  //input监听函数
  bindKeyInput: function(e) {
    const t = this
    //红包金额
    if(e.target.id === 'jine'){
            t.data.inputTxt_jine = Number(e.detail.value)
            //传服务器的cash为红包金额，不包括服务费，单位为分
            t.data.cash = Number(e.detail.value)*100
            //服务费为6%，保留两位小数
            let _charge_money;
            let _charge_money_toFixed = (Number(e.detail.value)*0.06).toFixed(2)
            let _charge_money_noFixed = Number(e.detail.value)*0.06
            //不足1分按1分算
            if(_charge_money_noFixed>_charge_money_toFixed){
                  _charge_money = Number(_charge_money_toFixed)+0.01
            }
            else{
                _charge_money = _charge_money_toFixed;
            }
            t.data.all_money = Number(_charge_money)+Number(e.detail.value)
            t.setData({
                    charge_money:_charge_money
            })
    }
    //人数
    if(e.target.id === 'renshu') {
            t.data.inputTxt_renshu = Number(e.detail.value)
    }
    //红包数量
    if(e.target.id === 'shuliang') {
            t.data.inputTxt_shuliang = Number(e.detail.value)
    }
    //填写问题
    if(e.target.id === 'tianxiewenti'){
            t.data.inputTxt_wenti = e.detail.value
    }
    //悬赏问题
    if(e.target.id === 'xswenti'){
            t.data.inputTxt_xswenti = e.detail.value
    }
},
_requestPayment: function(res1){
      const t = this
      wx.requestPayment({
        'timeStamp': res1.data.timestamp,
        'nonceStr': res1.data.nonceStr,
        'package': 'prepay_id='+res1.data.prepay_id,
        'signType': 'MD5',
        'paySign': res.data._paySignjs,
        'success':function(res){
              //充值成功后发送请求返回一个_redid
              t._return_redid(res1)
        },
        'fail':function(res){
          wx.showToast({
              title: '支付失败',
              icon: 'loading',
              duration: 2000
          })
        },
        'complete':function(res){}
      })
},
//返回服务器_redid请求
_return_redid: function(){
    wx.request({
          // url: `${app.G.REQPREFIX}/api/wx/payment`,
          method: 'POST',
          data: res.data._redid,
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                })
          },
          fail: function(err) {
              wx.showToast({
                  title: '发送红包ID失败',
                  icon: 'loading',
                  duration: 2000
              })
              console.log(err)
          }
    })
},
//获取余额的请求
_getYuE_request: function(){
        const t = this;
        wx.request({
              // url: `${app.G.REQPREFIX}/api/wx/payment`,
              method: 'POST',
              data: '',
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                    t.setData({
                        available_balance:res.data.yue
                    })
              },
              fail: function(err) {
                  console.log(err)
              }
        })
},
//跳转到了解详情页面
  to_know_more: function(){
      wx.navigateTo({
          url: '../moreabouttype/moreabouttype'
     })
  },
  onLoad: function () {
      var that = this
      //发送请求拿到余额
      that._getYuE_request()
      that.setData({
          userInfo: app.G.userInfo
      })
  },
})
