<template>
  <div class="home-svgflex">
    <div class="all">
      <svg width="618" height="610">
        <filter id="fil">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.007 .006"
            numOctaves="1"
            result="turbulence"
            seed="53"
          />
          <!--
        	bfeTurbulence 中baseFrequency的参数值分别表示x方向和y方向的波动度，越小波动越低0.001属于较小的波动度
        			-->
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
        <image
          id="photo"
          xlink:href="imgs/town.jpg"
          style="z-index: 500;"
        ></image>
        <use
          xlink:href="#photo"
          transform="translate(0,621) scale(1 -1) "
          filter="url(#fil)"
          style="z-index: 10;"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var fe = document.querySelector("#fil feTurbulence");
    var pp = Math.PI / 180;
    var tran = 0;

    function anima() {
      var base = "0.007 .006";
      basex = Number(base.split(" .")[0]);
      basey = Number(base.split(" .")[1]);
      basex = basex + Math.sin(pp * tran) * 0.002;
      basey += Math.cos(pp * tran) * 0.002;
      tran += 0.5;

      bb = basex + " " + basey;

      fe.setAttributeNS(null, "baseFrequency", bb);
      window.requestAnimationFrame(anima);
    }
    //			window.requestAnimationFrame(anima);
    anima();
  }
};
</script>

<style scoped>
.all {
  position: relative;
  left: 300px;
  width: 590px;
  height: 575px;
  overflow: hidden;
}
svg {
  position: absolute;
  right: 0;
}
</style>
