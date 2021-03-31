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
                <div class="name">软妹</div>
                <div class="info1">
                    <span>20岁 处女座 山西-太原</span>
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
    <!--服务详情-->
    <div class="servie_detail">
        <!--服务项目-->
        <div class="services">
            <div class="service">
                情感咨询
            </div>
            <div class="service">
                哄睡
            </div>
            <div class="service">
                恋爱
            </div>
        </div>
        <!--价格-->
        <div class="price">
            <span class="iconfont icon-renminbi">15起</span>
        </div>
    </div>
    <div class="signature">
        总有人会在偶然间相遇
    </div>
</div>`;
    })
    return kefuHtml;
}

function downCallback(page) {
    mescrollArr[curNavIndex].resetUpScroll();
}

function upCallBack(page) {
    console.log('上滑')
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

/*创建MeScroll对象*/
function initMescroll(mescrollId, clearEmptyId) {
    var mescroll = new MeScroll(mescrollId, {
        down: {
            callback: downCallback,
            auto: false
        },
        up: {
            callback: upCallBack,
            page: {
                num: 0, //当前页 默认0,回调之前会加1
                size: 10 //每页数据条数,默认10
            },
            htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据~~ --</p>',
            noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
            toTop: {
                //回到顶部按钮
                src: "../../static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
                offset: 800 //列表滚动1000px才显示回到顶部按钮	
            },
            clearEmptyId: clearEmptyId, //相当于同时设置了clearId和empty.warpId; 简化写法;默认null; 注意vue中不能配置此项
            lazyLoad: {
                use: true // 是否开启懒加载,默认false
            }
        }
    });
    return mescroll;
}