//index.js
//发送红包页面
var app = getApp()
const HONGBAO_TYPE = [
  {
    bgy:{
      type:'飙高音红包',
      imgsrc:'./img/飙高音红包.png',
      dom:{
        renshu:true
      }
    },
    gwc:{
      type:'跟我唱红包',
      imgsrc:'./img/跟我唱红包.png',
      dom:{
        shuliang:true,
        changyiju:true
      }
    },
    tw:{
        type:'提问红包',
        imgsrc:'./img/提问红包.png',
        dom:{
          shuliang:true,
          tianxiewenti:true
        }
      },
    xs:{
        type:'悬赏红包',
        imgsrc:'./img/悬赏红包.png',
        dom:{
          shuliang:true,
          xswenti:true
        }
      },
    xy:{
        type:'幸运红包',
        imgsrc:'./img/幸运红包.png',
        dom:{
          renshu:true,
          shouqizuijia:true
        }
      },
    jj:{
        type:'尖叫红包',
        imgsrc:'./img/尖叫红包.png',
        dom:{
          renshu:true,
        }
      },
    kl:{
        type:'口令红包',
        imgsrc:'./img/口令红包.png',
        dom:{
          shuliang:true,
          tianxiekouling:true
        }
      },
    rkl:{
        type:'绕口令红包',
        imgsrc:'./img/绕口令红包.png',
        dom:{
          shuliang:true,
          rkl:true
        }
      }
  }
]
const RKL_TYPE = [
  {
    type:'1.粉红墙上画凤凰，红凤凰，粉凤凰，粉红凤凰。',
  },
  {
    type:'2.早招租，晚招租，总找周邹郑曾朱。',
  },
  {
    type:'3.风吹藤动铜铃动，风停藤定铜铃静。',
  },
  {
    type:'4.黑化肥发灰会挥发，灰化肥挥发会发黑。',
  },
  {
    type:'5.妈妈卖麦，麦卖妈妈买袜。',
  },
]

