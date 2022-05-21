$(function () {
    // 调用 getUserInfo 函数获取用户基本信息
    getUserInfo()
    // 退出登录
    $('#btnLogout').click(() => {
        layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    })



})
const layer = layui.layer
// 获取用户信息的ajax请求
// 需要写在入口函数外面 让这个函数挂载在window上面
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg("获取信息失败！")
            // layer.msg("获取信息成功！")
            // console.log(res);
            // 吧获取的用户信息传过去res.data
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: (res) => {
        //     console.log(res);
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         // location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 有昵称就用昵称 没有就用用户名
    const name = user.nickname || user.username
    // 渲染欢迎页面
    $('#welcome').html(`欢迎 ${name}`)
    // 判断是否有头像图片
    if (user.user_pic !== null) {
        // 有图片就渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 没有图片就把名字的第一个字大写显示
        $('.layui-nav-img').hide();
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName);
    }
}