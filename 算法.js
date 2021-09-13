// 斐波那契数
var fib = function(n) {
    if (n === 0) {
        return 0;
    }
    const dp = new Array(n);
    dp[1] = 1;
    dp[2] = 1;
    for (let i = 3; i <= n; i++) {
       dp[i] = dp[i -1] + dp[i-2];
    }
    return dp[n];
};
// 实现 Trie (前缀树)
// Trie() 初始化前缀树对象。
// void insert(String word) 向前缀树中插入字符串 word 。
// boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
// boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false

var Trie = function() {
    this.children = {};
};

Trie.prototype.insert = function(word) {
    let node = this.children;
    for (const ch of word) {
        if (!node[ch]) {
            node[ch] = {};
        }
        node = node[ch];
    }
    node.isEnd = true;
};

Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix);
};
//  LRU 缓存机制
class ListNode {
	constructor(key, value) {
	  this.key = key
	  this.value = value
	  this.next = null
	  this.prev = null
	}
  }
  
  class LRUCache {
	constructor(capacity) {
	  this.capacity = capacity
	  this.hash = {}
	  this.count = 0
	  this.dummyHead = new ListNode()
	  this.dummyTail = new ListNode()
	  this.dummyHead.next = this.dummyTail
	  this.dummyTail.prev = this.dummyHead
	}
  
	get(key) {
	  let node = this.hash[key]
	  if (node == null) return -1
	  this.moveToHead(node)
	  return node.value
	}
  
	put(key, value) {
	  let node = this.hash[key]
	  if (node == null) {
		if (this.count == this.capacity) {
		  this.removeLRUItem()
		}
		let newNode = new ListNode(key, value)
		this.hash[key] = newNode
		this.addToHead(newNode)
		this.count++
	  } else {
		node.value = value
		this.moveToHead(node)
	  }
	}
  
	moveToHead(node) {
	  this.removeFromList(node)
	  this.addToHead(node)
	}
	
	removeFromList(node) {
	  let temp1 = node.prev
	  let temp2 = node.next
	  temp1.next = temp2
	  temp2.prev = temp1
	}
  
	addToHead(node) {
	  node.prev = this.dummyHead
	  node.next = this.dummyHead.next
	  this.dummyHead.next.prev = node
	  this.dummyHead.next = node
	}
  
	removeLRUItem() {
	  let tail = this.popTail()
	  delete this.hash[tail.key]
	  this.count--
	}
  
	popTail() {
	  let tail = this.dummyTail.prev
	  this.removeFromList(tail)
	  return tail
	}
  }
//  输入 ’abacd’
// 输出：{char: ‘a’, count:2, pos[0,1] }
  function findMost (str) {
	let arr = str.split('');
	if (!arr.length) return;
	if (arr.length === 1) return 1;
	let res = {};
	let maxName, maxNum = 0
	// 遍历数组
	arr.forEach((item) => {
	  res[item] ? res[item] += 1 : res[item] = 1
	  if (res[item] > maxNum) {
		maxName = item
		maxNum = res[item]
	  }
	})
	return {char: maxName, count: maxNum};
  }
  findMost('abacd');
//  实现groupBy，第一个参数是对象数组，第二个参数是key，需要以key进行数组聚类，返回二位数组。
// 例子：
// groupBy([{age: 16, name: 'jack' }, {age: 16, name: 'jeny'}, {age: 18, name: 'peter'}], 'age')
// 返回：[
// [{age: 16, name: 'jack' }, {age: 16, name: 'jeny'}],
// [{age: 18, name: 'peter'}]
// ] 美团营销技术部
groupBy (array, name) {
	const groups = {}
	array.forEach(function (o) {
	  const group = JSON.stringify(o[name])
	  groups[group] = groups[group] || []
	  groups[group].push(o)
	})
	return Object.keys(groups).map(function (group) {
	  return groups[group]
	})
}
// JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善下面代码中的 Scheduler 类，使得以下程序能正确输出。
class Scheduler {
	add(promiseCreator) { ... }
	// ...
  }
  const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time)
  })
  const scheduler = new Scheduler()
  const addTask = (time, order) => {
	scheduler.add(() => timeout(time)).then(() => console.log(order))
  }
  
  addTask(1000, '1')
  addTask(500, '2')
  addTask(300, '3')
  addTask(400, '4')
  // output: 2 3 1 4
  // 一开始，1、2两个任务进入队列
  // 500ms 时，2完成，输出2，任务3进队
  // 800ms 时，3完成，输出3，任务4进队
  // 1000ms 时，1完成，输出1
  // 1200ms 时，4完成，输出4
  