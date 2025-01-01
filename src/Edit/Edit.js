App.Edit = (() => {

    let task = null;

    const Boot = () => {
        App.Router.Register(App.Edit.Controller, '/edit/{id}');
        App.Keybind.Register(App.Edit.Controller).Combo('Escape', Exit);
    };

    const Controller = (args) => {
        task = App.Task.FindById(args.id);
        if (!task) {
            return App.Error.NotFound();
        }
        App.Window.Title(task.content.cut(40));
        App.Window.Toolbar().render('[app-edit-tpl-toolbar]', task);
        App.Window.Content().render('[app-edit-tpl]', task);
        FocusInput();
    };

    const Exit = () => {
        App.Router.Navigate(App.Detail.Controller, { id: task.id });
    }

    const InputKeyDown = (e) => {
        if (e.combo('Enter')) {
            e.stopPropagation();
            e.preventDefault();
            Submit();
        }
        if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            Exit();
        }
    }

    const Submit = () => {
        let val = App.Window.Content().val();
        let errors = App.Task.Validate(val);
        if (errors !== null) {
            App.Error.Content(errors);
            FocusInput();
            return;
        }
        task.content = val.content.trim();
        App.Task.Update(task);
        Exit();
    }

    const FocusInput = () => {
        App.Window.Content().one('[app-edit-focus]').focus();
    }

    return {
        Boot,
        Controller,
        Submit,
        InputKeyDown,
    };

})();
