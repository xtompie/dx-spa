<script>
app.blog = app.blog || {};
app.blog.ui = app.blog.ui || {};
app.blog.ui.controller = app.blog.ui.controller || {};
app.blog.ui.controller.detail = (function(id) {
    let post = app.blog.application.repository.postRepository.findById(id);
    if (!post) {
        app.shared.notFound();
        return;
    }
    app.shared.title(`Post ${post.title}`);
    val.render(
        app.shared.content(),
        '[blog-detail]',
        post,
    );
})();
app.router.register('/blog/:id', app.blog.ui.controller.detail);
// app.router.path('/blog', {id: '1'});
// app.router.controller(app.blog.ui.controller.detail, {id: '1'});
</script>

<template blog-detail>
    <div val="object">
        <h2 val="text" val-key="title"></h2>
        <p val="time" val-key="published"></p>
        <p val="text" val-key="body"></p>
    </div>
</template>