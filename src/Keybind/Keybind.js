App.Keybind = (() => {

    const binds = new Map();

    const Register = (controller) => {
        if (!binds.has(controller)) {
            binds.set(controller, new Map());
        }
        const api = {
            Combo: (combo, callback, strong = false) => {
                const actions = binds.get(controller);
                if (!actions.has(combo)) {
                    actions.set(combo, []);
                }
                if (strong) {
                    actions.get(combo).push((e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        callback(e);
                    });
                } else {
                    actions.get(combo).push(callback);
                }
                return api;
            }
        };
        return api;
    };

    const HandleKeydown = (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
            return;
        }
        const controller = App.Router.CurrentController();
        if (!controller || !binds.has(controller)) {
            return;
        }
        const actions = binds.get(controller);
        if (!actions) {
            return;
        }
        for (const [combo, callbacks] of actions.entries()) {
            if (e.combo(combo)) {
                callbacks.forEach(callback => callback(e));
            }
        }
    };

    const Boot = () => {
        window.addEventListener('keydown', HandleKeydown);
    };

    return {
        Register,
        Boot,
    };

})();
