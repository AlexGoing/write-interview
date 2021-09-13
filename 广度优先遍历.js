// 打开转盘锁
// 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
// 输出：6
var openLock = function(deadends, target) {
	let queue = new Queue();
	let visited = new Set();
	let step = 0;
	queue.push('0000');
	visited.add('0000');
	while (!queue.isEmpty()) {
	  let size = queue.size();
	  for (let i = 0; i < size; i++) {
		let str = queue.pop();
		if (deadends.includes(str)) continue;
		if (target === str) {
		  return step;
		}
		for (let j = 0; j < 4; j++) {
		  let plusStr = plusOne(str, j);
		  let minusStr = minusOne(str, j);
		  if (!visited.has(plusStr)) {
			queue.push(plusStr);
			visited.add(plusStr)
		  }
		  if (!visited.has(minusStr)) {
			queue.push(minusStr);
			visited.add(minusStr)
		  }
		}
	  }
	  step++;
	}
	return -1;
  };
  function plusOne(str, index) {
	let strArr = str.split('');
	if (strArr[index] === '9') {
	  strArr[index] = '0'
	} else {
	  strArr[index] = (Number(strArr[index]) + 1).toString()
	}
	return strArr.join('');
  }
  function minusOne(str, index) {
	let strArr = str.split('');
	if (strArr[index] === '0') {
	  strArr[index] = '9'
	} else {
	  strArr[index] = (Number(strArr[index]) - 1).toString()
	}
	return strArr.join('');
  }
  class Queue {
	constructor() {
	  this.items = [];
	  this.count = 0;
	  this.lowerCount = 0;
	}
	push(elem) {
	  this.items[this.count++] = elem;
	}
	pop() {
	  if (this.isEmpty()) {
		return;
	  }
	  const elem = this.items[this.lowerCount];
	  delete this.items[this.lowerCount];
	  this.lowerCount++;
	  return elem;
	}
	isEmpty() {
	  if (this.size() === 0) return true;
	  return false;
	}
	size() {
	  return this.count - this.lowerCount;
	}
  }
  

//   二叉树的最小深度【BFS】
var minDepth = function(root) {
	if (root == null) return 0;
	let depth = 1;
	let queue = new Queue();
	queue.push(root);
	while (!queue.isEmpty()) {
	  let size = queue.size();
	  for (let i = 0; i < size; i++) {
		const node = queue.pop();
		if (node.left == null && node.right == null) return depth;
		if (node.left) {
		  queue.push(node.left);
		}
		if (node.right) {
		  queue.push(node.right);
		}
	  }
	  depth++;
	}
	return depth;
  };
  class Queue {
	constructor() {
	  this.items = [];
	  this.count = 0;
	  this.lowerCount = 0;
	}
	push(elem) {
	  this.items[this.count++] = elem;
	}
	pop() {
	  if (this.isEmpty()) {
		return;
	  }
	  const elem = this.items[this.lowerCount];
	  delete this.items[this.lowerCount];
	  this.lowerCount++;
	  return elem;
	}
	isEmpty() {
	  if (this.size() === 0) return true;
	  return false;
	}
	size() {
	  return this.count - this.lowerCount;
	}
  }