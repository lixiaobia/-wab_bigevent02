$(function () {
    // 登录和注册 按需显示和隐藏
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 获取layui的属性
    const form = layui.form
    const layer = layui.layer;
    // 表单验证
    form.verify({
        // 密码
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 确认密码
        repwd: (val) => {
            const pwd = $('.reg-box [name=password]').val();
            if (val !== pwd) return "两次密码不一致"
        }
    });
    // 根路径
    // const baseAxis = 'http://www.liulongbin.top:3007'
    // 注册表单提交事件
    $('#form_reg').on('submit', (e) => {
        //阻止默认行为
        e.preventDefault();
        // 发起注册的ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功')
                // 注册成功 手动调用 实现制动跳转到登录页面
                $('#link_login').click();
            }
        })
    })

    // 登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault();
        // 登录的ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 获取表单的所有数据
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // console.log($(this).serialize());
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })

})