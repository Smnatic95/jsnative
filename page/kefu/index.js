$(function () {

    var mask = mui.createMask(clsMask); //callback为用户点击蒙版时自动执行的回调；
    var mzSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        slidesPerView: 1.3,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        spaceBetween: 20
    });

    $('.operation_bottom .chooseT').on('click', function () {
        mask.show();//显示遮罩
        $('.xiaDanForm').css({
            transform: 'translate(0,0)'
        })
    })

    function clsMask() {
        $('.xiaDanForm').css({
            transform: 'translate(0,100%)'
        })
    }
})