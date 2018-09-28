//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    //不管授不授权我都要自动登录获取openid
    wx.login({
      success: code => {
        wx.request({
          url: 'https://www.zhuyao.xin/onLoginAll',
          data: {
            code: code.code,
            express: 'garden',
            name: 'LoginUrl'
          },
          success: function (res) {
            console.log(res.data.data);
            console.log("--------success--------");
            app.globalData.openid = res.data.data
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
  },
  movingcar: function () {
    wx.navigateTo({
      //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
      url: '/pages/info/productDetail/productDetail'
    })
  }
})
