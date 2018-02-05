/**
 * 数据请求节流函数, 防止请求的多次派发
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */
export function throttle (fn, delay) {
  let timer = null
  return function (...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}
/**
* 判断一个元素是否含有某个class， 在自己写组件得时候特别游泳
* @param element element Object 元素得DOM
* @param className String  class名称
* */
export function addClass (el, className) {
  if (!hasClass(el, className)) {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  } else {
    return false
  }
}

/**
 * @param el element Object Dom元素
 * @param className String 要匹配得class
 * @return {boolean}
*/
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
