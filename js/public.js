function isPrime(num) { //判断是不是素数
    //1 不是一个素数，排除1这个值
    if (num === 1) return false;
    //判断num是否是一个素数，
    //如果是素数，函数返回 一个true
    //如果不是素数，函数返回 一个false;
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            //执行到这里，num不是一个素数
            return false; //不是素数
        }
    }
    //当程序执行到这里，说明num是一个素数
    return true;
}

function getRand(max, min) { //获取两整数之间的任意整数
    return parseInt(Math.random() * (max - min + 1) + min);
    // return Math.floor(Math.random() * (max - min + 1) + min);
    // return Math.ceil(Math.random() * (max - min + 1) + min);//可以实现，基本不使用

}

//判断一个对象是不是对象数据类型，返回的是bool值
function isObject(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true;
    } else {
        return false;
    }
}

function getYzm(num) { //随机生成num位验证码
    var str = [];
    for (var i = 0; i < num; i++) {
        str[i] = getRand(48, 122);
        // str = str.split('')
        if (str[i] >= 58 && str[i] <= 64 || str[i] <= 96 && str[i] >= 91) {
            i--;

        } else {
            str[i] = String.fromCharCode(str[i]);
        }
    }
    console.log(str.join(""));
    var Newstr = str.join("");
    return Newstr;
}


function getTimetolocal(date) { //中文方式获取本地时间
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    var str = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
    var week = date.getDay();
    return y + "年" + toAd0(m) + "月" + toAd0(d) + "日" + toAd0(h) + ":" + toAd0(min) + ":" + toAd0(s) + " " + str[week];

    function toAd0(num) {
        // 1-9前面要加0
        return num < 10 ? "0" + num : num;
    }
}
//获取六位十六进制颜色值
function getColor() {
    var str = "0123456789abcdef";
    // 随机在str中取出六个字符
    // 将这六个字符拼接在#后面返回
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += str[getRand(0, 15)];
    }
    return color;

}

//封装时间差函数获取时间差秒数
function getDifTime(startTime, endTime) {
    return (endTime.getTime() - startTime.getTime()) / 1000;
}

function $(idName) { //快速获取id
    return document.getElementById(idName);
}
//获取obj的子元素节点
function getChildren(obj) {
    //获取obj下的所有的子节点
    var childList = obj.childNodes;
    var list = []; //用于保存元素节点集合
    //循环每一个元素
    for (var i = 0; i < childList.length; i++) {
        //判断每一个元素是否是元素节点
        if (childList[i].nodeType === 1) { //是元素节点
            //将元素节点添加到一个新的数组中
            list.push(childList[i]);
        }
    }
    return list;
}

function getFirstEle(obj) { //找对象的第一个元素
    //console.log(getChildren(obj)[0]);
    //return getChildren(obj)[0] ? getChildren(obj)[0] : null;

    var ele = getChildren(obj)[0];
    //if(ele){//ele有对象隐式类型转换，更消耗性能
    if (!!ele) { //程序性能优化
        return ele;
    }
    return null;
}

function getLastEle(obj) { //找对象的最后一个元素
    var list = getChildren(obj);
    var lastEle = list[list.length - 1]
    if (!!lastEle) { //程序性能优化
        return lastEle;
    }
    return null;
}
// 清除左右空格
function myTrim(str) { //清除空格
    var start = 0; //不是空格的开始下标
    var end = 0; //不是空格的结束下标
    //从前往后遍历str,找到第一个不是空格的下标
    for (var i = 0; i < str.length; i++) {
        if (str[i] != " ") {
            start = i; //保存start下标
            break;
        }
    }
    //从后往前遍历str,找到第一个不是空格的下标
    for (var i = str.length - 1; i >= 0; i--) {
        if (str[i] != " ") {
            end = i; //保存end下标
            break;
        }
    }
    return str.substring(start, end + 1);
}

