// 寻找两个正序数组的中位数 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    let i = 0, j = 0;
    let newArr = [];
    while (i < m && j < n) {
        if (nums1[i] < nums2[j]) {
            newArr.push(nums1[i++]);
        } else {
            newArr.push(nums2[j++]);
        }
    }
    newArr = newArr.concat(i < m ? nums1.slice(i) : nums2.slice(j));
    const len = newArr.length;
    console.log(newArr)
    if (len % 2 === 0) {
        return (newArr[len / 2] + newArr[len / 2 - 1]) / 2;
    } else {
        return newArr[Math.floor(len / 2)];
    }
};
// 给一个驼峰数组  输出最大值的下标
// 输入：[1,3,6,7,30,29,27,3,2]
// 输出：4
function binarySearch(array) {
    let left = 0;
    let right = array.length;
    let mid = left + Math.floor((right - left) / 2);
    let firstVal = array[mid];
    let leftVal = array[mid - 1];
    let rightVal = array[mid + 1];
    if((firstVal > leftVal) && (firstVal > rightVal)) {
        return mid;
    }
    else {
        return (leftVal > rightVal) 
            ? mid - 1
            : mid + 1;
    }
};
binarySearch([1,3,6,7,30,29,27,3,2])
console.log(this.binarySearch([1,3,6,7,30,29,27,3,2]));
// 判断子序列【二分查找】给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
// 输入：s = "abc", t = "ahbgdc"
// 输出：true
var isSubsequence = function(s, t) {
    let hash = {};
    for (let i = 0; i < t.length; i++) {
        if (!hash[t[i]]) hash[t[i]] = [];
        hash[t[i]].push(i);
    }
    let lastMaxIndex = 0;
    for (let i = 0; i < s.length; i++) {
        if (hash[s[i]]) {
            const index = binarySearch(hash[s[i]], lastMaxIndex);
            console.log('index', index, hash[s[i]]);
            if (index === -1) return false;
            lastMaxIndex = hash[s[i]][index] + 1;
        } else return false;
    }
    return true;
};
function binarySearch(array, targetIndex) {
    let left = 0, right = array.length;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (array[mid] >= targetIndex) {
            right = mid;
        } else if (array[mid] < targetIndex) {
            left = mid + 1;
        }
    }
    if (left >= array.length || array[left] < targetIndex) return -1;
    return left;
}
// 在排序数组中找出给定目标值在数组中的开始位置和结束位置【二分搜索
var searchRange = function(nums, target) {
    const left = leftBound(nums, target);
    const right = rightBound(nums, target);
    return [left, right];
};
function leftBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    if (left >= nums.length || nums[left] !== target) {
        return -1;
    }
    return left;
}
function rightBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            left = mid + 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    if (right < 0 || nums[right] !== target) {
        return -1;
    }
    return right;
}
// x 的平方根、
// 输入: 4
// 输出: 2
var mySqrt = function(x) {
	if(x < 0) return NaN;
	if(x == 0) return 0;
  
	let min = 1;
	let max = x;
	while(max - min > 1){
		let mid = Math.ceil((max + min)/2);
		if (mid*mid < x ) {
			min = mid;
		} else if (mid*mid > x) {
			max = mid;
		} else {
			return mid
		}
	};
	  return min;
 }