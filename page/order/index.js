$(function(){
    $('nav.types>.type').on('click',function(){
        if(!$(this).hasClass('sel')){
            $(this).addClass('sel').siblings().removeClass('sel');
        }
    })
})