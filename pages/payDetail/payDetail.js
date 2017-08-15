// pages/payAfter/payAfter.js
var app = getApp()
var getOrderafterUrl = app.globalData.host + "/applet/orderafter/info/get"; //订单支付后信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payName: [],
    Zjiage: 0,
    OrderafterInfo:{}
   
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

   this.getOrderafterInfo(appletSsid, uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
         OrderafterInfo: res.data.data
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


  getOrderafterInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide
    }
    app.getRequest(getOrderafterUrl, postParam, function (res) {
      succ && succ(res)
    });
  },


  telShoper:function(){
    wx.makePhoneCall({
      phoneNumber: '110'
    })
  }
})