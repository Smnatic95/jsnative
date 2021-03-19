function init() {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 375 + 'px'
}
init()
window.addEventListener('orientationchange', init)
window.addEventListener('resize', init)