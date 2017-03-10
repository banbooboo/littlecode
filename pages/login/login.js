//获取应用实例

var app = getApp()

Page({

  data: {
      user_name:'',
      user_password:''
  },
 
  // 跳转到注册页面
  toRegist: function () {
    wx.navigateTo({
      url: '../regist/regist'
    })
  },

//输入用户名
  userNameChange: function (e) {
    this.data.user_name = e.detail.value;
  },
  //输入密码
  userPasswordChange: function (e) {
    this.data.user_password = e.detail.value;
  },

  //跳转到直播
  showLive: function () {
  
    //登录验证
    // wx.request({
    //   url: 'https://sprogram.cjwme.com/login', //链接不是https
    //   data: {
    //     user_name: this.data.user_name,
    //     user_password: this.data.user_password
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })

    //挑转到直播间
    wx.navigateTo({
      url: "../live/live"
    })
  }


})