//获取鼠标按键
function getButton(eve) {
    //现代浏览器中 0 1 2
    //ie 1 4 2
    //eve接收事件对象的形参
    //通过这个形参可以判断是不是ie8浏览器
    //eve上undefined的情况下是ie8浏览器
    if (!!eve) { //eve对象存在，是现代浏览器
        return eve.button;
    }
    //这里的代码在ie8环境下执行
    var button = window.event.button;
    switch (button) {
        case 1:
            return 0;
        case 4:
            return 1;
        case 2:
            return 2;
    }
}
//判断ele元素中是否有value的类
function hasClass(ele, value) {
    var cName = myTrim(ele.className);
    if (cName === "") return false;
    var cNameList = cName.split(" ");
    for (var i = 0; i < cNameList.length; i++) {
        if (cNameList[i] === value) {
            return true;
        }
    }
    return false;
}
//删除ele中的value的class类
function removeClass(ele, value) {
    var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现
    if (cName === "") return;
    if (!hasClass(ele, value)) return;
    var cNameList = cName.split(" ");
    for (var i = 0; i < cNameList.length; i++) {
        if (cNameList[i] === value) {
            cNameList.splice(i, 1);
            i--;
        } else if (cNameList[i] === "") { //删除空格是为了，避免出现多个空格 的情况 
            cNameList.splice(i, 1);
            i--;
        }
    }
    ele.className = cNameList.join(" ");
}

//给ele添加value这个class名称
function addClass(ele, value) {
    var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现

    if (cName === "") {
        //直接将value添加到ele的class中
        ele.className = value;
        return; //不需要再往后执行
    };
    //程序执行到这里，class中是有内容的
    //判断value在ele的class中是否存在，
    //存在不需要再添加
    if (hasClass(ele, value)) return; //存在就退出，不往后执行

    //不存在累加在最后
    ele.className += " " + value;

}

function getPreviousSibling(ele) { //寻找上一个兄弟元素节点
    var pEle = ele.parentNode;
    var firstEle = getFirstChild(pEle);
    if (firstEle === ele) return null;
    var prevNode = ele.previousSibling;
    if (prevNode.nodeType != 1) {
        return getPreviousSibling(prevNode);
    }
    return prevNode;
}
//根据key获取查询串中的应对value
function getSearch(key) {
    var search = location.search.substring(1);
    //去掉问号
    //console.log(search.substring(1));
    if (search === "") return "";
    //用&转换成数组
    var searchList = search.split("&");
    //console.log(searchList)
    var list = [];
    for (var i = 0; i < searchList.length; i++) {
        list = searchList[i].split("=");

        if (list[0] === key) {
            return decodeURIComponent(list[1]);
        }

    }
    return "";
}
//获取所有cName的元素集合
function getByClassName(cName) {
    var eleList = document.getElementsByTagName("*");
    var newList = [];
    for (var i = 0; i < eleList.length; i++) {
        if (hasClass(eleList[i], cName)) {
            newList.push(eleList[i]);
        }
    }
    return newList;
}

