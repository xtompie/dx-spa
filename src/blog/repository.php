<script>
app.module.blog = app.module.blog || {};
app.module.blog.postRepository = (function() {
    let data = [
        { id: '1', title: 'Post 1', published: '2021-01-01', body: 'This is the first post.' },
        { id: '1',  title: 'Post 2', published: '2021-01-02', body: 'This is the second post.' },
        { id: '1',  title: 'Post 3', published: '2021-01-03', body: 'This is the third post.' },
    ];
    function findById(id) {
        return data.find(p => p.id === id);
    }
    function findAll(limit = 2, offset = 0) {
        return data.slice(offset, offset + limit);
    }
    return {
        findById,
        findAll,
    };
})();
</script>