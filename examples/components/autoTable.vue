<template>
  <div>
    <div class="table">
      <table border="1" cellspacing="0">
        <thead v-if="header.length>0">
          <tr><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="(itm,ix1) in bodyData" :key="ix1">
            <td 
            v-for="(val,ix2) in itm" 
            :key="ix2" 
            :rowspan="val.rowspan">
              {{ val.text }}
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div>
</template>
<script>
export default{
  props:{
    header:{
      type:String,
      default:""
    },
    body:{
      /**
       * [{num:['0,3'],text:"a\nb\nc"},{}]
       * 每一个{}是一列的内容。0,3表示该列第0个rowspan为3，可以只列出跨多行的单元格。
       * text中默认以\n划分每一格，这允许你直接复制一列放进去。
       * */
      type:Array,
      default(){
        return [];
      },
      require:true
    },
    baseHeight:{
      // 最基本单元高度。
      type:String,
      default:"auto"
    },
    gap:{
      // 文本划分使用
      type:String,
      default:"\n"
    }
  },
  data(){
    return {
      // [string,string]
      headData:[],
      /**
       * [
       *  [{rowspan:1,text:""},{}],
       *  []
       * ]
      */
      bodyData:[]
    };
  },
  created(){
    this.textSplit();
    this.addData();
  },
  methods:{
    numSupplement(arr,len){
      // 补充item值
      let _a;
      let _narr = [];
      
      // [[row,span],[],[]]
      for(let i=0;i<len;i++){
        _narr.push([i,1]);
      }

      arr.forEach((itm)=>{
        _a = itm.split(",");
        
        _narr[parseInt(_a[0])][1] = parseInt(_a[1]);
      });

      for(let i=1;i<_narr.length;i++){
        _narr[i][0] = _narr[i - 1][0] + _narr[i - 1][1];
      }

      return _narr;
    },
    textSplit(){
      let maxs = [];
      // 分割字符，计算行号，rowspan。
      this.body.map(item=>{
        item.text.replace(/(\t|\s|' ')/,"");
        item["text"] = item.text.split(this.gap);
        let _num = item["num"] || [];
        item["num2"] = this.numSupplement(_num,item["text"].length);
    
        maxs.push(item.text.length);
      });
      let _maxLen = Math.max(...maxs);

      for(let i=0;i<_maxLen;i++){
        this.bodyData.push([]);
      }

    },
    addData(){
      this.body.forEach(item=>{
        // 填充表格数据,各数据放具体哪一行
        item.text.forEach((val,ix)=>{
          this.bodyData[item.num2[ix][0]].push({rowspan:Number(item.num2[ix][1]),text:val});
        });

      });
      //console.log("结果",this.bodyData);
    }
  }
};
</script>
<style lang="less" scoped>
.table{
  padding: 10px 0;
  table{
    text-align: center;
    position:relative;
    margin:0 auto;
    width:100%;
    border:1px solid black;
    font-size:12px;
    td{
      padding: 0 5px;
    }
  }
}
</style>
