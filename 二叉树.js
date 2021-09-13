
// 二叉树最近公共祖先
let visited;let parent;
var lowestCommonAncestor = function(root, p, q) {
    visited = new Set();
    parent = new Map();
    dfs(root);
    while (p != null) {
        visited.add(p.val);
        p = parent.get(p.val);
    }
    while (q != null) {
        if (visited.has(q.val)) {
            return q;
        }
        q = parent.get(q.val);
    }
    return null;
};
function dfs(root) {
    if (root.left != null) {
        parent.set(root.left.val, root);
        dfs(root.left);
    }
    if (root.right != null) {
        parent.set(root.right.val, root);
        dfs(root.right);
    }
}
// 二叉搜索树 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL
// 输入：[4,2,7,1,3]
// 	2
// 输出 [2,1,3]
var searchBST = function(root, val) {
    if (root == null) return null;
    if (root.val === val) return root;
    if (root.val > val) {
        return searchBST(root.left, val);
    } else if (root.val < val) {
        return searchBST(root.right, val);
    }
};
// 二叉树右视图
var rightSideView = function(root) {
    let nums = [];
    if (!root) return nums;

    let stack = [];
    let p = root;
    let maxDepth = 0;
    let currentDepth = 0;
    while(p || stack.length > 0) {
        while(p) {      //遍历节点的右分支
            currentDepth++;
            if (currentDepth > maxDepth) {    //推入节点
                maxDepth++;
                nums.push(p.val);
            }
            stack.push([p, currentDepth]);
            p = p.right;
        }

        let node = stack.pop();    //回溯
        p = node[0].left;     //对节点的左分支进行遍历
        currentDepth = node[1];  //当前深度也要回溯
    }

    return nums;
};
// 删除二叉搜索树中的节点, 给一个树，
// 删除某个key [5,3,6,2,4,null,7] -> [5,2,6,null,4,null,7]。
var deleteNode = function(root, key) {
    if (root == null) return null;
    if (root.val === key) {
        if (root.left == null && root.right == null) return null;
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        if (root.left != null && root.right != null)  {
            let target = getMinTreeMaxNode(root.left);
            root.val = target.val;
            root.left = deleteNode(root.left, target.val);
        }
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    }
    return root;
};
function getMinTreeMaxNode(root) {
    if (root.right == null) return root;
    return getMinTreeMaxNode(root.right);
}
// 完全二叉树的节点个数
var countNodes = function(root) {
    if (root == null) return 0;
    let l = root, r = root;
    let lh = 0, rh = 0;
    while (l !== null) {
      l = l.left;
      lh++;
    }
    while (r != null) {
      r = r.right;
      rh++;
    }
    if (lh === rh) {
      return Math.pow(2, lh) - 1;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
};
// 二叉树锯齿形层次遍历
var zigzagLevelOrder = function(root) {
    const printArr = []
    if(!root){
        return printArr
    }
    const list = []
    list.push({level:0,node:root})
    while(list.length>0){
        const{level,node} = list.shift()//返回数组原来的第一个元素的值
        if(!printArr[level]){
            printArr[level] = []
        }
        
        if(level % 2 == 0){
            //顺序推入
            printArr[level].push(node.val)//push()向数组末尾添加一个或多个元素，并返回新的长度
        }else{
            //逆序推入
            printArr[level].unshift(node.val) //unshift()向数组的开头添加一个多个元素，并返回新的长度
        }
        
        node.left && list.push({level:level + 1,node:node.left})
        node.right && list.push({level:level +1,node:node.right})
    }
    return printArr
};

//   二叉树所有根到叶子路径组成的数字之和
function sumTree(root, sum = 0) {
	// 1. 判断输入是否合法
	if(!root) {
		return 0;
	}
	// 4. 得出结果
	sum = sum + root.val;
	// 2. 判断递归结束的条件（遍历每个节点，对每个节点判断其是否有左右子树）
	if(!root.left && !root.right) {
		return sum;
	}
	// 3. 寻找路径，将问题小化
	return sumTree(root.left, sum) + sumTree(root.right, sum);
}
// 二叉树的深度
var maxDepth = function(root) {
	if(!root) {
	  return 0;
	}
	return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
// 二叉树的层序遍历  给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。 递归
var levelOrder = function(root) {
    if(!root) return []
    const q = [[root, 0]]
    const res = []
    while(q.length) {
        const [n, level] = q.shift()
        if(!res[level]) {
            res.push([n.val])
        } else {
            res[level].push(n.val)
        }
        if(n.left) q.push([n.left, level + 1])
        if(n.right) q.push([n.right, level + 1])
    }
    return res;
};
// 翻转二叉树
var invertTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
//前序遍历
function ProOrderTraverse(biTree) {
    if (biTree == null) return;
    console.log(biTree.data);
    ProOrderTraverse(biTree.lChild);
    ProOrderTraverse(biTree.rChild);
}
//中序遍历
function InOrderTraverse(biTree) {
    if (biTree == null) return;
    InOrderTraverse(biTree.lChild);
    console.log(biTree.data);
    InOrderTraverse(biTree.rChild);
}
//后续遍历
function PostOrderTraverse(biTree) {
    if (biTree == null) return;
    PostOrderTraverse(biTree.lChild);
    PostOrderTraverse(biTree.rChild);
    console.log(biTree.data);
}
//层续遍历
function levelOrderTraverse(biTree) {
    if (biTree == null) return;
    PostOrderTraverse(biTree.lChild);
    PostOrderTraverse(biTree.rChild);
    console.log(biTree.data);
}
// 平衡二叉树
// [3,9,20,null,null,15,7]
// true
var isBalanced = function(root) {
	return dfs(root) !==-1
	// 后序遍历
	function dfs(root){
	  if(!root){
		return 0
	  }
	  let left = dfs(root.left)
	  if(left===-1){
		return -1
	  }
	  let right = dfs(root.right)
	  if(right===-1){
		return -1
	  }
	  return Math.abs(left-right)>1?-1:Math.max(left,right)+1
	}
};