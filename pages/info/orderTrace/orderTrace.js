// pages/info/orderTrace/orderTrace.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    name:'',
    no:'',
    view:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.request({
      url: 'https://www.zhuyao.xin/expressinquiry',
      data: {
        openid: app.globalData.openid,
        shipNmber: options.shipNmber,
        orderNumber: options.orderNumber,
        shipName: options.shipName
      },
      success: function (res) {
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data.data);
        if(res.data.data.code == "OK"){
          that.setData({
            historyList: res.data.data.list,
            name: res.data.data.name,
            no: res.data.data.no,
            view: true
          })
        }
        console.log(that.data.historyList);
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