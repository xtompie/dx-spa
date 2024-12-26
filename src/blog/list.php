<script>
app.module.blog = app.module.blog || {};
app.module.blog.controller.list = (function() {
    app.window.title('Posts');
    val.render(
        app.window.content(),
        '[app-module-blog-list]',
        { posts: app.module.blog.postRepository.findAll() }
    );
})();
app.router.register('/blog', app.module.blog.controller.list);
// app.router.navigateToPath('/blog');
// app.router.navigateToControler(app.module.blog.list);
</script>

<template app-module-blog-list>
    <div val="object">
        <h1>Posts</h1>
        <div val="array" val-key="posts" val-tpl="[app-module-blog-list-item]"></div>
    </div>
</template>

<template app-module-blog-list-item>
    <div val="object">
        <h2 val="text" val-key="title"></h2>
        <p val="time" val-key="published"></p>
        <p val="text" val-key="body"></p>
    </div>
</template>