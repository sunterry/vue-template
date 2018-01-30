export const dataTime = (value, timers) => {
  let oDate = new Date(value * 1000)
  let oMonth = oDate.getMonth() + 1
  function toDou (n) {
    return n < 10 ? '0' + n : '' + n
  }
  if (timers) {
    return oDate.getFullYear() + '-' + toDou(oMonth) + '-' + toDou(oDate.getDate()) + ' '
  }
  return oDate.getFullYear() + '-' + toDou(oMonth) + '-' + toDou(oDate.getDate()) + ' ' + toDou(oDate.getHours()) + ':' + toDou(oDate.getMinutes()) + ':' + toDou(oDate.getSeconds())
}
