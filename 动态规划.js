// 给你一个整数数组 nums，最长递增子序列的长度 [10,9,2,5,3,7,101,18] => [2,3,7,101]
var lengthOfLIS = function(nums) {
    let maxLen = 0, n = nums.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = 1;
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
};
// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
var coinChange = function(coins, amount) {
	if (amount === 0) return 0;
	let dp = [];
	for (let i = 0; i <= amount; i++) {
	  dp[i] = amount + 1;
	}
	dp[0] = 0;
	for (let i = 0; i <= amount; i++) {
	  for (let j = 0; j < coins.length; j++) {
		if (i >= coins[j]) {
		  dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
		}
	  }
	}
	return dp[amount] === amount + 1 ? -1 : dp[amount];
  };
// 最长公共子序列【动态规划】 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
// 输入：text1 = "abcde", text2 = "ace" 
// 输出：3
var longestCommonSubsequence = function(text1, text2) {
    let n1 = text1.length, n2 = text2.length;
    let dp = [];
    for (let i = -1; i < n1; i++) {
        dp[i] = [];
        for (let j = -1; j < n2;j++) {
            dp[i][j] = 0;
        }
    }
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < n2; j++) {
            if (text1[i] === text2[j]) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[n1 - 1][n2 - 1];
};
// 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数
// 输入：word1 = "horse", word2 = "ros"
// 输出：3
var minDistance = function(word1, word2) {
	let len1 = word1.length, len2 = word2.length;
	let dp = [];
	for (let i = 0; i <= len1; i++) {
	  dp[i] = [];
	  for (let j = 0; j <= len2; j++) {
		dp[i][j] = 0;
		if (i === 0) {
		  dp[i][j] = j;
		}
		if (j === 0) {
		  dp[i][j] = i;
		}
	  }
	}
	for (let i = 1; i <= len1; i++) {
	  for (let j = 1; j <= len2; j++) {
		if (word1[i - 1] === word2[j - 1]) {
		  dp[i][j] = dp[i - 1][j - 1];
		} else {
		  dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
		}
	  }
	}
	return dp[len1][len2];
  };
// 最长回文子序列【动态规划】给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度 
// "bbbab" "bbbb" 4
var longestPalindromeSubseq = function(s) {
    let dp = [];
    for (let i = 0; i < s.length; i++) {
        dp[i] = [];
        for (let j = 0; j < s.length; j++) {
            dp[i][j] = 0;
        }
        dp[i][i] = 1;
    }
    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < s.length; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[0][s.length - 1];
};
// 最大子序和 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和 
// [-2,1,-3,4,-1,2,1,-5,4]
//  [4,-1,2,1] 6
var maxSubArray = function(nums) {
    let maxSum = -Infinity;
    let dp = [], n = nums.length;
    for (let i = -1; i < n; i++) {
        dp[i] = 0;
    }
    for (let i = 0; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }
    return maxSum;
};
// 买卖股票的最好时机
var maxProfit = function(prices) {
	let dp = [];
	for (let i = -1; i < prices.length; i++) {
	  dp[i] = []
	  for (let j = 0; j <= 1; j++) {
		dp[i][j] = [];
		dp[i][j][0] = 0;
		dp[i][j][1] = 0;
		if (i === -1) {
		  dp[i][j][1] = -Infinity;
		}
		if (j === 0) {
		  dp[i][j][1] = -Infinity;
		}
		if (j === -1) {
		  dp[i][j][1] = -Infinity;
		}
	  }
	}
	for (let i = 0; i < prices.length; i++) {
	  for (let j = 1; j <= 1; j++) {
		dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
		dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
	  }
	}
	return dp[prices.length - 1][1][0];
  };
// 二维数组，所有的排列组合 [[A, B], [a, b], [1, 2, 3]] 美团大c端一面
function serialArray(arr){
    var lengthArr = [];  
    var productArr = []; 
    var result = [];
    var length = 1;
    for(var i = 0; i < arr.length; i++){
	var len = arr[i].length;
	lengthArr.push(len);
	var product = i === 0 ? 1 : arr[i - 1].length * productArr[i - 1];
	productArr.push(product);
	length *= len;
    }	
    for(var i = 0; i < length; i++){
	var resultItem = '';
	for(var j = 0; j < arr.length ; j ++){
	      resultItem += arr[j][Math.floor(i / productArr[j]) % lengthArr[j]];
	}
	result.push(resultItem);
    }
    return result
}
// 生成随机数
function rand(min,max) {
	return Math.floor(Math.random()*(max-min))+min;
}
// 生成随机数组
function randArray(len, min, max) {
	return Array.from({length:len}, v=> Math.floor(Math.random()*(max-min))+min);
};
//  爬楼梯 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
var climbStairs = function(n) {
    let p = 0, q = 0, r = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
}; 
// 法2 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1
var numWays = function(n) {
    let sum = 0;
    let x = 1;
    let y = 1;
    for(let i =0;i < n;i++){
        sum = (x + y)%1000000007;
        x = y;
        y = sum
    } 
    return x;
};