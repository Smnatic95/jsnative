$(function () {

    let pdType = 0;

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

    //下拉刷新的回调
    function downCallback() {
        mescroll.resetUpScroll();
    }

    //上拉加载的回调
    function upCallback(page) {
        var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
        var pageSize = page.size; // 页长, 默认每页10条
        //请求
        getList(pdType, pageNum, pageSize).then((res) => {
            mescroll.endSuccess(res.list.length);
            //渲染
            if (res.pdType == 0) {
                if (pageNum == 1) {
                    $('.shows.audio').html(gAudioHtml(res.list));
                } else {
                    $('.shows.audio').append(gAudioHtml(res.list));
                }
            } else if (res.pdType == 1) {
                if (pageNum == 1) {
                    $('.shows.video').html(gvideoHtml(res.list));
                } else {
                    $('.shows.video').append(gvideoHtml(res.list));
                }
            }
        }, (err) => {
            mescroll.endErr();
        })
    }

    function getList(pdType, pageNum, pageSize) {
        console.log(pdType, pageNum, pageSize);
        return new Promise((resolve, reject) => {
            //模拟请求数据
            setTimeout(() => {
                //模拟数据
                let list = [],
                    totalPage = 3;
                //音频
                if (pdType == 0 && totalPage >= pageNum) {
                    for (let i = 0; i < 10; i++) {
                        list.push({
                            name: '助眠',
                            AudioSrc: '../../static/closer.mp3',
                            avatorSrc: '../../static/temp/avator_Nv.jpg'
                        })
                    }
                } else if (pdType == 1 && totalPage >= pageNum) {
                    for (let i = 0; i < 10; i++) {
                        list.push({
                            name: '助眠',
                            videoSrc: '../../static/temp/caiYi1.mp4',
                            avatorSrc: '../../static/temp/avator_Nv.jpg'
                        })
                    }
                }
                resolve({
                    list,
                    pdType
                });
            }, 500)
            // $.ajax({
            //     url: 'xxxxxx?num=' + pageNum + "&size=" + pageSize,
            //     success: function (data) {               
            //         resolve({
            //             list,//返回列表
            //             pdType
            //         });
            //     },
            //     error: function (e) {
            //         //联网失败的回调,隐藏下拉刷新和上拉加载的状态
            //         reject(e);
            //     }
            // });
        })
    }

    function gAudioHtml(list) {
        let showsHtml = '';
        list.forEach((item) => {
            showsHtml += `<div class="show">
                <div class="intro_p">
                    <img class="avator" src="${item.avatorSrc}" alt="">
                    <div class="type">
                        ${item.name}
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
                    <audio src="${item.AudioSrc}"></audio>
                </div>
            </div>`;
        })
        return showsHtml
    }

    function gvideoHtml(list) {
        let showsHtml = '';
        list.forEach((item) => {
            showsHtml += `<div class="show">
            <img class="avator" src="${item.avatorSrc}" alt="">
            <div class="video_box">
                <video src="${item.videoSrc}" controls></video>
            </div>
        </div>`;
        })
        return showsHtml
    }

    $('.cateMenus>div').on('click', function () {
        if (!$(this).hasClass('sel')) {
            let index = $(this).index();
            pdType = index;
            $(this).addClass('sel').siblings().removeClass('sel');
            $('.container .shows').eq(index).removeClass('hide').siblings().addClass('hide');
            //重置列表数据
            mescroll.resetUpScroll();
            $('.shows').html('');
        }
    })

    $('.shows.audio').on('click', '.voiceControls', handlevCClick)
})