// es5 继承 // es6 继承 // 异步并发数限制 // VUE REACTIVE // 图片懒加载
//  ajax // 滚动加载 // 渲染几万条数据不卡住页面 // 冒泡排序 // 快速排序
//归并排序 // 深度优先遍历 // 广度优先遍历

// es5 继承
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}
  
  // Parent
function Parent(name) {
    this.name = name
}
  
Parent.prototype.sayName = function () {
    console.log(this.name)
};
  
  // Child
function Child(age, name) {
    Parent.call(this, name)
    this.age = age
}
Child.prototype = create(Parent.prototype)
Child.prototype.constructor = Child
Child.prototype.sayAge = function () {
    console.log(this.age)
}
// es6 继承
// ES6 内部使用寄生组合式继承，首先用 Object.create 继承原型，
// 并传递第二个参数以将父类构造函数指向自身，同时设置数据属性描述符。
// 然后用 Object.setPrototypeOf 继承静态属性和静态方法。
const inherit = function (subType, superType) {
    // 对 superType 进行类型判断
   if (typeof superType !== "function" && superType !== null) {
       throw new TypeError("Super expression must either be null or a function");
   }
   subType.prototype = Object.create(superType && superType.prototype, {
       constructor: {
           configurable: true,
           enumerable: false,
           value: subType,
           writable: true
       }
   });
   // 继承静态方法
   superType && Object.setPrototypeOf(subType, superType);
};

// 异步并发数限制
function limit(count, array, iterateFunc) {
    const tasks = []
    const doingTasks = []
    let i = 0
    const enqueue = () => {
      if (i === array.length) {
        return Promise.resolve()
      }
      const task = Promise.resolve().then(() => iterateFunc(array[i++]))
      tasks.push(task)
      const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
      doingTasks.push(doing)
      const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
      return res.then(enqueue)
    };
    return enqueue().then(() => Promise.all(tasks))
}

// 异步串行 | 异步并行
// 字节面试题，实现一个异步加法
function asyncAdd(a, b, callback) {
    setTimeout(function () {
      callback(null, a + b);
    }, 500);
  }
  
  // 解决方案
  // 1. promisify
  const promiseAdd = (a, b) => new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
  
  // 2. 串行处理
  async function serialSum(...args) {
    return args.reduce((task, now) => task.then(res => promiseAdd(res, now)), Promise.resolve(0))
  }
  
  // 3. 并行处理
  async function parallelSum(...args) {
    if (args.length === 1) return args[0]
    const tasks = []
    for (let i = 0; i < args.length; i += 2) {
      tasks.push(promiseAdd(args[i], args[i + 1] || 0))
    }
    const results = await Promise.all(tasks)
    return parallelSum(...results)
  }
  
  // 测试
  (async () => {
    console.log('Running...');
    const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res1)
    const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res2)
    console.log('Done');
  })()

// VUE REACTIVE
// Dep module
class Dep {
    static stack = []
    static target = null
    deps = null
    
    constructor() {
      this.deps = new Set()
    }
  
    depend() {
      if (Dep.target) {
        this.deps.add(Dep.target)
      }
    }
  
    notify() {
      this.deps.forEach(w => w.update())
    }
  
    static pushTarget(t) {
      if (this.target) {
        this.stack.push(this.target)
      }
      this.target = t
    }
  
    static popTarget() {
      this.target = this.stack.pop()
    }
  }
  
  // reactive
  function reactive(o) {
    if (o && typeof o === 'object') {
      Object.keys(o).forEach(k => {
        defineReactive(o, k, o[k])
      })
    }
    return o
  }
  
  function defineReactive(obj, k, val) {
    let dep = new Dep()
    Object.defineProperty(obj, k, {
      get() {
        dep.depend()
        return val
      },
      set(newVal) {
        val = newVal
        dep.notify()
      }
    })
    if (val && typeof val === 'object') {
      reactive(val)
    }
  }
  
  // watcher
  class Watcher {
    constructor(effect) {
      this.effect = effect
      this.update()
    }
  
    update() {
      Dep.pushTarget(this)
      this.value = this.effect()
      Dep.popTarget()
      return this.value
    }
  }

  
// 图片懒加载
// <img src="default.png" data-src="https://xxxx/real.png">
function isVisible(el) {
    const position = el.getBoundingClientRect()
    const windowHeight = document.documentElement.clientHeight
    // 顶部边缘可见
    const topVisible = position.top > 0 && position.top < windowHeight;
    // 底部边缘可见
    const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
    return topVisible || bottomVisible;
  }
  
  function imageLazyLoad() {
    const images = document.querySelectorAll('img')
    for (let img of images) {
      const realSrc = img.dataset.src
      if (!realSrc) continue
      if (isVisible(img)) {
        img.src = realSrc
        img.dataset.src = ''
      }
    }
  }
  
  // 测试
  window.addEventListener('load', imageLazyLoad)
  window.addEventListener('scroll', imageLazyLoad)
  // or
  window.addEventListener('scroll', throttle(imageLazyLoad, 1000))

