// 岛屿的最大面积【DFS】
let maxX, maxY;let visited;let globalMaxArea;
var maxAreaOfIsland = function(grid) {
    visited = new Set();
    maxX = grid.length;
    maxY = grid[0].length;
    globalMaxArea = 0;
    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            if (grid[i][j] === 1) {
                visited.add(`(${i}, ${j})`);
                globalMaxArea = Math.max(globalMaxArea, dfs(grid, i, j));
            }
            visited.clear();
        }
    }
    return globalMaxArea;
};
function dfs(grid, x, y) {
    let res = 1;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (Math.abs(i) === Math.abs(j)) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX >= maxX || newX < 0 || newY >= maxY || newY < 0) continue;
            if (visited.has(`(${newX}, ${newY})`)) continue;
            visited.add(`(${newX}, ${newY})`);
            const areaCnt = grid[newX][newY]
            if (areaCnt === 1) {
                const cnt = dfs(grid, newX, newY);
                res += cnt;
            } 
        }
    }
    return res;
}
// 相同的树 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
// 输入：p = [1,2,3], q = [1,2,3]
// 输出：true
var isSameTree = function(p, q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
