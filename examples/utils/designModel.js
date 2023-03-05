/*==========================================================================
  **定义interface类**
  变量类型，规则定义；
  name: 变量名；methods: 包含属性
  【数值、字符串等简单结构数据，自行用typeof检查；所以这里只实现map结构的】
============================================================================*/
var Interface = function(name, methods) {
  if (arguments.length != 2) {
    throw new Error("lacks argument");
  }

  this.name = name;
  this.methods = [];

  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== "string") {
      throw new Error("method name must be string");
    }
    this.methods.push(methods[i]);
  }
};

/**
 * public static class method. 不会被继承
 * 通过上面的构造函数来定义方法
 * 使用ensureImplemets()来确定其正确性
 * */

Interface.ensureImplements = function(object) {
  if (arguments.length < 2) {
    throw new Error("argument error");
  }

  for (var i = 1, len = arguments.length; i < len; i++) {
    var _interface = arguments[i];
    if (_interface.constructor !== Interface) {
      throw new Error("no constructor");
    }

    for (
      var j = 0, methodsLen = _interface.methods.length;
      j < methodsLen;
      j++
    ) {
      var method = _interface.methods[j];
      if (!object[method] || typeof object[method] !== "function") {
        throw new Error("method not found");
      }
    }
  }
};

var day = new Interface("day", ["zoom", "draw"]);

function displayRoute(map) {
  // 确认参数map是否定义了day中定义的方法
  Interface.ensureImplements(map, day);
}

displayRoute({ zoom: function() {}, draw: function() {} });

/*==========================================================================
  **类的基本定义**
============================================================================*/
var Book = function(newIsbn, newTitle, newAuthor) {
  // private var; [设计模式，模拟私有变量，防止外部访问]
  var isbn, title, author;
  // 常量模仿
  var constants = {
    NAME: "book-name",
    VERSION: 1.1
  };

  function checkIsbn(isbn) {
    return true;
  }
  // 常量
  var ctor = function() {};
  // 绑定
  ctor.getConstants = function() {
    return constants;
  };
  // privileged
  this.setIsbn = function(newIsbn) {
    if (!checkIsbn(newIsbn)) throw new Error("book: invalid isbn");
  };

  this.getTitle = function() {
    return title;
  };

  this.setTitle = function(newIsbn) {
    title = newTitle || "no title";
  };

  this.getAuthor = function() {
    return author;
  };

  this.setAuthor = function(newAuthor) {
    author = newAuthor || "no author";
  };
  // constructor code
  this.setIsbn(newIsbn);
  this.setTitle(newTitle);
  this.setAuthor(newAuthor);

  //return ctor;
};

Book.prototype = {
  display: function() {},
  _version: 7.3
};

/*==========================================================================
  **继承**
  按自己需要的情况来选择下面两种继承方式！
============================================================================*/
/**
 * 原型式继承
 * constructor属性被抹除
 * prototype只有一份;构造函数中this添加的部分，new继承后直接在其中。
 * */

var internet = new Book("aa", "网络安全", "wcs");

/**
 * 类式继承 (模仿extend的实现)
 * 当superClass的构造函数中代码量过多时这样可以避免。
 * 继承后输出还是一个函数。原类的构造函数中this添加部分不在其中。
 */
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.constructor = subClass;
}

function computer() {}

extend(computer, Book);

/*==========================================================================
  **单体模式**
  优点：
  1、几乎使用与任何大小型项目；
  2、划分命名空间，属性与方法的集合；
  3、最基础且常用；只会被实例化一次；
  4、【全局变量较多时可以放与其内，减少全局量数目，特别是引入很多第三方js情况】
  缺点：由于是多属性，方法的集合体，可能导致模块间的强耦合；
============================================================================*/
var Singleton = {
  _name: "Singleton", // 用“_”开头来表示私有
  attribute: true,
  method: function(){
    return 15;
  },
  test: function(){
    // this访问单体内的其它属性，对象
    var c = this.method();
    console.info("c--",c);
  }
}
/**
 * 另一种创建私有变量方法
 * 最后加（）：声明后会立即执行。
 * */
var ss = function(){
  const privateVar = "private";
  return {};
}();
/**
 * 添加检测实例的使用情况
 * 使用时才会运行
 * */
