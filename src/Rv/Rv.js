const Rv = (() => {
    const create = (initialValue, callback) => {
        let value = initialValue;
        let initialized = callback ? false : true;
        const subscribers = [];

        const initialize = () => {
            if (callback && !initialized) {
                value = callback();
                initialized = true;
                subscribers.forEach(subscriber => subscriber(value));
            }
        };

        const subscribe = (subscriber) => {
            initialize();
            subscribers.push(subscriber);
            subscriber(value);
        };

        const set = (newValue) => {
            initialize();
            if (value === newValue) {
                return;
            }
            value = newValue;
            subscribers.forEach(subscriber => subscriber(value));
        };

        const get = () => {
            initialize();
            return value;
        };

        return {
            subscribe,
            set,
            get,
        };
    };

    const val = (initialValue) => create(initialValue);

    const lazy = (callback) => create(undefined, callback);

    return {
        val,
        lazy,
    };
})();
