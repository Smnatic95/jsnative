let chargeMoney;
$(function () {
    $('#moneyNum').on('input', function () {
        chargeMoney = $(this).val();
        chMChange();
    })

    $('.SetMeals .setMeal').on('click', function () {
        $('#moneyNum').val('');
        $(this).toggleClass('sel').siblings().removeClass('sel');
        chargeMoney = Number( $(this).children('.costs').children('.num').text() );
        chMChange();
    })
})


function chMChange() {
    if (chargeMoney) {
        $('.toPay').html('支付' + chargeMoney + '元');
        if (!$('.toPay').hasClass('can')) {
            $('.toPay').addClass('can');
        }
    } else {
        if ($('.toPay').hasClass('can')) {
            $('.toPay').html('立即充值');
            $('.toPay').removeClass('can');
        }
    }
}