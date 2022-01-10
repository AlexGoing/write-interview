// ✅ 判断一个链表是否为回文链表
// 利用链表的后续遍历，使用函数调用栈作为后序遍历栈，来判断是否回文
// https://leetcode-cn.com/problems/palindrome-linked-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  var prev = head;
  function recursivJudge(root) {
    if (root === null) return true;
    if (!recursivJudge(root.next)) {
      return false;
    }
    if (root.val !== prev.val) {
      return false;
    }
    prev = prev.next;
    return true;
  }
  return recursivJudge(head);
};
// ✅ 反转链表
// https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/
var reverseList = function (head) {
  if (head == null || head.next == null) return head;
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
// ✅ 合并两个排序的链表
// https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/submissions/
var mergeTwoLists = function (l1, l2) {
  // head为链表，pre为指针
  const head = new ListNode(-1);
  let pre = head;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      pre.next = l1;
      pre = pre.next;
      l1 = l1.next;
    } else {
      pre.next = l2;
      pre = pre.next;
      l2 = l2.next;
    }
  }
  if (l1 === null) {
    pre.next = l2;
  }
  if (l2 === null) {
    pre.next = l1;
  }
  return head.next;
};
var mergeTwoLists = function (l1, l2) {
  console.log("还有递归解法");
};
// ✅ 合并K个升序链表 给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6] 快手2面
// 1. 算是二分的处理
var mergeKLists = function (lists) {
  if (lists.length === 0) return null;
  return mergeArr(lists);
};
function mergeArr(lists) {
  if (lists.length <= 1) return lists[0];
  let index = Math.floor(lists.length / 2);
  const left = mergeArr(lists.slice(0, index));
  const right = mergeArr(lists.slice(index));
  return merge(left, right);
}
function merge(l1, l2) {
  if (l1 == null && l2 == null) return null;
  if (l1 != null && l2 == null) return l1;
  if (l1 == null && l2 != null) return l2;
  let newHead = null,
    head = null;
  while (l1 != null && l2 != null) {
    if (l1.val < l2.val) {
      if (!head) {
        newHead = l1;
        head = l1;
      } else {
        newHead.next = l1;
        newHead = newHead.next;
      }
      l1 = l1.next;
    } else {
      if (!head) {
        newHead = l2;
        head = l2;
      } else {
        newHead.next = l2;
        newHead = newHead.next;
      }
      l2 = l2.next;
    }
  }
  newHead.next = l1 ? l1 : l2;
  return head;
}
// 2. 还有简单的迭代
// 3. 借助优先队列
var mergeKLists = function (lists) {
  function MinPriorityQueue() {
    this.store = [];
    this.enqueue = function (obj, val) {
      if (this.store.length === 0) {
        this.store.push(obj);
      } else {
        // 找到index
        var index = 0;
        // console.log(this.store, this.store[index], this.store[index].val)
        while (this.store[index] && this.store[index].val < val) {
          index++;
        }
        this.store.splice(index, 0, obj);
      }
    };
    this.dqueue = function () {
      return this.store.shift();
    };
    this.isEmpty = function () {
      return this.store.length === 0;
    };
  }
  var Q = new MinPriorityQueue();
  var pre = (curr = new ListNode(-1));
  for (var i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      Q.enqueue(lists[i], lists[i].val);
    }
  }
  while (!Q.isEmpty()) {
    const element = Q.dqueue();

    const { next } = element;
    curr.next = element;
    curr = curr.next;
    if (next) {
      Q.enqueue(next, next.val);
    }
  }
  return pre.next;
};

// 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表
// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]
// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
var reverseKGroup = function (head, k) {
  let a = head,
    b = head;
  for (let i = 0; i < k; i++) {
    if (b == null) return head;
    b = b.next;
  }
  const newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};
function reverse(a, b) {
  let prev = null,
    cur = a,
    nxt = a;
  while (cur != b) {
    nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
// ✅ 给定一个链表，判断链表中是否有环。
// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// https://leetcode-cn.com/problems/linked-list-cycle/
var hasCycle = function (head) {
  if (head == null || head.next == null) return false;
  let slower = head,
    faster = head;
  while (faster != null && faster.next != null) {
    slower = slower.next;
    faster = faster.next.next;
    if (slower === faster) return true;
  }
  return false;
};
// ✅ 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表
// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]
// https://leetcode-cn.com/problems/sort-list/
// https://leetcode-cn.com/problems/7WHec2/
// 用了 1. 合并两个升序链表 2. 二分，找到中间节点
function mergeSort(head) {
  if (head === null) return null;
  if (head.next != null) {
    let slower = getCenter(head);
    let nxt = slower.next;
    slower.next = null;
    console.log(head, slower, nxt);
    const left = mergeSort(head);
    const right = mergeSort(nxt);
    head = merge(left, right);
  }
  return head;
}
function merge(left, right) {
  let newHead = null,
    head = null;
  while (left != null && right != null) {
    if (left.val < right.val) {
      if (!head) {
        newHead = left;
        head = left;
      } else {
        newHead.next = left;
        newHead = newHead.next;
      }
      left = left.next;
    } else {
      if (!head) {
        newHead = right;
        head = right;
      } else {
        newHead.next = right;
        newHead = newHead.next;
      }
      right = right.next;
    }
  }
  newHead.next = left ? left : right;
  return head;
}
function getCenter(head) {
  let slower = head,
    faster = head.next;
  while (faster != null && faster.next != null) {
    slower = slower.next;
    faster = faster.next.next;
  }
  return slower;
}
// ✅ 相交链表 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) return null;
  var pA = headA;
  var pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};
// a + b + c = b + a + c
// 所以都会最后碰到相等的情况
var getIntersectionNode = function (headA, headB) {
  var set = new Set();
  var temp = headA;
  while (temp !== null) {
    set.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (set.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};

// 给定一个链表: 1->2->3->4->5, 和 n = 2.

// 当删除了倒数第二个节点后，链表变为 1->2->3->5.
// 说明：

// 给定的 n 保证是有效的。
// ✅ https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
var removeNthFromEnd = function (head, n) {
  var slow = (fast = head);
  while (n-- > 0) {
    fast = fast.next;
  }
  if (fast === null) return head.next;
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}
// ✅ https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/
var deleteNode = function (head, val) {
  var rawHead = head;
  var curr = rawHead;
  var prev = null;
  while (curr !== null) {
    if (curr.val === val) {
      if (prev === null) {
        return curr.next;
      } else {
        prev.next = curr.next;
        curr.next = null;
        return rawHead;
      }
    }
    prev = curr;
    curr = curr.next;
  }
  return rawHead;
};
