// myrecords.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        userInfo: {},
        detailtitle:'查看红包详情',
        redpaperlist:'redpaperlisthidden', //展开时class为redpaperlistshow,隐藏时为redpaperlisthidden
        shoudao_redmoney: 10099.12, //收到的红包金额
        shoudao_rednumber: 10, //收到的红包数量
        fachu_redmoney: 1111111.11, //发出的红包金额
        fachu_rednumber: 9, //发出的红包数量
        shoudao_list: [], //收到的红包详情
        fachu_list: [], //发出的红包详情
        current: 0 //0是收到的红包页，1是发出的红包页
    },
    onLoad: function(options) {
        var that = this
        that._gethongbaoInfo()
        // that._gethongbaoshoudao()
        // that._gethongbaofachu()
        let fachu_redmoney = util.formatMoney(that.data.fachu_redmoney)
        let shoudao_redmoney = util.formatMoney(that.data.shoudao_redmoney)
        //金钱格式化保留两位小数,初始化用户信息
        let shoudao_list = that.data.shoudao_list
        for(let i=0;i<20;i++)
        {
            shoudao_list.push({time:'2017-08-08',money:100})
        }
        that.setData({
            shoudao_list:shoudao_list,
            shoudao_redmoney: shoudao_redmoney,
            fachu_redmoney: fachu_redmoney,
            userInfo: app.G.userInfo
        })
    },
    //获取红包信息，发出&收到 红包数量&金额
    _gethongbaoInfo: function() {
        var that = this
        wx.request({
            url: `${app.G.REQPREFIX}/api/user/hongbao`,
            data:app.GetReqParam(),
            method: 'GET'
        })
    },

    //获取用户收到的红包列表
    _gethongbaoshoudao: function() {
        var that = this
        wx.request({url: `${app.G.REQPREFIX}/api/user/receive/hongbao`, method: 'GET'})
    },
    _gethongbaofachu: function() {
        var that = this
        wx.request({url: `${app.G.REQPREFIX}/api/user/hongbao`, method: 'GET'})
    },
    //获取用户发出的红包列表
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
    bindCurrentChange: function(e) {
        var that = this;
        that.setData({current: e.detail.current})
    },
    //常见问题 点击事件处理函数
    bindProblemTap: function() {
        wx.navigateTo({url: '../problems/problems'})
    },
    _error: function(err) {
        console.log(err)
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
