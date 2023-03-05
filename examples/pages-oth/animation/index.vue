<template>
  <div class="animate--page">
    <!--弹框类型动画-->
    <!--滑框类型动画-->
    <!--文字特效-->
    <!--背景特效-->
    <!--加载动效-->
    <!--点击特效-->
    <!--显示隐藏特效-->
    <!--空图效果-->
    <!---输入框特效-->
    <!--切换特效-->
    <!--加载失败图-->

    <svg width="0" height="0" style="position: absolute">
      <filter id="cloudBasic">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.015"
          numOctaves="4"
        />
        <feDisplacementMap in="SourceGraphic" scale="170" />
      </filter>
      <filter id="cloudShadow">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.015"
          numOctaves="2"
        />
        <feDisplacementMap in="SourceGraphic" scale="140" />
      </filter>
    </svg>
    <h4>带阴影云层</h4>
    <p><button id="buttonRandom2">随机变化</button></p>
    <div class="cloud">
      <i class="cloud-basic"></i>
      <i class="cloud-mid"></i>
      <i class="cloud-shadow"></i>
    </div>
    <p><input type="button" id="button" value="点击变身" /></p>
  </div>
</template>
<script>
import { PRIMITIVE } from "@/utils/primitive.js";

//console.log(PRIMITIVE);

export default {
  name: "animateccc",
  data() {
    return {};
  },
  mounted() {
    var eleButton2 = document.getElementById("buttonRandom2");
    var eleTurbulenceA = document.querySelector("#cloudBasic feTurbulence");
    var eleTurbulenceB = document.querySelector("#cloudShadow feTurbulence");
    // 带阴影云朵的随机变化
    eleButton2.addEventListener("click", function () {
      var seed = Math.round(100 * Math.random());
      eleTurbulenceA.setAttributeNS(null, "seed", seed);
      eleTurbulenceB.setAttributeNS(null, "seed", seed);
    });

    this.toSvg();
  },
  methods: {
    toSvg() {
      document.getElementById("button").addEventListener("click", function () {
        var Canvas = PRIMITIVE.Canvas;
        var Optimizer = PRIMITIVE.Optimizer;
        var cfg = {
          alpha: 0.5,
          computeSize: 256,
          fill: "rgb(0, 0, 0)",
          height: 375,
          mutateAlpha: true,
          shapeTypes: [PRIMITIVE.shapeMap.triangle],
          mutations: 30,
          shapes: 200,
          steps: 100,
          viewSize: 500,
          width: 500,
        };

        function go(original, cfg) {
          let optimizer = new Optimizer(original, cfg);

          let cfg2 = Object.assign({}, cfg, {
            width: cfg.scale * cfg.width,
            height: cfg.scale * cfg.height,
          });
          let result = Canvas.empty(cfg2, false);
          result.ctx.scale(cfg.scale, cfg.scale);
          document.getElementById("container").appendChild(result.node);

          optimizer.onStep = (step) => {
            if (step) {
              result.drawStep(step);
            }
          };
          optimizer.start();
        }

        Canvas.original("../../assets/logo.png", cfg).then((original) => {
          console.log("NODE-ori-", original);
          go(original, cfg);
        });
      });
    },
  },
};
</script>
<style scoped>
.cloud {
  width: 500px;
  height: 250px;
  margin: 3rem auto;
  position: relative;
}
.cloud:empty {
  filter: url(#cloudRandom);
  background: radial-gradient(
    closest-side,
    #fff var(--start-stop, 20%),
    #fffa var(--mid-stop, 60%),
    #fff0 80%
  );
  border-radius: 50%;
}
/* 带阴影的云朵 */
.cloud > i {
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
}
.cloud-basic {
  filter: url(#cloudBasic);
  background: radial-gradient(closest-side, #fff 60%, transparent 80%);
}
.cloud-mid {
  filter: url(#cloudShadow);
  background: radial-gradient(
    closest-side at 50% 60%,
    rgba(100, 90, 80, 0.2),
    transparent 60%
  );
}
.cloud-shadow {
  background: radial-gradient(
    closest-side at 50% 70%,
    rgba(0, 0, 0, 0.05),
    transparent 40%
  );
  filter: url(#cloudShadow);
}
</style>
