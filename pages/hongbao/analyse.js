/*
 @Author:lvzu
 @Update:2017/9/22
 
 *voice anylyser
 *import {voiceAnalyser} from ''
 *voiceAnalyser._initialize(ArrayBuffer)
 
 */

const loadStandard = 200,
      heightStandard = 900

var audioContext = new AudioContext(),

    voiceDataArr = new Array(),
    
    voiceAnalyser = function() {
    this.file = null; //当前音频文件
    this.audioContext = null;
    this.source = null; //audio对象source属性
    this.animationId = null;
    this.status = 0; //播放器状态
    this.forceStop = false;
    this.heightest = 0;
    this.loadest = 0;
};

voiceAnalyser.prototype = {
    _initialize: function(arrayBuffer) {
      var _this = this
      audioContext.decodeAudioData(arrayBuffer, function(buffer) {
          _this._start(audioContext, buffer);
      }, function(e) {
          //提示解码错误
          console.error(e);
      });
    },
    _start: function(audioContext, buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser(),
            that = this;
        //链接分析器，源，和播放器
        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        //将解析出的audiobuffer传给audiocontext
        audioBufferSouceNode.buffer = buffer;
  
        //如果有播放则取消之前的播放
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            this.source.stop(0);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        this.source = audioBufferSouceNode;
        //开始接收数据
        this._getData(analyser);
        //播放完毕
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };
    },
    _getData: function(analyser) {
        var that = this
        var loopData = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            
            var load = that._getLoad(array)
            var height = that._getHeight(array)
            if(load){
              (that.loadest<load) && (that.loadest=load)
            }
            if(height){
              (that.heightest<height) && (that.heightest=height)
            }
            
            voiceDataArr.push(array)
            that.animationId = requestAnimationFrame(loopData);
        }
        this.animationId = requestAnimationFrame(loopData);
    },
    _getLoad:function (u8a) {
      var load = 0
      for(let i=0;i<u8a.length;i++){
        (u8a[i]>load) && (load=u8a[i])
      }
      return load
    },
    _getHeight:function (u8a) {
      var height = 0
      for(let i=0;i<u8a.length;i++){
        u8a[i] && (height=i)
      }
      return height
    },
    _audioEnd: function(instance) {
      // console.log(voiceDataArr);
      //结束动画播放
      cancelAnimationFrame(this.animationId);
      //如果被打断
      if (this.forceStop) { 
          this.forceStop = false;
          this.status = 1;
          return;
      };
      this.status = 0;
      console.log(this.loadest-loadStandard,this.heightest-heightStandard);
    },
    
}

module.exports = {
  voiceAnalyser:voiceAnalyser
}