import {makeSVGElement} from './common';
import {ChessTable} from './ChessTable';

/*******棋子父类********/
export class Chessman{
  // 棋子半径
  static R = 22;
  // 棋子背景
  static BG_DOM = (function(){
    const gradient = makeSVGElement('radialGradient',{id:'chessman-gradient',cx:'50%',cy:'40%'});
    gradient.appendChild(makeSVGElement('stop',{offset:'0%',style:"stop-color:rgb(232,182,49)"}));
    gradient.appendChild(makeSVGElement('stop',{offset:'70%',style:"stop-color:rgb(161,121,54)"}));
    gradient.appendChild(makeSVGElement('stop',{offset:'100%',style:"stop-color:rgb(94,72,34)"}));
    return gradient;
  })();
  // 棋子容器元素
  static yieldBoxDom(info){
    // 线条间隙
    const GAP = 55;
    const _y = info.row * GAP;
    const _x = info.column * GAP;

    const dom = makeSVGElement('g',{transform:`matrix(1,0,0,1,${_x},${_y})`,class:'chessman-box'});
    return dom;
  }
  static yieldBorderDom(color){
    const border = makeSVGElement('circle',{class:'chessman-border',cx:0,cy:0,r:Chessman.R-5,style:`stroke:${color};stroke-width:2;fill:none;`});
    return border;
  }
  static yieldTextDom(name,color){
    const text = makeSVGElement('text',{x:-9,y:6,class:'chessman-name--text',style:`fill:${color};`});
    const tx = document.createTextNode(name);
    text.appendChild(tx);
    return text;
  }
  // 整个棋子
  static createChessMan(info){
    const color = info.camp==='RED' ? 'rgb(198,42,42)' : 'rgb(61,51,51)';
    // 元素
    const _containerDom = Chessman.yieldBoxDom(info);
    const border = Chessman.yieldBorderDom(color);
    // 文字
    const text = Chessman.yieldTextDom(info.name,color);
    const bgDom = makeSVGElement('circle',{cx:0,cy:0,r:Chessman.R,fill:'url(#chessman-gradient)'});
    // append
    _containerDom.appendChild(bgDom);
    _containerDom.appendChild(border);
    _containerDom.appendChild(text);

    return _containerDom;
  }
  // 走子规则：超出棋盘范围判断
  static isOverTable(row,column){
    if(row<0 || row>=ChessTable.ROW) return true;
    if(column<0 || column>=ChessTable.COLUMN) return true;
  }
  // 走子规则：走直线判断
  static isLineAct(row1,column1,row2,column2){

    return row1==row2 || column1==column2;
  }
  // 走子规则：两点间是否有其它棋子
  static isExistBetween(param){
    // 存在状态
    let exist = false;
    const {x1,y1,x2,y2,matrix} = param;

    if(x1===x2){
      // 纵线上判断
      const arr = matrix[x1];

      let sy,my;
      if(y1<y2){sy=y1;my=y2;}
      else{sy=y2;my=y1;}
      // 判断y1,y2之间
      for(let i=sy+1;i<my;i++){
        if(arr[i]!==0){exist = true;break;}
      }

    }else if(y1===y2){
      // 横线上判断
      let sx,mx;
      if(x1<x2){sx=x1;mx=x2;}
      else{sx=x2;mx=x1;}

      for(let j=sx+1;j<mx;j++){
        if(matrix[j][y1]!==0){exist = true;break;}
      }

    }

    return exist;
  }
  // 走子规则：目标点是否友方
  static isCompanyAtTarget(row,column,camp,matrix){
    const v = ChessTable.CAMP_MAP[camp];
    const goal = matrix[row][column];
    return v===goal;
  }
  // 走子规则：目标点是否有子
  static isExistAt(x,y,matrix){
    return matrix[x][y]!==0;
  }
  // 走子规则：步数是否超过1
  static isExceedStep(param){
    const {row1,row2,column1,column2,step=1} = param;
    return Math.abs(row1-row2)>step || Math.abs(column1-column2)>step; 
  }
  // 走子规则：是否超过己方棋盘
  isExceedSelfRegion(nextRow,nextColumn){
    const _config = this.config;
    const _info = _config.info;

    if(_info.camp==='RED'){
      if(_config.award && nextRow<5) return true;
      else return false;
    }else{
      if(_config.award && nextRow>4) return true;
      else return false;
    }

  }
  // 走子规则：是否九宫之外
  isExceedPalace(nextRow,nextColumn){
    const _config = this.config;
    const _info = _config.info;

    if(nextColumn<3 || nextColumn>5)return true;
    else if(_info.camp==='RED'){
      if(_config.award && nextRow<7) return true;
      else return false;
    }else{
      if(_config.award && nextRow>2) return true;
      else return false;
    }
  }
  // 获取棋子初始配置
  getConfig(){
    return this.config['info'] || {};
  }
  // 走子规则校验
  verifyTakeChessman(){
    throw new Error('请在子类创建');
  }
  // 显示选中样式
  showSelectPict(rotate){
    const _x = this.column*this.config.LINE_GAP_WIDTH;
    const _y = this.row*this.config.LINE_GAP_WIDTH;
    // 放大棋子
    this._containerDom.setAttribute('transform',`matrix(${rotate},0,0,${rotate},${_x},${_y})`)
  }
  // 默认的移子事件
  moveChessman(row,column){
    // 行列，与y，x对应
    const _x = column*this.config.LINE_GAP_WIDTH;
    const _y = row*this.config.LINE_GAP_WIDTH;
    // 更新棋子位置
    this.row = row;
    this.column = column;
    this._containerDom.setAttribute('transform',`matrix(1,0,0,1,${_x},${_y})`);
  }
  // dom上移除档期棋子
  removeChessman(){
    const _parentEl = this._containerDom.parentNode;
    _parentEl.removeChild(this._containerDom);
  }
}

