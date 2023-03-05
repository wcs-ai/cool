import {dragBind} from '@com/util/index.js';

export class TreeChart {
  static NAME_SPACE = "http://www.w3.org/2000/svg";
  static XLINK = "http://www.w3.org/1999/xlink";
  // 层间距
  static LEVEL_GAP = 170;
  // 画布边界范围
  static BORDER = 100;
  // 节点和边的绑定事件列表
  static NODE_EVENT_LIST = ['click','contextmenu','mouseenter','mouseleave'];
  static EDGE_EVENT_LIST = ['click','contextmenu'];

  constructor(config,data) {
    // 容器元素宽高
    let container = config.container;
    if(!container) throw new Error('container must be dom');
    config.width = config.width || container.offsetWidth;
    config.height = config.height || container.offsetHeight-10 || 600;
    this.config = config;
    // 元素图边界
    this.xScope = [config.width/2,config.width/2];
    this.yScope = [0,0];
    // 使用到的dom
    this.bgDom = null;
    this.boxDom = null;
    this.svgDom = null;
    // 初始化头节点
    this.initTreeHead();
    // 传入完整树情况，直接显示树
    if(data instanceof Object){
      this.show();
      this.instructOnData(this.linkTree,data);
      this.updateTreeVision(this.linkTree);
    }

  }
  // 生成svg元素
  static makeSVGElement(tag, attrs) {
    let _attrs = attrs || {};
    let el = document.createElementNS(TreeChart.NAME_SPACE, tag);
    if (tag === 'svg') {
      el.setAttribute('xmlns:xlink', TreeChart.XLINK);
    }
    // add attribute
    for (let k of Object.keys(_attrs)) {
      if (k === 'xlink:href') {
        el.setAttributeNS(TreeChart.XLINK, k, _attrs[k]);
      } else {
        el.setAttribute(k, _attrs[k]);
      }
    }
    return el;
  }
  // 层次遍历
  static accessLayer(node){
    let nodeList = [node];
    // 层次遍历主体
    function mural(nowNode){
      const children = nowNode.children || [];
      const len = children.length;
      if(len===0) return;
      // 添加该子层
      for(let i=0;i<len;i++){
        nodeList.push(children[i]);
      }
      // 广度优先
      for(let i=0;i<len;i++){
        mural(children[i]);
      }
    }
    mural(node);
    return nodeList;
  }
  /****用于绑定事件的公共逻辑***
   * @eventName：事件名称（不需要前缀on）
   * @customEventName: 绑定到容器上的自定义事件名
   * @bindDom: 绑定事件的dom
   * @obj: 要并入事件对象的一个map
  */
  _bindEvent(eventName,customEventName,bindDom,obj){
    const _s = this;
    // 左键点击事件
    bindDom.addEventListener(eventName,function(e){
      // 需要在container上绑定监听
      // 添加数据
      obj && Object.assign(e,obj);
      const clickEvent = new CustomEvent(customEventName, {
        detail: e,
      });
      _s.config.container.dispatchEvent(clickEvent);
    });
  }
  // 初始化头节点
  initTreeHead(){
    // 带头节点链式树
    this.linkTree = {
      root:true,
      data:{},
      children:[],
      level:0,
      x:this.config.width/2,
      y:0,
      maxBroaden:1,
      parent:null,
      svgDom:null,
      boxDom:null
    }
  }
  // 生成树容器
  yieldSvgBox(){
    const config = this.config;
    const svg = TreeChart.makeSVGElement('svg',{'class':'svg-box',width:config.width,height:config.height});
    const g = TreeChart.makeSVGElement('g',{'class':'box-in',transform:'matrix(1,0,0,1,0,0)'});
    //#F3F3F6
    const bg = TreeChart.makeSVGElement('rect',{x:config.width,y:0,width:10,height:10,style:'fill:transparent;stroke:none;'});
    // 背景层元素
    this.bgDom = bg;
    this.boxDom = g;
    this.svgDom = svg;
  }
  /*******数据层面的构建树*******
   * parent：其父节点；
   * node：当前要添加的节点数据
  */
  instructOnData(parent,nodeData) {
    if(!(parent.children instanceof Array)) return new Error('错误的parent');

    let node = this.addNode(parent,nodeData);
    let childrenBuffer = nodeData.children || [];
    // 去掉原数据中的链接
    //nodeData.children = null;
    // 递归构建树(TODO:使用自定义栈，代替系统栈)
    childrenBuffer.map((v,ix)=>{
      this.instructOnData(node,v);
    });

  }
  // 查找最左/右侧子节点
  searchSideChild(node,direction){
    // 叶子节点情况
    const children = node.children;

    if(!children || children.length===0) return node;
    if(direction==='left') return this.searchSideChild(children[0],direction);
    if(direction==='right') return this.searchSideChild(children[node.children.length-1],direction);
  }
  // 移动所有子节点
  moveChildrenX(node,distance){
    const children = node.children;
    if(!children || children.length===0) return;
    // 数据层修改距离
    for(let i=0,len=children.length;i<len;i++){
      //let mx = node.x - (children[0].x + children[children.length-1].x)/2
      children[i].x += distance;
      // 递归移动其全部子节点
      this.moveChildrenX(children[i],distance);
    }
  }
  // 调整当前层，和向上调整
  upAdjustPosition(node){
    if(!node) return;
    let children = node.children || [];
    if(children.length==0) return;
    // 新增操作时1个子节点时可以不用再向上调整（但移除操作时依然需要）
    if(children.length===1) children[0].x = node.x;
    let preNode = null;
    let childLR = null,childRL = null;
    let xdist = 0;
    // 调整其子层节点间距
    for(let i=1,len=children.length;i<len;i++){
      preNode = children[i-1];

      childLR = this.searchSideChild(preNode,'right');
      childRL = this.searchSideChild(children[i],'left');
      // 左侧最右端子节点与当前节点最左侧子节点的位置差
      xdist = childLR.x+2*Node.X_RADIUS+Node.GAPE - childRL.x;
      children[i].x += xdist;
      this.moveChildrenX(children[i],xdist);
    }
    // 计算中间x与父节点x的差值
    let mx = node.x - (children[0].x + children[children.length-1].x)/2
    // 向下调整所有子节点
    this.moveChildrenX(node,mx);
    // 向上递归调整
    this.upAdjustPosition(node.parent);
  }
  // 单独添加节点(数据层)
  appendNodeOnData(parent,nodeData){
    // *******生成对应节点*******
    let node = new Node(nodeData);
    // 初始化位置和生成节点dom
    node.x = parent.x;
    node.y = parent.y;
    node.yieldDom();
    // ****第1个节点外，建立1条对应的边****
    if(!parent.root){
      // 当前节点是边的头部所指，父节点是边的尾部所指
      let edge = new Edge(nodeData.edgeInfo,node,parent);
      parent.outEdgeLink = edge;
      node.inEdgeLink = edge;
    }
    // 节点信息更新
    node.ord = parent.children.length;
    node.level = parent.level + 1;
    parent.children.push(node);
    node.parent = parent;

    return node;
  }
  // 添加节点（主要逻辑）数据视图，同时添加
  addNode(parent,nodeData){
    let pLen = parent.children.length;
    // 新在数据层添加
    let node = this.appendNodeOnData(parent,nodeData);
    // 非根节点情况添加边
    if(!parent.root){
      this.boxDom.appendChild(node.inEdgeLink.boxDom);
      this.bindEdgeEvent(node.inEdgeLink);
    }
    // 视图上添加节点
    this.boxDom.appendChild(node.dom);
    // 节点绑定点击事件
    this.bindNodeEvent(node);
    // 更新x，y
    let childLR = this.searchSideChild(parent,'right');
    const _x = pLen==0 ? parent.x : childLR.x + Node.DISTANCE;
    node.x = _x;
    node.y = parent.root ? parent.y+TreeChart.BORDER : parent.y + TreeChart.LEVEL_GAP;
    // 更新长度；节点数大于1时，移动整层节点
    pLen = parent.children.length;
    if(pLen>1){
      this.upAdjustPosition(parent);
    }
    return node;
  }
  // 更新树视图
  updateTreeVision(node){
    if(!node.root){
      node.updatePosition(node.x,node.y);
    }
    const inEdgeLink = node.inEdgeLink;
    // 更新边位置
    if(inEdgeLink){
      inEdgeLink.updatePath();
      if(inEdgeLink.textDom) inEdgeLink.updateText('alter');
      else inEdgeLink.updateText('append');

    }
    let children = node.children;
    this.onBorder(node.x,node.y);
    // 子层为空时停止
    if(!children || children.length===0) return;
    // 递归更新
    for(let i=0,len=children.length;i<len;i++){
      this.updateTreeVision(children[i]);
    }
  }
  // 监听边界（防止节点位置超出）
  onBorder(x,y){
    let xs = this.xScope;
    let ys = this.yScope;
    const border = TreeChart.BORDER;
    const bgDom = this.bgDom;

    if(x+border>xs[1]) xs[1] = x+border;
    if(x-border<=xs[0]) xs[0] = x-border;
    if(y>=ys[1]-border) ys[1] = y+border;

    bgDom.setAttribute('width',xs[1]-xs[0]);
    bgDom.setAttribute('height',ys[1]-ys[0]);
    bgDom.setAttribute('x',xs[0]);
  }
  // 为节点绑定点击事件
  bindNodeEvent(node){
    TreeChart.NODE_EVENT_LIST.forEach(e=>{
      this._bindEvent(e,`node-${e}`,node.dom,{'Node':node});
    });
  }
  // 绑定边的点击
  bindEdgeEvent(edge){
    TreeChart.EDGE_EVENT_LIST.forEach(e=>{
      this._bindEvent(e,`edge-${e}`,edge.boxDom,{'Edge':edge});
    });
  }
  // 向外提供的添加节点
  appendNode(parent,nodeData){
    this.addNode(parent,nodeData);
    this.updateTreeVision(this.linkTree);
  }
  // 数据，视图上移除节点
  removeNode(node) {
    const parent = node.parent;
    let i = 0;
    const _s = this;

    parent.children.some((v,ix)=>{
      i = ix;
      return Object.is(v,node);
    });
    // 从上到下逐一调整一遍
    function _adj(obj){
      if(obj.children && obj.children.length>0){
        obj.children.map(v=>{
          _s.upAdjustPosition(v);
          _adj(v);
        });
      }
    }
    
    // 数据层上删除当前节点
    parent.children.splice(i,1);
    // 视图上移除
    this.removeNodeOnVision(node);
    _adj(this.linkTree);
    // 数据层上节点位置调整
    //this.upAdjustPosition(parent);
    // 更新视图
    this.updateTreeVision(this.linkTree);
  }
  // 视图层上移除当前节点，和其所有子节点
  removeNodeOnVision(node){
    // 移除节点
    this.boxDom.removeChild(node.dom);
    let inEdge = node.inEdgeLink;
    // 移除它的边
    if(inEdge) this.boxDom.removeChild(inEdge.boxDom);
    // 递归移除
    let children = node.children || [];
    children.map(v=>{
      this.removeNodeOnVision(v);
    });
  }
  dragNode() {console.info('暂未实现'); }
  getLinkTree(){
    return this.linkTree;
  }
  // 重置
  clear(){
    this.initTreeHead();
    this.config.container.innerHTML = '';
  }
  // 将容器添加到container
  show(){
    this.yieldSvgBox();
    this.boxDom.appendChild(this.bgDom);
    this.svgDom.appendChild(this.boxDom);
    this.config.container.appendChild(this.svgDom);
    // 添加拖拽
    dragBind(this.boxDom,this.boxDom);
  }
}

