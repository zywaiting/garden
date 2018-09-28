// pages/basket/basket.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    goodsNumber:'',
    sumPrice:'',
    map:'',
    orderNumber:'',
    showView:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    wx.request({
      url: 'https://www.zhuyao.xin/shop/shopcar',
      data: {
        openid: app.globalData.openid,
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data);
        if (res.data.data.sumPrice > 0){
          that.setData({
            map: res.data.data,
            goodsList: res.data.data.goodsList,
            goodsNumber: res.data.data.goodsNumber,
            sumPrice: res.data.data.sumPrice,
            showView:true
          })
        }else {
          that.setData({
            map: res.data.data,
            goodsList: res.data.data.goodsList,
            goodsNumber: res.data.data.goodsNumber,
            sumPrice: res.data.data.sumPrice
          })
        }
        
        console.log(res.data.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
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
  /* 点击减号 */
	bindMinus: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.goodsnum > 1){
      console.log(e.currentTarget.dataset);
      wx.request({
        url: 'https://www.zhuyao.xin/shop/shopcarAddOrDel',
        data: {
          openid: app.globalData.openid,
          goodsId: e.currentTarget.dataset.goodsid,
          goodsNum: e.currentTarget.dataset.goodsnum - 1
        },
        success: function (res) {
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          console.log(res.data);
          that.setData({
            map: res.data.data,
            goodsList: res.data.data.goodsList,
            goodsNumber: res.data.data.goodsNumber,
            sumPrice: res.data.data.sumPrice
          })
          console.log(res.data.data);
        },
        fail: function (res) {
          console.log("--------fail--------");
        }
      })
    }
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset);
    wx.request({
      url: 'https://www.zhuyao.xin/shop/shopcarAddOrDel',
      data: {
        openid: app.globalData.openid,
        goodsId: e.currentTarget.dataset.goodsid,
        goodsNum: e.currentTarget.dataset.goodsnum + 1
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data);
        that.setData({
          map: res.data.data,
          goodsList: res.data.data.goodsList,
          goodsNumber: res.data.data.goodsNumber,
          sumPrice: res.data.data.sumPrice
        })
        console.log(res.data.data);
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  createOrder:function() {
    var that = this;
    console.log(that.data.map);
    wx.request({
      url: 'https://www.zhuyao.xin/shop/createOrder',
      data: {
        openid: app.globalData.openid,
        createOrderJson: that.data.map
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data.data);
        that.setData({
          orderNumber:res.data.data
        })
        that.travel();
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  travel: function () {
    var that = this;
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '../info/orderConfirm/orderConfirm?orderNumber=' + that.data.orderNumber
    })
  }
})