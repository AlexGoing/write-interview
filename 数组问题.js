// 俄罗斯套娃信封问题
var maxEnvelopes = function(envelopes) {
	if (envelopes.length === 1) return 1;
	  envelopes.sort((a, b) => {
		  if (a[0] !== b[0]) return a[0] - b[0];
		  else return b[1] - a[1];
	  });
	  let LISArr = [];
	  for (let [key, value] of envelopes) {
		LISArr.push(value);
	  }
	  console.log( LISArr);
	  return LIS(LISArr);
  };
  function LIS(arr) {
	let dp = [];
	let maxAns = 0;
	for (let i = 0; i < arr.length; i++) {
	  dp[i] = 1;
	}
	for (let i = 1; i < arr.length; i++) {
	  for (let j = i; j >= 0; j--) {
		if (arr[i] > arr[j]) {
		  dp[i] = Math.max(dp[i], dp[j] + 1)
		}
		maxAns = Math.max(maxAns, dp[i]);
	  }
	}
	return maxAns;
  }
//   给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
var findLengthOfLCIS = function(nums) {
    if (nums.length === 0) return 0;
    const n = nums.length;
    let left = 0, right = 1;
    let globalMaxLen = 1, maxLen = 1;
    while (right < n) {
        if (nums[right] > nums[left]) maxLen++;
        else {
            maxLen = 1;
        }
        left++;
        right++;
        globalMaxLen = Math.max(globalMaxLen, maxLen);
    }
    return globalMaxLen;
};
// 最长连续序列，给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
//  [100,4,200,1,3,2]->[1, 2, 3, 4]
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    const set = new Set(nums);
    const n = nums.length;
    let globalLongest = 1;
    for (let i = 0; i < n; i++) {
        if (!set.has(nums[i] - 1)) {
            let longest = 1;
            let currentNum = nums[i];
            while (set.has(currentNum + 1)) {
                currentNum += 1;
                longest++;
            }
            globalLongest = Math.max(globalLongest, longest);
        }
    }
    return globalLongest;
};
// 盛最多水的容器
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
var maxArea = function(height) {
    let n = height.length;
    let left = 0, right = n - 1;
    let maxOpacity = 0;
    while (left < right) {
        let res = Math.min(height[left], height[right]) * (right - left);
        maxOpacity = Math.max(maxOpacity, res);
        if (height[left] < height[right]) left++
        else right--;
    }
    return maxOpacity;
};
//  寻找两个正序数组的中位数，给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 
// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
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
// 删除有序数组中的重复项
// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：[0,1,2,3,4]
var removeDuplicates = function(nums) {
	if (nums.length <= 1) return nums.length;
	let lo = 0, hi = 0;
	while (hi < nums.length) {
	  while (nums[lo] === nums[hi] && hi < nums.length) hi++;
	  if (nums[lo] !== nums[hi] && hi < nums.length) {
		lo++;
		nums[lo] = nums[hi];
	  }
	  hi++;
	}
	return lo + 1;
  };
//  和为K的子数组，给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
// 输入:nums = [1,1,1], k = 2
// 输出: 2 
var subarraySum = function(nums, k) {
    let cnt = 0;
    let sum0_i = 0, sum0_j = 0;
    let map = new Map();
    map.set(0, 1);
    for (let i = 0; i <= nums.length; i++) {
        sum0_i += nums[i];
        sum0_j = sum0_i - k;
        console.log('map', sum0_j, map.get(sum0_j))
        if (map.has(sum0_j)) {
            cnt += map.get(sum0_j);
        }
        let sumCnt = map.get(sum0_i) || 0;
        map.set(sum0_i, sumCnt + 1);
    }
    return cnt;
};
// 两数之和，给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
var twoSum = function(nums, target) {
	let map2 = new Map();
	for (let i = 0; i < nums.length; i++) {
	  map2.set(nums[i], i);
	}
	for (let i = 0; i < nums.length; i++) {
	  if (map2.has(target - nums[i]) && map2.get(target - nums[i]) !== i) return [i, map2.get(target - nums[i])]
	}
};
// 接雨水，给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
var trap = function(height) {
    let l_max = [], r_max = [];
    let len = height.length;
    let maxCapacity = 0;
    for (let i = 0; i < len; i++) {
        l_max[i] = height[i];
        r_max[i] = height[i];
    }
    for (let i = 1; i < len; i++) {
        l_max[i] = Math.max(l_max[i - 1], height[i]);
    }
    for (let j = len - 2; j >= 0; j--) {
        r_max[j] = Math.max(r_max[j + 1], height[j]);
    }
    for (let i = 0; i < len; i++) {
        maxCapacity += Math.min(l_max[i], r_max[i]) - height[i];
    }
    return maxCapacity;
};
// 跳跃游戏，给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。
// 输入：nums = [2,3,1,1,4]
// 输出：true
var canJump = function(nums) {
    let faster = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        faster = Math.max(faster, i + nums[i]);
        if (faster <= i) return false;
    }
    return faster >= nums.length - 1;
};
// 多个数组取交集
arr.reduce((a, b) => a.filter(c => b.includes(c)));
// 字符的最短距离
// 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。
// 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。
// 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。
var shortestToChar = function(s, c) {
    const res = Array(s.length)
    const indexArr = []
    for (let i = 0; i <s.length; i++) {
        if (s[i] ===c) {
            indexArr.push(i)
        }
    }
    for (let i = 0; i <s.length; i++) {
        res[i] = indexArr.reduce((tmp, item) => {
            return Math.min(tmp, Math.abs(i - item))
        }, 10000)
    }
    return res
};
// s输入：[1,2,2],[3,6,7]
// 输出：[1, 2, 2, 3, 6, 7] 快手二面
function test(arr1, arr2) {
    let res = arr1.concat(arr2);
    res.sort((a,b)=> a-b)
    return res;
}