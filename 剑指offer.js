// 二维数组中的查找 降维 再找
var findNumberIn2DArray = function(matrix, target) {
    return matrix.flat(Infinity).includes(target)
};
var findNumberIn2DArray = function(matrix, target) {
	let m = matrix.length
	if(!m) return false
	let n = matrix[0].length
	let i = 0, j = n - 1
	while (i < m && j >= 0) {  // 从右上角 往左下找
	  let t = matrix[i][j]
	  if (t === target) {
		return true
	  } else if (t > target) { // 大于目标, 说明在左/下边
		j--
	  } else {                 // 小于目标, 说明在下边
		i++
	  }
	}
	return false;
};
// 替换空格 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
var replaceSpace = function(s) {
    s = s.split("");
    let oldLen = s.length;
    let spaceCount = 0;
    for (let i = 0; i < oldLen; i++) {
        if (s[i] === ' ') spaceCount++;
    }
    s.length += spaceCount * 2;
    for (let i = oldLen - 1, j = s.length - 1; i >= 0; i--, j--) {
        if (s[i] !== ' ') s[j] = s[i];
        else {
            s[j - 2] = '%';
            s[j - 1] = '2';
            s[j] = '0';
            j -= 2;
        }
    }
    return s.join('');
};
// 从尾到头打印链表 
// 输入：{1,2,3}
// 返回值：[3,2,1]
var reversePrint = function(head) {
    return head == null ? [] : reversePrint(head.next).concat(head.val)
};
// 重建二叉树 输入某二叉树的前序遍历和中序遍历的结果
// 输入：[1,2,3,4,5,6,7],[3,2,4,1,6,5,7]
// 返回值：{1,2,5,3,4,6,7}
function TreeNode(val) {
   this.val = val;
   this.left = this.right = null;
}
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) return null
    const cur = new TreeNode(preorder[0]) // 确定根节点
    const index = inorder.indexOf(preorder[0]) // 前序遍历的第一个元素为根节点
    cur.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
    cur.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return cur
};
// 用两个栈实现队列
// 输入：
// ["CQueue","appendTail","deleteHead","deleteHead"]
// [[],[3],[],[]]
// 输出：[null,null,3,-1]
var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};
CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop();
    }else{
        while(this.stackA.length){
            this.stackB.push(this.stackA.pop());
        }
        if(!this.stackB.length){
            return -1;
        }else{
            return this.stackB.pop();
        }
    }
};
// 旋转数组的最小数字 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1 二分法
// 输入：[3,4,5,1,2]
// 输出：1
var minArray = function(numbers) {
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (numbers[pivot] < numbers[high]) {
            high = pivot;
        } else if (numbers[pivot] > numbers[high]) {
            low = pivot + 1;
        } else {
            high -= 1;
        }
    }
    return numbers[low];
};
// 最大数字
var minArray = function(numbers) {
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (numbers[pivot] > numbers[high]) {
            high = pivot;
        } else if (numbers[pivot] < numbers[high]) {
            low = pivot + 1;
        } else {
            high -= 1;
        }
    }
    return numbers[high];
};minArray([3,4,5,1,2]);
// 矩形覆盖
// 二进制中1的个数  输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数
// 输入：00000000000000000000000000001011
// 输出：3
// 解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
var hammingWeight = function(n) {
    let ret = 0;
    for (let i = 0; i < 32; i++) {
        if ((n & (1 << i)) !== 0) {
            ret++;
        }
    }
    return ret;
};
// 数值的整数次方
// 输入：x = 2.00000, n = 10
// 输出：1024.00000
var myPow = function(x, n) {
    if(n === 0) return 1;
    if(n === 1) return x;
    if(n === -1) return 1/x;
    if(n%2===0){
        let a = myPow(x,n/2);
        return a * a
    }
    else{
        let b = myPow(x,(n-1)/2);
        return b*b*x
    }
};
// 调整数组顺序使奇数位于偶数前面  
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4] 
// 注：[3,1,2,4] 也是正确的答案之一。
var exchange = function(nums) {
	return nums.sort((a,b)=>b%2-a%2)
};
var exchange = function (nums) {
    var i = 0,
        len = nums.length,
        newArr = new Array();
    while (i < len) {
        if (nums[i] % 2 === 0) {
            // 偶数
            newArr.push(nums[i]);
        } else {
            // 奇数
            newArr.unshift(nums[i]);
        }
        i++;
    }
    return newArr
};
// 链表中倒数第k个节点 输入一个链表，输出该链表中倒数第k个节点
// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.
var getKthFromEnd = function(head, k) {
    let fast = head;
    let slow = head;
    let flag = 0;
    while (fast) {
        if (flag >= k) {
            slow = slow.next;
        }
        fast = fast.next;
        flag ++;
    }
    return slow;
};
// 树的子结构
// 输入：A = [1,2,3], B = [3,1]
// 输出：false
var isSubStructure = function(A, B) {
    if (!A || !B) return false
    return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
    function dfs(a, b) {
        if (!b) return true
        if (!a) return false
        if (a.val !== b.val) return false
        return dfs(a.left, b.left) && dfs(a.right, b.right)
    }
};
// 二叉树的镜像
var mirrorTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = mirrorTree(root.left);
    const right = mirrorTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
