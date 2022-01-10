function ex1() {
  function SuperType() {
    this.colors = ["red"];
  }

  function SubType() {}
  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;
  var subT = new SubType();

  subT.colors.push("green");
  console.log(subT);

  var subT2 = new SubType();
  subT2.colors.push("blue");

  console.log(subT2);
}
// ex1();

// 1. 原型链继承
// 缺点
// 1、多个实例对引用类型的操作会被篡改
// 2、子类型的原型上的 constructor 属性被重写了
// 3、给子类型原型添加属性和方法必须在替换原型之后
// 4、创建子类型实例时无法向父类型的构造函数传参

function ex2() {
  function SuperType() {
    this.colors = ["red"];
  }
  function SubType() {
    SuperType.call(this);
  }
  var a = new SubType();
  a.colors.push("a");
  var b = new SubType();
  b.colors.push("b");
  console.log(a, a.colors);
  console.log(b, b.colors);
}
// ex2();
// 2. 借用构造函数继承
// 缺点
//   1. 只能继承实例属性和方法，无法继承原型链上的
//   2. 每个子类都有父类实例方法的副本

function ex3() {
  function SuperType(name) {
    this.name = name;
    this.colors = ["superType"];
  }
  SuperType.prototype.saySuper = function () {
    console.log(this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }

  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  const ins1 = new SubType("sub1", 1);
  const ins2 = new SubType("sub2", 2);
  ins1.colors.push("ins1");
  ins2.colors.push("ins2");
  ins1.saySuper();
  ins2.saySuper();
  console.log(ins1, ins2);
}
// ex3();
// 3. 组合继承
// 缺点
//   子类创建实例的时候，原型对象上会存有相同的两份属性/方法

function ex4() {
  function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
    prototype.constructor = subType;
    subType.prototype = prototype;
  }

  function SuperType(name) {
    this.name = name;
    this.colors = ["superType"];
  }

  SuperType.prototype.sayName = function () {
    console.log(this.name);
  };

  function SubType(age, name) {
    SuperType.call(this, name);
    this.age = age;
  }

  inheritPrototype(SubType, SuperType);

  SubType.prototype.sayAge = function () {
    console.log(this.age);
  };
  const ins1 = new SubType(1, "ins1");
  const ins2 = new SubType(2, "ins2");
  ins1.colors.push("ins1");
  ins2.colors.push("ins2");
  ins1.sayName();
  ins1.sayAge();
  ins2.sayName();
  ins2.sayAge();
  console.log(ins1, ins2);
}
// ex4();
// 4. 寄生组合式继承
// 最成熟的继承
