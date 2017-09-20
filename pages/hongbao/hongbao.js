import {getWindowH} from '../../utils/util'

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
}]


var app = getApp()
Page({
  data: {
    userInfo:'',//发红包人的信息 包含头像和昵称
    singStr:'',//红包的语音内容
    rpdetail:'',//红包领取详情
    userList:'',//红包领取用户
    voiceFlags:'',//用于设置用户列表语音播放
    tempVoicePath:'',//测试用临时语音目录
    mainH:getWindowH()*0.66+'px',//设备的高设置红包界面的大小
  },

  //事件处理函数
  onLoad: function () {
    var _this = this
    var _data = this.data
    var rpReqData = {}
    
    this.userInfo = app.G.userInfo
    this.setData({
      userInfo:this.userInfo
    })
    
    
    // rpReqData = {
    //   rpid = ;
    // }
      

    //请求列表数据
    // wx.request({
    //   url: '请求红包信息地址', 
    //   data: {},
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
    

    this.setData({
      singStr:'生日快乐',
      rpdetail:{
        amountMoney:'1',
        receiveAcount:'0',
        amountNum:'1',
        flag:true,
      },
      userList:userList,
      voiceFlags:new Array(userList.length).fill(false),
    })

  },

  startRec:function () {
    var _this = this
    wx.showLoading({
      title: '录音中',
    })
    wx.startRecord({
      success: function(res) {
        var tempFilePath = res.tempFilePath

        wx.playVoice({
          filePath: tempFilePath,
        })

        _this.setData({
            tempVoicePath:tempFilePath,
        })

        // wx.uploadFile({
        //   url:'https://',
        //   filePath:tempFilePath,
        //   nickName:'user',
        //   success:function () {
        //     //处理成功
        //   },
        //   fail:function () {
        //     //处理失败
        //   },
        // })
      },

      fail: function(res) {
         //录音失败
      }
    })
  },
  stopRec:function () {
     wx.stopRecord()
     wx.hideLoading()
  },

  playMusic:function (e) {
    var _this = this
    let id = e.currentTarget.dataset.id;
    if(!this.data.voiceFlags[id]){
      // 调用api播放音频
      wx.playVoice({
        filePath: _this.data.tempVoicePath,
        complete: function(){

          if(_this.data.voiceFlags[id]){
            _this.data.voiceFlags[id] = false
            _this.setData({
              voiceFlags:_this.data.voiceFlags
            })
          }
        }
      })
      this.data.voiceFlags[id] = true
    }
    else {
      //调用api停止播放音频
      wx.stopVoice()
      this.data.voiceFlags[id] = false
    }
    this.setData({
      voiceFlags:this.data.voiceFlags
    })
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
      url: '../zhifuwancheng/zhifuwancheng'
    })
  },

})