/*****車****/
export class ChessmanOfCard extends Chessman{
  static TYPE ='card';
  constructor(config){
    super();
    this.config = config || {info:{}};

    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;

    this._containerDom = Chessman.createChessMan(config.info);
  }
  /*********走子规则控制********
   * 返回true时表示nextX,nextY可以落子
   * nextX,nextY是矩阵点，非鼠标位置
  */
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const info = this.config.info;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(!Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    // 中间是否有子
    else if(Chessman.isExistBetween({x1:this.row,y1:this.column,x2:nextRow,y2:nextColumn,matrix:matrix})) return false;
    else return true;
  }
  
}

/****马****/
export class ChessmanOfHorse extends Chessman{
  static TYPE ='horse';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;

    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const D = 5;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    else {
      const dRow = this.row - nextRow;
      const dColumn = this.column - nextColumn;
      // 是否马角点
      if(Math.pow(dRow,2)+Math.pow(dColumn,2)!==D) return false;
      // 方向判断
      if(Math.abs(dRow)>Math.abs(dColumn)){
        // 纵向移动
        const mRow = (this.row + nextRow) / 2;
        if(matrix[mRow][this.column]!==0) return false;
        else return true;

      }else{
        // 横向移动
        const mColumn = (this.column + nextColumn) / 2;
        if(matrix[this.row][mColumn]!==0) return false;
        else return true;
      }
      //--------
    }
    //--------
  }

}


/****相****/
export class ChessmanOfElephant extends Chessman{
  static TYPE ='elephant';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;

    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const D = 8;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    else if(this.isExceedSelfRegion(nextRow,nextColumn)) return false;
    else{
      const dRow = this.row - nextRow;
      const dColumn = this.column - nextColumn;
      // 是否相角点
      if(Math.pow(dRow,2)+Math.pow(dColumn,2)!==D) return false;
      // 相心有子判断
      const mRow = (this.row+nextRow) / 2;
      const mColumn = (this.column + nextColumn) / 2;

      if(matrix[mRow][mColumn]!==0){return false;}
      else return true;
    }

  }
}


/****士****/
export class ChessmanOfNurse extends Chessman{
  static TYPE ='nurse';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;

    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const D = 8;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    else if(Chessman.isExceedStep({row1:this.row,row2:nextRow,column1:this.column,column2:nextColumn})){
      return false;
    }else if(this.isExceedPalace(nextRow,nextColumn)) return false;
    else return true;

  }
}


/****帅****/
export class ChessmanOfChieftain extends Chessman{
  static TYPE ='chieftain';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;

    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const info = this.config.info;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(!Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    else if(Chessman.isExceedStep({row1:this.row,row2:nextRow,column1:this.column,column2:nextColumn})){
      return false;
    }else if(this.isExceedPalace(nextRow,nextColumn)) return false;
    else return true;

  }
}


/****炮****/
export class ChessmanOfCannon extends Chessman{
  static TYPE ='cannon';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;
    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const info = this.config.info;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(!Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    // 目标点无子情况
    else if(matrix[nextRow][nextColumn]===0){
      if(Chessman.isExistBetween({x1:this.row,y1:this.column,x2:nextRow,y2:nextColumn,matrix:matrix})) return false;
      else return true;
    }
    // 目标点有子情况
    else{
      /****检测中间是否超过1个棋子 */
      let sr,mr,sc,mc;
      if(this.row<nextRow){sr = this.row;mr = nextRow;}
      else{sr = nextRow;mr = this.row;}
      // column大小
      if(this.column<nextColumn){sc = this.column;mc = nextColumn;}
      else{sc = nextColumn;mc = this.column;}
      // 纵向移动情况
      let m=0,n=0;
      for(let i=sr+1;i<mr||n>1;i++){
        if(matrix[i][this.column]!==0) ++n;
      }
      // 横向移动情况
      for(let i=sc+1;i<mc||m>1;i++){
        if(matrix[this.row][i]!==0) ++m;
      }

      if(m>1 || n>1) return false;
      else return true;
    }

  }
}



/****兵/卒****/
export class ChessmanOfSoldier extends Chessman{
  static TYPE ='soldier';
  constructor(config){
    super();
    this.config = config || {info:{}};
    this.row = config.info.row;
    this.column = config.info.column;

    this.drawChessMan();
  }
  drawChessMan(){
    const config = this.config;
    this._containerDom = Chessman.createChessMan(config.info);
  }
  verifyTakeChessman(nextRow,nextColumn,matrix){
    const info = this.config.info;
    // 超出棋盘判断
    if(Chessman.isOverTable(nextRow,nextColumn)) return false;
    // 走直线判断
    else if(!Chessman.isLineAct(this.row,this.column,nextRow,nextColumn)) return false;
    // 超过1步
    else if(Chessman.isExceedStep({row1:this.row,row2:nextRow,column1:this.column,column2:nextColumn})) return false;
    else{
      // 后退检测
      if(info.camp=='RED' && this.config.award && nextRow>this.row) return false;
      else if(info.camp=='BLACK' && this.config.award && nextRow<this.row) return false;
      // 左右移动检测
      if(!this.isExceedSelfRegion(nextRow,nextColumn)){
        if(nextColumn!==this.column){ return false;}
        else return true;
      }else return true;
    }

  }
}