/**
 * 复制文本
 * @param text : string
 */
export function copyText(text){
  var int = document.createElement("input");
  int.value = text;
  document.body.appendChild(int);//添加到DOM中才能选择(使用select())
  int.select();//选择input中的内容
  document.execCommand("Copy");// 执行复制语句
  int.style.display = "none";// 复制完后才能隐藏
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

/*********模糊匹配（N-Gram）********
 * s1: 当前字符串
 * s2：目标对比的字符串
 * d: 分割间距
*/
function nGram(s1,s2,d){
  const D = d || 2;
  // 某1串过小情况，直接使用匹配
  if(Math.min(s1.length,s2.length)<=2){
    let mis,mas = '';
    if(s1.length < s2.length){
      mis = s1;mas = s2;
    }else{
      mis = s2;mas = s1;
    }
    const gd = mas.indexOf(mis);
    return {grade:gd==-1?0:1,score:gd==-1?0:2*mis.length/(mis.length+mas.length)};
  }
  // 串分割方法
  const splitByd = function(s){
    let _ar = [];

    for(let i=0,len = s.length;i<len;i+=D){
      _ar.push(s.substr(i,D));
    }
    return _ar;
  }

  const g1 = splitByd(s1);
  const g2 = splitByd(s2);
  const len1 = g1.length,len2 = g2.length;
  // calc similar group number
  let n = 0;
  for(let i=0,st=0;i<len1;i++){
    for(let j=st;j<len2;j++){
      if(g1[i]===g2[j]){
        ++n;
        st = j;
        break;
      }
      else continue;
    }
  }
  // res
  const grade = len1 + len2 - D*n;
  const score = (2*n / (len1+len2)).toFixed(3);
  // back
  return {grade:grade,score:parseFloat(score),g1,g2};
}
