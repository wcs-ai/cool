<template>
  <div class="layout">
    <div class="left-content">
      <slot name="left"></slot>
    </div>
    <div class="center-content">
      <slot name="center"></slot>
    </div>
    <div class="right-content">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {

    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.layout{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: gray;
  height:100%;
  width:100%;
  
  .center-content{
    width:1000px;
    background:white;
  }
  
}
</style>
