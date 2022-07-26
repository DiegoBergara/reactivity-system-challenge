class Dep {
    constructor() {
        this.subs = new Set();
    }

    addSub(sub) {
        this.subs.add(sub);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        this.subs.forEach((sub) => sub.update());
    }
}

Dep.target = null;
const targetStack = [];

function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}