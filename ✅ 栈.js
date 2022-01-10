// ✅ 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
var MinStack = function () {
  this.stack = [];
  this.minArr = [];
  this.count = 0;
  this.min = Number.MAX_SAFE_INTEGER;
};
/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.min = Math.min(this.min, x);
  this.minArr[this.count] = this.min;
  this.stack[this.count] = x;
  this.count++;
};
/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const element = this.stack[this.count - 1];
  if (this.count - 2 >= 0) this.min = this.minArr[this.count - 2];
  else this.min = Number.MAX_SAFE_INTEGER;
  delete this.stack[this.count - 1];
  delete this.minArr[this.count - 1];
  this.count--;
  return element;
};
/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  if (this.count >= 1) {
    return this.stack[this.count - 1];
  }
  return null;
};
/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  const element = this.minArr[this.count - 1];
  return element;
};
// ✅ 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
// https://leetcode-cn.com/problems/next-greater-element-i/submissions/
var nextGreaterElements = function (nums) {
  let ans = [];
  let stack = new Stack();
  const n = nums.length;
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (!stack.isEmpty() && stack.top() <= nums[i % n]) {
      stack.pop();
    }
    ans[i % n] = stack.isEmpty() ? -1 : stack.top();
    stack.push(nums[i % n]);
  }
  return ans;
};
class Stack {
  constructor() {
    this.count = 0;
    this.items = [];
  }
  top() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const element = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return element;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
}

class Stack {
  constructor() {
    this.count = 0;
    this.items = [];
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const element = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return element;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
}
// ✅ 简化路径【栈】给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），请你将其转化为更加简洁的规范路径
var simplifyPath = function (path) {
  let newPath = path.split("/");
  newPath = newPath.filter((item) => item !== "");
  const stack = new Stack();
  for (let s of newPath) {
    if (s === "..") stack.pop();
    else if (s !== ".") stack.push(s);
  }
  if (stack.isEmpty()) return "/";
  let str = "";
  while (!stack.isEmpty()) {
    const element = stack.pop();
    str = "/" + element + str;
  }
  return str;
};

// 有效的括号字符串
// 输入: "()"
// 输出: True
var checkValidString = function (s) {
  const leftstack = [],
    starstack = [],
    n = s.length;
  for (let i = 0; i < n; i++) {
    let item = s.charAt(i);
    if (item === "(") leftstack.push(i);
    else if (item === "*") starstack.push(i);
    else {
      if (leftstack.length) leftstack.pop();
      else if (starstack.length) starstack.pop();
      else return false;
    }
  }
  if (leftstack.length > starstack.length) return false;
  while (leftstack.length && starstack.length) {
    if (leftstack.pop() > starstack.pop()) return false;
  }
  return true;
};
// 有效的括号【栈】 网易一面
var isValid = function (s) {
  if (s.length === 0) {
    return true;
  }
  if (s.length % 2 !== 0) {
    return false;
  }
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let left = ["(", "[", "{"];
  let right = [")", "]", "}"];
  let stack = new Stack();
  for (let i = 0; i < s.length; i++) {
    if (!right.includes(s[i])) {
      stack.push(s[i]);
    } else {
      const matchStr = map[s[i]];
      while (!stack.isEmpty()) {
        const element = stack.pop();
        if (left.includes(element) && matchStr !== element) return false;
        if (element === matchStr) break;
      }
    }
  }
  return stack.isEmpty();
};

// -------------- mine -------------
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。

// 有效括号
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  if (!s) return false;
  class Stack {
    constructor() {
      this.store = [];
      this.count = 0;
    }
    push(el) {
      this.store[this.count++] = el;
    }
    pop() {
      if (this.isEmpty()) return undefined;
      var el = this.store[this.count - 1];
      delete this.store[this.count - 1];
      this.count--;
      return el;
    }
    size() {
      return this.count;
    }
    isEmpty() {
      return this.size() === 0;
    }
    top() {
      if (this.isEmpty()) return undefined;
      return this.store[this.count - 1];
    }
  }
  var leftStack = new Stack();
  var starStack = new Stack();
  var n = s.length;
  for (var i = 0; i < n; i++) {
    var str = s[i];
    if (str === "(") {
      leftStack.push(i);
    } else if (str === "*") {
      starStack.push(i);
    } else {
      if (!leftStack.isEmpty()) {
        leftStack.pop();
      } else if (!starStack.isEmpty()) {
        starStack.pop();
      } else {
        return false;
      }
    }
  }
  console.log(leftStack.size(), starStack.size());
  while (!leftStack.isEmpty() && !starStack.isEmpty()) {
    var leftIndex = leftStack.pop();
    var starIndex = starStack.pop();
    if (leftIndex > starIndex) return false;
  }

  return leftStack.size() === 0;
};
