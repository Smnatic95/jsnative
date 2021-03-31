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

    function run() {
        if ($('.gongGao .content').scrollLeft() < chaW) {
            $('.gongGao .content').scrollLeft($('.gongGao .content').scrollLeft() + 1);
        } else {
            addPadding(boxWdith + 10);
            $('.gongGao .content').scrollLeft(0);
        }
        requestAnimationFrame(run);
    }

    function addPadding(num) {
        $('.gongGao .content p').css({
            paddingLeft: num + 'px'
        })
    }

    requestAnimationFrame(run);

    function getKList(pageNum) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let list = [];
                for (var i = 0; i < 10; i++) {
                    list.push(i);
                }
                resolve(list);
            }, 500)
        })
    }

    function gKHtml(list) {
        let html = '';
        list.forEach((item) => {
            html += `<div class="kefu">
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

        return html;
    }

    function downCallback(page) {
        mescroll.resetUpScroll();
    }

    function upCallback(page) {
        getKList(page.num).then((list) => {
            console.log(list);
            if (page.num == 1) {
                $('.kefu_list').html(gKHtml(list));
            } else {
                $('.kefu_list').append(gKHtml(list));
            }
            mescroll.endSuccess(list.length);
        });
    }

    var mescroll = new MeScroll("mescroll", {
        down: {
            callback: downCallback,
            auto: false
        },
        up: {
            callback: upCallback,
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
            empty: {
                warpId: "emptyToa", //父布局的id (1.3.5版本支持传入dom元素)
                icon: "../../static/mescroll/mescroll-totop.png", //图标,默认null,支持网络图
                tip: "暂无相关数据~" //提示
            }
        }
    });

})