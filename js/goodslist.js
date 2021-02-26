"use strict";

$('.wy_goods').load('./nav_left.html', function() {
    var wy_left_nav = document.querySelector('.wy_left_nav');
    var xiding_nav = document.querySelector('.xiding_nav'); //滚动事件

    window.onscroll = function() {
        var stop = document.body.scrollTop || document.documentElement.scrollTop; //获取页面滚动条到顶端的距离

        if (stop >= 120) {
            animate_pub(xiding_nav, {
                top: 0
            }, 200);

            if (stop >= 570) {
                wy_left_nav.style.position = 'fixed';
                wy_left_nav.style.top = '60px';
            } else {
                wy_left_nav.style.position = 'absolute';
                wy_left_nav.style.top = '580px';
            }
        } else {
            xiding_nav.style.top = '-50px';
        }
    };
});

// banner图轮播
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    direction: 'horizontal',
    // 水平切换选项
    loop: true,
    // 循环模式选项
    // autoplay:true,
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    } // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },

});

// 通过Ajax获取后台商品信息
$(function() { //ready方法
    $.ajax({
        url: '../data/goods.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
            // console.log(json);
            // 获取到后台数据先将图片先展示出来
            var goodStr = '';
            $.each(json, function(index, item) {
                goodStr += `<li>
                <a href="./goodsDetails.html" target="_blank"><img src="${item.imgurl}" alt="" class="img_show"><img src="${item.imgurl1}" alt="" class="img_none">
                    <div class="bot_good">
                        <p>${item.title}</p>
                        <span>${item.price}</span>
                        <i>${item.news}</i>
                    </div>
                </a>
                <span class="GoodBtn" code="${item.code}"></span>
            </li>`
            })
            $('.goods_news ul').html(goodStr)
        }
    })

    // 通过点击li上面的购物车图标加购
    $('.goods_news ul').on('click', 'li .GoodBtn', function(index, item) {
        // open('./goodCar.html')
        // 先获取当前点击的li的code号，商品编号
        var code = $(this).attr('code');
        // var price = $(this).attr('price');
        console.log(code);
        // 先判断本地是否有存储数据
        if (localStorage.getItem('goods')) { //如果有数据
            var goodArr = JSON.parse(localStorage.getItem('goods')) //将本地数据转换为对象给goodArr
        } else {
            var goodArr = []; //没有数据给个空值不是没有
        }

        var hasGood = false; //声明事件监听器

        // 判断当goodArr不是为空的时候
        if (goodArr.length > 0) {
            $.each(goodArr, function(index, item) { //就遍历已经存入的数据，每一个iten==={"code":"abc1","num":1}
                if (item.code === code) { //就是当点击了这个加入购物车后，他已经在本地有个数据，就num+1
                    item.num++;
                    hasGood = true; //声明后，在循环后只要hasGood为false，说明莫个code真的没有出现，就可以在循环后加入购物车
                    return false; //直接退出
                } //else{不能用eles，如果用了，就表示当遍历第一个时与点击的code不一样就把这个存进来，很有可能后面已经在购物车了怎么办，所有只能事先声明个监听器
                // }
            })
        }

        //当购物车不存在的数据，点击加入后，添加一条数据
        if (!hasGood) {
            // var objStr = JSON.stringify({code:code,num:1})//为什么不行呢因为goodArr就是数组，直接将{ "code": code, "num": 1 }当作数组元素存入就行
            goodArr.push({ code: code, num: 1 });
        }

        // 将数据添加到本地存储
        localStorage.setItem('goods', JSON.stringify(goodArr))

        alert('成功加入购物车')
    })
})