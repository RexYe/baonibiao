//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},//用户信息
        redid:'',//红包id
        type:'',//红包类型
        typeList:{
            'bgy':'飙高音',
            'chb':'唱红包',
            'twhb':'提问红包',
            'xshb':'悬赏红包'
        },
    },
    onLoad: function (option) {
        this.setData({
            userInfo:app.G.userInfo,
            redid:option._redid,
            type:option._type
        })
        this.createNewImg()//绘制图片
    },
    onShareAppMessage: function (res) {
        // 来自页面内转发按钮
        if (res.from === 'button') {
            //当转发的时候将canvas画布对应的区域转换成图片分享出去
            wx.canvasToTempFilePath({
                x: 0,//画布x轴起点
                y: 0,//画布y轴起点
                destWidth: 100,//输出图片宽度
                destHeight: 100,//输出图片高度
                canvasId: 'mycanvas',//画布标识，传入 <canvas/> 的 cavas-id
            })

        }
    },
    //绘制分享图片
    createNewImg:function() {
        const ctx = wx.createCanvasContext('mycanvas')
        var path = "./resources/code.jpg";
        ctx.drawImage(path, 0, 0, 150, 100)
        ctx.draw()
    }
})
