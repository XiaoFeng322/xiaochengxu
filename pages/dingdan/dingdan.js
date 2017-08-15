// pages/dingdan/dingdan.js
var app = getApp();
var getmyOrderUrl = app.globalData.host + "/applet/myOrder/info/get"; //我的订单
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOrderInfo:{},
    orderList:[
     {
       time:"2017-07-26 17:34:13",
       name:"海鲜饭饭饭饭饭饭饭饭",
       price:"99"
     },
     {
        time:"2017-07-26 17:34:13",
        name:"海鲜鲜鲜鲜鲜鲜饭",
        price:"99"
     },
     {
        time:"2017-07-26 17:34:13",
        name:"海海海海海海鲜饭",
        price:"99"
     }
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  
    // 参数唯一标识存储
    var uide = app.globalData.uide;
    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);

   this.getmyOrderInfo(appletSsid, uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
         myOrderInfo: res.data.data
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
  getmyOrderInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide
    }
    app.getRequest(getmyOrderUrl, postParam, function (res) {
      succ && succ(res)
    });
  },
  toDetail:function(){
    wx.navigateTo({
      url: '../payDetail/payDetail',
    })
  }

})