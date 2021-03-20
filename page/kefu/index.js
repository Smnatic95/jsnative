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
    let serviceType,
        timeType;

    $('.operation_bottom .chooseT').on('click', function () {
        mask.show();//显示遮罩
        $('.xiaDanForm').addClass('out');
    })

    $('section.gg .types>.type').on('click', function () {
        $(this).toggleClass('sel').siblings().removeClass('sel');
        checkStatus();
    })

    $('.xiaDanForm .xiadanRightNow').on('click', function () {
        let wechatNumber = $('.xiaDanForm section.wechat input').val();
        if (!serviceType) {
            mui.alert('请选择服务类型', '提示');
        } else if (!timeType) {
            mui.alert('请选择时长', '提示');
        } else if (!wechatNumber){
            mui.alert('请输入微信号', '提示');
        }

    })

    function checkStatus() {
        $('section.gg.service .types>.type').each((ind, item) => {
            if ($(item).hasClass('sel')) {
                serviceType = $(item).text();
            }
        })
        $('section.gg.time .types>.type').each((ind, item) => {
            if ($(item).hasClass('sel')) {
                timeType = $(item).text();
            }
        })
        let xzStatusToa = '';
        if (!serviceType && !timeType) {
            xzStatusToa = '请选择服务类型,时长';
        } else if (!serviceType) {
            xzStatusToa = '请选择服务类型';
        } else if (!timeType) {
            xzStatusToa = '请选择时长';
        } else {
            xzStatusToa = `已选 ${serviceType},${timeType};`;
        }

        $('.xzStatusToa').text(xzStatusToa);
    }

    $('.operation .jian').on('click', function () {
        let curNum = Number($(this).siblings('.curCount').text());
        if (curNum <= 1) {
            mui.toast('最少数量为1');
        } else {
            $(this).siblings('.curCount').text(curNum - 1);
        }
    })

    $('.operation .add').on('click', function () {
        let curNum = Number($(this).siblings('.curCount').text());
        $(this).siblings('.curCount').text(curNum + 1);
    })

    $('.xiaDanForm>.close').on('click', function () {
        mask.close();
        $('.xiaDanForm').removeClass('out');
    })

    function clsMask() {
        $('.xiaDanForm').removeClass('out');
    }

})