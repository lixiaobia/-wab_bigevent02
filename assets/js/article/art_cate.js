$(function () {
    const layer = layui.layer
    const form = layui.form
    // 获取 表格数据
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取数据失败！")
                // layer.msg("获取数据成功！")
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    };
    initArtCateList();
    // 添加点击事件
    let indexAdd = null;
    $('#btnAddCate').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        })
    });

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加失败！')
                initArtCateList();
                // layer.msg("新增分类成功！");
                layer.close(indexAdd);
            }
        })
    })

    // 修改数据
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function (e) {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        //  发起 修改数据请求
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + $(this).attr('date-id'),
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取失败！')
                form.val('form-edit', res.data)
            }
        })
    });

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改失败！')
                //  关闭当前打开弹窗
                layer.close(indexEdit);
                // 刷新数据
                initArtCateList();
            }
        })
    })


    // 删除功能
    $('tbody').on('click', '#delete', function (e) {
        // e.preventDefault();
        let indexId = $(this).siblings().attr('date-id')

        // 提示用户是否删除
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + indexId,
                success: (res) => {
                    if (res.status !== 0) return layer.msg('删除失败！')
                    layer.msg("删除分类成功！");
                    initArtCateList();
                }
            })
        });

    })

})