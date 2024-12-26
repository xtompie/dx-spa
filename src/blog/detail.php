<script>
app.module.blog = app.module.blog || {};
app.module.blog.controller.detail = (function(id) {
    let post = app.module.blog.postRepository.findById(id);
    if (!post) {
        app.error.notFound();
        return;
    }
    app.window.title(`Post ${post.title}`);
    val.render(
        app.window.content(),
        '[app-module-blog-detail]',
        post,
    );
})();
app.router.register('/blog/:id', app.module.blog.controller.detail);
// app.router.navigateToPath('/blog', {id: '1'});
// app.router.navigateToControler(app.module.blog.list, {id: '1'});
</script>


<template app-module-blog-detail>
    <div val="object">
        <h2 val="text" val-key="title"></h2>
        <p val="time" val-key="published"></p>
        <p val="text" val-key="body"></p>
    </div>
</template>