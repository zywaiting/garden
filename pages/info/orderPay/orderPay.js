// pages/info/orderPay/orderPay.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    urls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: 'https://www.zhuyao.xin/shop/orderPay',
      data: {
        orderNumber: options.orderNumber,
        payPrice: options.payPrice,
        channel:'微信'
      },
      success: function (res) {
        console.log(res.data);
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        var imgsList = [];
        imgsList.push(res.data.data.imgUrl);
        that.setData({
          result: res.data.data,
          urls: imgsList
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

  },
  previewImage: function (e) {
    console.log(e);
    var current = e.target.dataset.imgUrl;
    console.log(this.data.urls);
    wx.previewImage({
      current: current,
      urls:this.data.urls
    })  
  }
})