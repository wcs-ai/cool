/********中国象棋设计*
 * 游戏ADT{
 *  数据集：
 *    棋子类型；
 *    棋盘点位矩阵；
 *    棋谱数据；
 *    棋子数据；
 *    棋盘方向；
 *    走子规则；
 *  关系集：
 *    <棋子,棋子类型>；
 *    <棋子,走子规则>;
 *    <棋子,所在位置>;
 *  操作集：
 *    生成棋子
 *    生成棋盘；
 *    移动棋子；
 *    记录走子；
 *    返回上一步；
 * }
 *
 * <Icon type="close-circle" />
 * <Icon type="check-circle" />
 * <Icon type="loading" />
 * <Icon type="sliders" />
 * <Icon type="search" />
 * <Icon type="diff" />
 * <Icon type="snippets" />
 * <Icon type="security-scan" />
 * <Icon type="tool" />
 * <Icon type="thunderbolt" />
 * <Icon type="deployment-unit" />
 * <Icon type="inbox" />
 * import { Spin } from 'antd';<Spin />
 * import { Empty } from 'antd';
*/

import {
  Chessman,
  ChessmanOfCard,
  ChessmanOfHorse,
  ChessmanOfElephant,
  ChessmanOfNurse,
  ChessmanOfChieftain,
  ChessmanOfCannon,
  ChessmanOfSoldier
} from './Chessman';
import {makeSVGElement,RED_CHESSMAN_LIST,BLACK_CHESSMAN_LIST,svg2img,img2base64,base642blob,downloadBlob} from './common';
import {ChessTable} from './ChessTable';


/*********象棋管理器*********/
export class ChinaChess{
  // 红棋
  static RED_CHESSMAN_LIST = RED_CHESSMAN_LIST;
  // 黑棋
  static BLACK_CHESSMAN_LIST = BLACK_CHESSMAN_LIST;
  // 象棋宽（大小用缩放来控制）
  static WIDTH = 500;
  constructor(config){

    const _config = config || {mountEl:{},tableConfig:{},chessConfig:{}};
    this.mountEl = _config.mountEl;
    // 棋盘宽
    const TABLE_WIDTH = ChinaChess.WIDTH - 2*ChessTable.PADDING;
    // 线条间隙
    const LINE_GAP_WIDTH = Math.round(TABLE_WIDTH / (ChessTable.COLUMN-1));
    // 棋盘，棋子配置
    let commonConfig = {
      TABLE_WIDTH:TABLE_WIDTH,
      LINE_GAP_WIDTH:LINE_GAP_WIDTH,
      width:ChinaChess.WIDTH,
      height:Math.round(ChinaChess.WIDTH * 9/8),
      award:true
    }
    Object.assign(_config.tableConfig,commonConfig);
    Object.assign(_config.chessConfig,commonConfig);

    this.config = _config;
    // 线间隔，棋盘宽
    this.LINE_GAP_WIDTH = LINE_GAP_WIDTH;
    this.TABLE_WIDTH = TABLE_WIDTH;
    /****方向****
     * true：红在下
     * false: 红在上
    */
    this.award = true;
    // 红使用的棋子列表
    this.redChessmanArr = [];
    this.blackChessmanArr = [];

    // 棋盘实例
    this.chessTableCase = null;
    // 元素部分
    this._svgDom = null;
    this._chessBox = null;
    this._defsDom = null;
    this._filterDom = null;
    this._chessStyle = null;
    // 选中棋子时对棋子标记的dom
    this._electedMarkDom = null;
    // 事件信息
    this.eventInfo = {
      // 选中的棋子
      chessman:null,
      // 已选中棋子
      isElected:false
    };
    // 红黑棋子实例
    this.redChessmanList = [];
    this.blackChessmanList = [];

    this.init();
  }

