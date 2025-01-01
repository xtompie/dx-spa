App.Router = (() => {

    const routes = [];
    let currentRoute = null;
    let basePath = null;

    const Register = (handler, path) => routes.push({ handler, path, regex: PathToRegex(path) });

    const PathToRegex = (path) => new RegExp("^" + path.replace(/\{([a-zA-Z]+)\?\}/g, "([^/]*)").replace(/\{([a-zA-Z]+)\}/g, "([^/]+)") + "$");

    const FindRouteByPath = (path) => routes.find(route => route.regex.test(path.replace(basePath, "")));

    const ExtractParams = (route, path) => {
        const cleanPath = path.replace(basePath, "");
        const values = cleanPath.match(route.regex).slice(1);
        const keys = Array.from(route.path.matchAll(/\{([a-zA-Z]+)\??\}/g)).map(result => result[1]);
        const routeParams = Object.fromEntries(keys.map((key, i) => [key, values[i] !== undefined && values[i] !== "" ? values[i] : null]));
        const queryParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());
        return { ...queryParams, ...routeParams };
    };

    const HandleRoute = () => {
        const path = window.location.pathname.replace(basePath, "");
        const route = FindRouteByPath(path);
        if (route) {
            currentRoute = route;
            route.handler(ExtractParams(route, path));
        } else {
            currentRoute = null;
            App.Error.NotFound();
        }
    };

    const Navigate = (handler, params = {}) => {
        onBeforeNavigateListeners.notify();

        const route = routes.find(r => r.handler === handler);
        if (!route) {
            currentRoute = null;
            App.Error.NotFound();
            onAfterNavigateListeners.notify();
            return;
        }

        let path = route.path;
        const pathKeys = Array.from(path.matchAll(/\{([a-zA-Z]+)\??\}/g)).map(match => match[1]);
        const queryParams = {};

        for (const [key, value] of Object.entries(params)) {
            if (pathKeys.includes(key)) {
                path = path.replace(`{${key}}`, value);
                path = path.replace(`{${key}?}`, value || "");
            } else {
                queryParams[key] = value;
            }
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const fullPath = `${basePath}${path}${queryString ? `?${queryString}` : ""}`;

        currentRoute = route;
        window.history.pushState({}, "", fullPath);
        HandleRoute();
        onAfterNavigateListeners.notify();
    };

    const Refresh = () => {
        onBeforeNavigateListeners.notify();
        HandleRoute();
        onAfterNavigateListeners.notify();
    };

    const CurrentController = () => currentRoute ? currentRoute.handler : null;

    const Boot = () => {
        basePath = window.location.pathname.includes("/dx-spa/") ? "/dx-spa" : "";
        window.addEventListener("popstate", HandleRoute);
        onBeforeNavigateListeners.notify();
        HandleRoute();
        onAfterNavigateListeners.notify();
    };

    const Listeners = () => {
        const listeners = [];
        return {
            add: (listener) => listeners.push(listener),
            notify: () => listeners.forEach(listener => listener()),
        };
    };

    const onBeforeNavigateListeners = Listeners();
    const onAfterNavigateListeners = Listeners();

    const OnBeforeNavigate = (listener) => onBeforeNavigateListeners.add(listener);

    const OnAfterNavigate = (listener) => onAfterNavigateListeners.add(listener);

    return {
        Boot,
        CurrentController,
        Navigate,
        OnAfterNavigate,
        OnBeforeNavigate,
        Refresh,
        Register,
    };

})();
