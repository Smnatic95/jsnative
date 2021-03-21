$(function () {
    
    $('.kefu').on('click', function () {
        if (window.parent != window) { // 如果是在框架中
            //就让框架页面跳转到登陆页面
            window.parent.location.href = "../kefu/index.html";
        } else {
            window.location.href = "../kefu/index.html";
        }
    })

    $('.voiceControls').click(function (e) {
        e.stopPropagation();
        if ($(this).siblings('audio')[0].paused) {
            $(this).siblings('audio')[0].play();
            $(this).addClass('ani')
        } else {
            $(this).siblings('audio')[0].pause();
            $(this).removeClass('ani')
        }

        return false;
    })
})