var work = (function(){
  var uniqueInstance;

  // 分支1
  var activeXNew = {
    createXhrObject: function(){
      return new ActiveXObject('Msxml2.XMLH');
    }
  }
  // 分支2
  var standard = {
    createXhrObject: function(){
      return new XMLHttpRequest('Msxml2.XMLH');
    }
  }
  // 单体内容放这里
  function constructor(){
    return {
      draw:function(){},
      // 利用上面创建的分支来返回可用的rpc对象。
      rpc:function(){
        var _http = null;
        try{
          _http = standard.createXhrObject();
          return standard;
        }catch(e){
          try{
            _http = activeXNew.createXhrObject();
            return activeXNew;
          }
          catch(e2){
            throw new Error("no http object");
          }
        }
      },

    }
  }
  console.info("使用时才会运行",uniqueInstance);
  return {
    getInstance: function(){
      // 判断实例是否已经存在
      if(!uniqueInstance){
        uniqueInstance = constructor();
      }

      return uniqueInstance;
    }
  }
})();
// 使用时：先经过检测实例一步再使用
work.getInstance().draw();

/*==================================================
  **链式调用模式**
  优点：
  1、用少量代码达到 “表达复杂操作的目的”，避免多次重复使用一个对象变量；
  2、适用于：单体变量进行连续操作、长步骤类业务流程；
  实现思想：最后用return this返回，实现链式功能；
====================================================*/

(function(){
  function _$(els){
    this.elements = [];
    for(var i=0,len=els.length;i<len;++i){
      var element = els[i];
      if(typeof element==="string"){
        element = document.getElementById(element);
      }
      this.elements.push(element);
    }
  }
  // prototype of _$
  _$.ptototype = {
    each: function(fn){
      for(var i=0,len=this.elements.length;i<len;++i){fn.call(this,this.elements[i]);}
      return this;
    },
    setStyle: function(prop,val){
      this.each(function(el){el.style[prop] = val;});
      return this;
    }
  }
  // a public interface remains the same.
  window.$ = function(){
    return new _$(arguments);
  };
})();

/*==================================================
  **工厂模式**
  优点：
  1、根据条件对不同的类继承，去掉两个类之间的依赖性；
  2、构造函数中不用太多代码；
  3、适用于下面这种类似的逻辑情况（多种类型，有部分共同方法）；
====================================================*/
var Transposion = function(){}
// 各种交通类
var Car = function(){}
var Bycle = function(){}
// 将添加交通工具单独做一个工厂模式
var TransFactory = function(){}
TransFactory.prototype = {
  createTransp: function(model){
    var _m = null;
    var _transType = new Interface("_transType",['name','price']);

    switch(model){
      case 'car':
        _m = new Car();
        break;
      case 'bycle':
        _m = new Bycle();
        break;
      default:
        _m = new Bycle();
        break;
    }
    // 属性检查，保证他们都有必要方法。
    Interface.ensureImplements(_transType,_m);

    return _m;
  }
}
// 交通工具售卖部分，只负责售卖。
Transposion.prototype = {
  sell: function(model){
    var trans = TransFactory.createTransp(model);
    // 其它售卖相关代码...
    return trans;
  }
}
// ###复杂情况的工厂模式，(让各商家自动创建售卖类型)
var Transposion2 = function(){}
Transposion.prototype = {
  sell: function(model){
    var trans = TouchList.createTransp(model);
    // 其它售卖相关代码...
    return trans;
  },
  createTransp: function(){
    throw new Error("请使用继承类重写该方法");
  }
}

var GoogleFamily = function(){}
// 类式继承
extend(GoogleFamily,Transposion2);
// 重写创建交通工具方法
GoogleFamily.prototype.createTransp = function(){
  //...这里使用上面已有的 “createTransp”中方法；
}

/*==================================================
  **桥接模式**
  充当一种中间件的角色，处理两个块接口间数据的差异性，把他们连接起来。
  桥接元素应该是粘合每一个抽象的粘合因子。
  优点：
  1、实现API接口时好用；
  2、将抽象与实现分离（规则与机制分离）；
====================================================*/
function qiao(d){
  //...对其进行抽象的代码
  return d + "-";
}
function API(data){
  let _a = qiao(data);
  //...对其进行具体实现的代码
}

