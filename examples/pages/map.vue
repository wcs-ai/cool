<template>
  <div class="map-example">
    <cool-map />
    <img id="img" :src="img" />
    <canvas id="canvas" width="600" height="600"></canvas>
  </div>
</template>
<script>
//import "@/assets/designModel.js";

function getColor(x, y) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = require("@/assets/images/sj13.jpg");
  //img.crossOrigin = 'anonymous';
  img.onload = function() {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var mgd = ctx.getImageData(0, 0, img.width, img.height);
    var dt = mgd.data;
    //像素开始位置：(W*y + x)*4
    var position = (img.width * Number(y) + Number(x)) * 4;

    //console.info(img.width, img.height, dt.length);
    console.info(dt[position], dt[position + 1], dt[position + 2]);
  };

  img.onerror = function() {
    alert("图片加载失败");
    console.warn("error");
    console.info(img);
  };
}

export default {
  data() {
    return {
      img: require("@/assets/images/sj13.jpg")
    };
  },
  mounted() {
    this.bindEvent();
  },
  methods: {
    bindEvent() {
      var img = document.getElementById("img");
      var x, y;
      img.addEventListener("click", function(e) {
        x = e.offsetX;
        y = e.offsetY;
        getColor(x, y);
      });
    }
  }
};
</script>
