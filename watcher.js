class Watcher {
    constructor(getter, cb) {
        this.getter = getter;
        this.cb = cb;
        this.value = this.get();
        this.cb(this.value, null);
    }

    get() {
        pushTarget(this);
        const value = this.getter();
        popTarget();

        return value;
    }

    addDep(dep) {
        dep.addSub(this);
    }

    update() {
        const value = this.get();
        const oldValue = this.value;
        this.value = value;
        this.cb(value, oldValue);
    }
}