Page({
    data: {
      inputTxt_jine:'',
      inputTxt_renshu:'',
      inputTxt_shuliang:'',
      inputTxt_wenti:'',
      inputTxt_xswenti:'',
      inputTxt_sqzjweizhi:'',//手气最佳位置
      inputTxt_kouling:'',//口令
      cannotsend_jine:1,//判断金额是否符合发送红包要求
      cannotsend_renshu:1,//判断人数是否符合发送红包要求
      cannotsend_shuliang:1,//判断红包数量是否符合发送红包要求
      cansendFLAG:false,
      type:'bgy',//传给服务器的红包类型,初始的红包类型为飙高音
      is_need_wxpay:'',//是否需要微信支付
      //服务费
      charge_money:'0.00',
      //用户余额
      available_balance:0.00,
      //付款总金额,单位为分
      cash:0,
      choose_type_img:'./img/飙高音红包.png',
      choose_type_text:'飙高音红包',
      choose_rkl_type_text:'',//发红包页显示的绕口令选项
      choose_type_div_if:false,//选择红包类型弹窗
      choose_rkl_div_if:false,//选择绕口令弹窗
      rkl_input_type:'0',
      hongbao_type:HONGBAO_TYPE[0],
      rkl_type:RKL_TYPE,
      wx_request_data:{},
      animationData:{},//动画数据
      isShow:{
        renshu: true
      },
      userInfo: {}
    },
    //点击选择红包类型触发
    choose_type_div: function() {
        const t = this
        //播放打开动画
        t._open_animation()
        t.setData({
            choose_type_div_if:true
        })
    },
    //点击选择红包类型后弹出窗口的动画
    _open_animation: function() {
        const t = this
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease'
        })
        t.animation = animation
        animation.translate(0.1, -900).step()
        t.setData({
            animationData:animation.export()
        })
        setTimeout(() =>{
            animation.translate(1).step()
            t.setData({
                animationData:animation.export()
            })
        }, 10)
    },
    //点击选择红包类型完成后关闭窗口的动画
    _close_animation: function() {
        const t = this
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease'
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
            })
        }, 400)
    },
    //点击红包类型，完成选择后触发
    choose_type_done: function(e) {
        const t = this
        //播放关闭动画
        t._close_animation()
        //0.3秒后隐藏选择菜单
        setTimeout(()=>{
            t.setData({
                choose_type_div_if:false
            })
        },300)
        t.data.choose_type_text = {
            'bgy':'飙高音红包',
            'gwc':'跟我唱红包',
            'tw':'提问红包',
            'xs':'悬赏红包',
            'xy':'幸运红包',
            'jj':'尖叫红包',
            'kl':'口令红包',
            'rkl':'绕口令红包'
        }[e.currentTarget.dataset.id] || '飙高音红包'
        t.data.type = e.currentTarget.dataset.id || 'bgy'
        //判断当前红包是否有以下这些dom节点
        let isShow = HONGBAO_TYPE[0][t.data.type].dom
        let imgsrc_text = t.data.choose_type_text
        let imgsrc = './img/'+imgsrc_text+'.png'
        t.setData({
            isShow:isShow,
            choose_type_img:imgsrc,//图片路径
            choose_type_text:t.data.choose_type_text,
            type:t.data.type,
            //选择红包类型时清空data中的input值
            inputTxt_jine:'',
            inputTxt_renshu:'',
            inputTxt_shuliang:'',
            inputTxt_wenti:'',
            inputTxt_xswenti:'',
            charge_money:'0.00'
        })
    },
    //点击生成红包按钮触发函数
    build_red_packet: function() {
        const t = this
        t._jineAvailable(t.data.inputTxt_jine)//金额已填 1<金额<10
        t._is_need_wxpay() //判断是否需要微信支付,判断余额够不够
        if(t.data.is_need_wxpay) {
            t._needWxPay()//余额不够,先充值
        }
        else{
            //余额够，先判断输入是否符合规则，再走内部支付
            t._judgeInputByType()//第一步，根据类型判断输入
            //第二步，综合判断符合发送规则后，进入内部支付流程
            if(t.data.cansendFLAG === true) {
                  t._noneedWxPay()
            }
        }
    },
    //点击取消选择红包类型的X
    cancel_choose_type: function() {
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
            showCancel: false
        })
    },
    //根据红包类型判断输入是否符合规则
    _judgeInputByType: function(type) {
        const t = this
        if(type == 'bgy') {
            t._jineAvailable(t.data.inputTxt_jine)
            t._renshuAvailable(t.data.inputTxt_renshu)
            if(t.data.cannotsend_jine == 0 && t.data.cannotsend_renshu == 0){
                t.data.cansendFLAG = true
            }
            else{
                t.data.cansendFLAG = false
            }
        }
        // if(type=='gwc'){
        //         t._shuliangAvailable(t.data.inputTxt_shuliang)
        // }
        // if(type=='tw'){
        //
        // }
        // if(type=='xs'){
        //
        // }
    },
    //需要微信支付
    _needWxPay: function() {
        const t = this
            wx.showModal({
                title: '提示',
                content: '余额不足，是否充值？',
                success: function(res) {
                    if (res.confirm) {
                        console.log('确定充值')
                        t.data.wx_request_data = {
                            is_need_wxpay:t.data.is_need_wxpay,
                            cash:t.data.cash,
                            _id:app.G.userInfo._id
                        },
                        t._gotoPay_wxpay()
                    }
                    else if (res.cancel) {
                        console.log('取消充值')
                    }
                }
            })
    },
    //不需要微信支付
    _noneedWxPay: function() {
        const t = this
            t.data.wx_request_data = {
                is_need_wxpay:t.data.is_need_wxpay,
                cash:t.data.cash,
                type:t.data.type,
                inputTxt_renshu:t.data.inputTxt_renshu,
                _id:app.G.userInfo._id
            }
            t._gotoPay()
    },
    //判断金额是否符合规则
    _jineAvailable: function(jine) {
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
    _renshuAvailable: function(renshu) {
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
    _shuliangAvailable: function(shuliang) {
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
    _is_need_wxpay: function(type) {
        const t = this
        //如余额大于等于支付金额，则无需调用微信支付
        if(t.data.all_money <= t.data.available_balance) {
            t.data.is_need_wxpay = false
        }
        //如余额小于需支付金额，则调用微信支付，并且支付的金额不抵消余额，为全额
        else{
            t.data.is_need_wxpay = true
        }
    },
    //路径1：走内部支付
    _gotoPay: function() {
        const t = this
        // 将时间戳从number转成string
        // let timestamp = (Date.parse(new Date())/1000).toString();
        wx.request({
            url: `${app.G.REQPREFIX}/api/hongbao/fa`,
            method: 'POST',
            data: t.data.wx_request_data,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log('请求成功（内部支付）,已经拿到_redid----->',res)
                t._getYuE_request()//内部支付完成后获取余额
                let _redid = res.data
                wx.navigateTo({
                    //将_redid参数传进去
                    url: '../zhifuwancheng/zhifuwancheng?_redid='+_redid
                })
            },
            fail: function(err) {
              console.log('请求失败')
              wx.showToast({
                  title: '创建订单失败',
                  icon: 'loading',
                  duration: 2000
              })
              console.log(err)
            }
        })
    },
    //路径2：走微信支付
    _gotoPay_wxpay: function() {
        const t = this
        console.log(t.data.wx_request_data);
        wx.request({
            url: `${app.G.REQPREFIX}/api/wx/payment`,
            method: 'GET',
            data: t.data.wx_request_data,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.length == 0 || res.data == "Internal Server Error") {
                    console.log('微信支付瘫痪了，请稍后再试')
                }
                else{
                    console.log('请求成功（需要微信支付）,----->',res)
                    t._requestPayment(res)
                }
            },
            fail: function(err) {
              console.log('请求失败(需要微信支付)')
              wx.showToast({
                  title: '创建订单失败',
                  icon: 'loading',
                  duration: 2000
              })
              console.log(err)
            }
        })
    },
    //金额输入监听函数
    jineInput: function(e) {
        const t = this
        let jine = +e.detail.value
        //传服务器的cash为红包金额，不包括服务费，单位为分
        let cash = jine*100
        //服务费为6%，保留两位小数,不足1分按1分算
        let fee = ((Math.floor(cash*0.06)+1).toFixed(2))/100
        t.setData({
            charge_money:fee,
            cash:cash
        })
    },
    //人数输入监听函数
    renshuInput: function(e) {
        const t = this
        t.data.inputTxt_renshu = +e.detail.value
    },
    //红包数量监听函数
    shuliangInput: function(e) {
        const t = this
        t.data.inputTxt_shuliang = +e.detail.value
    },
    //input监听函数
    bindKeyInput: function(e) {
        console.log('尚未定义');
    },
    _requestPayment: function(res1) {
        const t = this
        console.log('调起微信支付钱获取的参数------>',res1)
        // wx.requestPayment({
        //  timeStamp': '',
        //  'nonceStr': '',
        //  'package': '',
        //  'signType': 'MD5',
        //  'paySign': '',
        //   'success':function(res){
        //
        //         //充值成功后发送请求返回一个_redid
        //         t._return_redid(res1)
        //         t.build_red_packet()充值后自动调起发送红包按钮的函数
        //         t._getYuE_request()//支付完成后获取余额
        //
        //   },
        //   'fail':function(res){
        //     wx.showToast({
        //         title: '支付失败',
        //         icon: 'loading',
        //         duration: 2000
        //     })
        //   },
        //   'complete':function(res){}
        // })
    },
    //返回服务器_redid请求
    _return_redid: function() {
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
    _getYuE_request: function() {
        const t = this
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/hongbao`,
            method: 'GET',
            data: {
                _id:app.G.userInfo._id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log('获取余额成功')
                console.log(res)
                t.setData({
                    available_balance:res.data.yue/100
                })
            },
            fail: function(err) {
                console.log('获取余额失败')
                console.log(err)
            }
        })
    },
    //跳转到了解详情页面
    to_know_more: function() {
        wx.navigateTo({
            url: '../moreabouttype/moreabouttype'
       })
    },
    choose_rkl_func: function() {
        const t = this
        t.setData({
            choose_rkl_div_if: true
        })
    },
    choose_rkl_type_done: function(e) {
        const t = this
        t.data.choose_rkl_type_text = {
          '0':'绕口令1',
          '1':'绕口令2',
          '2':'绕口令3',
          '3':'绕口令4',
          '4':'绕口令5'
        }[e.currentTarget.dataset.id] || '绕口令1'
        t.setData({
            choose_rkl_type_text:t.data.choose_rkl_type_text,
            rkl_input_type:e.currentTarget.dataset.id
        })
        t.setData({
            choose_rkl_div_if:false
        })
    },
    onLoad: function () {
        var t = this
        //发送请求拿到余额
        t._getYuE_request()
        t.setData({
            userInfo: app.G.userInfo
        })
    }
})
