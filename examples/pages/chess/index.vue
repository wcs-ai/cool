<template>
  <div class="chess-page">
    <input type="color" />
    <h2>中国象棋</h2>
    <div
      id="china-chess"
      style="width:800px;margin:0 auto;position:relative;"
    ></div>
    <img id="img"/>
  </div>
</template>
<script>
import { ChinaChess } from "./js/index";

export default {
  mounted() {
    const el = document.getElementById("china-chess");
    var mm = new ChinaChess({ mountEl: el, tableConfig: {}, chessConfig: {} });
    mm.show();
  }
};
</script>
