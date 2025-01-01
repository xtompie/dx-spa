App.Boot = (() => {

    const Boot = () => {
        Modules();
        Router();
    }

    const Modules = () => {
        App.Add.Boot();
        App.Detail.Boot();
        App.Edit.Boot();
        App.Index.Boot();
        App.List.Boot();
        App.Keybind.Boot();
        App.Window.Boot();
    }

    const Router = () => {
        App.Router.Boot();
    }

    return Boot;

})();