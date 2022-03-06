<template>
  <div class="coll-tree2">
    <cool-tree :nodes="nodes"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      whichOption: true,
      nodes:[{
        label:"geng",
        id:1,
        children:[{
          label:"kjdfl"
        }]
      },{
        label:"leiuor",
        id:2
      }]
    };
  },
}
</script>
