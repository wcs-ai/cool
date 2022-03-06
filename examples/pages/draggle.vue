<template>
  <div class="draggle-com">
    <div class="draggle-title">良好的控制</div>
    <div id="draggle"></div>
  </div>
</template>
<script>
import { dragBind } from "@/assets/jsCool";

export default {
  name: "subDevice",
  data() {
    return {
      whichOption: true
    };
  },
  mounted() {
    var drag = document.getElementById("draggle");
    dragBind(drag);
  },
  methods: {}
};
</script>
<style scoped>
#draggle {
  width: 150px;
  height: 160px;
  background: gray;
  border: 5px outset orange;
}
</style>
