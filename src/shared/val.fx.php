<script>
var val = val || {};
val.fx = val.fx || {};
val.fx.object = {
    get: (el) => el.attr('val-key')
        ? { [el.attr('val-key')]: val.obj(el) }
        : val.obj(el),
    set: (el, data) => {
        if (el.attr('val-key')) {
            val.set(el, data[el.attr('val-key')]);
        } else {
            val.set(el, data);
        }
    }
};
val.fx.array = {
    get: (el) => ({ [el.attr('val-key')]: val.arr(el) }),
    set: (el, data) => val.arr(el, el.attr('val-tpl'), data[el.attr('val-key')])
};
val.fx.render = {
    get: (el) => ({ [el.attr('val-key')]: val.obj(el) }),
    set: (el, data) => val.render(el, el.attr('val-tpl'), data[el.attr('val-key')])
};
val.fx.text = {
    get: (el) => ({ [el.attr('val-key')]: el.textContent }),
    set: (el, data) => { el.textContent = data[el.attr('val-key')]; }
};
val.fx.html = {
    get: (el) => ({ [el.attr('val-key')]: el.innerHTML }),
    set: (el, data) => { el.innerHTML = data[el.attr('val-key')]; }
};
val.fx.input = {
    get: (el) => ({ [el.attr('val-key')]: el.value }),
    set: (el, data) => { el.value = data[el.attr('val-key')]; }
};
val.fx.show = {
    get: (el) => ({ [el.attr('val-key')]: el.style.display !== 'none' }),
    set: (el, data) => { el.style.display = data[el.attr('val-key')] ? '' : 'none'; }
};
val.fx.hide = {
    get: (el) => ({ [el.attr('val-key')]: el.style.display === 'none' }),
    set: (el, data) => { el.style.display = data[el.attr('val-key')] ? 'none' : ''; }
};
val.fx.img = {
    get: (el) => ({ [el.attr('val-key')]: el.src }),
    set: (el, data) => { el.src = data[el.attr('val-key')]; }
};
val.fx.attr = {
    get: (el) => ({ [el.attr('val-key')]: el.attr(el.attr('val-attr')) }),
    set: (el, data) => { el.attr(el.attr('val-attr'), data[el.attr('val-key')]); }
}
val.fx.checkbox = {
    get: (el) => ({ [el.attr('val-key')]: el.checked ? el.attr('val-check') : el.attr('val-uncheck') }),
    set: (el, data) => { el.checked = data[el.attr('val-key')] === el.attr('val-check'); }
};
val.fx.if = {
    get: (el) => el.style.display !== 'none' ? { [el.attr('val-key')]: el.attr('val-value') } : {},
    set: (el, data) => { el.style.display = el.attr('val-value') === data[el.attr('val-key')] ? '' : 'none'; }
};
</script>