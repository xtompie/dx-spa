const val = (function () {
    function _tpl(tpl) {
        return typeof tpl === 'string' ? document.one(tpl) : tpl;
    }
    function _fx(el, write, v = null) {
        let fx = el.attr('val');
        if (fx && fx !== '' && val.fx[fx]) {
            return write ? val.fx[fx].set(el, v) : val.fx[fx].get(el);
        }
    }
    function _sg(el, write, v = null) {
        let code = el.attr(write ? 'val-set' : 'val-get');
        if (code) {
            return write
                ? (function () { return eval(code).call(el, v); }).bind(el)()
                : (function () { return eval(code).call(el); }).bind(el)()
            ;
        }
    }
    function _get(el) {
        return {..._fx(el, false) || {}, ..._sg(el, false) || {}};
    }
    function _set(el, v) {
        _fx(el, true, v);
        _sg(el, true, v);
    }
    function _frag(tpl, data) {
        let frag = tpl.tpl();
        obj(frag, data);
        return frag;
    }
    function _iter(el, tpl, data, method) {
        let t = _tpl(tpl);
        data.each(d => el[method](_frag(t, d)));
    }
    function obj(el, data = null) {
        if (data === null) {
            let d = el.allfd('[val]').reduce((r, e) => Object.assign(r, (_get(e))), {});
            return Object.keys(d).length === 0 ? null : d;
        }
        el.allfd('[val]').each(e => _set(e, data));
    }
    function arr(el, tpl, data) {
        if (arguments.length === 1) {
            return el.allfd('[val]').map(_get);
        }
        el.innerHTML = '';
        if (data?.length) {
            _iter(el, tpl, data, 'appendChild');
        }
    }
    function render(el, tpl, data) {
        el.innerHTML = '';
        if (data !== undefined && data !== null) {
            el.appendChild(_frag(_tpl(tpl), data));
        }
    }
    function get(el) {
        return obj(el);
    }
    function set(el, data) {
        obj(el, data);
    }
    function patch(el, data) {
        obj(el, Object.assign(obj(el), data));
    }
    function append(el, tpl, data) {
        _iter(el, tpl, data, 'appendChild');
    }
    function prepend(el, tpl, data) {
        _iter(el, tpl, data.reverse(), 'prepend');
    }
    function modify(el, callback) {
        set(el, callback(obj(el)));
    }
    return {
        append, arr, fx: {}, get, modify, obj, patch, prepend, render, set
    };
})();
