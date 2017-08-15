// pages/greens/greens.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    jiage: "",
    dianzan: false,

    count: 0,
    // 接受添加购物车信息
    addcai: [],
    carCount: 0,
    addjiage: 0,
    // 弹出菜品详情
    isHidden: false,
    // 点击购物车弹出购物车详情
    carClick: false,
    // 购物车详情存储筛选后的数据
    carDetail: "",

    // 购物车详情的数量存储
    count: 1,
    // 购物车减少按钮为零不能再减了
    carAnniu: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      name: options.detailName,
      jiage: options.addjiage,
      id: options.id,
    })

    wx.getStorage({
      key: 'add',
      success: function (res) {
        var num = 0//数量
        var Zjiage = 0
        for (var i = 0; i < res.data.length; i++) {
          num += res.data[i].count - 0
          Zjiage += Number(res.data[i].jiage) * Number(res.data[i].count)
        }

        that.setData({
          carCount: num,
          addjiage: Zjiage,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      addcai: app.globalData.addcaiq,
      carCount: app.globalData.carCountq,
      addjiage: app.globalData.addjiageq,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  dianzan: function () {
    this.setData({
      dianzan: true
    })
  },
  // 点击添加购物车
  addCar: function (e) {
    var that = this
    var caiArr = that.data.addcai;
    //定义一个存放的对象
    var duixiang = new Object()
    duixiang.jiage = e.currentTarget.dataset.addjiage
    duixiang.name = e.currentTarget.dataset.addcai
    duixiang.id = e.target.id
    duixiang.count = 1

    for (let i = 0; i < caiArr.length; i++) {
      if (caiArr[i].id == e.target.id) {
        duixiang.count = caiArr[i].count + 1;
        caiArr.splice(i, 1);
      }
    }
    caiArr.push(duixiang);
    app.globalData.addcaiq = caiArr



    //购物车所存的数组
    wx.setStorage({
      key: "add",
      data: app.globalData.addcaiq,
    })




    wx.getStorage({
      key: 'add',
      success: function (res) {
        var num = 0//数量
        var Zjiage = 0
        for (var i = 0; i < res.data.length; i++) {
          num += res.data[i].count - 0
          Zjiage += Number(res.data[i].jiage) * Number(res.data[i].count)
        }

        that.setData({
          carCount: num,
          addjiage: Zjiage,
        })
        app.globalData.carCountq = num
        app.globalData.addjiageq = Zjiage
      }
    })
  },
  // 点击购物车弹出购物车详情
  carClick: function () {
    var that = this
    that.setData({
      carClick: true
    })

    wx.getStorage({
      key: 'add',
      success: function (res) {
        that.setData({
          carDetail: res.data
        })
      }
    })
  },
  carClick1: function () {
    this.setData({
      carClick: false
    })
  },
  // 弹出购物车详情内的增加与减少事件
  clickJian: function (e) {
    var that = this
    var developer = (wx.getStorageSync('add') || []);
    for (var i = 0; i < developer.length; i++) {
      if (developer[i].id == e.target.id) {
        developer[i].count = developer[i].count - 1
      }
      if (developer[i].count <= 0) {
        developer[i].count = 0
        developer.splice(i, 1)
      }
    }
    that.setData({
      addcai: developer
    })
    app.globalData.addcaiq = developer

    wx.setStorageSync('add', developer)
    wx.getStorage({
      key: 'add',
      success: function (res) {
        var num = 0//数量
        var Zjiage = 0
        for (var i = 0; i < res.data.length; i++) {
          num += res.data[i].count - 0
          Zjiage += Number(res.data[i].jiage) * Number(res.data[i].count)
        }
        that.setData({
          carDetail: res.data,
          carCount: num,
          addjiage: Zjiage
        })
        app.globalData.carCountq = num
        app.globalData.addjiageq = Zjiage
      }
    })
  },
  clickJia: function (e) {
    var that = this
    var developer = (wx.getStorageSync('add') || []);
    for (var i = 0; i < developer.length; i++) {
      if (developer[i].id == e.target.id) {
        developer[i].count = developer[i].count + 1
      }
    }
    that.setData({
      addcai: developer
    })
    app.globalData.addcaiq = developer

    wx.setStorageSync('add', developer);
    wx.getStorage({
      key: 'add',
      success: function (res) {
        var num = 0//数量
        var Zjiage = 0
        for (var i = 0; i < res.data.length; i++) {
          num += res.data[i].count - 0
          Zjiage += Number(res.data[i].jiage) * Number(res.data[i].count)
        }
        that.setData({
          carDetail: res.data,
          carCount: num,
          addjiage: Zjiage
        })
        app.globalData.carCountq = num
        app.globalData.addjiageq = Zjiage
      }
    })
  }
})