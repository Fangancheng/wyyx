// 头部提醒：
var $notice = $('.top_notice a');
setInterval(() => {
    $notice.animate({
        top: -80
    }, 500, 'swing')
    setTimeout(() => {
        $notice.animate({
            top: 0
        }, 100, 'swing')
    }, 100);
}, 10000);
//购物车点击跳转
var $goodCar = $('.goodsCar');
$goodCar.click(function() {
    open('goodCar.html')
})

//导航栏点击样式转换(运用选项卡思路)
var nav_header = document.querySelector('.nav_header');
var nav_lis = document.querySelectorAll('.nav_header li');
var nav_lisindex = 0
for (var i = 0; i < nav_lis.length; i++) {
    nav_lis[i].index = i;
    nav_lis[i].onclick = function() {
        nav_lis[nav_lisindex].className = '';
        nav_lis[nav_lisindex].children[0].className = '';
        nav_lis[this.index].className = 'nav_show'
        nav_lis[this.index].children[0].className = 'nav_a_show'
        nav_lisindex = this.index;
    }
}


//运用ajax请求获取隐藏导航的数据
$(function() { //ready方法
    $.ajax({
        url: './data/wy_header.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
            // console.log(json);
            // 获取到后台数据先将图片先展示出来
            // var goodStr = '';
            // var goodstr1 = [];
            // var goodstr2 = [];
            var goodStr3 = [];
            // console.log(json);
            // console.log(json.data);
            // console.log(json.data.cateList[0]);
            // console.log(json.data.cateList[0].subCateGroupList);
            // console.log(json.data.cateList[0].subCateGroupList.categoryList);
            // $.each(json.data.cateList, function(index3, item3) {

            //     $.each(item3.subCateGroupList, function(index, item) {
            //         // console.log(item.categoryList);
            //         $.each(item.categoryList, function(index1, item1) {
            //                 goodstr2[index] += `<dd><a href="#"><img src="${item1.bannerUrl}">${item1.name}</a></dd>`
            //                     // console.log(goodstr2);
            //             })
            //             // $.each(json.data.cateList[0].subCateGroupList.categoryList, function(index1, item1) {
            //             //     console.log(item1);
            //             // })
            //             // console.log(goodstr2[index]);
            //         goodstr1[index3] += `<dl><dt>${item.name}</dt>${goodstr2[index]}</dl>`

            //         console.log(goodstr1);

            //     })
            //     goodStr += `<li><a href="#"> ${item3.name }</a><div class="nav_xia">${goodstr1[index3]}</div></li>`;

            // })

            // // console.log(goodstr1);

            // $('.nav_header').append(goodStr)

            for (var i = 0; i < json.data.cateList.length; i++) { //循环获取到li
                // console.log(json.data.cateList)
                // console.log(999999)
                var goodstr4 = '';
                $.each(json.data.cateList[i].subCateGroupList, function(index, item) { //循环获取dl
                        // console.log(item.categoryList);
                        var goodstr5 = '';
                        $.each(item.categoryList, function(index1, item1) { //循环某一个dl里面的所有dd
                                goodstr5 += `<dd><a href="#"><img src="${item1.bannerUrl}">${item1.name}</a></dd>` //将dd叠加起来
                                    // console.log(goodstr2);
                            })
                            // $.each(json.data.cateList[0].subCateGroupList.categoryList, function(index1, item1) {
                            //     console.log(item1);
                            // })
                            // console.log(goodstr4[index]);
                        goodstr4 += `<dl><dt>${item.name}</dt>${goodstr5}</dl>` //将每一个dd插入对应dl后将这个li里面的dl叠加起来

                    })
                    // console.log(goodstr4);
                goodStr3[i] = `<li><a href="#"> ${json.data.cateList[i].name }</a><div class="nav_xia">${goodstr4}</div></li>`; //将所有对应好的叠加好的dl加入对应的div中


                $('.nav_header').append(goodStr3[i]) //对应每一个li插入.nav_header里
                    // $.each(json.data.cateList, function(index, item) {
                    //     console.log(item.subCateGroupList);
                    //     goodStr += `<li ><a href="#">${item.name}</a><div class="nav_xia"></div></li>`;
                    //     $.each(item.subCateGroupList, function(index1, item1) {
                    //         console.log(item1);
                    //     })
                    //     var nav_xia = `<div class="nav_xia"></div>`

                // })
                // // console.log(goodStr);
                //  $('.nav_header').append(goodStr)
            }
            $('.nav_header').append(`  <li style="border: none;" class="nav_remove1">|</li>
                <li class="nav_remove2">
                    <a href="#">为你严选</a>
                </li>
                <li class="nav_remove3">
                    <a href="#">众筹</a>
                </li> `)
                //     // 每一个li点击都可以跳转到商品列表页
                // for (var i = 0; i < nav_lis.length; i++) {

            //     console.log(nav_lis[i]);
            // }
        }
    })

    // // 每一个li点击都可以跳转到商品列表页
    // for (var i = 0; i < nav_lis.length; i++) {

    //     console.log(nav_lis[i]);
    // }

})



