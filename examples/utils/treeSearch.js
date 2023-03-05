/*===================
    树形数据结构查询
treeData:[{id:'',label:'',children:[{}]},{}]
=====================*/

export function searchTree(config) {
  this.config = config || {
    label: "categoryName",
    key: "categoryId",
    children: "childrens",
  };
  // 搜索结果，id字符串：a=b=c=
  this.searchResult = "";
  this.searchIds = [];
  // 搜索结果，label字符串
  this.labelString = "";
  // 返回的类型，指定使用字段
  this.backType = this.config.key;
}

searchTree.prototype = {
  START: "START=",
  search: function (params, data) {
    // init
    let _res = [];

    this.searchResult = "";
    this.searchIds = [];
    this.backType = params['backType'] || this.config.key;

    const _k = this.config.key;
    const _n = this.config.label;

    if (!params[_n] && !params[_k]) return [];
    else if (params[_k]) {
      // 使用key搜索
      this.labelString = "";
      this.searchById('', params[_k], data);
      // 分割
      _res = this.searchResult.split("=");
      // 去掉第一个，最终id
      //_res.splice(0, 1);

    } else if (params[_n]) {
      // 使用label搜索,TODO:暂时不支持searchIds.length>1的情况；
      this.searchByName(params[_n], data);

      let _arr = [];

      for (let i = 0, len = this.searchIds.length; i < len; i++) {
        this.searchResult = "";

        this.searchById('', this.searchIds[i], data);

        _arr = this.searchResult.split("=");

        //_arr.splice(0, 1);
        _res = _res.concat(_arr);
      }
      _res = Array.from(new Set(_res));
      //console.info("searchres--", _res);
    }

    return _res;
  },
  // 找到第一个叶子节点
  findFirstLeaf: function(data){
    if (!(data instanceof Array)) return {};
    var node = null;
    const C = this.config;

    function find(array){
      for(let i=0,len=array.length,A;i<len;i++){
        A = array[i];
        if(A[C.children] instanceof Array){
          find(A[C.children]);
        }else{
          node = A;
          return;
        }
      }
      //-----
    }
    find(data);
    return node;
  },
  // 根据key找到该节点
  findNodeByKey: function(key,data){
    if (!(data instanceof Array)) return {};
    var node = null;
    const C = this.config;

    function find(array){
      for(let i=0,len=array.length,A;i<len;i++){
        A = array[i];
        if(key==A[C.key]){
          node = A;
          return;
        }else if(A[C.children] instanceof Array){
          find(A[C.children]);
        }
      }
      //-----
    }
    find(data);
    return node;
  },
  // 查所有包含name的id
  searchByName: function (name, data) {
    if (!(data instanceof Array)) return;

    const _k = this.config.key;
    const _c = this.config.children;
    const _n = this.config.label;

    for (let i = 0, len = data.length, f; i < len; i++) {
      f = data[i];
      if (f[_n].indexOf(name) != -1) {
        this.searchIds.push(f[_k]);
      }
      // 迭代
      if (f[_c] instanceof Array && f[_c].length > 0) {
        this.searchByName(name, f[_c]);
      }
    }
  },

  searchById: function (pre, categoryId, data) {
    const _config = this.config;
    const _k = _config.key;
    const _c = _config.children;
    const _label = _config.label;
    const _back = this.backType;

    if (!(data instanceof Array) || data.length === 0) return;

    for (let i = 0, len = data.length, f; i < len; i++) {
      f = data[i];

      if (f[_k] === categoryId) {
        this.searchResult = `${pre}${f[_back]}`;
        //this.labelString = `${_ls}${f[_back]}`
        return;
      }
      //pre + f[_k] + "-"
      this.searchById(`${pre}${f[_back]}=`, categoryId, f[_c]);
    }
  },
};