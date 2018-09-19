// pages/personal/personal.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test:'',
    nopaySize:'',
    noshipSize:'',
    shipSize:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(options.q);
      this.setData({
        test: scan_url
      })
      console.log(scan_url);
    } else {
      console.log(123);
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    var that = this;
    console.log(options);
    wx.request({
      url: 'https://www.zhuyao.xin/shop/order',
      data: {
        openid: app.globalData.openid,
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        app.globalData.nopay = res.data.data.nopay
        app.globalData.noship = res.data.data.noship
        app.globalData.ship = res.data.data.ship
        that.setData({
          nopaySize: res.data.data.nopay.length,
          noshipSize: res.data.data.noship.length,
          shipSize: res.data.data.ship.length
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  getUserInfo: function(e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo){
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      console.log(e.detail.userInfo);
      wx.login({
        success: res => {
          //发起网络请求
          wx.request({
            url: 'https://www.zhuyao.xin/onLoginAll',
            data: {
              code: res.code,
              express: 'garden',
              name: 'LoginUrl',
              userInfo: app.globalData.userInfo
            },
            success: function (res) {
              //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
              console.log(res.data);
              app.globalData.openId = res.data.data
            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
        }
      })
    }
     
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

  }
})