$(function () {
    const form = layui.form
    const layer = layui.layer
    // 表单验证
    form.verify({
        nickname: (val) => {
            if (val.length > 10) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    })

    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg("获取用户信息失败！")
                layer.msg("获取用户信息成功！")
                form.val('initUserInfo', res.data)
            }
        })
    };
    initUserInfo()
    // 重置按钮
    $('#btnReset').click((e) => {
        // 阻止默认行为
        e.preventDefault;
        // 重新获取信息渲染
        initUserInfo()
    });


    // 更新用户数据
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起更新信息的请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('设置失败')
                layer.msg("更新用户信息成功！");
                // 调用上一级的用户头像渲染函数
                window.parent.getUserInfo()
            }
        })
    })
})