//  ajax
  const getJSON = function(url) {
    return new Promise((resolve, reject) => {
      const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
      xhr.open('GET', url, false);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.responseText));
        }
      }
      xhr.send();
    })
}

// 滚动加载
window.addEventListener('scroll', function() {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop >= scrollHeight) {
      // 检测到滚动至页面底部，进行后续操作
      // ...
    }
}, false);

// 渲染几万条数据不卡住页面
setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    // 添加数据的方法
    function add() {
      const fragment = document.createDocumentFragment();
      for(let i = 0; i < once; i++) {
        const li = document.createElement('li');
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender += 1;
      loop();
    }
    function loop() {
      if(countOfRender < loopCount) {
        window.requestAnimationFrame(add);
      }
    }
    loop();
}, 0)
// 冒泡排序
var arr = [29,45,51,68,72,97];
//外层循环，控制趟数，每一次找到一个最大值
for (var i = 0; i < arr.length - 1; i++) {
	// 内层循环,控制比较的次数，并且判断两个数的大小
	for (var j = 0; j < arr.length - 1 - i; j++) {
		// 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
		if (arr[j] > arr[j + 1]) {
			var temp = arr[j];
			arr[j] = arr[j + 1];
			arr[j + 1] = temp;
		}
	}

}
console.log(arr);//[2, 4, 5, 12, 31, 32, 45, 52, 78, 89]
// 快速排序
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
// 归并排序
let arr = [8, 4, 5, 7, 1, 3, 6, 2, 0, 77];
let temp = new Array(arr.length);//归并排序需要一个额外空间
mergeSort(arr, 0, arr.length - 1, temp);
console.log(arr);

//分+合方法
function mergeSort(arr, left, right, temp) {
    if (left < right) {//中间索引
        let mid = Math.floor((left + right) / 2);
        //向左递归进行分解
        mergeSort(arr, left, mid, temp);
        //向右递归进行分解
        mergeSort(arr, mid + 1, right, temp);
        //到合并
        merge(arr, left, mid, right, temp);
    }

}

//合并的方法
/**
 * 
 * @param {排序的原始数组} arr 
 * @param {左边有序序列的初始索引} left 
 * @param {中间索引} mid 
 * @param {右边索引} right 
 * @param {做中转的数组} temp 
 */
function merge(arr, left, mid, right, temp) {
    let i = left;//初始化i，左边有序序列的初始索引
    let j = mid + 1;//初始化j，右边有序序列的初始索引
    let t = 0;//指向temp数组的当前索引

    //1、先把左右两边（有序）的数据按照规则填充到temp数组
    //直到左右两边有序序列，有一边处理完毕为止
    while (i <= mid && j <= right) {
        //如果左边的有序序列的当前元素，小于等于右边有序序列的当前元素
        //即将左边的当前元素，拷贝到temp数组
        //然后t++,i++
        if (arr[i] <= arr[j]) {
            temp[t] = arr[i];
            t++;
            i++;
        } else {
            //反之，将右边的有序序列的当前元素，填充到temp数组
            temp[t] = arr[j];
            t++;
            j++;
        }
    }
    //2、把有剩余数据的一边一次全部填充到temp
    while (i <= mid) {
        //左边的有序序列还有剩余的元素，就全部填充到temp
        temp[t] = arr[i];
        t++;
        i++;
    }
    while (j <= right) {
        //右边的有序序列还有剩余的元素，就全部填充到temp
        temp[t] = arr[j];
        t++;
        j++;
    }
    //3.将temp数组的元素拷贝到arr
    t = 0;
    let tempLeft = left;//
    while (tempLeft <= right) {
        //第一次合并tempLeft = 0,right=1
        //第二次合并 templeft = 2,rigth=3
        //最后一次合并 templeft = 0,right=7
        arr[tempLeft] = temp[t];
        t++;
        tempLeft++;
    }
}
// 深度优先遍历
function deepTraversal(node) {  
	var nodeList=[]
    if (node) {    
            nodeList.push(node);    
            var children = node.children;    
            for (var i = 0; i < children.length; i++) 
      //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
                deepTraversal(children[i],nodeList);    
        }    
    return nodeList;  
}  
// 广度遍历, 创建一个执行队列, 当队列为空的时候则结束
function wideTraversal(node) {  
    var nodes = [];  
    if (node != null) {  
        var queue = [];  
        queue.unshift(node);  
        while (queue.length != 0) {  
            var item = queue.shift();  
            nodes.push(item);  
            var children = item.children;  
            for (var i = 0; i < children.length; i++)  
                queue.push(children[i]);  
        }  
    }  
    return nodes;  
}