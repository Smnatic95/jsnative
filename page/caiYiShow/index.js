$(function () {
    $('.voiceControls').on('click', function () {
        if ($(this).siblings('audio')[0].paused) {
            $(this).siblings('audio')[0].play();
            $(this).addClass('ani')
        }else{
            $(this).siblings('audio')[0].pause();
            $(this).removeClass('ani')
        }
    })
})