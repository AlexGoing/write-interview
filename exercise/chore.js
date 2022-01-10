var length = 10;
function fn() {
  console.log(this);

  return this.length + 1;
}
var obj1 = {
  length: 5,
  test1: function () {
    console.log(this);

    return fn();
  },
};
obj1.test2 = fn;
// console.log(obj1.test1.call());
// console.log(obj1.test1());
// console.log(obj1.test2.call());
// console.log(obj1.test2());

// fn
// fn
// 报错
// 11

// f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']

function traverse(arr) {
  const obj = {};

  arr.forEach((item) => {
    if (obj[item]) {
      obj[item]++;
    } else {
      obj[item] = 1;
    }
  });

  let keys = Object.keys(obj);
  const del = keys.filter((key) => obj[key] === 1);
  del.forEach((item) => delete obj[item]);
  const res = [];

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    res.push(`${arr[i]}${obj[arr[i]] ? obj[arr[i]] : ""}`);
    if (arr[i] in obj) {
      obj[arr[i]] -= 1;
    }
  }

  const rawOrderRes = [];
  for (let i = res.length - 1; i >= 0; i -= 1) {
    rawOrderRes.push(res[i]);
  }

  return rawOrderRes;
}

console.log(traverse(["ab", "c", "d", "ab", "c"]));
