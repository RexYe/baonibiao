// myrecords.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        userInfo: {},
        shoudao_detailtitle:'查看红包详情',
        fachu_detailtitle:'查看红包详情',
        shoudao_redpaperlist:'redpaperlisthidden', //展开时class为redpaperlistshow,隐藏时为redpaperlisthidden
        fachu_redpaperlist:'redpaperlisthidden',
        shoudao_redmoney: 0, //收到的红包金额
        shoudao_rednumber: 0, //收到的红包数量
        fachu_redmoney: 0, //发出的红包金额
        fachu_rednumber: 0, //发出的红包数量
        shoudao_list: [], //收到的红包详情
        fachu_list: [], //发出的红包详情
        current: 0 //0是收到的红包页，1是发出的红包页
    },
    onLoad: function(options) {
        var that = this
        that._gethongbaoInfo()
        that._gethongbaoshoudao()
        that._gethongbaofachu()

        let shoudao_list = that.data.shoudao_list
        for(let i=0;i<20;i++)
        {
            shoudao_list.push({
                hongbaoname:'彪红包',
                imgurl:'imgs/maikefeng.png',
                time:'2017-08-08',
                money:100,
                lingqu:8
            })
        }
        that.setData({
            shoudao_list:shoudao_list,
            userInfo: app.G.userInfo
        })
    },
    //获取红包信息，发出&收到 红包数量&金额
    _gethongbaoInfo: function() {
        var that = this
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/hongbao`,
            data:app.GetReqParam(),
            method: 'GET',
            success:function(res){
                let datainfo = res.data
                let fachu_redmoney = util.formatMoney(datainfo.fachu_redmoney)
                let shoudao_redmoney = util.formatMoney(datainfo.shoudao_redmoney)
                that.setData({
                    shoudao_redmoney:shoudao_redmoney,
                    shoudao_rednumber:datainfo.shoudao_rednumber,
                    fachu_redmoney:fachu_redmoney,
                    fachu_rednumber:datainfo.fachu_rednumber
                })
            },
            fail:function(err){
                console.log(err)
            }
        })
    },

    //获取用户收到的红包列表
    _gethongbaoshoudao: function() {
        var that = this
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/receive/hongbao`,
            data:app.GetReqParam(),
            method: 'GET',
            success:function(res){
                console.log('receive res=>>>',res)
            }
        })
    },
    //获取用户发出的红包列表
    _gethongbaofachu: function() {
        var that = this
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/send/hongbao`,
            data:app.GetReqParam(),
            method: 'GET',
            success:function(res){
                console.log('send res=>>>',res)
            }
        })
    },
    //我发出的
    bindFachuTap: function() {
        var that = this
        that.setData({current: 0})
    },
    //我收到的
    bindShoudaoTap: function() {
        var that = this
        that.setData({current: 1})
    },
    //滑动事件改变current
    bindCurrentChange: function(e) {
        var that = this;
        that.setData({current: e.detail.current})
    },
    //常见问题 点击事件处理函数
    bindProblemTap: function() {
        wx.navigateTo({url: '../problems/problems'})
    },
    //查看红包详情  点击事件处理函数
    bindRedpaperlistTap:function(){
        var that = this
        let str = that.data.detailtitle
        let Redpaperlist = that.data.redpaperlist
        str === '查看红包详情' ? Redpaperlist = 'redpaperlistshow' : Redpaperlist = 'redpaperlisthidden'
        str === '查看红包详情' ? str = '隐藏红包详情' : str = '查看红包详情'
        that.setData({
            detailtitle:str,
            redpaperlist:Redpaperlist
        })
    },
})
