
/**
 * 右键菜单ADT{
 *    数据集{
 *      菜单列表参数;
 *      配置<hover色,背景色>;
 *    }
 *    操作集{
 *      右键监听;
 *      菜单生成;
 *      修改菜单列表;
 *      点击回调;
 *      卸载插件;
 *    }
 * }
 * 使用示例：
 * var s = new RightKeyMenu(el,{});
 * s.updateMenuData([...]);
 * s.show(x,y); // 主动触发方式
 * 
 * s.onRightEvent(); // 或者直接绑定右键监听
*/
//******自定义事件兼容性处理 */
(function () {
  if (typeof window.CustomEvent === "function") {
    // 如果不是IE
    return false;
  }

  var CustomEvent = function (event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

class RightKeyMenu{
  constructor(el,config){
    this._el = el;
    this._menuList = [];
    this._config = config;
    this._cancelTimer = null;
    // 根节点
    const _rd = document.createElement('div');
    _rd.className = 'right-menu-container';
    _rd.style.cssText = 'display:none;position:fixed;z-index:90;';
    this._rootDom = _rd;
    // 是否已挂载
    this._mounted = false;
    // 防重复点击使用
    this._forbidClick = false; 
  }
  // 更新菜单数据
  updateMenuData(menuList){
    this._menuList = menuList || [];
    this.yieldMenuDom();
  }
  // 生成菜单dom
  yieldMenuDom(){
    const _m = this._menuList;
    const _r = this._rootDom;
    // 先清空
    _r.innerHTML = '';
    let _d;
    _m.map(v=>{
      _d = document.createElement('p');
      _d.setAttribute('data-key',v.key);
      _d.innerText = v.text;
      _d.className = 'right-menu_item';
      _r.appendChild(_d);
    });
    this._rootDom = _r;
  }
  // 监听右键点击
  onRightEvent(){
    // 右键点击监听
    const _s = this;
    this._el.addEventListener('contextmenu',function(e){
      e.preventDefault();
      _s.show(e.clientX,e.clientY);
    });
  }
  // 监听鼠标移入移出
  onMenuEvent(){
    const _rd = this._rootDom;
    const _s = this;
    _s._cancelTimer = setTimeout(()=>{_rd.style.setProperty('display','none');},3500);
    _rd.addEventListener('mouseleave',function(e){
      _s._cancelTimer = setTimeout(()=>{_rd.style.setProperty('display','none');},500);
    });
    // 移入取消定时器
    _rd.addEventListener('mouseover',function(e){
      window.clearTimeout(_s._cancelTimer);
    });
    // 点击监听
    _rd.addEventListener('click',function(e){
      const key = e.target.getAttribute('data-key');
      // 自定义事件
      var k = new CustomEvent("menu-click", {
        detail: {key:key,event:e},
      });
      // 防重复点击处理
      if(!_s._forbidClick){
        _s._el.dispatchEvent(k);
        _s._forbidClick = true;
        setTimeout(()=>{_s._forbidClick = false;},600);
      }
      _rd.style.setProperty('display','none');
    });
  }
  // uninstall plugin
  uninstall(){}
  // 显示菜单
  show(x,y){
    const _x = x || 0;
    const _y = y || 0;
    const _rd = this._rootDom;
    const _s = this;
    // position
    _rd.style.setProperty('top',(_y-10)+'px');
    _rd.style.setProperty('left',(_x+10)+'px');
    // 未挂载情况
    if(!this._mounted){
      document.body.appendChild(_rd);
      this._mounted = true;
    }

    setTimeout(function(){
      _rd.style.setProperty('display','block');
    });
    // listen
    this.onMenuEvent();
  }
}

export default RightKeyMenu;