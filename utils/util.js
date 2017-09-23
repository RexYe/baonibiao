function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatMoney(money){
   money=money.toFixed(2);
   return (money || 0).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function getWindowH(){
  var windowH
  wx.getSystemInfo({
    success: function(res) {
      windowH = res.windowHeight
    }
  })
  return windowH
}

function getWindowW() {
  var windowW
  wx.getSystemInfo({
    success: function(res) {
      windowW = res.windowWidth
    }
  })
  return windowW
}


module.exports = {
  formatTime: formatTime,
  formatMoney:formatMoney,
  getWindowH:getWindowH,
  getWindowW:getWindowW,
}