  init(){
    this.yieldSvgDom();
    this.yieldChessTable();
    this.yieldChessmanMark();
    // 添加棋子标记元素,放在棋子下层
    this.chessTableCase.appendElToTable(this._electedMarkDom);
    this.yieldChessman();
    this.yieldCapableMenu();
  }
  yieldSvgDom(){
    const config = this.config.tableConfig;
    this._svgDom = makeSVGElement('svg',{class:'china-chess--svg','data-svg7747':'true',width:config.width,height:config.height});
    this._chessBox = makeSVGElement('g',{class:'china-chess--box'});
    // 存放资源
    this._defsDom = makeSVGElement('defs');
    const bg1 = makeSVGElement('image',{'xlink:href':require('../imgs/fire-girl3.jpeg'),x:0,y:0,width:this.TABLE_WIDTH,id:'table-bg1'});
    this._defsDom.appendChild(bg1);

    // 样式生成
    const _chessStyle = document.createElement('style');

    const styleJoin = function(css){
      return `.china-chess--svg[data-svg7747] ${css}`;
    }
    // 棋子css
    const chessmanCss = styleJoin(`.chessman-box{cursor:pointer;transition:transform 0.3s;}`);
    const chessmanName = styleJoin('.chessman-name--text{font-weight:800;font-family:KaiTi;font-size:18px;}')
    _chessStyle.innerHTML = `.china-chess--svg[data-svg7747]{user-select:none;}${chessmanCss}${chessmanName}`;
    this._chessStyle = _chessStyle;
  }
  // 生成棋盘
  yieldChessTable(){
    const tableConfig = this.config.tableConfig;
    // 定义资源的元素
    tableConfig['defsDom'] = this._defsDom;
    this.chessTableCase = new ChessTable(tableConfig);

    this.bindTableClick();
  }
  // 生成棋子
  yieldChessman(){
    let tableConfig = this.config.tableConfig;
    const chessTable = this.chessTableCase;
    // 棋子背景添加入资源
    this._defsDom.appendChild(Chessman.BG_DOM);

    this.createChessman(ChinaChess.RED_CHESSMAN_LIST);
    this.createChessman(ChinaChess.BLACK_CHESSMAN_LIST);
  }
  // 生成功能菜单
  yieldCapableMenu(){
    const menuBox = document.createElement('div');
    menuBox.style.cssText = 'position:absolute;left:20px;top:50px;';
    const exportBtn = document.createElement('button');
    exportBtn.innerText = '导出图片';
    exportBtn.addEventListener('click',()=>{this.export2Img()});

    menuBox.appendChild(exportBtn);
    this.mountEl.appendChild(menuBox);
  }
  // 标记棋子的元素
  yieldChessmanMark(){
    const x = 0,y = 0;
    const style = {
        cx:x,
        cy:y,
        r:Chessman.R+4,
        style:'display:none;stroke-width:8;stroke:rgba(250,251,253,0.4);fill:none;stroke-dasharray: 60 10;',
      }
    const _electedMarkDom = makeSVGElement('circle',style);
    const style2 = {
      class:'animation-rotate',
      attributeName:"transform",
      attributeType:"XML",
      type:"rotate",
      from:`0 ${x} ${y}`,
      to:`360 ${x} ${y}`,
      begin:"0s",
      dur:"2s",
      repeatCount:"indefinite",
      additive:"sum"
    }
    const animEl = makeSVGElement('animateTransform',style2);
    _electedMarkDom.appendChild(animEl);
    this._electedMarkDom = _electedMarkDom;
  }
  // 生成棋子逻辑部分
  createChessman(chessmanList){
    let tableConfig = this.config.tableConfig;
    const chessTable = this.chessTableCase;
    let _config,_Chessman = null;

    for(let i=0,len=chessmanList.length,temp;i<len;i++){
      temp = chessmanList[i];
      _config = Object.assign({info:temp},tableConfig);
      // 工厂模式
      switch(temp.type){
        case ChessmanOfCard.TYPE:
          _Chessman = new ChessmanOfCard(_config);
          break;
        case ChessmanOfHorse.TYPE:
          _Chessman = new ChessmanOfHorse(_config);
          break;
        case ChessmanOfElephant.TYPE:
          _Chessman = new ChessmanOfElephant(_config);
          break;
        case ChessmanOfNurse.TYPE:
          _Chessman = new ChessmanOfNurse(_config);
          break;
        case ChessmanOfChieftain.TYPE:
          _Chessman = new ChessmanOfChieftain(_config);
          break;
        case ChessmanOfCannon.TYPE:
          _Chessman = new ChessmanOfCannon(_config);
          break;
        case ChessmanOfSoldier.TYPE:
          _Chessman = new ChessmanOfSoldier(_config);
          break;
        default:
          console.error('未知的棋类');
          break;
      }
      // 绑定棋子点击事件
      this.bindChessmanClick(_Chessman);
      chessTable.appendChessman(_Chessman);
      // 放入实例列表
      if(temp.camp==='RED') this.redChessmanList.push(_Chessman);
      else this.blackChessmanList.push(_Chessman);
    }
  }
  showChessMark(row,column){
    const x = column * this.LINE_GAP_WIDTH;
    const y = row * this.LINE_GAP_WIDTH;
    // 更新元素属性
    const cloneNode = this._electedMarkDom.cloneNode(true);
    cloneNode.setAttribute('cx',x);
    cloneNode.setAttribute('cy',y);
    cloneNode.style.setProperty('display','block');
    const animEl = cloneNode.querySelector('.animation-rotate');
    animEl.setAttribute('from',`0 ${x} ${y}`);
    animEl.setAttribute('to',`360 ${x} ${y}`);
    // 替换
    this._electedMarkDom.parentNode.replaceChild(cloneNode, this._electedMarkDom);
    // 更新元素
    this._electedMarkDom = cloneNode;
  }
  // 走子事件绑定
  bindChessmanClick(chessman){
    const eventInfo = this.eventInfo;
    const row = chessman.row;
    const column = chessman.column;
    // 选中棋子逻辑
    const switchState = ()=>{
      // 先取消上一次的选中
      try{eventInfo.chessman.showSelectPict(1);}
      catch(er){console.info('首次点击');}

      eventInfo.isElected = true;
      eventInfo.chessman = chessman;
      // 视图上显示选中状态
      chessman.showSelectPict(1.2);
      this.showChessMark(chessman.row,chessman.column);
    }

    chessman._containerDom.addEventListener('click',(e)=>{
      e.stopPropagation();

      // 未选中情况
      if(!eventInfo.isElected){
        switchState();
      }else{
        const tableCase = this.chessTableCase;
        // 正在走的棋子
        const _chessman = eventInfo.chessman;
        const _info = _chessman.config.info;

        // 同阵营棋子，切换选中状态
        if(_info.camp===chessman.config.info['camp']){
          switchState();
        }else if(eventInfo.chessman.verifyTakeChessman(row,column,tableCase.chessTableMatrix)){
          // 不同阵营棋子
          tableCase.updateMatrix(_chessman.row,_chessman.column,0);
          tableCase.updateMatrix(row,column,ChessTable.CAMP_MAP[_info.camp]);
          // 视图层更新
          this._electedMarkDom.style.setProperty('display','none');
          _chessman.moveChessman(row,column);

          eventInfo.isElected = false;
          setTimeout(()=>{chessman.removeChessman();},250);
        }
      }
    });
  }
  // 计算点位
  calcPosition(val){
    const mirrorVal = Math.round((val - ChessTable.PADDING)/this.LINE_GAP_WIDTH);
    return mirrorVal;
  }
  // 棋盘点击事件
  bindTableClick(){
    const tableCase = this.chessTableCase;
    let eventInfo = this.eventInfo;

    tableCase._tableContainerDom.addEventListener('click',e=>{
      const column = this.calcPosition(e.offsetX);
      const row = this.calcPosition(e.offsetY);
      const _chessman = eventInfo.chessman;
      // 普通的点击棋盘事件
      if(!eventInfo.isElected) return;
      // 规则判断
      const passCheck = _chessman.verifyTakeChessman(row,column,tableCase.chessTableMatrix);
      //console.log('[check]',passCheck);
      if(passCheck){
        const v = _chessman.getConfig()['camp'];
        // 以前的位置置为0
        tableCase.updateMatrix(_chessman.row,_chessman.column,0);
        tableCase.updateMatrix(row,column,ChessTable.CAMP_MAP[v]);
        // 视图层更新
        this._electedMarkDom.style.setProperty('display','none');
        _chessman.moveChessman(row,column);
        eventInfo.isElected = false;
      }
    });
  }
  // 记录走子
  recordBehavior(){}
  // 后退
  backWard(){}
  // 显示
  export2Img(){
    const svgPict = svg2img(this._svgDom);
    const img = new Image();
    document.getElementById('img').src = svgPict;
    img.src = svgPict;
    const base64 = img2base64(img);
    const blob = base642blob(base64);
    downloadBlob(blob);
  }
  show(){
    this.mountEl.appendChild(this._chessStyle);
    this._chessBox.appendChild(this.chessTableCase._tableContainerDom);
    this._svgDom.appendChild(this._chessBox);
    this._svgDom.appendChild(this._defsDom);
    this.mountEl.appendChild(this._svgDom);
  }
}





