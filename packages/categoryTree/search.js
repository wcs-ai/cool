export function searchTree(config) {
  this.config = config || {
    label: "categoryName",
    key: "categoryId",
    children: "childrens",
  };

  this.searchResult = "";
  this.searchIds = [];
}

searchTree.prototype = {
  START: "START-",
  search: function (params, data) {
    // init
    let _res = [];
    this.searchResult = "";
    this.searchIds = [];

    const _k = this.config.key;
    const _n = this.config.label;
    //debugger;
    if (!params[_n] && !params[_k]) return [];
    else if (params[_k]) {
      this.searchById(this.START, params[_k], data);
      // 分割
      _res = this.searchResult.split("-");
      // 去掉第一个，最终id
      _res.splice(0, 1);

      //console.info("this.searchResult--", _res);
    } else if (params[_n]) {
      this.searchByName(params[_n], data);

      let _arr = [];
      //console.info("this.searchIds--", this.searchIds);
      for (let i = 0, len = this.searchIds.length; i < len; i++) {
        this.searchResult = "";
        this.searchById(this.START, this.searchIds[i], data);

        _arr = this.searchResult.split("-");

        _arr.splice(0, 1);
        //console.info("_arr--", _arr);
        _res = _res.concat(_arr);
      }
      _res = Array.from(new Set(_res));
      //console.info("searchres--", _res);
    }

    return _res;
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
    const _k = this.config.key;
    const _c = this.config.children;

    if (!(data instanceof Array) || data.length === 0) return;

    var _cres, res;

    for (let i = 0, len = data.length, f; i < len; i++) {
      f = data[i];

      if (f[_k] === categoryId) {
        this.searchResult = pre + categoryId;
        return;
      }

      this.searchById(pre + f[_k] + "-", categoryId, f[_c]);
    }
  },
};