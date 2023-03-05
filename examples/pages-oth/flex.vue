<template>
  <div id="phone">
    <div id="phone-in">
      <canvas id="canvas" width="400" height="800"></canvas>
      <ul id="ul">
        <li>人工智能</li>
        <li>网络安全</li>
        <li>前端开发</li>
        <li>游戏开发</li>
        <li>后台</li>
      </ul>
      <h3>滚动滚轮或滑动</h3>
    </div>
    <p></p>
    <b></b>
  </div>
</template>
<script>
export default {
  methods: {
    run() {
      var canvas = document.getElementById("canvas");
      var ul = document.getElementById("ul");
      var phone = document.getElementById("phone-in");
      var y,
        u,
        i = 1,
        v = 0,
        star,
        can_slide = true,
        color = ["#0de2e5", "darkgray", "orange", "#960de5", "#eb1474"];

      //phone-in的宽
      var w = document.getElementById("phone-in").offsetWidth;
      var ctx = canvas.getContext("2d");
      var cw = w + 60;
      canvas.width = w;
      y = v * Math.sin((i * Math.PI) / 180);
      u = y - 10;
      // 第一个图形元素需要拿出来单独绘制，不然之前绘制的不能被取消
      ctx.globalCompositeOperation = "copy";
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.fillStyle = color[0];
      ctx.quadraticCurveTo(cw / 2, 30 + y, cw, 30);
      ctx.lineTo(cw, 180);
      ctx.quadraticCurveTo(cw / 2, 30 + 150 + y, 0, 30 + 150);
      ctx.closePath();
      ctx.fill();
      for (var k = 1; k < 5; k++) {
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.moveTo(0, 30 + k * 150);
        ctx.fillStyle = color[k];
        ctx.quadraticCurveTo(cw / 2, 30 + k * 150 + y, cw, 30 + k * 150);
        ctx.lineTo(cw, 180 + k * 150);
        ctx.quadraticCurveTo(
          cw / 2,
          30 + (k + 1) * 150 + y,
          0,
          30 + (k + 1) * 150
        );
        ctx.closePath();
        ctx.fill();
      }
      i += 10;
      ul.style.marginTop = u + "px";
      if (Math.floor(y) == 0) {
        v -= 10;
      }
      if (v <= 0) {
        can_slide = true;
        cancelAnimationFrame(star);

        return;
      }
      star = requestAnimationFrame(run);
      phone.onscroll = function() {
        if (can_slide === true) {
          can_slide = false;
          v = 40;
          run();
        } else {
          return;
        }
      };
    }
  },
  mounted() {
    this.run();
  }
};
</script>
<style scoped>
#phone {
  position: relative;
  width: 460px;
  margin: 0 auto;
  border-top: 30px solid #353838;
  border-left: 30px solid #353838;
  border-right: 10px solid #353838;
  border-bottom: 80px solid #353838;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
}

#phone-in {
  position: relative;
  padding-top: 50px;
  z-index: 200;
  height: 680px;
  overflow-y: auto;
  overflow-x: hidden;
}

#ul {
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0;
  list-style-type: none;
}

#ul > li {
  position: relative;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  list-style: none;
  color: white;
}

#phone-in > h3 {
  position: absolute;
  width: 200px;
  padding: 20px 0;
  color: red;
  text-align: center;
  top: 0;
  left: 50%;
  margin-left: -100px;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
}

#phone > p {
  position: absolute;
  z-index: 1000;
  width: 20px;
  height: 680px;
  top: 0;
  right: 0;
  background: #353838;
}

#phone > b::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  left: -13px;
  top: -12px;
  border: 1px solid darkgray;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  box-shadow: 1px 1px 10px white;
}

#phone > b {
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -55px;
  left: 50%;
  margin-left: -15px;
  border: 2px solid white;
  box-shadow: 1px 1px 10px white;
  background: darkgray;
}

@media only screen and (min-width: 100px) and (max-width: 640px) {
  #phone {
    width: 100%;
    border: none;
  }
  #phone > p {
    display: none;
  }
}
</style>
