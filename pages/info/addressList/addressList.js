// pages/info/addressList/addressList.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddressesIsDefault:[],
    userAddressesNoDefault:[],
    showView:false,
    orderNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    if (options.orderNumber != undefined){
      that.setData({
        showView: true,
        orderNumber: options.orderNumber
      })
    }
    wx.request({
      url: 'https://www.zhuyao.xin/address',
      data: {
        openid: app.globalData.openid,
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        that.setData({
          userAddressesIsDefault: res.data.data.userAddressesIsDefault,
          userAddressesNoDefault: res.data.data.userAddressesNoDefault,
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
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

  }
})