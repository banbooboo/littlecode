//index.js
//获取应用实例
var app = getApp()
var websocket = require('../../socket/websocket.js');
var currentnumber = '';//当前在线人数

var text = '';//聊天室内容
var user = {};

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var page2;
Page({
  data: {
    src: '',
    tabs: ["学生交流区", "提问区", "老师简介"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    headerimg: 'http://www.itxdh.com/statics/images/img/the1.jpg',
    headermodel: 'center',
    text: '',
    content: ''
  },
  // onReady 方法
  onReady: function (res) {
    page2 = this;
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // onLoad 方法
  onLoad: function () {
    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      user = userInfo;
      websocket.connect(user.nickName, user.avatarUrl);
      //监听WebSocket连接打开事件。
      wx.onSocketOpen(function (res) {
        var msg = {
          type: 'login',
          nickName: user.nickName,
          avatarUrl: user.avatarUrl,
          pattern: 'login',
        }
        websocket.send(msg);
      })

      //监听服务返回
      wx.onSocketMessage(function (res) {
        var result = JSON.parse(res.data);
        //登录
        if (result.type == "login") {
          currentnumber = "欢迎" + result.data.nickName + "加入，当前人数有" + result.data.number;
          that.setData({
            currentnumber: currentnumber
          });
        }
        //发送消息
        if (result.type == "massage") {
          //老师或者学员
            text = result.data.nickName + ":" + result.data.data + "\n" + text;
            that.setData({
              text: text
            });
        }
      })

      //监听socket关闭
      wx.onSocketClose(function () {
        websocket.connect(user.nickName, user.avatarUrl);
      })
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 1) {
      wx.showModal({
        content: '   您好 该功能待开通，敬请期待',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定')
          }
        }
      });
    }
  },
  inputValue: '',
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  //   聊天文本框
  bindChange: function (e) {
    this.inputValue = e.detail.value;
  },
  //事件处理函数
  add: function (e) {
    //发送数据
    if (this.inputValue != '') {
      websocket.send({
        type: 'massage',
        data: this.inputValue,
        pattern: 'common',
      });
      this.inputValue='';
    }
    this.setData({
      content: ''
    })
  }

})



