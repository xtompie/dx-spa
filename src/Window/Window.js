App.Window = (() => {

    const Boot = () => {
        App.Router.OnBeforeNavigate(() => Toolbar().clear());
        App.Router.OnAfterNavigate(() => Topbar().patch({ index: [App.List.Controller, null].includes(App.Router.CurrentController())}));
        App.Task.Todo.subscribe((todo) => Topbar().patch({ todo }));
    };

    const Title = (title) => document.title = title;

    const Content = () => document.one('[app-window-content]');

    const Topbar = () => document.one('[app-window-topbar]');

    const Toolbar = () => document.one('[app-window-toolbar]');

    const GoToTodo = () => App.Router.Navigate(App.List.Controller);

    return {
        Boot,
        Content,
        GoToTodo,
        Toolbar,
        Title,
    };

})();
