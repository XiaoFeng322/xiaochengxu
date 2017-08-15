var app = getApp();
var getOrderSubmitUrl = app.globalData.host + "/applet/ordersubmit/info/get"; //订单提交
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrdersubmitInfo:{},
    isTure: true,
    isTrue2: true,
    //支付菜名
    payName: [],
    // 菜品数量
    payNum: 0,
    Zjiage: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
          payName: res.data,
          payNum: num,
          Zjiage: Zjiage
        })
      }
    })
    wx.getStorage({
      key: 'Zjiage',
      success: function (res) {
        that.setData({
          Zjiage: res.data,
        })
      }
    })

  // 参数唯一标识存储
    var uide = app.globalData.uide;
    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);

   this.getOrderSubmitInfo(appletSsid, uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
         OrdersubmitInfo: res.data.data
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
  // 点击事件
  choosed: function (e) {
    this.setData({
      isTure: !e.currentTarget.dataset.isture
    })
  },
  choosed2: function (e) {
    this.setData({
      isTrue2: !e.currentTarget.dataset.isture
    })
  },
  zhiFu: function (param) {
    console.log(param)
    wx.requestPayment({
      'timeStamp': 'param.timeStamp',
      'nonceStr': 'param.nonceStr',
      'package': 'param.package',
      'signType': 'MD5',
      'paySign': 'param.paySign',
      'success': function (res) {
        console.log("恭喜支付成功")
      },
      'fail': function (res) {
        console.log("不好意思支付失败!")
      }
    })
  },

  getOrderSubmitInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide
    }
    app.getRequest(getOrderSubmitUrl, postParam, function (res) {
      succ && succ(res)
    });
  },

})