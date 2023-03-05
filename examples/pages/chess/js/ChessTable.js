import {makeSVGElement} from './common';

/*******棋盘*******/

export class ChessTable{
  static COLUMN = 9;
  static ROW = 10;
  static PADDING = 30;
  // 阵营类型，对应矩阵中的值
  static CAMP_MAP = {'RED':1,'BLACK':2};
  constructor(config){
    this.config = config || {};

    /*******棋盘矩阵（二维）*******
     * 第1维为行
     * 第2维为列   与x，y坐标相反
     * -0 表示无棋子
     * -1 表示红方棋子
     * -2 表示黑方棋子
     * */
    this.chessTableMatrix = ChessTable.createTableMatrix();
    //console.log('[matx]',this.chessTableMatrix)
    // 容器
    this._tableContainerDom = null;
    // 背景
    this._bgDom = null;
    this._wholeTableDom = null;
    this.yieldDom();
  }
  static createTableMatrix(){
    var matrix = [];
    for(let i=0;i<ChessTable.ROW;i++){
      matrix.push([]);
      for(let j=0;j<ChessTable.COLUMN;j++){
        matrix[i].push(0);
      }
    }

    return matrix;
  }

  yieldDom(){
    const config = this.config;
    const WIDTH = config.TABLE_WIDTH;
    const PADDING = ChessTable.PADDING;
    const LINE_GAP_WIDTH = config.LINE_GAP_WIDTH;
    //console.log('sss',LINE_GAP_WIDTH)
    // 小边距
    const gh = 5;
    const HALF_GAP = LINE_GAP_WIDTH / 4 - gh;
    // 容器
    this._tableContainerDom = makeSVGElement('g',{'class':'table-outward'});
    // 背景
    const bg1 = makeSVGElement('image',{'xlink:href':require('../imgs/table-bg1.jpg'),x:0,y:0,width:WIDTH+2*PADDING,id:'table-bg1'});
    this._tableContainerDom.appendChild(bg1);
    this._bgDom = makeSVGElement('rect',{class:'table-bg',width:config.width,height:config.height,fill:'none'});
    // 棋盘边框
    //const tableBorder = makeSVGElement('rect',{class:'table-border',width:WIDTH+2*gh});
    // 棋盘
    this._wholeTableDom = makeSVGElement('g',{'class':'table-whole--box',transform:`matrix(1,0,0,1,${PADDING},${PADDING})`});
    let halfTable = makeSVGElement('g',{id:'table-hemisphere'});
    // 横向线绘制
    const _lineColor = 'rgb(88,238,249)';
    for(let i=0,line;i<ChessTable.ROW/2;i++){
      line = makeSVGElement('line',{'x1':0,'x2':WIDTH,'y1':i*LINE_GAP_WIDTH,'y2':i*LINE_GAP_WIDTH,style:`stroke:${_lineColor};`});
      halfTable.appendChild(line);
    }
    // 纵向线绘制
    const halfHeight = 4*LINE_GAP_WIDTH;
    for(let i=0,line;i<ChessTable.COLUMN;i++){
      line = makeSVGElement('line',{'x1':i*LINE_GAP_WIDTH,'x2':i*LINE_GAP_WIDTH,'y1':0,'y2':halfHeight,style:`stroke:${_lineColor};`});
      halfTable.appendChild(line);
    }
    // 士线
    const shiLine1 = makeSVGElement('line',{'x1':3*LINE_GAP_WIDTH,'x2':5*LINE_GAP_WIDTH,'y1':0,'y2':2*LINE_GAP_WIDTH,style:`stroke:${_lineColor};`});
    // 士线
    const shiLine2 = makeSVGElement('line',{'x1':5*LINE_GAP_WIDTH,'x2':3*LINE_GAP_WIDTH,'y1':0,'y2':2*LINE_GAP_WIDTH,style:`stroke:${_lineColor};`});
    halfTable.appendChild(shiLine1);
    halfTable.appendChild(shiLine2);
    // 点位标记

    const mark_rt = makeSVGElement('path',{d:`M0 0V${HALF_GAP}H${HALF_GAP}`,style:`fill:none;stroke:rgb(34,89,85);`});
    const mark_rb = makeSVGElement('path',{d:`M0 ${2*HALF_GAP+2*gh}V${HALF_GAP+2*gh}H${HALF_GAP}`,style:`fill:none;stroke:rgb(34,89,85);`});
    const rpointMark = makeSVGElement('g',{id:'point-right'});
    rpointMark.appendChild(mark_rt);
    rpointMark.appendChild(mark_rb);

    const mark_lt = makeSVGElement('path',{d:`M0 0V${HALF_GAP}H${-HALF_GAP}`,style:'fill:none;stroke:rgb(34,89,85);'});
    const mark_lb = makeSVGElement('path',{d:`M0 ${2*HALF_GAP+2*gh}V${HALF_GAP+2*gh}H${-HALF_GAP}`,style:'fill:none;stroke:rgb(34,89,85);'});
    const lpointMark = makeSVGElement('g',{id:'point-left'});
    lpointMark.appendChild(mark_lt);
    lpointMark.appendChild(mark_lb);
    // 添加到资源dom中
    config.defsDom.appendChild(rpointMark);
    config.defsDom.appendChild(lpointMark);

    // 点1
    const ty = LINE_GAP_WIDTH - HALF_GAP - gh;
    const Y2 = 2*LINE_GAP_WIDTH+ty;
    const rightPoint = makeSVGElement('use',{'xlink:href':'#point-right',transform:`matrix(1,0,0,1,5,${Y2})`});
    const leftPoint = makeSVGElement('use',{'xlink:href':'#point-left',transform:`matrix(1,0,0,1,${WIDTH-5},${Y2})`});
    halfTable.appendChild(leftPoint);
    halfTable.appendChild(rightPoint);
    // 中间的几个标记
    let Y;
    [1,2,4,6,7].map(i=>{
      Y = i%2==0 ? Y2 : LINE_GAP_WIDTH+ty;
      halfTable.appendChild(makeSVGElement('use',{'xlink:href':'#point-left',transform:`matrix(1,0,0,1,${i*LINE_GAP_WIDTH-gh},${Y})`}));
      halfTable.appendChild(makeSVGElement('use',{'xlink:href':'#point-right',transform:`matrix(1,0,0,1,${i*LINE_GAP_WIDTH+gh},${Y})`}));
    })
    // 另一半棋盘/复制 translate(25,0)
    let otherHalfTable = makeSVGElement('use',{'xlink:href':"#table-hemisphere",'transform-origin':'50% 50%',transform:`rotate(180)translate(${LINE_GAP_WIDTH+gh},${LINE_GAP_WIDTH+2*gh})`});
    // 添加
    this._tableContainerDom.appendChild(this._bgDom);
    this._wholeTableDom.appendChild(halfTable);
    this._wholeTableDom.appendChild(otherHalfTable);
    this._tableContainerDom.appendChild(this._wholeTableDom);

  }

  updateMatrix(row,column,v){

    const matrix = this.chessTableMatrix;
    //console.log('[tt]',x,y,matrix[0].length);
    if(row>=matrix.length || row<0) throw new Error(`update error:row exceed scope-${row}`);
    if(column>=matrix[0].length || column<0) throw new Error(`update error:column exceed scope-${column}`);

    this.chessTableMatrix[row][column] = v;
  }
  // 添加棋子
  appendChessman(Chessman){
    const info = Chessman.config.info;
    this.appendElToTable(Chessman._containerDom);
    // 更新矩阵
    const p = info.camp;

    this.updateMatrix(info.row,info.column,ChessTable.CAMP_MAP[p]);
  }
  appendElToTable(el){
    this._wholeTableDom.appendChild(el);
  }
}
