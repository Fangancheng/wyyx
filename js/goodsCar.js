$(function() {

    // 先判断本地存储是否有数据
    if (localStorage.getItem('goods')) {
        var goodArr = JSON.parse(localStorage.getItem('goods'));
        $.ajax({ //先获取后端所有商品信息
                url: '../data/goods.json',
                type: 'get',
                dataType: 'json',
                success: function(json) {
                    var domStr = '';
                    $.each(goodArr, function(index, item) {
                        $.each(json, function(ind, ite) {
                            if (item.code === ite.code) { //把所有商品与本地存储通过遍历比较，并存入页面
                                domStr += `<li><input type="checkbox" name="" id="" class="one">
                                <div class="img"><img src="${ite.imgurl}" alt=""></div>
                                <div class="Car_good_news">
                                    <h4>${ite.title}</h4>
                                    <p>${ite.news}</p>
                                </div>
                                <span>${ite.price}</span>
                                <div class="change_count">
                                    <div class="count" code="${ite.code}"><button class="minus">-</button><i>${item.num}</i><button class="add">+</button></div>
                                </div>
                                <i class="allprice"></i>
                                <h5 code="${item.code}">删除</h5>
                            </li>`
                            }

                        })
                    })
                    $('.Car_good').html(domStr)
                    var allprice = document.querySelectorAll('.allprice');
                    var lis = document.querySelectorAll('.Car_good li')
                    var is = document.querySelectorAll('.count i')
                    var span_price = document.querySelectorAll('.Car_good li span')
                    var span_str = '';

                    for (var i = 0; i < lis.length; i++) {
                        span_str = span_price[i].innerHTML;
                        var new_span_str = span_str.slice(1);
                        // console.log(new_span_str);
                        allprice[i].innerHTML = '￥' + Number(new_span_str) * Number(is[i].innerHTML);
                        // console.log(allprice[i].innerHTML);
                    }
                }
            })
            // 点击删除按钮
            // 因为删除按钮是动态的，所以需要事件委托
            // 移除商品
        $('.Car_good').on('click', 'li h5', function() {
            // 删除对应em的li
            $(this).parent().remove()
                // 删除对应本地数据
                // 可以根据em存过code来删
            var code = $(this).attr('code')

            $.each(goodArr, function(index, item) {
                    if (item.code === code) {
                        goodArr.splice(index, 1); //数组方法，表示从当下满足条件的下标元素往后截掉一个元素，就是删除当前元素
                        return false;
                    }
                })
                // goodArr删除好了，现在更新到本地存储
            localStorage.setItem('goods', JSON.stringify(goodArr))
                // 判断goodArr里面还有没有元素，当没有元素还是会显示[]，不为空，不符合实际
            if (goodArr.length <= 0) {
                // 清除本地数据
                localStorage.removeItem('goods')
                var domStr = ` <li style="font-size:19px;text-align:center;margin-top:20px;">购物车里没有数据！！</li>`

                $('.Car_good').html(domStr)
            }
            alert('商品移出购物车成功！')
        })

        $('.Car_good').on('click', 'li .count .minus', function() {
            // var num = $(this).parent().attr('num');
            var code = $(this).parent().attr('code');
            var _this = this
            var allprice = document.querySelectorAll('.allprice');
            var lis = document.querySelectorAll('.Car_good li')
            var is = document.querySelectorAll('.count i')
            var span_price = document.querySelectorAll('.Car_good li span')
            var span_str = '';
            // console.log($(this).nex().innerText);
            for (var i = 0; i < lis.length; i++) {
                span_str = span_price[i].innerHTML;
                var new_span_str = span_str.slice(1);
                console.log(new_span_str);
                allprice[i].innerHTML = '￥' + Number(new_span_str) * (Number(is[i].innerHTML) + 1);
                console.log(allprice[i].innerHTML);
            }
            $.each(goodArr, function(index, item) {
                    if (item.code === code) {
                        item.num--;
                        if (item.num < 1) {
                            item.num = 1;
                            alert('商品数量不能少于一个')
                        }
                        $(_this).parent().html('<button class="minus">-</button><i>' + item.num + '</i><button class="add">+</button>')
                        return false;
                    }
                })
                // console.log(goodArr);
                // localStorage.setItem()
            localStorage.setItem('goods', JSON.stringify(goodArr))
        })
        $('.Car_good').on('click', 'li .count .add', function() {
            // var num = $(this).parent().attr('num');
            var code = $(this).parent().attr('code');
            var _this = this
            var allprice = document.querySelectorAll('.allprice');
            var lis = document.querySelectorAll('.Car_good li')
            var is = document.querySelectorAll('.count i')
            var span_price = document.querySelectorAll('.Car_good li span')
            var span_str = '';
            for (var i = 0; i < lis.length; i++) {
                span_str = span_price[i].innerHTML;
                var new_span_str = span_str.slice(1);
                // console.log(new_span_str);
                allprice[i].innerHTML = '￥' + Number(new_span_str) * (Number(is[i].innerHTML) + 1);
                // console.log(allprice[i].innerHTML);
            }
            $.each(goodArr, function(index, item) {
                    if (item.code === code) {
                        item.num++;
                        $(_this).parent().html('<button class="minus">-</button><i>' + item.num + '</i><button class="add">+</button>')
                        return false;
                    }
                })
                // console.log(goodArr);
                // localStorage.setItem()
            localStorage.setItem('goods', JSON.stringify(goodArr));
        })

    } else {
        // 当购物车本来就没有商品信息
        var domStr = ` <li style="font-size:19px;text-align:center;margin-top:20px;">购物车里没有数据！！</li>`

        $('.Car_good').html(domStr);
    }





})