/*==================================================
  **组合模式**
  专为web上创建动态交互界面量身定制的模式。一条命令在多个对象上激发复杂的或递归行为。
  【复杂行为被委托给各个子对象】（把子对象组合形成一个树结构）
  优点：
  1、不用编写大量手工遍历数组的代码；耦合度低；
  2、只需要执行顶层对象的操作，让它们传递下去；
  缺点：
  1、这个层次体系较大时，会带来很大性能影响；
====================================================*/
// --动态表单验证列子
var Composite = new Interface('Composite',['add','getChild']);
var FormItem = new Interface('FormItem',['save']);
// form validation
var CompositeForm = function(id,method,action){
  this.formComponents = [];
  // oping ele
  this.element = document.createElement('form');
  let _e = this.element;
  _e.id = id;
  _e.method = method || "POST";
  _e.action = action || "#";
}

CompositeForm.prototype.add = function(child){
  Interface.ensureImplements(child,Composite,FormItem);
  // 添加配置和新元素
  this.formComponents.push(child);
  this.element.appendChild(child.getElement());
}

CompositeForm.prototype.remove = function(child){
  for(var i=0,len=this.formComponents.length;i<len;i++){
    if(this.formComponents[i]===child){
      this.formComponents.splice(i,1);
      break;
    }
  }
}

CompositeForm.prototype.save = function(child){
  // 每个元素保存操作
  for(var i=0,len=this.formComponents.length;i<len;i++){
    this.formComponents[i].save();
  }
}
// 叶对象实现（各种输入类型的一个父类）
var Field = function(id){
  this.id = id;
  this.element;
}
// prototype
Field.prototype = {
  add:function(){},
  getChild:function(){},
  save:function(){},
  getElement: function(){
    return this.element;
  }
}
// input类
var InputField = function(id,label){
  Field.call(this,id);

  this.input = document.createElement('input');
  this.input.id = id;
  this.label = document.createElement('label');
  var labelTextNode = document.createTextNode(label);
  this.label.appendChild(labelTextNode);

  this.element = document.createElement('div');
  this.element.className = "input-field";
  this.element.appendChild(this.label);
  this.element.appendChild(this.input);
}
// 类继承
extend(InputField,Field);
//--组合使用
var contactForm = new CompositeForm('contact-form','POST','contact.pht');
contactForm.add(new InputField('first-name'),'First name');

/*==================================================
  **门面模式**
  封装一些异同，达到简化使用目的，类似于封装重复代码
  //例如；封装一个为每个元素设置相同样式的API，而不用每个元素都去单独操作一遍
  （如果封装的这个门面不常用，那也没必要封装它）
====================================================*/

/*==================================================
  **适配器模式**
  现有接口和不兼容的类之间适配，相当于在已有接口上的再一层包装
  【一般会改变现有代码去适应老接口，而不去多封装一层开销】
  使用情景较少！
====================================================*/
//例：将arg传到旧接口用
var arg = {a:1,b:2};

function oldApi(a,b){}
function newApi(obj){
  oldApi(obj.a,obj.b);
}

/*==================================================
  **装饰者模式**
  一种为对象添加特性的技术，比起创建子类，这更灵活
  装饰者可对装饰的对象，添加、修改、替换其属性，方法。
  擅长为对象增添新特性
====================================================*/
var Bicycle = new Interface('Bicycle',['assemble','getprice']);
// 公司自行车
var AcmeComfortCruiser = function(){
  this.assemble = function(){},
  this.getPrice = function(){return 499.23;}
}

// 选件父类【装饰器的父类】
var BicycleDecoratory = function(bicycle){
  Interface.ensureImplements(bicycle,Bicycle);
  this.bicycle = bicycle;
}
BicycleDecoratory.prototype = {
  assemble: function(){
    return this.bicycle.assemble();
  },
  getPrice: function(){
    return this.bicycle.getPrice();
  }
}
//选件-灯【lightBuble当做一个装饰器功能（将装饰的对象当做参数传入其中）】
var LightBuble = function(bicycle){
  console.info("LightBuble.superClass--",LightBuble.superClass)
  //LightBuble.superClass.constructor.call(this,bicycle);
  BicycleDecoratory.call(this,bicycle);
}
extend(LightBuble,BicycleDecoratory);
LightBuble.prototype.assemble = function(){
  return this.bicycle.assemble() + '-attach';
}

LightBuble.prototype.getPrice = function(){
  // 单车基本价+选件价格
  return this.bicycle.getPrice() + 15;
}
var myBicycle = new AcmeComfortCruiser();
console.info("price without light--",myBicycle);
myBicycle = new LightBuble(myBicycle);
console.info("price with light--",myBicycle.getPrice())

