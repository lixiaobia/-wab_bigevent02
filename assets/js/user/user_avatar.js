$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 添加点击事件
    // 下面定义一个按钮，文本是 上传，一旦用户点击按钮，我们手动触发 文件选择框的点击事件
    $('#btnChooseImage').on('click', () => {
        $('#file').click();
    })
    const layer = layui.layer
    // 设置图片
    $('#file').on('change', (e) => {
        // console.log(e.target.file);
        const fileList = e.target.files.length
        if (fileList === 0) return layer.msg('请选择上传文件！')
        // 1. 拿到用户选择的文件
        let file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });

    $('#btnUpload').click(() => {
        // 1、拿到用户裁切之后的头像
        // 直接复制代码即可
        const dataURL = $image.cropper("getCroppedCanvas", {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100,
        })
            .toDataURL("image/png");
        // 2、发送 ajax 请求，发送到服务器
        $.ajax({
            type: "POST",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('更新失败！')
                window.parent.getUserInfo();
            }
        })
    })
})