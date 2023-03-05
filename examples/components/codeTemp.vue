<template>
  <div class="chunk" @click="skip">
    <h2 class="title" v-text="info.title"></h2>
    <div v-text="info.descript" class="content"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'codeTemp',
  props:{
    info:{
      required:true,
      type:Object,
      default:{
        title:"",
        descript:"",
        path:""
      }
    }
  },
  methods:{
    skip(){
      this.$router.push(this.info.path);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chunk{
  color:white;
  width:150px;
  .title{
    font-size:20px;
    background:orange;
    padding: 5px 15px;
    height:40px;
  }
  .content{
    background:green;
    font-size:14px;
    height:100px;
    padding:5px 15px;
  }
  .footer{
    background:blue;
    height:20px;
  }
}
</style>
