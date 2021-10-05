// iobject.is
const is= (x, y) => {
    if (x === y) {
      // +0和-0应该不相等
      return x !== 0 || y !== 0 || 1/x === 1/y;
    } else {
      return x !== x && y !== y;
    }
}
// instanceof
function myinstanceof(left, right) {
	if(typeof left !== 'object' || !left) {
		return false
	}
	let proto = Object.getPrototypeOf(left);
	while(true) {
		if(proto === null) {
			return false;
		}
		if(proto === right.prototype) {
			return true
		}
		proto = Object.getPrototypeOf(proto);
	}
}
// 法2
function myinstanceof(left, right) {
	return right.prototype.isPrototypeOf(left);
}
// Object.is
function myis(a, b) {
	if(a === b) {
		return a !== 0 || 1/x === 1/y;
	}
	else {
		return a !== a && b !== b;
	}
}
// object.assign
if (typeof Object.myAssign !== 'function') {
	Object.defineProperty(Object, 'myAssign', {
	  value: function(target) {
		if (target == null) {
		  throw new Error('Can\'t convert undefined or null to obj')
		}
		var to = Object(target)
		for (var index = 1; index < arguments.length; i+=1) {
		  var source = arguments[index]
		  if (source != null) {
			for (var key in source) {
			  if (Object.prototype.hasOwnProperty.call(source, key)) {
				to[key] = source[key]
			  }
			}
		  }
		}
	  },
	  writable: true,
	  configurable: true
	})
 }
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}