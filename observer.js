function walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
    }
}

function defineReactive(obj, key, val) {
    if (val !== null && Object.keys(obj)) {
        walk(val);
    }

    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.depend();
            return val;
        },
        set: function reactiveSetter(newVal) {
            val = newVal;
            dep.notify();
        },
    });
}