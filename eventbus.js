class EventBus {
    constructor () {
        Object.defineProperty(this, 'handles', {
            value: {}
        });
    }
    on (eventName, listener) {
        if (typeof listener !== 'function') {
            console.error('请传入正确的回调函数');
            return;
        }
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(listener);
    }
    emit (eventName, ...args) {
        let listeners = this.handles[eventName];
        if (!listeners) {
            console.warn(`${eventName}事件不存在`);
            return;
        }
        for (const listener of listeners) {
            listener(...args);
        }
    }
    off (eventName, listener) {
        if (!listener) {
            delete this.handles[eventName];
            return;
        }
        let listeners = this.handles[eventName];
        if (listeners && listeners.length) {
            let index = listeners.findIndex(item => item === listener);
            if (~index) {
              listeners.splice(index, 1);
            }
        }
    }
    once (eventName, listener) {
        if (typeof listener !== 'function') {
            console.error('请传入正确的回调函数');
            return;
        }
        const onceListener = (...args) => {
            listener(...args);
            this.off(eventName, onceListener);
        };
        this.on(eventName, onceListener);
    }
}
// 实现es6 class
const checkNew = function (instance, con) {
    if (!(instance instanceof con)) {
        throw new TypeError(`Class constructor ${con.name} cannot be invoked without 'new'`);
    }
};
const defineProperties = function (target, obj) {
    for (const key in obj) {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            value: obj[key],
            writable: true
        });
    }
};
const createClass = function (con, proto, staticAttr) {
    proto && defineProperties(con.prototype, proto);
    staticAttr && defineProperties(con, staticAttr);
    return con;
};

// 用法
function Person (name) {
    checkNew(this, Person);
    this.name = name;
}
var PersonClass = createClass(Person, {
    getName: function () {
        return this.name;
    }
}, {
    getAge: function () {}
});

// 时间切片
// 把长任务切割成多个小任务，使用场景是防止一个任务执行时间过长而阻塞线程
function ts (gen) {
    if (typeof gen === 'function') gen = gen();
    if (!gen || typeof gen.next !== 'function') return;
    (function next() {
        const start = performance.now();
        let res = null;
        do {
            res = gen.next();
        } while(!res.done && performance.now() - start < 25)
        if (res.done) return;
        setTimeout(next);
    })();
}
// 用法
ts(function* () {
    const start = performance.now();
    while (performance.now() - start < 1000) {
        yield;
    }
    console.log('done!');
});

// 单例模式
const getSingleton = function (fn) {
    let instance;
    return function () {
        return instance || (instance = new (fn.bind(this, ...arguments)));
    };
};
// 法2
const getSingleton = function (fn) {
    let instance;
    const handler = {
        construct (target, argumentsList) {
           return instance || (instance = Reflect.construct(target, argumentsList)); 
        }
    }
    return new Proxy(fn, handler);
};
// 用法
function Person (name) {
    this.name = name;
}
let singleton = getSingleton(Person);
let instance1 = new singleton('Twittop1');
let instance2 = new singleton('Twittop2');
console.log(instance1 === instance2); // true


// JSON.stringify
// Boolean | Number| String 类型会自动转换成对应的原始值。
// undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
// 不可枚举的属性会被忽略
// 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}
// JSON.parse
function jsonParse(opt) {
    return eval('(' + opt + ')');
}
// 法2
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();