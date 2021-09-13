// N皇后【回溯算法】n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
let result = [];
var solveNQueens = function(n) {
    result = [];
    let board = [];
    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i][j] = '.'
      }
    }
    backtrack(0, board, n);
    return result;
};
function deepClone(board) {
  let res = [];
  for (let i = 0; i < board.length; i++) {
    res.push(board[i].join(''));
  }
  return res;
}
function backtrack(row, board, n) {
    if (row === n) {
      result.push(deepClone(board));
      return;
    }
    for (let j = 0; j < n; j++) {
        if (checkInValid(board, row, j, n)) continue;
        board[row][j] = 'Q';
        backtrack(row + 1, board, n);
        board[row][j] = '.';
      }
}
function checkInValid(board, row, column, n) {
  // 行
  for (let i = 0; i < n; i++) {
    if (board[i][column] === 'Q') return true;
  }
  for (let i = row - 1, j = column + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') return true;
  }
  for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return true;
  }
  return false;
}
// 全排列 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
let results = [];var permute = function(nums) {
    results = [];
    backtrack(nums, []);
    return results;
};
function backtrack(nums, track) {
    if (nums.length === track.length) {
        results.push(track.slice());
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        if (track.includes(nums[i])) continue;
        track.push(nums[i]);
        backtrack(nums, track);
        track.pop();
    }
}
// 括号生成, 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
var generateParenthesis = function(n) {
    let validRes = [];
    backtrack(n * 2, validRes, '');
    return validRes;
};
function backtrack(len, validRes, bracket) {
    if (bracket.length === len) {
        if (isValidCombination(bracket)) {
            validRes.push(bracket);
        }
        return;
    }
    for (let str of ['(', ')']) {
        bracket += str;
        backtrack(len, validRes, bracket);
        bracket = bracket.slice(0, bracket.length - 1);
    }
}
function isValidCombination(bracket) {
    let stack = new Stack();
    for (let i = 0; i < bracket.length; i++) {
        const str = bracket[i];
        if (str === '(') {
            stack.push(str);
        } else if (str === ')') {
            const top = stack.pop();
            if (top !== '(') return false;
        }
    }
    return stack.isEmpty();
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
        if (this.isEmpty()) return;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
}
// 复原 IP 地址 给定一个只包含数字的字符串，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案
// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
var restoreIpAddresses = function(s) {
    if (s.length > 12) return [];
    let res = [];
    const track = [];
    backtrack(s, track, res);
    return res;
};
function backtrack(s, track, res) {
    if (track.length === 4 && s.length === 0) {
        res.push(track.join('.'));
        return;
    }
    let len = s.length >= 3 ? 3 : s.length;
    for (let i = 0; i < len; i++) {
        const c = s.slice(0, i + 1);
        if (parseInt(c) > 255) continue;
        if (i >= 1 &&  parseInt(c) < parseInt((1 + '0'.repeat(i)))) continue;
        track.push(c);
        backtrack(s.slice(i + 1), track, res);
        track.pop();
    }
}
// 子集 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function(nums) {
    if (nums.length === 0) return [[]];
    let resArr = [];
    backtrack(nums, 0, [], resArr);
    return resArr;
};
function backtrack(nums, index, subArr, resArr) {
    if (Array.isArray(subArr)) {
        resArr.push(subArr.slice());
    }
    if (index === nums.length) {
        return;
    } 
    for (let i = index; i < nums.length; i++) {
        subArr.push(nums[i]);
        backtrack(nums, i + 1, subArr, resArr);
        subArr.pop(nums[i]);
    }
}
// 字母大小写全排列 快手1面
// 输入：alex
// 输出：["alex", "aleX", "alEx", "alEX", "aLex", "aLeX", "aLEx", "aLEX", "Alex", "AleX", "AlEx", "AlEX", "ALex", "ALeX", "ALEx", "ALEX"]
var letterCasePermutation = function(S) {
    const ans = [];
    function dfs(i,str){
        if(i==S.length){
            ans.push(str)
            return ;
        }
        let tem = S[i].charCodeAt()
        if(tem>=65&&tem<=90||tem>=97&&tem<=122){
            dfs(i+1,str+S[i])
            dfs(i+1,str+String.fromCharCode(tem^32));
        }else{
            dfs(i+1,str+S[i])
        }
    }
    dfs(0,'')
    return ans
};