/*********节点类********/
class Node{
  // 元素半径
  static X_RADIUS = 75;
  static Y_RADIUS = 36;
  // 节点最小间隙
  static GAPE = 50;
  // 两节点（圆心）间距
  static DISTANCE = 2*Node.X_RADIUS+Node.GAPE;

  /**data格式：
  *  edgeInfo:{} // 对应边的数据
  */
  constructor(data){
    this.data = data;
    // 所在层级
    this.level = 0;
    // x，y为中心点坐标
    this.x = 0;
    this.y = 0;
    // 在兄弟节点中的顺序
    this.ord = 0;
    // 子树中最大宽度
    this.maxBroaden = 0;
    this.dom = null;
    // 父子节点指针
    this.parent = null;
    this.children = [];
    // 入度，出度指针
    this.inEdgeLink = null;
    this.outEdgeLink = null;
    const _s = this;

  }
  // 生成节点dom
  yieldDom(content){
    const BG_COLOR = 'rgb(254,253,250)';
    const BORDER_COLOR = 'rgb(72,66,66)';
    const g = TreeChart.makeSVGElement('g',{transform:`matrix(1,0,0,1,${this.x-Node.X_RADIUS},${this.y-Node.Y_RADIUS})`,'class':'node-box'});
    //const circle = TreeChart.makeSVGElement('circle',{cx:0,cy:0,r:Node.X_RADIUS});
    const property = {
      'class':'node-body',
      x:0,
      y:0,
      width:2*Node.X_RADIUS,
      height:2*Node.Y_RADIUS
    };
    /**
     * rx:5,
      ry:5,
      style:`fill:${BG_COLOR};stroke:${BORDER_COLOR};`
     */
    //const react = TreeChart.makeSVGElement('rect',property);
    const htmlContainer = TreeChart.makeSVGElement('foreignObject',property);
    g.appendChild(htmlContainer);
    this.updateText(g,'append');
    this.dom = g;
  }
  /******更新文本部分内容******
   * - g: g容器
   * - mode: append(新增)，update(更新)
   * */
  updateText(g){
   g.getElementsByClassName('node-body')[0].innerHTML = this.data['htmlSection'];
  }
  // 更新节点位置
  updatePosition(x,y){
    // circle型
    //this.dom.setAttribute('transform',`matrix(1,0,0,1,${x},${y})`);
    // title文本内容更新(TODO:待优化)
    this.updateText(this.dom,'update');
    // 矩形情况
    setTimeout(()=>{
      this.dom.setAttribute('transform',`matrix(1,0,0,1,${x-Node.X_RADIUS},${y-Node.Y_RADIUS})`);
    },200);

  }
  // 更新data数据部分
  updateNodeData(obj){
    if(!(obj instanceof Object)) return console.error("obj type isn't Object");
    Object.assign(this.data,obj);
  }
}