// 阻止默认行为的方法
function prevent(e) { //形参传递的是兼容后的事件对象
    //判断是否在ie8下运行
    // e.preventDefault:高版本浏览器是一个函数，在ie8下是undefined
    // if (e.preventDefault != undefined) 
    // if (!!e.preventDefault) { //函数存在，是高版本浏览器
    //     e.preventDefault()
    // } else {
    //     e.returnValue = false;
    // }
    !!e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

// 兼容处理：事件监听：直接加入元素与元素事件，事件方法
function addEvent(ele, event, callBack, flag) {
    //是否是ie8
    if (!!ele.addEventListener) { //高版本浏览器
        ele.addEventListener(event, callBack, flag);
    } else {
        ele.attachEvent("on" + event, callBack);
    }
}
// 兼容处理:解除事件绑定
function removeEvent(ele, event, callBack) {
    if (!!ele.removeEventListener) {
        //判断高级浏览器
        ele.removeEventListener(event, callBack)
    } else {
        ele.detachEvent("on" + event, callBack)
    }
}
//获取鼠标位置到浏览器顶端距离包括滚动条的距离的
function getPage(e) {
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    return {
        x: e.clientX + sLeft,
        y: e.clientY + sTop
    }
}

// 获取元素样式
function getStyle(dom, attr) {
    if (dom.currentStyle) {
        return dom.currentStyle[attr]
    } else {
        return getComputedStyle(dom)[attr]
    }
}

// 缓冲运动动画
function animate_pub(dom, options, callback) {
    // 遍历对象属性
    for (var attr in options) {
        // 获取元素当前的attr值
        if (attr === 'opacity') {
            // 获取当前元素的透明度*100
            var current = parseInt(getComputedStyle(dom)[attr] * 100)
            var target = options[attr] * 100
        } else if (attr.indexOf('scroll') !== -1) {
            var current = dom[attr]
            var target = options[attr]
        } else {
            var current = parseInt(getComputedStyle(dom)[attr])
            var target = options[attr]
        }
        options[attr] = {
                'current': current,
                'target': target
            }
            // 目标数据结构:
            // options = {
            //   'width': {
            //     'current': 100,
            //     'target': 300
            //   },
            //   'height': {
            //     'current': 100,
            //     'target': 300
            //   },
            //   ...
            // }
    }

    clearInterval(dom.timer)
    dom.timer = setInterval(function() {
        // 遍历对象，取出数据
        for (var attr in options) {
            var current = options[attr].current
            var target = options[attr].target
                // 持续变化的速度
            var speed = (target - current) / 10
                // 浮点数计算会造成结果有偏差，可能造成数据丢失：取整
                // 判断运动方向取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

            // 临界值判断：剩余运动量<=每次的运动量
            if (Math.abs(target - current) <= Math.abs(speed)) {
                // 到达终点
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100 // 立即到达终点
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = target
                } else {
                    dom.style[attr] = target + 'px'
                }

                // 删除已运动完成的属性
                delete options[attr]

                for (var attr in options) {
                    // 还有其他属性没运动完成，提前结束当前程序，不清除计时器
                    return false;
                }
                //如果有回调函数，则执行回调函数
                typeof callback === 'function' ? callback() : ''
                clearInterval(dom.timer) // 清除计时器
            } else {
                // 未到达终点
                options[attr].current += speed
                if (attr === 'opacity') {
                    dom.style[attr] = options[attr].current / 100
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = options[attr].current
                } else {
                    dom.style[attr] = options[attr].current + 'px'
                }
            }
        }
    }, 20)
}

//获取内置的盒子左边到浏览器的距离
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

// 面向对象封装选项卡插件
(function() {

    function Tab(options) {
        // 初始化
        this.init(options)
    }
    // 初始化方法
    Tab.prototype.init = function(options) {
            this.tits = this.getElement(options.titles)
            this.cons = this.getElement(options.contents)
            this.showIndex = options.showIndex || 0
                // 设置默认显示的选项
            this.setClass(this.tits[this.showIndex], 'active')
            this.setClass(this.cons[this.showIndex], 'show')
                // 绑定事件
            this.bindEvent()
        }
        // 绑定事件方法
    Tab.prototype.bindEvent = function() {
            //  缓存this指向
            var _this = this
            for (var i = 0, len = this.tits.length; i < len; i++) {
                this.tits[i].index = i // 保存每个元素的下标
                this.tits[i].onclick = function() {
                    // 去掉上次选中的元素样式
                    _this.setClass(_this.tits[_this.showIndex], '')
                    _this.setClass(_this.cons[_this.showIndex], '')
                        // 当前选中元素添加类名
                    _this.setClass(_this.tits[this.index], 'active')
                    _this.setClass(_this.cons[this.index], 'show')
                        // 更新当前显示的下标
                    _this.showIndex = this.index
                }
            }
        }
        // 操作类名的方法
    Tab.prototype.setClass = function(ele, oClass) {
            ele.className = oClass
        }
        // 获取元素方法
    Tab.prototype.getElement = function(selector) {
            return document.querySelectorAll(selector)
        }
        // 返回当前选中的下标
    Tab.prototype.getIndex = function() {
        return this.showIndex
    }

    function factory(options) {
        return new Tab(options)
    }

    // 对外暴露接口
    window.tab = factory

})()

