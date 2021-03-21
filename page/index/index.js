$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
        }
    });

    //流动公告
    let contentWidth = $('.gongGao .content p').outerWidth(),
        boxWdith = $('.gongGao .content').outerWidth(),
        chaW = contentWidth - boxWdith;
    console.log(chaW);

    function run() {
        if ($('.gongGao .content').scrollLeft() < chaW) {
            $('.gongGao .content').scrollLeft($('.gongGao .content').scrollLeft() + 1);
        } else {
            addPadding(boxWdith+10);
            $('.gongGao .content').scrollLeft(0);
        }
        requestAnimationFrame(run);
    }

    function addPadding(num){
        $('.gongGao .content p').css({
            paddingLeft:num+'px'
        })
    }

    requestAnimationFrame(run);
})