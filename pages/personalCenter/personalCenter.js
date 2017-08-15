// pages/personalCenter/personalCenter.js
var app = getApp();
var getOwnUrl = app.globalData.host + "/applet/own/info/get"; //个人中心

Page({
  /* 页面的初始数据*/
  data: {
    ownInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;

  // 参数唯一标识存储
    var uide = app.globalData.uide;
    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);

   this.getOwnInfo(appletSsid, uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          ownInfo: res.data.data
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
  //菜品种类 
 getOwnInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide
    }
    app.getRequest(getOwnUrl, postParam, function (res) {
      succ && succ(res)
    });
  },
})