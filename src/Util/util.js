document.al = function(s) {
    return Array.from(document.querySelectorAll(s));
};
document.one = function(s) {
    return document.querySelector(s);
};
Array.prototype.each = function(f) {
    return this.forEach(f);
}
Array.prototype.any = function() {
    return this.length > 0;
};
Array.prototype.none = function() {
    return this.length === 0;
};
DocumentFragment.prototype.one = function(s) {
    return this.querySelector(s);
}
DocumentFragment.prototype.allfd = function(s) {
    return Array.from(this.children).reduce((r, e) => {
        return e.matches(s) ? r.concat(e) : r.concat(e.allfd(s));
    }, []);
}
HTMLElement.prototype.all = function(s) {
    return Array.from(this.querySelectorAll(s));
}
HTMLElement.prototype.allfd = function(s) {
    return Array.from(this.children).reduce((r, e) => {
        return e.matches(s) ? r.concat(e) : r.concat(e.allfd(s));
    }, []);
}
HTMLElement.prototype.arr = function(tpl, data) {
    return val.arr(this, tpl, data);
}
HTMLElement.prototype.attr = function(a, v) {
    if (v === undefined) {
        return this.getAttribute(a);
    }
    else if (v === null) {
        this.removeAttribute(a);
        return this;
    } else {
        this.setAttribute(a, v);
        return this;
    }
}
HTMLElement.prototype.clear = function() {
    this.innerHTML = '';
    return this;
}
HTMLElement.prototype.get = function() {
    return val.get(this);
};
HTMLElement.prototype.hide = function(v = true) {
    this.style.display = v === true ? 'none' : 'false';
    return this;
}
HTMLElement.prototype.modify = function(f) {
    val.modify(this, f);
    return this;
}
HTMLElement.prototype.one = function(s) {
    return this.querySelector(s);
}
HTMLElement.prototype.patch = function(data) {
    val.patch(this, data);
    return this;
}
HTMLElement.prototype.render = function(tpl, data) {
    val.render(this, tpl, data);
    return this;
}
HTMLElement.prototype.tpl = function() {
    return this.content.cloneNode(true);
}
HTMLElement.prototype.set = function(data) {
    val.set(this, data);
    return this;
};
HTMLElement.prototype.show = function(v = true) {
    this.style.display = v === true ? '' : 'none';
    return this;
}
HTMLElement.prototype.up = function(s) {
    if (s === undefined) {
        return this.parentNode;
    }
    if (this.matches(s)) {
        return this;
    }
    let node = this.closest(s);
    if (node) {
        return node;
    }
    return document.body;
}
HTMLElement.prototype.val = function(data) {
    if (arguments.length === 0) {
        return val.get(this);
    } else {
        val.set(this, data);
        return this;
    }
};
KeyboardEvent.prototype.combo = function(combo) {
    return `${this.altKey ? 'Alt+' : ''}${this.ctrlKey ? 'Ctrl+' : ''}${this.metaKey ? 'Meta+' : ''}${this.shiftKey ? 'Shift+' : ''}${this.key}` === combo;
};
String.prototype.cut = function(length) {
    return this.length > length ? this.substring(0, length) + '...' : this;
};
