App.Error = (() => {

    const NotFound = () => {
        App.Window.Title('Not Found');
        App.Window.Content().render('[app-error-tpl-notfound]', {
            url: window.location.pathname
        });
    };

    const Content = (errors) => {
        App.Window.Content().all('[app-error-content]').each(el => {
            const key = el.attr('app-error-content');
            const tpl = el.attr('app-error-content-tpl');
            el.render(tpl, errors[key] ? { error: errors[key] } : {});
        });
    }

    return {
        NotFound,
        Content,
    };

})();
