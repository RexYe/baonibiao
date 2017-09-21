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

function _base64ToArrayBuffer(base64) {
    var binary_string =  atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

module.exports = {
  formatTime: formatTime,
  formatMoney:formatMoney,
  getWindowH:getWindowH,
  _base64ToArrayBuffer:_base64ToArrayBuffer,
}
