import {getWindowW,getWindowH} from '../../utils/util'
import {voiceAnalyser} from './analyse'

var testUserInfo = {
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  nickName:'lvzu1111111111111111111111',
}

var userList = [{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'1',
},{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'2',
},{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'1',
},{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'1',
},{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'1',
},{
  nickName:'12312312',
  voiceTime:'3',
  money:'1.00',
  date:'9月14日 16:28',
  avatarUrl:'http://lvzu-imgs.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png',
  voiceUrl:'',
  gender:'1',
}]


var app = getApp()
Page({
  data: {
    userInfo:'',//发红包人的信息 包含头像和昵称
    content:'',//红包的语音内容
    rpdetail:'',//红包领取详情
    userList:'',//红包领取用户
    voiceFlags:'',//用于设置用户列表语音播放
    tempVoicePath:'',//测试用临时语音目录
    mainH:getWindowH()*0.66+'px',//设备的高设置红包界面的大小
    buttonStr:'按住说出以上口令领取赏金',
    type:'',
    rpid:'first_test',
    audioSrc:'',
    jubao_div_if:false,
    windowH:getWindowH()+'px',
    windowW:getWindowW()+'px',
    animationData:{},
    jubaoList:['123','456','789']
  },
  test:function (e) {
    console.log(e);
  },
  //事件处理函数
  onLoad: function () {
    var _this = this
    var _data = this.data
    var rpReqData = {}
    
    this.userInfo = app.G.userInfo
    // this.userInfo = testUserInfo
    this.setData({
      userInfo:this.userInfo
    })
    
    var rpReqParam = {
      rpid : 123,
    }
    //请求列表数据
    // wx.request({
    //   url: `${app.G.REQPREFIX}/api/hongbao/one`, 
    //   data: app.GetReqParam(rpReqParam),
    //   header: {
    //       'content-type': 'application/json' // 默认值
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })

    //下载音频
    // wx.downloadFile({
    //   url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
    //   success: function(res) {
    //     userList =res
    //   }
    // })
    
    this.data.type = 2
    var buttonStr={'0':'飚出你的最高音领取红包',
                   '1':'唱出以上的歌词领取红包',
                   '2':'回答以上的问题领取红包',
                   '3':'说出以上的秘密领取红包'}[this.data.type];
    
    this.setData({
      content:'生日快乐生日快乐',
      rpdetail:{
        amountMoney:'1',
        receiveNum:'0',
        amountNum:'1',
        flag:true,
      },
      userList:userList,
      voiceFlags:new Array(userList.length).fill(false),
      type:'1',
      buttonStr:buttonStr
    })

  },

  _jubao:function () {
    this._open_animation()
    this.setData({
      jubao_div_if:true
    })
  },
  _cancelJubao: function(){
    const t = this
    t._close_animation()
    //0.3秒后隐藏选择菜单
    setTimeout(()=>{
      t.setData({
          jubao_div_if:false
      })
    },300)
  },
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
  _close_animation: function(){
      const t = this
      var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
      })
    t.animation = animation
    animation.translate(0.1,900).step()
    t.setData({
        animationData:animation.export()
    })
    setTimeout(() =>{
      animation.translate(1).step()
      t.setData({
      animationData:animation.export()
    })}, 400)
  },

  startRec:function () {
    var _this = this
    var _data = this.data
    wx.stopVoice()
    this.setData({
      voiceFlags:new Array(_this.data.userList.length).fill(false)
      },function () {
        
      wx.showLoading({
        title: '录音中',
      })
    
      wx.startRecord({
        success: function(res) {
          var tempFilePath = res.tempFilePath
          
          // var blob = new Blob(tempFilePath)
          // var fs = new FileReader()
          // fs.readAsArrayBuffer(blob)
          //  var audioCtx = new AudioContext()

          
          //  wx.playVoice({
          //     filePath: tempFilePath,
          //     complete: function(){}
          //   })

          
           wx.uploadFile({
            url: `${app.G.REQPREFIX}/api/hongbao/qiang`, //仅为示例，非真实的接口地址
            filePath: tempFilePath,
            name: 'file',//后台获取文件key
            formData:{
              'rpid': _this.data.rpid,
              '_id': app.G.userInfo._id,
            },
            success: function(res){
              // 获取arraybuffer做后续分析
              console.log(res);
              // myAnalyse(res.data)
            },

          })
          
        },
      })      
    })
  
  },
  
  myAnalyse:function (arraybuffer) {
    var audioCtx =  new AudioContext()
    var sourceNode = audioCtx.createBufferSource();
    var analyser = audioContext.createAnalyser();

    var audioBuffer
    var arrayBuffer = new ArrayBuffer(res.data)
    audioCtx.decodeAudioData(arrayBuffer).then(function(res){
      audioBuffer = res
    })
    sourceNode.buffer = audioBuffer;
    //若有声音，则表示读取成功
    souceNode.start(0);
    //为了将音频在播放前截取，所以要把analyser插在audioBufferSouceNode与audioContext.destination之间
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    var hzArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(hzArray);
    console.log(hzArray);
    return hzArray
  },
  
  
  stopRec:function () {
     wx.stopRecord()
     wx.hideLoading()
  },
  
  playMusic:function (e) {
    let [_this,_data] = [this,this.data]
    let id = e.currentTarget.dataset.id
    
    if(!_data.voiceFlags[id]){
      wx.stopVoice()
      let tempArr = new Array(_data.userList.length).fill(false)
      tempArr[id] = true
      
      this.setData({
        voiceFlags:tempArr
      },function () {
        // 调用api播放音频
        wx.playVoice({
          filePath: _data.tempVoicePath,
          complete: function(){
            _data.voiceFlags[id] = false
            _this.setData({
              voiceFlags:_data.voiceFlags
            })
          }
        })
      })
    }
    else {
      //调用api停止播放音频
      wx.stopVoice()
      _data.voiceFlags[id] = false
      this.setData({
        voiceFlags:_data.voiceFlags
      })
    }  
  },

  getMoney:function () {
    //跳转至提现页面
    wx.switchTab({
      url: '../tixian/tixian'
    })
  },

  giveRedPorcket:function (e){
    //跳转至发红包页面
    wx.switchTab({
      url: '../index/index'
    })
  },

  goTransmit:function (e) {
    //跳转至转发页面
    wx.navigateTo({
      url: `../zhifuwancheng/zhifuwancheng?flag=${this.data.rpdetail.flag}`
    })
  },

})