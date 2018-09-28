// pages/info/productDetail/productDetail.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsItem:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.zhuyao.xin/shop/goodsItem',
      data: {
        id: 1,
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data.data);
        that.setData({
          goodsItem: res.data.data
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
  goodsShopcar:function (e) {
    console.log(e.currentTarget.dataset.goodsid);
    this.addGoodsShopcar(e);
    wx.switchTab({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/basket/basket'
    })
  },
  addGoodsShopcar: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.goodsid);
    wx.request({
      url: 'https://www.zhuyao.xin/shop/addGoodsToShopcar',
      data: {
        goodsId: e.currentTarget.dataset.goodsid,
        openid: app.globalData.openid
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data);
        
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  }
})