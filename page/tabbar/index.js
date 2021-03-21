let tabbarOption = {
        selColor: "#FF2B2B",
        list: [{
                title: '首页',
                pageTitle: '首页',
                key: 'index',
                type: 'common',
                iconPath: '../../static/tabbar/index.png',
                selIconPath: '../../static/tabbar/indexSel.png',
                pagePath: '../index/index.html'
            },
            {
                title: '才艺展示',
                pageTitle: '才艺展示',
                key: 'caiYi',
                type: 'common',
                iconPath: '../../static/tabbar/caiYi.png',
                selIconPath: '../../static/tabbar/caiYiSel.png',
                pagePath: '../caiYiShow/index.html'
            },
            {
                title: '下单',
                key: 'xiaDan',
                type: 'xiaDan',
                iconPath: '../../static/tabbar/xiaDan.png'
            },
            {
                title: '付费专区',
                pageTitle: '付费专区',
                key: 'index',
                type: 'common',
                iconPath: '../../static/tabbar/fuFei.png',
                selIconPath: '../../static/tabbar/fuFeiSel.png',
                pagePath: '../fuFeiSection/index.html'
            },
            {
                title: '我的',
                pageTitle: '我的',
                key: 'my',
                type: 'common',
                iconPath: '../../static/tabbar/my.png',
                selIconPath: '../../static/tabbar/mySel.png',
                pagePath: `../my/index.html`
            }
        ]
    },
    selIndex;

Object.defineProperty(tabbarOption, 'selIndex', {
    get: function () {
        return selIndex;
    },
    set(newValue) {
        selIndex = newValue;
        let pagePath = tabbarOption.list[newValue].pagePath,
            pageTitle = tabbarOption.list[newValue].pageTitle;
        document.title = pageTitle;
        $('#curPage').attr('src', pagePath);
        renderTabbar();
    }
})

//表单提交
function checkForm() {
    formValue.remark = $('#remark').val();
    console.log(formValue);
    if(formValue.fType=="指定"){
        document.location.href = '../kefu/list.html'
    }
    return false
}

$(function () {
    let page = getQueryVariable('page') || sessionStorage.getItem('tabbarIndex')|| 0;
    sessionStorage.setItem('tabbarIndex',page);
    tabbarOption.selIndex = page;
})

function hideMyMask() {
    $('.findKForm').addClass('hide');
    $('.myMask').animate({
        opacity: 0
    }, 400, function () {
        $('.myMask').hide();
    });
    //重置
    $('.types .type').each((index,item)=>{
            $(item).removeClass('sel');
    })
    $('.findKForm .mainCnt').css({
        maxHeight: '0'
    });
    $('#remark').val('');
}

//tabbar点击
$('.tabbar').on('click', '.item', function () {
    let index = $(this).attr('data-index'),
        type = tabbarOption.list[index].type;
    if (type == 'common') {
        sessionStorage.setItem('tabbarIndex',index);
        tabbarOption.selIndex = index;
    } else if (type == "xiaDan") {
        $('.myMask').show().animate({
            opacity: 1
        }, 150);
        $('.findKForm').removeClass('hide');
    }
})

//点击选项
$('.types>.type').on('click', function () {
    let name = $(this).parent().attr('data-name');
    let curVal;
    //多选
    if ($(this).parent().attr('data-isDuoXuan') == 1) {
        $(this).toggleClass('sel');
        curVal = [];
        $(this).parent('.types').children('.type').each((index, item) => {
            if ($(item).hasClass('sel')) {
                curVal.push($(item).text());
            }
        })
    } else {
        //单选
        curVal = $(this).text();
        $(this).addClass('sel').siblings().removeClass('sel');
    }
    formValue[name] = curVal;
})

let formValue = {};

//点击随机
$('.random').on('click', function () {
    $('.findKForm .mainCnt').css({
        maxHeight: '70vh'
    });
    formValue.fType = '随机';
    $('.toSearch').hide();
    $('.anPai').show();
})

//点击指定
$('.specify').on('click', function () {
    $('.findKForm .mainCnt').css({
        maxHeight: '70vh'
    });
    formValue.fType = '指定';
    $('.toSearch').show();
    $('.anPai').hide();
})

//渲染tabbar
function renderTabbar() {
    let tabbarHtml = '';
    tabbarOption.list.forEach((item, index) => {
        let imgSrc = tabbarOption.selIndex == index ? item.selIconPath : item.iconPath;
        tabbarHtml += `
        <div class="item ${tabbarOption.selIndex== index?'sel':''} ${item.type}" data-index="${index}">
            <img src="${imgSrc}" alt="">
            <div class="title">
            ${item.title}
            </div>
        </div>
        `
    })
    tabbarHtml += `
      <div class="bigCycle"></div>
    `;
    $('.tabbar').html(tabbarHtml);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

$('.findKForm .icon-tubiaozhizuo').on('click', function () {
    hideMyMask();
    $('.types_xiaDan').hide();
})