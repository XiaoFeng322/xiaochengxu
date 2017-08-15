// pages/home/home.js
var app = getApp()
var getSortUrl = app.globalData.host + "/applet/sort/info/get"; //首页菜品种类
var getShopUrl = app.globalData.host + "/applet/shop/info/get"; //首页店铺信息
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sortInfo: {},
    shopInfo: {},
    tabList: [{
      name: '菜品排行榜',
      id: 0,
    }, {
      name: '今日推荐',
      id: 1
    }, {
      name: '优惠券',
      id: 2
    }, {
      name: '折扣菜',
      id: 3
    }, {
      name: '热菜',
      id: 4
    },
    {
      name: '凉菜',
      id: 5
    },
    {
      name: '主食',
      id: 6
    }
    ],
    count: 0,
    //  显示该页面时先进行判断addcai中是否在详情页已添加数据
    detailData: false,

    // 设置点击事件的逻辑
    clickName: 0,
    listName: "经典",


    // 接受添加购物车信息
    addcai: [],
    carCount: 0,
    addjiage: 0,


    // 弹出菜品详情
    // 重新定义接收到的信息
    hiddenCaiName: "",
    hiddenCaiSell: "",
    hiddenCaiJiage: "",
    // 点击添加到购物车小球动画
    fixedLeft: "",
    fixedTop: "",
    xiaoqiuYD: false,
    // 点击购物车弹出购物车详情
    carClick: false,
    // 购物车详情存储筛选后的数据
    carDetail: "",

    // 购物车详情的数量存储
    count: 1,
    // 购物车减少按钮为零不能再减了
    carAnniu: true,

    // 假数据菜品经典列表
    contentList: [
      {
        imgSrc: '../../images/caipin.png',
        name: '至尊海鲜饭',
        month: '333',
        price: '55',
        id: 0
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '至尊土豆丝',
        month: '333',
        price: '23',
        id: 1
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '至尊大白饭',
        month: '333',
        price: '32',
        id: 2
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '至尊小海鲜',
        month: '333',
        price: '56',
        id: 3
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '大土豆',
        month: '333',
        price: '77',
        id: 4
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '小地雷',
        month: '333',
        price: '67',
        id: 5
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '麻将大拌面',
        month: '333',
        price: '47',
        id: 6
      }
    ],
    // 假数据家常菜
    jiachangcai: [
      {
        imgSrc: '../../images/caipin.png',
        name: '宫保鸡丁',
        month: '333',
        price: '35',
        id: 7
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '鱼香肉丝',
        month: '333',
        price: '64',
        id: 8
      }
    ],
    xiaochao: [
      {
        imgSrc: '../../images/caipin.png',
        name: '麻婆豆腐',
        month: '333',
        price: '22',
        id: 9
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '牛肉拉面',
        month: '333',
        price: '69',
        id: 10
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '扬州炒饭',
        month: '333',
        price: '59',
        id: 11
      },
    ],
    xiaocai: [
      {
        imgSrc: '../../images/caipin.png',
        name: '鸡蛋拌面',
        month: '333',
        price: '24',
        id: 12
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '麻辣小龙虾',
        month: '333',
        price: '43',
        id: 13
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '鸡丁盖饭',
        month: '333',
        price: '65',
        id: 14
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '黄焖鸡米饭',
        month: '333',
        price: '77',
        id: 15
      }
    ],
    jingping: [
      {
        imgSrc: '../../images/caipin.png',
        name: '小炒肉',
        month: '333',
        price: '54',
        id: 16
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '烤鸭全家桶',
        month: '333',
        price: '18',
        id: 17
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '花甲炒饭',
        month: '333',
        price: '77',
        id: 18
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '麻辣鸡丝',
        month: '333',
        price: '22',
        id: 19
      },
      {
        imgSrc: '../../images/caipin.png',
        name: '大鸡排',
        month: '333',
        price: '90',
        id: 20
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    app.getUserInfo(function (userInfo) {// 获取用户基础信息
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })

    // 参数唯一标识存储
    var uide = 0
    if (option.uide) {
      uide = option.uide;
    }
    app.globalData.uide = uide

    // 获取扩展数据
    var encryptAppid = null;
    app.getExtEncrptyAppid(function (res) {
      encryptAppid = res;
    })
    console.log("extApp:" + encryptAppid)

    // 第三方登录
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);
    if (appletSsid && appletSsid != "undefined") {// 第三方登陆过
      wx.checkSession({
        success: function (res) {
          console.log("check session success...")
          app.ssidCheck(appletSsid, encryptAppid, uide, function (res) {
            console.log(res)
            if (res.data.statusCode != 200) {
              app.tLogin(encryptAppid, uide)
            }
          });
        },
        fail: function (res) {
          console.log("check session fail...")
          app.tLogin(encryptAppid, uide);
        }
      })
    } else {
      console.log('applet ssid is no-exist');
      app.tLogin(encryptAppid, uide);
    }
    //菜品种类
    // 获取扩展数据
    var appid = null;
    app.getExtEncrptyAppid(function (res) {
      appid = res;
    })
    that.getSortInfo(appid, app.globalData.uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          sortInfo: res.data.data
        })
      }
    }),

      that.getShopInfo(appid, uide, function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.statusCode == 200) {
          that.setData({
            shopInfo: res.data.data
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
    wx.removeStorage({
      key: 'add',
      success: function (res) {
      }
    })
    app.globalData.addcaiq = []
    app.globalData.carCountq = 0
    app.globalData.addjiage = 0
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
  getSortInfo: function (appid, uide, succ) {
    var postParam = {
      appid: appid,
      uide: uide
    }
    app.getRequest(getSortUrl, postParam, function (res) {
      succ && succ(res)
    });
  },
  //店铺信息
  getShopInfo: function (appid, uide, succ) {
    var postParam = {
      appid: appid,
      uide: uide
    }
    app.getRequest(getShopUrl, postParam, function (res) {
      succ && succ(res)
    });
  },
  // 菜品列表显示
  temp: function (e) {
    var that = this;
    that.setData({
      clickName: e.currentTarget.dataset.id,
      listName: e.currentTarget.dataset.name
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

    for (var i = 0; i < caiArr.length; i++) {
      if (caiArr[i].id == e.target.id) {
        duixiang.count = caiArr[i].count + 1;
        caiArr.splice(i, 1);
      }
    }
    caiArr.push(duixiang);

    // 将数据存到全局变量中
    app.globalData.addcaiq = caiArr


    //购物车所存的数组
    wx.setStorage({
      key: "add",
      // data: this.data.addcai,
      data: app.globalData.addcaiq
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
    that.setData({
      fixedLeft: e.changedTouches[0].clientX * 2,
      fixedTop: e.changedTouches[0].clientY * 2,
      xiaoqiuYD: true
    })
    // // 让小球归零隐藏
    setTimeout(function () {
      that.setData({
        xiaoqiuYD: false
      })
    }, 700)
  },
  // 点击跳转到菜品详情页
  isHiddendetail: function (e) {
    var detailName = e.currentTarget.dataset.addcai
    var addjiage = e.currentTarget.dataset.addjiage
    var id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: '../greens/greens' + '?' + 'detailName=' + detailName + '&&' + 'addjiage=' + addjiage + '&&' + 'id=' + id,
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