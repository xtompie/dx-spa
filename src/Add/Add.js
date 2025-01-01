App.Add = (() => {

    const Boot = () => {
        App.Router.Register(App.Add.Controller, '/add');
        App.Keybind.Register(App.Add.Controller).Combo('Escape', Exit);
    };

    const Controller = () => {
        App.Window.Title('Add');
        App.Window.Toolbar().render('[app-add-tpl-toolbar]', {});
        App.Window.Content().render('[app-add-tpl]', {});
        FocusInput();
    };

    const Submit = () => {
        let task = App.Window.Content().val();
        let errors = App.Task.Validate(task);
        if (errors !== null) {
            App.Error.Content(errors);
            FocusInput();
            return;
        }
        App.Task.Add({
            ...task,
            id: App.Gen.Id(),
            status: App.Task.Status.TODO
        });
        Exit();
    }

    const InputKeyDown = (e) => {
        if (e.combo('Enter')) {
            e.stopPropagation();
            e.preventDefault();
            Submit();
        }
        if (e.key === 'Escape') {
            Exit();
        }
    }

    const Exit = () => {
        App.Router.Navigate(App.Index.Controller);
    }

    const FocusInput = () => {
        App.Window.Content().one('[app-add-focus]').focus();
    }

    return {
        Boot,
        Controller,
        Submit,
        InputKeyDown,
    };

})();