// 选择排序(效率比冒泡要高)
function choiceSort(brr) {
    var index;
    var temp = 0;
    for (var i = 0; i < brr.length - 1; i++) {
        index = i;
        for (var j = i + 1; j < brr.length; j++) {
            if (brr[index] > brr[j]) {
                index = j;
            }
        } // 每一轮比较完毕
        // 判断需不需要交换
        // index发生了改变，说明有一个更小的数出现，需要把小数交换上来
        if (index != i) {
            temp = brr[i];
            brr[i] = brr[index];
            brr[index] = temp;
        }

    }
}

// 冒泡排序
// n个数要比较(n-1次)
function maopao(arr) {
    var temp;
    for (var i = 0; i < arr.length - 1; i++) { //四轮
        // i是比较的轮数
        for (let j = 0; j < arr.length - i - 1; j++) { //每一轮比较
            if (arr[j] > a[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

            }
        }
    }
    return arr;
}

//判断只要有一个单选框没选，全选就不选
function notAll(selectlist, all) { //传入单选框的集合，再传入全选框
    // var selectlist = document.querySelectorAll("#one"); //获取所有单选框，包括新添加的，记住要在函数内获取才能算是包括新添加的
    // 先将全选选上但是要进行下面的循环判断：
    all.checked = true;
    for (var j = 0; j < selectlist.length; j++) {
        //判断selectlist多选框是否全选
        //只要有一个没选中则就不是全选
        if (!selectlist[j].checked) {
            //一旦进入判断，则证明不是全选状态
            //将checkedAllBox设置为没选中状态
            all.checked = false;
            //一旦进入判断，则已经得出结果，不用再继续执行循环
            break;
        }
    }
}


// 全选效果：
function allChange(all, one2) {
    // var one2 = document.querySelectorAll("#one")
    var isCheck = all.checked;
    if (isCheck) {
        for (var i = 0; i < one2.length; i++) {
            one2[i].checked = true;
        }
    }
    if (isCheck === false) {
        for (var i = 0; i < one2.length; i++) {
            one2[i].checked = false;
        }
    }
}


function ajax(options) {
    // ajax({
    //     url: './data/test4.php',
    //     type: 'get',
    //     // data: 'tt=123&abc=hehe&www=baidu',// 字符串形式的参数
    //     data: {
    //       tt: '123',
    //       abc: 'hehe',
    //       www: 'baidu'
    //     },
    //     dataType: 'json', // 返回的数据类型 text  json  xml
    //     cache: true,// 是否使用缓存，默认为false
    //     success: function (json){
    //       console.log(json.msg)
    //     },
    //     error: function (code){
    //       console.log(code)
    //     }
    //   })
    // data -> 'key=value&key=value'
    // 1.创建数据交互对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest(); //ie5,6兼容问题   
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP'); //ie5.6
    }

    //2.打开连接：(初始化请求)
    // 判断并格式化参数data：
    var data = '' //最终要以字符串形式表达
        // 要进行判断传入的数据是对象还是字符串，要是对象就要转换成字符串，并连接成key=value&key=value形式
    if (isObject(options.data)) {
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'; //最后多了一个&
        }
        // data = 'k1=v1&k2=v2&k3=v3&'
        data = data.substring(0, data.length - 1); //因为已经连成了一个字符串可以用字符串方法，截取去掉最后一个&字符
    }
    if (typeof options.data === 'string') { //当输入的本来就是字符串
        data = options.data;
    }

    // 判断type请求方式：
    if (options.type.toLowerCase() === 'get') {
        var timer = '';
        timer = options.caches ? '' : Date.now();
        xhr.open(options.type, options.url + '?' + data + '&_=' + timer, true) //默认true，是异步程序
            // 3.发送请求：
        xhr.send(data); //get请求传null
    }
    if (options.type.toLowerCase() === 'post') {
        xhr.open(options.type, options.url, true) //默认true，是异步程序
            // post 请求不会有缓存问题
            // 设置请求头， 作用 模拟表单post 请求提交数据， 在send方法之前设置
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            // 3.发送请求：
        xhr.send(data); //post请求 要传递的参数在此传
    }

    // 4.等待请求/响应状态
    // xhr.readyState.:请求状态
    // 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收
    // 3: 请求处理中 4: 请求已完成
    // 当 readyState 请求状态改变时就会触发 onreadystatechange 事件
    xhr.onreadystatechange = function() {
        // console.log(xhr.readyState);//2,3,4
        if (xhr.readyState === 4) { //请求完成
            //xhr.status：响应状态 
            if (xhr.status === 200) { //ok ：响应就绪
                // xhr.responseText:响应的数据(字符串，json，xml,php)
                // options.success(xhr.responseText)
                // 还要支持不同dataType类型的输出：
                if (options.dataType === 'json') { //当后端接口文件为json，php
                    var json = JSON.parse(xhr.responseText)
                    options.success(json)
                } else if (options.dataType === 'xml') { //当后端接口文件为xml
                    options.success(xhr.responseXML);
                } else { //当后端接口文件为文本
                    options.success(xhr.responseText);

                }
            } else {
                // console.log("请求失败，失败状态码" + xhr.status);
                options.error(xhr.status);
            }
        }
    }
}

