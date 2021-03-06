let curNavIndex = 0,
    mescrollArr = [];

$(function () {
    initSlide();
    let mySwiper = new Swiper('.swiper-container', {
        on:{
            slideChange() {
                curNavIndex = this.activeIndex;
                handleNavChange();
            }
        }
    });
    mescrollArr[curNavIndex] = initMescroll(`mescroll${curNavIndex}`, `ce${curNavIndex}`);
    $('.categorys>div').on('click', function () {
        if (!$(this).hasClass('sel')) {
            curNavIndex = $(this).index();
            handleNavChange();
            mySwiper.slideTo(curNavIndex);
        }
    })
})


function handleNavChange() {
    let _this = $('.categorys>div').eq(curNavIndex)[0];
    let scrollLeft = _this.offsetLeft - (screen.width / 2 - $(_this).innerWidth());
    $(_this).parent().animate({
        scrollLeft
    }, 200, 'linear');
    $(_this).addClass('sel').siblings().removeClass('sel');

    if (!mescrollArr[curNavIndex]) {
        mescrollArr[curNavIndex] = initMescroll(`mescroll${curNavIndex}`, `ce${curNavIndex}`);
    }
}

function getkList(num, navIndex) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let list = [];
            for (let i = 0; i < 10; i++) {
                list.push(i)
            }
            resolve(list);
        }, 1500)
    })
}

function initSlide() {
    let shtml = '';
    $('.categorys>div').each((ind, item) => {
        shtml += `<div id="mescroll${ind}" class = "swiper-slide mescroll">
        <div>
            <div class="kefu_list kefu_list${ind}"></div>
            <div id="ce${ind}"></div>
            </div>
        </div>`
    })
    $('.swiper-wrapper').html(shtml);
}

function createKefuLHtml(navIndex, list) {
    let kefuHtml = '';
    list.forEach((item) => {
        kefuHtml += `<div class="kefu">
    <div class="top_intro">
        <div class="avator">
            <img src="../../static/temp/avator_Nv.jpg" alt="">
            <div class="iconfont sex icon-nv"></div>
        </div>
        <div class="pull_right">
            <div class="info">
                <div class="name">??????</div>
                <div class="info1">
                    <span>20??? ????????? ??????-??????</span>
                </div>
            </div>
            <div class="voiceBox">
                <div class="voiceControls">
                    <div class="l2"></div>
                    <div class="l4"></div>
                    <div class="l1"></div>
                    <div class="l1"></div>
                    <div class="l2"></div>
                    <div class="l4"></div>
                    <div class="l1"></div>
                    <div class="l2"></div>
                    <div class="l4"></div>
                    <div class="l1"></div>
                </div>
                <audio src="../../static/closer.mp3"></audio>
            </div>
        </div>
    </div>
    <!--????????????-->
    <div class="servie_detail">
        <!--????????????-->
        <div class="services">
            <div class="service">
                ????????????
            </div>
            <div class="service">
                ??????
            </div>
            <div class="service">
                ??????
            </div>
        </div>
        <!--??????-->
        <div class="price">
            <span class="iconfont icon-renminbi">15???</span>
        </div>
    </div>
    <div class="signature">
        ??????????????????????????????
    </div>
</div>`;
    })
    return kefuHtml;
}

function downCallback(page) {
    mescrollArr[curNavIndex].resetUpScroll();
}

function upCallBack(page) {
    console.log('??????')
    let num = page.num,
        navIndex = curNavIndex;
    getkList(num, navIndex).then((list) => {
        if (num == 1) {
            $(`.kefu_list${navIndex}`).html(createKefuLHtml(navIndex, list));
        } else {
            $(`.kefu_list${navIndex}`).append(createKefuLHtml(navIndex, list));
        }
        mescrollArr[navIndex].endSuccess(list.length);
    });
}

/*??????MeScroll??????*/
function initMescroll(mescrollId, clearEmptyId) {
    var mescroll = new MeScroll(mescrollId, {
        down: {
            callback: downCallback,
            auto: false
        },
        up: {
            callback: upCallBack,
            page: {
                num: 0, //????????? ??????0,??????????????????1
                size: 10 //??????????????????,??????10
            },
            htmlNodata: '<p class="upwarp-nodata">-- ??????????????????~~ --</p>',
            noMoreSize: 5, //????????????????????????,????????????????????????????????????5????????????????????????;
            toTop: {
                //??????????????????
                src: "../../static/mescroll/mescroll-totop.png", //????????????,??????null,???????????????
                offset: 800 //????????????1000px???????????????????????????	
            },
            clearEmptyId: clearEmptyId, //????????????????????????clearId???empty.warpId; ????????????;??????null; ??????vue?????????????????????
            lazyLoad: {
                use: true // ?????????????????????,??????false
            }
        }
    });
    return mescroll;
}