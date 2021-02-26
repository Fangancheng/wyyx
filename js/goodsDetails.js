function offset(dom, bool) {
    var t = 0,
        l = 1;
    var bdl = dom.clientLeft; //保存当前元素的左边框
    var bdt = dom.clientTop; //保存当前元素的上边框

    while (dom) { //dom存在就进行循环
        l += dom.offsetLeft + dom.clientLeft;
        t += dom.offsetTop + dom.clientTop;
        // 每次循环结束：获取上一个父级进入循环
        dom = dom.offsetParent;
    }
    if (bool) { //包含自身边框
        return {
            left: l,
            top: t
        }
    } else { //不包含自身边框
        return {
            left: l - bdl,
            top: t - bdt
        }
    }

}


var minBox = document.querySelector(".minBox")
var maxBox = document.querySelector(".maxBox")
var mask = document.querySelector(".mask")
var maxImg = document.querySelector(".maxBox img");


minBox.onmousemove = function(eve) { //定义形参，传递事件对象
    var e = eve || event;
    // 通过获取鼠标在遮罩层中间位置，遮罩层跟随鼠标移动：
    var maskleft = e.pageX - offset(minBox).left - mask.clientWidth / 2; //获取左边坐标
    var masktop = e.pageY - offset(minBox).top - mask.clientHeight / 2; //获取上边坐标
    // console.log(e.clientY);

    // 现在规定遮罩层出现的边界规定：

    if (maskleft < 0) {
        maskleft = 0
    }
    if (maskleft >= (minBox.clientWidth - mask.clientWidth)) {
        maskleft = minBox.clientWidth - mask.clientWidth;
    }

    if (masktop < 0) {
        masktop = 0
    }
    if (masktop >= (minBox.clientHeight - mask.clientHeight)) {
        masktop = minBox.clientHeight - mask.clientHeight;
    }
    mask.style.left = maskleft + 'px';
    mask.style.top = masktop + "px";

    // 现在在遮罩层移动，大图跟着反向移动：
    //首先计算大图移动比例：因为最大距离是盒子大小减遮罩层大小，比例就是移动的距离占最大距离多少，大图也是同样思维
    var biliX = maskleft / (minBox.clientWidth - mask.clientWidth)
    var biliY = masktop / (minBox.clientHeight - mask.clientHeight)
    var maxLeft = -biliX * (maxImg.clientWidth - maxBox.clientWidth)
    var maxTop = -biliY * (maxImg.clientHeight - maxBox.clientHeight)


    //将定位位置赋值给大图
    maxImg.style.top = maxTop + "px";
    maxImg.style.left = maxLeft + "px"

}
minBox.onmouseenter = function() { //鼠标移入，小遮罩层与放大图出现
    mask.style.display = 'block';
    maxBox.style.display = 'block';
}
minBox.onmouseleave = function() { //鼠标移入，小遮罩层与放大图隐藏
    mask.style.display = 'none';
    maxBox.style.display = 'none';
}


// li点击事件，选项卡加获取列表页数据



var minus = document.querySelector('.minus')
var add = document.querySelector('.add')
var i = document.querySelector('.count i')


add.onclick = function() { //商品添加数量
    var inTxt = Number(i.innerText); //每一次按钮都得获取一次页面显示的数目，因为页面显示的就是后台存储的
    inTxt++;
    // console.log(inTxt);
    i.innerHTML = inTxt;
    localStorage.setItem('num', i.innerText) //将数据存储到后台

}
minus.onclick = function() { //商品减少数量
    var inTxt = Number(i.innerText);
    inTxt--;
    // console.log(inTxt);
    i.innerHTML = inTxt;
    localStorage.setItem('num', i.innerText)

}
i.innerHTML = localStorage.getItem('num')
    // window.onclick=function(){
if (!localStorage.getItem('num')) { //如果本地存储没有数据就显示数量一个
    i.innerHTML = 1;
}
// }
// console.log(i.innerHTML);

//点击购物车按钮
var addCar = document.querySelector('.addCar');
addCar.onclick = function() {
    //点击这个按钮将这个商品信息存入本地存储
    if (localStorage.getItem('goods')) { //如果有数据
        var goodArr = JSON.parse(localStorage.getItem('goods')) //将本地数据转换为对象给goodArr
        goodArr.push('{ "code": "abc11", "num": 11 }') //直接存储死了数据
    } else {
        var goodArr = [{ "code": "abc11", "num": 11 }]; //没有数据给个空值不是没有
    }
    localStorage.setItem('goods', JSON.stringify(goodArr))

    open('./goodCar.html')
}