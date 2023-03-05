
/*====================
  map属性检查
======================*/
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
 * 检测object
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

/**
 * =========全局单体模式============
 * 部分获取实例后使用:
 * g = Single.getInstance().Interface(name,[a,b]);
 * */
export const Single = (function(){
  var uniqueInstance;

  // 动态单体内容
  function constructor(){
    return {
      // object属性定义和检测
      Interface:Interface
    }
  }
  //console.info("使用时才会运行",uniqueInstance);
  return {
    getInstance: function(){
      // 判断实例是否已经存在
      if(!uniqueInstance){
        uniqueInstance = constructor();
      }

      return uniqueInstance;
    },
    // 其余
    version:'1.0.0'
  }
})();
