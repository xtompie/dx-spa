<script>
app.blog = app.blog || {};
app.blog.ui = app.blog.ui || {};
app.blog.ui.controller = app.blog.ui.controller || {};
app.blog.ui.controller.list = (function() {
    app.window.title('Posts');
    val.arr(
        app.shared.content(),
        'template[blog-list]',
        { posts: app.blog.application.repository.postRepository.findAll() },
    );
})();
app.router.register('/blog', app.blog.ui.controller.list);
// app.router.path('/blog');
// app.router.controller(app.blog.ui.controller.list);
</script>

<template blog-list>
    <div val="object">
        <h1>Posts</h1>
        <div val="array" val-key="posts" val-tpl="template[blog-list-item]"></div>
    </div>
</template>

<template blog-list-item>
    <div val="object" blog-list-item>
        <h2
            val
            val-set="(v) => { this.attr('blog-list-item-id', v.id); this.textContent = v.title; }"
            onclick="app.router.controller(app.blog.ui.controller.detail, {id: this.attr('blog-list-item-id')})"
        ></h2>
        <p val="time" val-key="published"></p>
        <p val="text" val-key="body"></p>
    </div>
</template>