$('.head').load('header.html', function() { //因为jq引入样式是异步程序需要页面加载完才进行,所有,load方法可以接一个回调函数,表示在引入加载完执行回调函数
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

                for (var i = 0; i < json.data.cateList.length; i++) {
                    // console.log(json.data.cateList)
                    // console.log(999999)
                    var goodstr4 = '';
                    $.each(json.data.cateList[i].subCateGroupList, function(index, item) {
                            // console.log(item.categoryList);
                            var goodstr5 = '';
                            $.each(item.categoryList, function(index1, item1) {
                                    goodstr5 += `<dd><a href="#"><img src="${item1.bannerUrl}">${item1.name}</a></dd>`
                                        // console.log(goodstr2);
                                })
                                // $.each(json.data.cateList[0].subCateGroupList.categoryList, function(index1, item1) {
                                //     console.log(item1);
                                // })
                                // console.log(goodstr4[index]);
                            goodstr4 += `<dl><dt>${item.name}</dt>${goodstr5}</dl>`

                        })
                        // console.log(goodstr4);
                    goodStr3[i] = `<li><a href="#"> ${json.data.cateList[i].name }</a><div class="nav_xia">${goodstr4}</div></li>`;


                    $('.nav_header').append(goodStr3[i])
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
            }
        })
    })

    //导航栏点击样式转换(运用选项卡思路)
    var nav_header = document.querySelector('.wy_header .nav_header')
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




            // var _this = this;
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
        //滚动事件
    window.onscroll = function() {
        var stop = document.body.scrollTop || document.documentElement.scrollTop;
        if (stop >= 120) {
            animate_pub(xiding_nav, { top: 0 }, 500)

        } else {
            xiding_nav.style.top = '-50px'


        }

    }

    //吸顶里面搜索框
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
})

$('.foot').load('footer.html')