App.Detail = (() => {

    let task = null;

    const Boot = () => {
        App.Router.Register(App.Detail.Controller, '/detail/{id}');
        App.Keybind.Register(App.Detail.Controller)
            .Combo('Escape', Exit)
            .Combo('Enter', MarkToggle)
            .Combo('e', Edit)
            .Combo('d', Delete)
        ;
    };

    const Controller = (args) => {
        task = App.Task.FindById(args.id);
        if (!task) {
            return App.Error.NotFound();
        }
        App.Window.Title(`${task.content.cut(40)}`);
        App.Window.Toolbar().render('[app-detail-tpl-toolbar]', task);
        App.Window.Content().render('[app-detail-tpl]', task);
    };

    const Exit = () => {
        App.Router.Navigate(App.Index.Controller);
    }

    const MarkAsDone = () => {
        task.status = App.Task.Status.DONE;
        App.Task.Update(task);
        App.Router.Refresh();
    }

    const MarkAsTodo = () => {
        task.status = App.Task.Status.TODO;
        App.Task.Update(task);
        App.Router.Refresh();
    }

    const MarkToggle = () => {
        task.status = (task.status === App.Task.Status.TODO) ? App.Task.Status.DONE : App.Task.Status.TODO;
        App.Task.Update(task);
        App.Router.Refresh();
    }

    const Edit = () => {
        App.Router.Navigate(App.Edit.Controller, { id: task.id });
    }

    const Delete = () => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }
        App.Task.Delete(task.id);
        App.Router.Navigate(App.Index.Controller);
    }

    return {
        Boot,
        Controller,
        Delete,
        Edit,
        MarkAsDone,
        MarkAsTodo,
    };

})();
