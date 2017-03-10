
var url = 'wss://wx.wxcms.cn';
function connect(nickName, avatarUrl) {
  wx.connectSocket({
    url: url,
    header: {
      'content-type': 'application/json'
    }, data: {
      type: 'message',
      nickName: nickName,
      avatarUrl: avatarUrl,
    },
    success: function () {
      console.log('链接成功')
    },
    fail: function () {
      console.log('链接失败')
    },
    method: "GET"
  });

}

function send (msg) {
  msg = JSON.stringify(msg);
  wx.sendSocketMessage({data:msg});
}


module.exports = {
  connect: connect,
  send: send
}