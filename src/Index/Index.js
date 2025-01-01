App.Index = (() => {

    const Boot = () => {
        App.Router.Register(App.Index.Controller, '/');
    };

    const Controller = () => {
        App.Router.Navigate(App.List.Controller);
    };

    return {
        Boot,
        Controller,
    };

})();
