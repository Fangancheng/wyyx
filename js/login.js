// 登录注册页面，登录方式手机号与邮箱之间切换
var change = document.querySelectorAll('.dl_top .change')
var mains = document.querySelectorAll('.main')
var main_index = 0;
for (var i = 0; i < change.length; i++) {
    change[i].index = i;
    change[i].onclick = function() {
        mains[main_index].className = 'main';
        change[main_index].className = '';
        mains[this.index].className = 'main main_show';
        change[this.index].className = 'change change_show';
        main_index = this.index;
    }

}
//获取登录注册页面所有的元素
var login1 = document.getElementById("login1");
var login2 = document.getElementById("login2");
var add1 = document.getElementById("add1");
var add_yam = document.getElementById("add1_yzm");
var use1 = document.getElementById("user1")
var use2 = document.getElementById("user2")
var pas1 = document.getElementById("pass1")
var pas2 = document.getElementById("pass2")


//邮箱的登录
login1.onclick = function() {
    var useVal1 = use1.value;
    var pasVal1 = pas1.value;
    var regMail = /\w{4,24}@[a-z]{1,10}(\.[a-z]{2,3}){1,2}/; //邮箱验证
    if (!useVal1 || !pasVal1) {
        alert("账号或密码不能为空")
    } else {
        if (!regMail.test(useVal1)) {
            alert('请输入正确的邮箱格式')
        } else {
            ajax({
                url: '../data/user.php',
                type: 'post',
                // data: 'tt=123&abc=hehe&www=baidu',// 字符串形式的参数
                data: {
                    user: useVal1,
                    pass: pasVal1,
                    type: "login"
                },
                dataType: 'json', // 返回的数据类型 text  json  xml
                cache: false, // 是否使用缓存，默认为false
                success: function(json) {
                    alert(json.msg)
                    console.log(json)
                    if (json.err === 0) {
                        open('./index.html')
                    }
                },
                error: function(code) {
                    alert(code)
                }
            })
        }

    }
}

//邮箱的注册
add1.onclick = function() {

    var useVal1 = use1.value;
    var pasVal1 = pas1.value;
    var regMail = /\w{4,24}@[a-z]{1,10}(\.[a-z]{2,3}){1,2}/; //邮箱验证
    if (!useVal1 || !pasVal1) {
        alert("账号或密码不能为空")
    } else {
        if (!regMail.test(useVal1)) {
            alert('请输入正确的邮箱格式')
        } else {
            ajax({
                url: '../data/user.php',
                type: 'post',
                // data: 'tt=123&abc=hehe&www=baidu',// 字符串形式的参数
                data: {
                    user: useVal1,
                    pass: pasVal1,
                    type: "add"
                },
                dataType: 'json', // 返回的数据类型 text  json  xml
                cache: false, // 是否使用缓存，默认为false
                success: function(json) {
                    alert(json.msg + '可以进行登录了')

                },
                error: function(code) {
                    alert(code)
                }
            })
        }
    }


}

//手机号的验证码获取
add_yam.onclick = function() {
    var useVal2 = use2.value;
    var regPhone = /^(\+861|1)[3-9]\d{9}$/; //手机号码验证
    if (!useVal2) {
        alert("手机号不能为空")
    } else {
        if (!regPhone.test(useVal2)) {
            alert('请输入正确的手机号')
        } else {
            var pYzm = getYzm(6)
            alert(pYzm);
            localStorage.setItem('phone_yam', pYzm);
        }
    }
}



//手机号的登录
login2.onclick = function() {
    var useVal2 = use2.value;
    var pasVal2 = pas2.value;
    var regPhone = /^(\+861|1)[3-9]\d{9}$/; //手机号码验证
    if (!useVal2 || !pasVal2) {
        alert("账号或密码不能为空")
    } else {
        if (!regPhone.test(useVal2)) {
            alert('请输入正确的手机号')
        } else {
            var phoneYam = localStorage.getItem('phone_yam');
            if (pasVal2 !== phoneYam) {
                alert('请输入正确的验证码')
            } else {

                alert('登录成功')
                open('./index.html')
            }

        }
    }
}