/*==================================================
  **享元模式**
  将数据的内在状态（已固定，不会变化）和外在状态（可变化）分开管理。
  使用时先创建外在状态的原型对象，然后用工厂模式，匹配内在状态的原型对象。
  适用场景：使用了大量资源密集型对象时
====================================================*/

var CalendarDay = function(){}
CalendarDay.prototype = {
  display: function(date,parent){
    var element = document.createElement('div');
    parent.appendChild(element);
    element.innerHTML = date;
  }
}
// 创建外部状态数据
var cDay = new CalendaryDay();

var CalendarMonth = function(monthNum,numDays,parent){
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = "none";
  parent.appendChild(this.element);

  this.days = [];
  for(var i=0,len=numDays;i<len;i++){
    // 使用外部状态数据
    this.days[i] = cDay;
  }
}
// 只使用了一个CalendarMonth，享元
CalendarMonth.prototype = {
  display: function(){
    // 添加每天数据，与组合模式的结合
    for(var i=0,len=this.days.length;i<len;i++){
      this.days[i].display(i,this.element);
    }
    this.element.style.display = 'block';
  }
}

/*==================================================
  **代理模式**
  用于控制那种创建开销很大的本体的访问
====================================================*/
var Publication = new Interface('Publication',['getIsbn','getTitle']);

var Book = function(isbn,title,author){}
var Library = new Interface('Library',['findBooks','checkoutBook','returnBook']);
// 父实例构造函数，
var PublicLibrary = function(books){
  this.catalog = {};
  for(var i=0,len=books.length;i<len;i++){
    this.catalog[books[i].getIsbn()] = {book:books[i],available:true};
  }
}

PublicLibrary.prototype = {
  findBooks:function(searchString){
    var results = [];
    for(var isbn in this.catalog){
      if(!this.catalog.hasOwnProperty(isbn)) continue;
      if(searchString.match(this.catalog[isbn].getTitle()) || searchString.match(this.catalog[isbn].getAuthor())){
        results.push(this.catalog[isbn]);
      }
    }
  },
  checkoutBook:function(){},
  returnBook:function(){},
}
// 代理部分
var PublicLibraryProxy = function(catalog){
  //this.library = new PublicLibrary(catalog);
  this.library = null;      //暂不创建实例
  this.catalog = catalog;   //先保留参数
}
PublicLibraryProxy.prototype = {
  findBooks:function(searchString){
    return this.library.findBooks(searchString);
  },
  checkoutBook:function(){},
  returnBook:function(){},
}
/*==================================================
  **观察者模式（发布订阅模式）**
  对许多程序员合作开发的大型程序有用，浏览器的事件监听就是一种观察者模式
  适合把人的行为和应用程序行为分开
====================================================*/
// 一个观察者
function Publisher(){
  // 保存订阅者的引用
  this.subscrbers = [];
}
// 投送方法
Publisher.prototype.deliver = function(data){
  // 处理每一个订阅者
  this.subscrbers.forEach(function(fn){
    fn(data);
  });
  // 返回this，方便其连续地发送数据
  return this;
}
// 订阅方法；在Function上添加
Function.prototype.subscribe = function(publisher){
  var that = this;
  // 找到可以调用subscribe的对象
  var alreadyExists = publisher.subscribers.some(function(el){
    return el===that;
  });
  // 还未订阅则为其添加
  if(!alreadyExists){
    publisher.subscribers.push(this);
  }
  return this;
}
// 退订方法
Function.prototype.unsubscribe = function(publisher){
  var that = this;
  // 移除了that项
  publisher.subscribers = publisher.subscribers.filter(function(el){
    return el !==that;
  });
  return this;
}

var publisherObject = new Publisher;
var observerObject = function(data){
  console.log(data);
  //【非严格模式下使用】arguments.callee指向当前arguments指向的函数。
  arguments.callee.unsubscribe(publisherObject);
}
observerObject.subscribe(publisherObject);

/*==================================================
  **命令模式**
对方法调用进行参数化处理和传送
====================================================*/
var AdCommand = new Interface('AdCommand',['execute']);
var StopAd = function(adObject){
  this.ad = adObject;
}
StopAd.prototype.execute = function(){
  this.ad.stop();
}
// 不同对象，相同接口
var StartAd = function(adObject){
  this.ad = adObject;
}
StartAd.prototype.execute = function(){
  this.ad.start();
}
/*==================================================
  **职责链模式**
用来消除请求的发送者和接收者之间的耦合（如事件的捕获和冒泡就是）
====================================================*/