// pages/info/orderConfirm/orderConfirm.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderGoodsList: [],
    payPrice: '',
    orderNumber:'',
    address:'',
    showView: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      orderNumber: options.orderNumber
    })
    wx.request({
      url: 'https://www.zhuyao.xin/shop/orderItem',
      data: {
        orderNumber: options.orderNumber
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data.data);
        that.setData({
          orderGoodsList: res.data.data.orderGoodsList,
          payPrice: res.data.data.payPrice,
          showView: false
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })

    if (options.addressId!=undefined){
      wx.request({
        url: 'https://www.zhuyao.xin/orderAddAddress',
        data: {
          orderNumber: options.orderNumber,
          id: options.addressId
        },
        success: function (res) {
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          console.log(res.data);
          that.setData({
            address:res.data.data,
            showView:true
          })
        },
        fail: function (res) {
          console.log("--------fail--------");
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

  },
  addressList: function (e) {
    console.log(e.currentTarget.dataset);
    wx.redirectTo({
      url: '../addressList/addressList?orderNumber=' + e.currentTarget.dataset.ordernumber
    })
  }
})