// 顺时针打印矩阵
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
// 对于每层，从左上方开始以顺时针的顺序遍历所有元素。假设当前层的左上角位于 (\textit{top}, \textit{left})(top,left)，右下角位于 (\textit{bottom}, \textit{right})(bottom,right)，按照如下顺序遍历当前层的元素。
// 从左到右遍历上侧元素，依次为 (\textit{top}, \textit{left})(top,left) 到 (\textit{top}, \textit{right})(top,right)。
// 从上到下遍历右侧元素，依次为 (\textit{top} + 1, \textit{right})(top+1,right) 到 (\textit{bottom}, \textit{right})(bottom,right)。
// 如果 \textit{left} < \textit{right}left<right 且 \textit{top} < \textit{bottom}top<bottom，则从右到左遍历下侧元素，依次为 (\textit{bottom}, \textit{right} - 1)(bottom,right−1) 到 (\textit{bottom}, \textit{left} + 1)(bottom,left+1)，以及从下到上遍历左侧元素，依次为 (\textit{bottom}, \textit{left})(bottom,left) 到 (\textit{top} + 1, \textit{left})(top+1,left)。
// 遍历完当前层的元素之后，将 \textit{left}left 和 \textit{top}top 分别增加 11，将 \textit{right}right 和 \textit{bottom}bottom 分别减少 11，进入下一层继续遍历，直到遍历完所有元素为止。
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }

    const rows = matrix.length, columns = matrix[0].length;
    const order = [];
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;
};
// 栈的压入、弹出序列
// 输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
// 输出：true
var validateStackSequences = function(pushed, popped) {
    //辅助栈
    const stack = [];
    //指向poped当前的下标
    let index = 0;
    //把pushed的元素一个一个入栈
    for(let i = 0,len=pushed.length-1;i<=len;i++){
        stack.push(pushed[i])
        //把入栈的当前元素和pushed当前指向的元素进行对比
        //相等话就把辅助栈出栈
        //pushed下标往右移动
        while(stack.length !== 0 && stack[stack.length-1] === popped[index]){
            stack.pop()
            index++
        }
    }
    //如果stack为空，说明符合题目
    return !stack.length
};
// 从上到下打印二叉树
var levelOrder = function(root) {
    if (!root) return []
    const queue = [root], res = []
    while (queue.length) {
        const node = queue.shift()
        res.push(node.val)
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
    }
    return res
};
// 输入[3,9,20,null,null,15,7]
// 输出[[3],[9,20],[15,7]]
var levelOrder = function(root) {
    /*  实现BFS 构造队列queue实现 */
    if (!root) return []
    const queue = [[root, 0]], res = []
    while (queue.length) {
        const [node, level] = queue.shift()
        // 判断当前层是否已经初始化设置 [] 若无则初始化一下
        if (!res[level]) res[level] = []
        res[level].push(node.val)
        node.left && queue.push([node.left, level + 1])
        node.right && queue.push([ node.right, level + 1 ])
    }
    return res
};
// 输出 [[3],[20,9],[15,7]]
var levelOrder = function(root) {
    if (!root) return []
    const queue = [[root, 0]], res = []
    while (queue.length) {
        const [node, lev] = queue.shift()
        // 初始化当前层
        if (!res[lev]) res[lev] = []
        // 奇数层 逆序 1 3 5 偶数层 正序 0 2 4
        lev & 1 ? res[lev].unshift(node.val) : res[lev].push(node.val)
        node.left && queue.push([node.left, lev + 1])
        node.right && queue.push([node.right, lev + 1])
    }
    return res
};
// 二叉搜索树的后序遍历序列
// 输入: [1,6,3,2,5]
// 输出: false
var verifyPostorder = function (postorder) {
    let len = postorder.length;
    // 若为叶子节点，则返回 true
    if (len < 2) return true
    // 后序遍历的最后一个元素为根节点
    let root = postorder[len - 1];
    let i = 0
    // 划分左/右子树
    for (; i < len - 1; i++) {
        if (postorder[i] > root) break
    }
    // 判断右子树中的元素是否都大于 root，此处用到 every (数组 API，数组的每个元素都返回 true 则整体返回 true)
    let result = postorder.slice(i, len - 1).every(x => x > root);
    if (result) {
        // 对左右子树进行递归调用,左右子树通过 i 进行分割
        return verifyPostorder(postorder.slice(0, i)) && verifyPostorder(postorder.slice(i, len - 1))
    } else {
        return false
    }
};
// 二叉树中和为某一值的路径
// [5,4,8,11,null,13,4,7,2,null,null,5,1]
// 22
// [[5,4,11,2],[5,8,4,5]]
var pathSum = function(root, sum) {
	if (root === null) return [];
	const res = [];
	const DFS = (root, sum, tmp) => {
	  if (root.val === sum && !root.left && !root.right) {
		  res.push(tmp);
	  }
	  tmp.push(root.val);
	  if (root.left) DFS(root.left, sum - root.val, tmp.slice());
	  if (root.right) DFS(root.right, sum - root.val, tmp.slice());
	}
	DFS(root, sum, []);
	return res;
};
// 字符串的排列
// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
var permutation = function (s) {
    if (s.length === 1) {
        return Array.from(s)
    } else {
        let resArr = permutation(s.slice(1, s.length))
        let newResArr = new Set()
        resArr.forEach(str => {
            for (let i = 0; i <= str.length; i++) {
                let newStr = str.slice(0, i) + s[0] + str.slice(i, str.length)
                if (!newResArr.has(newStr)) {
                    newResArr.add(newStr)
                }
            }
        })
        return [...newResArr]
    }
};
// 数组中出现次数超过一半的数字
// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2
var majorityElement = function(nums) {
    let ans = 0, count = 0;
    for(let i = 0; i < nums.length; i++){
        if(!count) {
            ans = nums[i];
            count++;
        }else count += nums[i] === ans ? 1 : -1;
    }
    return ans;
};
// 最小的k个数 输入整数数组 arr ，找出其中最小的 k 个数
// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]
var getLeastNumbers = function(arr, k) {
    return arr.sort((a, b) => a - b).slice(0, k)
};
var getLeastNumbers = function(arr, k) {
    let len = arr.length
    if (!len || !k) return []
    let start = 0
    let end = len - 1
    // 寻找一次标杆元素的位置
    let index = quikSort(arr, start, end)
    // 如果标杆元素的位置不等于 K
    while(index !== k - 1) {
        if (index > k-1) {
            // 如果上一次查找，标杆元素位置大于目标位置
            end = index-1
            index = quikSort(arr, start, end)
        } else {
            // 如果上一次查找，标杆元素位置小于目标位置
            start = index + 1
            index = quikSort(arr, start, end)
        }
    }
    return arr.slice(0, index+1)
};
function quikSort(arr, left, right) {
    let pivot = arr[left]
    while(left < right) {
        while(left < right && arr[right] >= pivot) right--
        arr[left] = arr[right]
        while(left < right && arr[left] < pivot) left++
        arr[right] = arr[left]
    }
    arr[left] = pivot
    return left
}
// 1～n 整数中 1 出现的次数
// 输入：n = 12
// 输出：5
var countDigitOne = function(n) {
    let count = 0;
    for (let i = 1; i <= n; i *= 10) {
        let divide = i * 10;
        let p = Math.floor(n / divide), k = n % divide, rest = 0;

        count += p * i;
        rest = (k > (2 * i - 1)) ? i : ((k < i) ? 0 : k - i + 1);
        count += rest;
    }
    return count;
};
// 把数组排成最小的数 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个
// 输入: [10,2]
// 输出: "102"
var minNumber = function(nums) {
    return nums.sort((a,b) => ('' + a + b) - ('' + b + a)).join('');
};
var minNumber = function (nums) {
    var res = sortMin(nums.map(String))
    return res.join('')
    function sortMin(array) {
        quickSort(0, array.length - 1)
        return array
        function quickSort(i, j) {
            if (i < j) {
                var left = i
                var right = j
                var pivot = array[i]
                while (left < right) {
                    while (left < right && pivot + array[right] <= array[right] + pivot) {
                        right--
                    }
                    if (left < right) {
                        array[left++] = array[right]
                    }
                    while (left < right && pivot + array[left] >= array[left] + pivot) {
                        left++
                    }
                    if (left < right) {
                        array[right--] = array[left]
                    }
                }
                array[left] = pivot
                quickSort(i, left - 1)
                quickSort(left + 1, j)
            }
        }
    }
};
// 丑数 我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。
// 输入: n = 10
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数
var nthUglyNumber = function(n) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    let p2 = 1, p3 = 1, p5 = 1;
    for (let i = 2; i <= n; i++) {
        const num2 = dp[p2] * 2, num3 = dp[p3] * 3, num5 = dp[p5] * 5;
        dp[i] = Math.min(Math.min(num2, num3), num5);
        if (dp[i] === num2) {
            p2++;
        }
        if (dp[i] === num3) {
            p3++;
        }
        if (dp[i] === num5) {
            p5++;
        }
    }
    return dp[n];
};
// 第一个只出现一次的字符 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母
// s = "abaccdeff"
// 返回 "b"
var firstUniqChar = function(s) {
	// 创建一个对象，对数组或者对象的每个元素或属性调用iteratee迭代器后生成这个对象的键，键的值是这个键出现的次数
    const frequency = _.countBy(s);
    for (const [i, ch] of Array.from(s).entries()) {
        if (frequency[ch] === 1) {
            return ch;
        }
    }
    return '';
};
// 数组中的逆序对 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对
// 输入: [7,5,6,4]
// 输出: 5
var reversePairs = function (nums) {
    return merge_Sort(nums, 0, nums.length - 1)
};
function merge_Sort(arr, l, r) {
   if (l >= r) {
       return 0
   }
   let mid = Math.floor((l + r) / 2)
   let res = merge_Sort(arr, l, mid) + merge_Sort(arr, mid + 1, r)
   let i = l
   let j = mid + 1
   const temp = []
   while (i <= mid && j <= r) {
       if (arr[i] <= arr[j]) {
           temp.push(arr[i])
           i++
       } else {
           temp.push(arr[j])
           j++
            // 如果当前i大于j的数字，则i到mid所有数字大于j的数
           res += mid - i + 1
       }
   }
   while (i <= mid) {
       temp.push(arr[i])
       i++
   }
   while (j <= r) {
       temp.push(arr[j])
       j++
   }
   for (let i = l, j = 0; i <= r; i++, j++) {
       arr[i] = temp[j]
   }
   return res
}
// 数组中只出现一次的数字
// 输入: [2,2,1]
// 输出: 1
var singleNumber = function(nums) {
    let ans = 0;
    for(const num of nums) {
		// 异或运算是二进制数按位做异或运算再赋值 相同取0，不同取1
        ans ^= num;
    }
    return ans;
};
// 和为s的连续正数序列 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）
// 输入：9
// 返回值：[[2,3,4],[4,5]]
// 没有参照物数组 但是可以根据下标
// 滑动窗口（双指针）
var findContinuousSequence = function(target) {
    let l=1
    let r=2
    let sum = 3
    let res=[]
    // 滑动窗口框架
    while(l<r){
        if(sum===target){
            let ans =[]
            for(let k=l;k<=r;k++){
                ans[k-l]=k
            }
            res.push(ans)
            // 等于的情况 我们可以继续窗口往右搜索 同时缩小左边的
             sum=sum-l
             l++
        } else if(sum>target){
            // 大于的条件 缩小窗口 sum已经加过了
            sum=sum-l
            l++
        } else {
            // 小于的情况 滑动窗口继续扩大
            r++
            sum=sum+r
        }
    }
    return res
};
// 和为s的两个数字
// 输入：nums = [2,7,11,15], target = 9
// 输出：[2,7] 或者 [7,2]
var twoSum = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while(l < r){
        if(nums[l] + nums[r] === target) return [nums[l], nums[r]];
        else if (nums[l] + nums[r] > target) r--;
        else l++;
    }
    return null;
};
// 左旋转字符串 
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
var reverseLeftWords = function(s, n) {
    // 1. 库函数
    return s.slice(n) + s.slice(0, n);
    // 2. 分治思想 分为左右两部分 最后想加 时间复杂度O(n) 空间复杂度O(1)
    let l = r = '';
    for (let c of s) 
        n-- > 0 ? (r += c): (l += c);
    return l + r
};
// 旋转字符串
// 给定两个字符串, A 和 B。A 的旋转操作就是将 A 最左边的字符移动到最右边。如果在若干次旋转操作之后，A 能变成B，那么返回True
// 输入: A = 'abcde', B = 'cdeab'
// 输出: true
var rotateString = function(A, B) {
    if(A.length!=B.length) return false;
    let A1 = A.concat(A)
    return A1.includes(B)
};
// 翻转单词序列
// 输入: "the sky is blue"
// 输出: "blue is sky the"
var reverseWords = function(s) {
    // 1. 调用库函数 Array.prototype.reverse
    return s.trim().split(/\s+/).reverse().join(' ')
    // 2. 实现库函数方法
    const reverse = a => {
        // 两端指针实现 数组项翻转
        const swap = (a, i, j) => [a[i], a[j]] = [a[j], a[i]]
        let l = 0, r = a.length - 1
        while (l < r) swap(a, l++, r--)
        return a
    }
    return reverse(s.trim().split(/\s+/)).join(' ') 
};
// 扑克牌顺子 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的
// 输入: [1,2,3,4,5]
// 输出: True
var isStraight = function(nums) {
    /* 
       分治思想 五张牌构成顺子的充分条件需要满足
       1. 不重复 使用Set去重
       2. max - min < 5 最大牌值 减去 最小牌值 小于5 且跳过大小王
    */
    const set = new Set()
    let min = 14, max = 0 // ⚠️ min和max的初始值是两个边界值[0, 13]
    for (const num of nums) {
        // 遇到大小王 跳过
        if (!num) continue
        // 遇到重复则直接 返回false
        if (set.has(num)) return false
        set.add(num)
        // 迭代更新 min和max 以及set
        min = Math.min(min, num)
        max = Math.max(max, num)
    }
    return max - min < 5
};
// 求1+2+…+n
// 输入: n = 3
// 输出: 6
var sumNums = function(n) {
	return n && n + sumNums(n - 1);
};
// 不用加减乘除做加法
var add = function(a, b) {
    while (b) {
        let c = (a & b) << 1 // 进位
        a ^= b               // 非进位和
        b = c                // 进位
    }
    return a
};
// 数组中重复的数字
// 输入：[2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 
var findRepeatNumber = function(nums) {
    const test = []
    const lt = nums.length;
    for (let i = 0; i < lt; i++) {
        if (test[nums[i]] !== 1) {
            test[nums[i]] = 1
        } else {
            return nums[i];
        }
    }
}; 
// 二叉搜索树的第k个结点 给定一棵二叉搜索树，请找出其中第k大的节点。
// 输入: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 4
const kthLargest = (root, k) => {
    // 中序遍历(访问右节点在前)：右-根-左
    const unInOrder = (node, arr = []) => {
        if (node) {
            unInOrder(node.right, arr);
            arr.push(node.val);
            unInOrder(node.left, arr);
        }
        return arr;
    };
    const res = [];
    unInOrder(root, res);
    // 得到从大到小排序的数组
    // console.log(res);
    return res[k - 1];
};
// 矩阵中的路径 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true
var exist = function(board, word) {
	// 二维数组跟树不同 做DFS的时候 有不同的起点
	for(let i=0;i<board.length;i++){
		// 因为是矩阵 board[0]
	  for(let j=0;j<board[0].length;j++){
		if(dfs(board,word,i,j,0)){
		  return true
		}
	  }
	}
	return false
	// DFS 最后一步拿到结果 回溯的时候 上层（栈底）才能拿到值
	function dfs(board,word,i,j,k){
	  // 递归的base case
	  if(i<0||j<0||i>=board.length||j>=board[0].length||board[i][j]!==word[k]){
		return false
	  }
	  if(k===word.length-1){
		console.log('k',k)
		return true
	  }
	  board[i][j] ='' // 标记下已经查找过的
	  // !上下左右 每次进去 k+1==>表示 走了多少步
	  let res =dfs(board,word,i-1,j,k+1)||dfs(board,word,i+1,j,k+1)||dfs(board,word,i,j-1,k+1)||dfs(board,word,i,j+1,k+1)
	  // 撤销
	  board[i][j]=word[k]
	  return res
	}
};
// 数字在升序数组中出现的次数
function singleNumbers(nums, target) {
	let ret = 0;
    for (let val in nums) {
        if (val == target)
            ++ret;
    }
    return ret
}