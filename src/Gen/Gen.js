App.Gen = (() => {

    const Id = () => {
        const t = Date.now().toString(16).padStart(12, '0');
        const r = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
        return `${t.substring(0, 8)}-${t.substring(8, 12)}-7${r().substring(1)}-${(8 + Math.floor(Math.random() * 4)).toString(16)}${r().substring(1)}-${r()}${r()}${r()}`;
    }

    return {
        Id,
    };

})();