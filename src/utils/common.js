
// export function formatTime (datetime, split, ...params) {
//   const o = {}
//   // 获取年月日时分秒值
//   o.year = datetime.getFullYear()
//   o.month = ('0' + (datetime.getMonth() + 1)).slice(-2)
//   o.date = ('0' + datetime.getDate()).slice(-2)
//   o.hour = ('0' + datetime.getHours()).slice(-2)
//   o.minute = ('0' + datetime.getMinutes()).slice(-2)
//   o.second = ('0' + datetime.getSeconds()).slice(-2)
//   // 连接
//   let res = ''
//   for (let i; i < params.length; i++) {
//     const temp = i === params.length - 1 ? o[params[i]] : o[params[i]] + split
//     res += temp
//   }
//   // 返回
//   return res
// }

export function parseTime (time, number) {
  var date = new Date(time)
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

  var res = Y + M + D + h + m + s
  if (number) {
    return res.substring(0, number)
  }
  return res
}
