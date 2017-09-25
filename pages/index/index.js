//index.js
//发送红包页面
var app = getApp()
const CDNHEAD = 'http://sharer176.oss-cn-beijing.aliyuncs.com'
const HONGBAO_TYPE = [
  {
    //飙高音红包--->输入:金额、参与人数
    //规则： 仅有一个红包，根据抢的人发出的声音，取最高音发送红包；
    //      时间默认为5分钟，若5分钟内参与人数未达设置的人数，则取已参与人数的最高音；
    //      若5分钟内无人参与，则红包进入退还账户流程；
    //      0<金额<11    0<参与人数<11
    bgy:{
      type:'飙高音红包',
      imgsrc:`${CDNHEAD}/baonibiao/bgy_icon.svg`,
      dom:{
        renshu:true
      }
    },
    //跟我唱红包--->输入:金额、红包个数
    //规则： 发红包的人唱一句歌，系统判断抢红包的人跟着唱的准确度，准确度越高，分的红包金额越大；
    //      时间默认为5分钟，若5分钟内参与人数未达设置的人数，则参与人数分得人数对应比例的金额，其余的退还账户；
    //      若5分钟内无人参与，则红包进入退还账户流程；
    //      0<金额<11    0<红包个数<11
    gwc:{
      type:'跟我唱红包',
      imgsrc:`${CDNHEAD}/baonibiao/gwc_icon.svg`,
      dom:{
        shuliang:true,
        changyiju:true
      }
    },
    //幸运红包--->输入:金额、参与人数、手气最佳位置
    //规则： 类似于外卖红包，定义一个最佳手气的位置，分享红包时显示 如'第6个人将获得最大红包！'；
    //      定义的手气最佳位置将获得总金额的一半以及另一半中的随机份额，而其余人随机分的剩下的一半；
    //      若3小时内参与人数不够，则剩余金额进入退还账户流程；
    //      0<金额<11    0<参与人数<11   0<手气最佳位置<参与人数
    xy:{
        type:'幸运红包',
        imgsrc:'./img/幸运红包.png',
        dom:{
          renshu:true,
          shouqizuijia:true
        }
      },
      //尖叫红包--->输入:金额、红包个数
      //规则： 根据抢的人发出的声音，取最大声者发送红包；
      //      时间默认为5分钟，若5分钟内参与人数未达设置的人数，则取已参与人数的最高音；
      //      若5分钟内无人参与，则红包进入退还账户流程；
      //      0<金额<11    0<参与人数<11 
    jj:{
        type:'尖叫红包',
        imgsrc:'./img/尖叫红包.png',
        dom:{
          renshu:true,
        }
      },
      //口令红包--->输入:金额、红包个数、口令
      //规则： 根据输入的口令，抢的人语音输入口令，正确者随机分得红包
      //      若3小时内参与人数不够，则剩余金额进入退还账户流程；
      //      0<金额<11    0<红包个数<11
    kl:{
        type:'口令红包',
        imgsrc:'./img/口令红包.png',
        dom:{
          shuliang:true,
          tianxiekouling:true
        }
      },
      //绕口令红包--->输入:金额、红包个数、选择绕口令
      //规则： 根据选择的绕口令，抢的人语音念出绕口令，最准确者分的金额最多
      //      若3小时内参与人数不够，则剩余金额进入退还账户流程；
      //      0<金额<11    0<红包个数<11
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
//绕口令库
const RKL_TYPE = [
  {
    type:'粉红墙上画凤凰，红凤凰，粉凤凰，粉红凤凰。',
  },
  {
    type:'早招租，晚招租，总找周邹郑曾朱。',
  },
  {
    type:'风吹藤动铜铃动，风停藤定铜铃静。',
  },
  {
    type:'黑化肥发灰会挥发，灰化肥挥发会发黑。',
  },
  {
    type:'妈妈卖麦，麦卖妈妈买袜。',
  },
]

Page({
    data: {
      cannotsend_jine:1, //判断金额是否符合发送红包要求
      cannotsend_renshu:1, //判断人数是否符合发送红包要求
      cannotsend_shuliang:1, //判断红包数量是否符合发送红包要求
      cannotsend_shouqizj:1, //判断手气最佳位置是否符合发送红包要求
      cansendFLAG:false, //是否符合发送要求的最终判断
      type:'bgy', //传给服务器的红包类型,初始的红包类型为飙高音
      is_need_wxpay:'', //是否需要微信支付
      fee:'0.00', //服务费
      yue:0.00, //用户余额
      cash:0, //付款总金额,单位为分
      choose_type_img:`${CDNHEAD}/baonibiao/bgy_icon.svg`,
      choose_type_text:'飙高音红包',
      choose_type_div_if:false, //选择红包类型弹窗判断 wx:if
      choose_rkl_div_if:false, //选择绕口令弹窗判断 wx:if
      hongbao_type:HONGBAO_TYPE[0], //红包类型库
      rkl_type:RKL_TYPE, //绕口令库
      wx_request_data:{}, //请求数据存储处
      animationData:{}, //动画数据
      isShow:{
          renshu: true
      }, //针对不同红包，显示不同的选项
      userInfo: {} //用户信息
    },
    //点击选择红包类型触发
    choose_type_div: function() {
        const t = this
        t._open_animation() //播放打开动画
        t.setData({
            choose_type_div_if:true //显示红包选择的弹窗
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
        t._close_animation() //播放关闭动画
        //0.3秒后隐藏选择菜单
        setTimeout(()=>{
            t.setData({
                choose_type_div_if:false
            })
        },300)
        t.data.choose_type_text = {
            'bgy':'飙高音红包',
            'gwc':'跟我唱红包',
            'xy':'幸运红包',
            'jj':'尖叫红包',
            'kl':'口令红包',
            'rkl':'绕口令红包'
        }[e.currentTarget.dataset.id] || '飙高音红包'
        t.data.type = e.currentTarget.dataset.id || 'bgy'
        //判断当前红包是否有以下这些dom节点
        let isShow = HONGBAO_TYPE[0][t.data.type].dom
        let imgsrc = HONGBAO_TYPE[0][t.data.type].imgsrc
        t.setData({
            isShow:isShow,
            choose_type_img:imgsrc, //图片路径
            choose_type_text:t.data.choose_type_text,
            type:t.data.type,
            //选择红包类型时清空data中的input值
            inputTxt_jine:'',
            fee:'0.00'
        })
    },
    //点击生成红包按钮触发函数
    build_red_packet: function() {
        const t = this
        t._jineAvailable(t.data.inputTxt_jine) //金额已填 1<金额<10
        t._is_need_wxpay() //判断是否需要微信支付,即判断余额够不够
        if(t.data.is_need_wxpay) {
            t._needWxPay() //余额不够,先充值
        }
        else{
            //余额够，先判断输入是否符合规则，再走内部支付
            t._judgeInputByType() //第一步，根据类型判断输入
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
        t._jineAvailable(t.data.inputTxt_jine)  //共同点：均需判断金额
        //当金额已经满足条件后，再判断其余输入
        if(t.data.cannotsend_jine == 0) {
            if(type == 'bgy') {
                t._renshuAvailable(t.data.inputTxt_renshu) //判断人数
                if(t.data.cannotsend_renshu == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
            if(type == 'gwc') {
                //此处还缺少语音输入
                t._shuliangAvailable(t.data.inputTxt_shuliang) //判断红包数量
                if(t.data.cannotsend_shuliang == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
            if(type == 'xy') {
                t._renshuAvailable(t.data.inputTxt_renshu) //判断人数
                t._shouqizjAvailable(t.data.inputTxt_shouqizj,t.data.inputTxt_renshu) //判断手气最佳位置
                if(t.data.cannotsend_renshu == 0 && t.data.cannotsend_shouqizj == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
            if(type == 'jj') {
                t._renshuAvailable(t.data.inputTxt_renshu) //判断人数
                if(t.data.cannotsend_renshu == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
            if(type == 'kl') {
                t._shuliangAvailable(t.data.inputTxt_shuliang) //判断红包数量
                if(t.data.cannotsend_shuliang == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
            if(type == 'rkl') {
                t._shuliangAvailable(t.data.inputTxt_shuliang) //判断红包数量
                if(t.data.cannotsend_shuliang == 0) {
                    t.data.cansendFLAG = true  //两个输入框均符合则true
                }
                else{
                    t.data.cansendFLAG = false
                }
            }
        }
    },
    //需要微信支付
    _needWxPay: function() {
        const t = this
            wx.showModal({
                title: '提示',
                content: '余额不足，是否充值？',
                success: function(res) {
                    if (res.confirm) {
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
        // else if(jine < 1) {
        //     this.data.cannotsend_jine += 1
        //     this._showModal('红包最低金额不得少于1元')
        // }
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
    //判断手气最佳位置是否符合要求
    _shouqizjAvailable: function(shouqizj,renshu) {
        if(shouqizj > renshu) {
            this.data.cannotsend_shouqizj += 1
            this._showModal('手气最佳位置不得大于总人数')
        }
        else if(shouqizj < 1) {
            this.data.cannotsend_shouqizj += 1
            this._showModal('手气最佳位置需大于0')
        }
        else{
            this.data.cannotsend_shouqizj = 0
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
        if(t.data.all_money <= t.data.yue) {
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
        wx.request({
            url: `${app.G.REQPREFIX}/api/hongbao/fa`,
            method: 'POST',
            data: t.data.wx_request_data,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log('（内部支付）请求成功,已经拿到_redid----->',res)
                t._getYuE_request()//内部支付完成后获取余额
                let _redid = res.data
                wx.navigateTo({
                    //将_redid参数传进去
                    url: '../zhifuwancheng/zhifuwancheng?_redid='+_redid
                })
            },
            fail: function(err) {
              console.log('(内部支付)请求失败')
              wx.showToast({
                  title: '发送红包失败',
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
                    wx.showToast({
                        title: '微信支付瘫痪了，请稍后再试',
                        icon: 'loading',
                        duration: 1500
                    })
                }
                else{
                    console.log('请求成功（需要微信支付）,----->',res)
                    t._requestPayment(res)
                }
            },
            fail: function(err) {
                console.log('请求失败(需要微信支付)')
                wx.showToast({
                    title: '微信支付失败',
                    icon: 'loading',
                    duration: 1500
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
            fee:fee,
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
    //手气最佳位置监听函数
    shouqizjInput: function(e) {
        const t = this
        t.data.inputTxt_shouqizj = +e.detail.value
    },
    //口令输入监听函数
    koulingInput: function(e) {
        const t = this
        t.data.inputTxt_kouling = +e.detail.value
    },
    _requestPayment: function(res1) {
        const t = this
        console.log('调起微信支付钱获取的参数------>',res1)
        // 将时间戳从number转成string
        let timestamp = (res1.data.timeStamp).toString()
        wx.requestPayment({
           'timeStamp': timestamp,
           'nonceStr': res1.data.nonceStr,
           'package': res1.data.package,
           'signType': res1.data.signType,
           'paySign': res1.data.paySign,
           'success':function(res){
                //充值成功后发送请求返回一个_redid
                console.log('微信支付成功（充值成功）')
                console.log(res);
                // t._getYuE_request()//充值完成后获取一次余额
                //充值后，则余额够，先判断输入是否符合规则，再走内部支付
                t._judgeInputByType() //第一步，根据类型判断输入
                //第二步，综合判断符合发送规则后，进入内部支付流程
                if(t.data.cansendFLAG === true) {
                    t._noneedWxPay()
                }
                // t._getYuE_request()//红包发完后再次获取余额
                // t._return_redid(res1)--------(可能不需要)
           },
           'fail':function(res){
               wx.showToast({
                  title: '取消支付',
                  icon: 'loading',
                  duration: 1500
               })
           },
           'complete':function(res){}
         })
    },
    // //返回服务器_redid请求
    // _return_redid: function() {
    //     wx.request({
    //         // url: `${app.G.REQPREFIX}/api/wx/payment`,
    //         method: 'POST',
    //         data: res.data._redid,
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: function(res) {
    //             wx.showToast({
    //                 title: '支付成功',
    //                 icon: 'success',
    //                 duration: 2000
    //             })
    //         },
    //         fail: function(err) {
    //             wx.showToast({
    //                 title: '发送红包ID失败',
    //                 icon: 'loading',
    //                 duration: 2000
    //             })
    //             console.log(err)
    //         }
    //     })
    // },
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
                    yue:res.data.yue/100
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
        console.log(e);
        const t = this
        //发红包页显示的绕口令选项
        t.data.choose_rkl_type_text = RKL_TYPE[e.currentTarget.dataset.id].type
        t.setData({
            choose_rkl_type_text:t.data.choose_rkl_type_text
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