// 边类
class Edge {
  constructor(dt,hlink,tlink){
    this.data = dt || {};
    // 头尾指针，指向节点
    this.headLink = hlink;
    this.tailLink = tlink;
    this.boxDom = null;
    this.lineDom = null;
    this.textDom = null;

    this.yieldDom();
  }
  // 设置头，尾指针
  setLink(head,tail){
    this.headLink = head;
    this.tailLink = tail;
  }
  // 弯曲点坐标计算
  static curvePoint(hk,tk){
    // 弯曲处的曲率
    const K = 0.08;
    // 头尾节点的x间距
    const DIS = tk.x - hk.x;
    // SGIAN函数值>=0 为1，<0为-1
    const SGIAN = DIS===0 ? 1 : DIS/Math.abs(DIS);
    // 弯曲部分的两个横坐标
    const tx = SGIAN*DIS*K + tk.x;
    const hx = hk.x - SGIAN*DIS*K;
    // 弯曲部分的两个纵坐标
    const ty = tk.y + Node.Y_RADIUS + 0.5*TreeChart.LEVEL_GAP;
    const hy = hk.y - Node.Y_RADIUS - 0.5*TreeChart.LEVEL_GAP;

    return {tx:tx,ty:ty,hx:hx,hy:hy};
  }
  static beeLinePoint(hk,tk){
    const tx = tk.x,hx = hk.x;
    const yds = hk.y - tk.y;
    //const ty = tk.y + Node.Y_RADIUS + 0.2*TreeChart.LEVEL_GAP;
    const ty = tk.y + 0.3*yds;
    //const hy = hk.y - Node.Y_RADIUS - 0.7*TreeChart.LEVEL_GAP;
    const hy = hk.y - 0.7*yds;
    return {tx:tx,ty:ty,hx:hx,hy:ty};
  }
  // 生成边dom
  yieldDom(){
    const hk = this.headLink;
    const tk = this.tailLink;
    //const {tx,ty,hx,hy} = Edge.curvePoint(hk,tk);
    const {tx,ty,hx,hy} = Edge.beeLinePoint(hk,tk);
    // 边容器
    const g = TreeChart.makeSVGElement('g',{'transform':'matrix(1,0,0,1,0,0)','class':'edge-box'});
    const sy = Node.Y_RADIUS + tk.y;
    // 贝塞尔曲线绘制路径
    //const d = `M${tk.x} ${sy} C ${tx} ${ty},${hx} ${hy},${hk.x} ${hk.y}`;
    const d = `M${tk.x} ${sy} L ${tx} ${ty},${hx} ${hy},${hk.x} ${hk.y-Node.Y_RADIUS}`;
    const line = TreeChart.makeSVGElement('path',{d:d,style:'fill:none;stroke:rgb(194,192,192);stroke-width:2;','class':'edge-path'});

    g.appendChild(line);
    this.boxDom = g;
    this.lineDom = line;
  }
  /*更新文本内容
  - mode: append(添加)，alter(修改)
  */
  updateText(mode){
    const hk = this.headLink;
    let txtDom;

    if(mode==='append'){
      txtDom = TreeChart.makeSVGElement('text',{x:hk.x,y:hk.y,'class':'edge-text'});
    }else{
      txtDom = this.boxDom.getElementsByClassName('edge-text')[0];
    }
    txtDom.innerHTML = this.data['graph']+this.data['val'];

    if(mode=='append'){
      this.textDom = txtDom;
      setTimeout(()=>{
        this.boxDom.appendChild(txtDom);
      },700);
    }
  }
  // 更新边位置
  updatePath(){
    const hk = this.headLink;
    const tk = this.tailLink;
    //const {tx,ty,hx,hy} = Edge.curvePoint(hk,tk);
    const {tx,ty,hx,hy} = Edge.beeLinePoint(hk,tk);
    const sy = Node.Y_RADIUS + tk.y;
    //const d = `M${tk.x} ${sy} C ${tx} ${ty},${hx} ${hy},${hk.x} ${hk.y}`;
    const d = `M${tk.x} ${sy} L ${tx} ${ty},${hx} ${hy},${hk.x} ${hk.y-Node.Y_RADIUS}`;

    setTimeout(()=>{
      this.textDom.setAttribute('x',hk.x-30);
      this.textDom.setAttribute('y',hk.y-50);
      this.lineDom.setAttribute('d',d);
    },200);
  }

}