// 头部导航吸顶
var new_nav_header = nav_header.cloneNode(true);
var xiding_nav_news = document.querySelector('.xiding_nav_news')
var xiding_nav = document.querySelector('.xiding_nav')
    // new_nav_header.children[9].remove();
    // new_nav_header.children[9].remove();
    // new_nav_header.children[10].remove()
    // new_nav_header.style.position = 'none'
    // new_nav_header.style.marginTop = '0px'
    // new_nav_header.style.zIndex = '999'
    // new_nav_header.style.top = '0px'
xiding_nav_news.appendChild(new_nav_header);

//点击li跳转页面到列表页


window.onload = function() {


        var lis = document.querySelectorAll('.nav_header li')
            // for (var i = 0; i < lis.length; i++) {
            // 
            // var _this = this;




        var _this = this;
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
            $('.nav_header').on('click', 'li', function() {
                open('./goodslist.html')

                console.log(this.index - 13);
                localStorage.setItem('i', this.index - 13)

            })
        }
        // localStorage.setItem('i',)


    }
    // nav_header.onclick = function(eve) {
    //     var e = eve || event;
    //     var target = e.target || e.srcElement;
    //     if (target.nodeName.toLowerCase() === "li" || target.nodeName.toLowerCase() === "a") {
    //         console.log(target);
    //     }
    // }



//滚动事件
window.onscroll = function() {
    var stop = document.body.scrollTop || document.documentElement.scrollTop; //获取页面滚动条到顶端的距离
    if (stop >= 120) {
        animate_pub(xiding_nav, { top: 0 }, 500)
        if (stop >= 570) {
            wy_left_nav.style.position = 'fixed'
            wy_left_nav.style.top = '60px'
        } else {
            wy_left_nav.style.position = 'absolute';

        }
    } else {
        xiding_nav.style.top = '-50px'
        wy_left_nav.style.position = 'absolute';

    }

}
var you_search = document.querySelector('.you_search');
var you_search_shou = document.querySelector('.ycang_search');
var you_search_yc_btn = document.querySelector('.ycang_search .left_yc');
var wy_left_nav = document.querySelector('.wy_left_nav')
you_search.onclick = function() {
    this.parentElement.children[4].style.display = 'block'
}
you_search_yc_btn.onclick = function() {
    this.parentElement.parentElement.children[4].style.display = 'none'

}

//吸顶导航栏点击样式转换(运用选项卡思路)
var nav_header = document.querySelector('.nav_header');
var nav_lis = document.querySelectorAll('.nav_header li')
var nav_lisindex = 0
for (var i = 0; i < nav_lis.length; i++) {
    nav_lis[i].index = i;
    nav_lis[i].onclick = function() {
        nav_lis[nav_lisindex].className = '';
        nav_lis[nav_lisindex].children[0].className = '';
        nav_lis[this.index].className = 'nav_show'
        nav_lis[this.index].children[0].className = 'nav_a_show'
        nav_lisindex = this.index;
    }
}