function jsonp(options) {
    // options.success 变成全局函数
    window[options.jsonpCallback] = options.success

    // 判断 options.data的数据类型
    // 如果字符串，直接赋值data变量
    // 如果是对象，转成参数序列的字符串
    var data = ''
    if (typeof options.data === 'string') {
        data = options.data
    }
    if (isObject(options.data)) {
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'
        }
        data = data.substring(0, data.length - 1)
    }

    // 创建 script标签
    var oScript = document.createElement('script')
        // 给src属性赋值（url+接口参数）
    oScript.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data
        // 把script插入文档中
    document.body.appendChild(oScript)
        // script标签加载完成时，删除此标签
    oScript.onload = function() {
        document.body.removeChild(oScript)
    }
}


// function jsonp(options) {
//     // jsonp({
//     //     url: '....',
//     //     data: '...',
//     //     // data:{}
//     //     jsonp: 'cb',
//     //     jsonpCallback: 'mycallback',
//     //     success: function(json) {

//     //     }

//     // })
//     // options.success  变成全局变量,是调用了输入的success函数
//     // options.jsonpCallback = 'hehe'
//     window[options.jsonpCallback] = options.success

//     // 判断options.data的数据类型
//     // 如果是字符串，直接赋值data变量
//     // 如果是对象，转成参数序列的字符串
//     var data = '';
//     if (isObject(options.data)) {
//         for (var key in options.data) {
//             data += key + "=" + options.data[key] + "&"
//         }
//         data = data.substring(0, data.length - 1);
//     }
//     if (typeof options.data === 'string') {
//         data = options.data;
//     }

//     // 创建script标签：
//     var oScript = document.createElement("script");
//     // 给script属性赋值：(url+接口参数)
//     oScript.src = options.url + '?' + options.jsonp + "=" + options.jsonpCallback + '&' + data;
//     // script标签插入到文档中,加载完成时，删除此标签
//     document.body.appendChild(oScript);

//     oScript.onload = function() {
//         document.body.removeChild(oScript);

//     }

// }
// 获取元素方法

function $1(selector) {
    return document.querySelector(selector)
}
// 获取元素集合方法
function $2(selector) {
    return document.querySelectorAll(selector)
}