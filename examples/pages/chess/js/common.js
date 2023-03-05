const NAME_SPACE = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";
// 生成svg元素
export function makeSVGElement(tag, attrs) {
  let _attrs = attrs || {};
  let el = document.createElementNS(NAME_SPACE, tag);
  if (tag === 'svg') {
    el.setAttribute('xmlns:xlink', XLINK);
  }
  // add attribute
  for (let k of Object.keys(_attrs)) {
    if (k === 'xlink:href') {
      el.setAttributeNS(XLINK, k, _attrs[k]);
    } else {
      el.setAttribute(k, _attrs[k]);
    }
  }
  return el;
}

/*****svg转图片******/
export function svg2img(svgDom){
  console.log(svgDom);
  const svgStr = new XMLSerializer().serializeToString(svgDom);
  const svgImg = "data:image/svg+xml," + encodeURIComponent(svgStr);
  return svgImg;
}

/**
 *  获取图片base64数据
 * @param {*} img : Image case
 * @returns Base64
 */
 export function img2base64(img){
  if(!(img instanceof Image)) return new Error("is not Image case");

  const canvas = document.createElement("canvas");

  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  const data = canvas.toDataURL('image/png');

  return data;
}


/*****base64转blob对象******/
export function base642blob(base64Data) {
  var byteString;
  var segments = base64Data.split(",");
  if (segments[0].indexOf("base64") >= 0) {
    byteString = atob(segments[1]);
  } else {
    byteString = unescape(segments[1]);
  }
  var mimeString = segments[0].split(":")[1].split(";")[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ia], { type: mimeString });
  return blob;
}

export function downloadBlob(blob,filename){
  //const blob = new Blob([blob]);
  const fName = filename || 'chess.png';
  const eLink = document.createElement("a");
  eLink.download = fName;
  eLink.style.display = "none";
  eLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eLink);
  eLink.click();

  URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}




// 红方棋子
export const RED_CHESSMAN_LIST = [
  {type:'card',name:'車',camp:'RED',row:9,column:0},
  {type:'horse',name:'马',camp:'RED',row:9,column:1},
  {type:'elephant',name:'相',camp:'RED',row:9,column:2},
  {type:'nurse',name:'仕',camp:'RED',row:9,column:3},
  {type:'chieftain',name:'帅',camp:'RED',row:9,column:4},
  {type:'card',name:'車',camp:'RED',row:9,column:8},
  {type:'horse',name:'马',camp:'RED',row:9,column:7},
  {type:'elephant',name:'相',camp:'RED',row:9,column:6},
  {type:'nurse',name:'仕',camp:'RED',row:9,column:5},

  {type:'soldier',name:'兵',camp:'RED',row:6,column:0},
  {type:'soldier',name:'兵',camp:'RED',row:6,column:2},
  {type:'soldier',name:'兵',camp:'RED',row:6,column:4},
  {type:'soldier',name:'兵',camp:'RED',row:6,column:6},
  {type:'soldier',name:'兵',camp:'RED',row:6,column:8},

  {type:'cannon',name:'炮',camp:'RED',row:7,column:1},
  {type:'cannon',name:'炮',camp:'RED',row:7,column:7}
]

// 黑方棋子
export const BLACK_CHESSMAN_LIST = [
  {type:'card',name:'車',camp:'BLACK',row:0,column:0},
  {type:'horse',name:'马',camp:'BLACK',row:0,column:1},
  {type:'elephant',name:'象',camp:'BLACK',row:0,column:2},
  {type:'nurse',name:'仕',camp:'BLACK',row:0,column:3},
  {type:'chieftain',name:'将',camp:'BLACK',row:0,column:4},
  {type:'card',name:'車',camp:'BLACK',row:0,column:8},
  {type:'horse',name:'马',camp:'BLACK',row:0,column:7},
  {type:'elephant',name:'象',camp:'BLACK',row:0,column:6},
  {type:'nurse',name:'仕',camp:'BLACK',row:0,column:5},

  {type:'soldier',name:'卒',camp:'BLACK',row:3,column:0},
  {type:'soldier',name:'卒',camp:'BLACK',row:3,column:2},
  {type:'soldier',name:'卒',camp:'BLACK',row:3,column:4},
  {type:'soldier',name:'卒',camp:'BLACK',row:3,column:6},
  {type:'soldier',name:'卒',camp:'BLACK',row:3,column:8},

  {type:'cannon',name:'炮',camp:'BLACK',row:2,column:1},
  {type:'cannon',name:'炮',camp:'BLACK',row:2,column:7}
];