// banner图轮播
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项

    // autoplay:true,
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})

// 左边栏吸顶效果
// var wy_goods = document.querySelector('.wy_goods')

// window.onscroll = function() {
//     var stop = document.body.scrollTop || document.documentElement.scrollTop;

// }


// 下面商品轮播
var new_prev = document.querySelector(".new .prev");
var new_next = document.querySelector(".new .next");
var goods_lunbo = document.querySelector('.goods_lunbo');
var Goods_lunbo = document.querySelector('.Goods_lunbo');
var goodsindex = 0; //当前显示块的下标
var goodslen = goods_lunbo.children.length; //保存商品块的长度
var goodswidth = goods_lunbo.children[0].clientWidth;
// 商品块播放下一张:
function moveRight() {
    goodsindex++;
    // 临界值判断：
    if (goodsindex >= goodslen) { //当下标加到最后一张图片时
        goodsindex = goodslen;
        return;
    }
    animate_pub(Goods_lunbo, {
        'scrollLeft': goodsindex * goodswidth
    })
};


//商品块播放上一张:
function moveLeft() {
    goodsindex--;
    // 临界值判断：
    if (goodsindex <= 0) { //当下标加到最后一张图片时
        goodsindex = 0;
        Goods_lunbo.scrollLeft = goodsindex * goodswidth;
    };

    animate_pub(Goods_lunbo, {
        'scrollLeft': goodsindex * goodswidth
    });
};
new_next.onclick = function() {
    moveRight();
};
new_prev.onclick = function() {
    moveLeft();
};


// 人气推荐选项卡
var tab_a_change = document.querySelectorAll('.pro_tab span');
var pro_centers = document.querySelectorAll('.pro_center');
var tab_index = 0;
for (var i = 0; i < tab_a_change.length; i++) {
    tab_a_change[i].index = i;
    tab_a_change[i].onclick = function() {
        tab_a_change[tab_index].className = ''
        pro_centers[tab_index].className = 'pro_center';
        tab_a_change[this.index].className = 'pro_tab_show';
        pro_centers[this.index].className = 'pro_center_show pro_center';
        tab_index = this.index;
    }
}


// 限时购倒计时
var Time_goods = document.querySelector('.time_place span')
var time_hours = document.querySelector('.time_remand .Time .hours')
var time_mins = document.querySelector('.time_remand .Time .mins')
var time_sers = document.querySelector('.time_remand .Time .sers')
var time_over = document.querySelector('.time_join')
    //商品活动倒计时
    // 结束时间
var endDate = new Date("2020/11/25 23:23:00");
// 当前时间\
var hour = endDate.getHours();
Time_goods.innerHTML = hour;
var nowDate = new Date();
//时间差
var s = parseInt(getDifTime(nowDate, endDate));
// console.log(s);
getDaojishi(s)

function getDaojishi(s) {
    if (s === 0) {
        time_hours.innerHTML = "00";
        time_mins.innerHTML = "00";
        time_sers.innerHTML = "00";
        return;
    }
    var hour = (s / 60 / 60); //这是将所有时间转换为多少小时
    var d = parseInt(hour / 24);
    var h = parseInt((hour / 24 - d) * 24) //这是将不满一天的达到多少小时
    var f = parseInt(((hour / 24 - d) * 24 - h) * 60);
    var m = parseInt((((hour / 24 - d) * 24 - h) * 60 - f) * 60);
    // if (h < 10) {
    //     h = '0' + h
    //     return h
    // }
    return time_hours.innerHTML = h, time_mins.innerHTML = f, time_sers.innerHTML = m;

}
var timer = setInterval(function() {
    s--;
    if (s <= 0) {
        time_over.innerHTML = "活动结束";
        time_sers.innerHTML = '00'
        clearInterval(timer);
        return;
    }
    getDaojishi(s)
}, 1000)