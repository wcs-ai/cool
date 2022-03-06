<template>
  <div class="home-eye">
    <div class="center">
      <div class="black">
        <div id="circle-in">
          <div id="circle_inner"></div>
          <svg width="475" height="400">
            <path
              id="eye_in_a"
              d="M198 269 Q205 270,195 285 Q196 280,194 275 Q193 270,198 269"
              style="fill:black;stroke: black;"
            />
            <path
              id="eye_in_b"
              d="M142,272 Q136 273,129 270 Q136 270,136 266 Q145 265,142 272"
              style="fill:black;stroke: black;"
            />
            <path
              id="eye_in_c"
              d="M168 207 Q170 200,181 202 Q178 201,175 207 Q170 211,168 207"
              style="fill:black;stroke: black;"
            />
          </svg>
        </div>
        <svg class="svg" width="475" height="400">
          <radialGradient
            id="eye_ra"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" style="stop-color: rgb(249,11,11);" />
            <stop offset="90%" style="stop-color: rgb(117,19,19);" />
            <stop offset="100%" style="stop-color: rgb(58,9,9);" />
          </radialGradient>
          <!--<radialGradient id="eye_bo-ra">
					<stop offset="0%" style="stop-color: ;"/>
				</radialGradient>-->
          <linearGradient id="eye_lin" x1="100%" y1="60%" x2="0%" y2="0%">
            <stop offset="0%" style="stop-color: rgb(248,236,250);" />
            <stop offset="40%" style="stop-color: rgb(201,173,207);" />
            <stop offset="100%" style="stop-color: rgb(55,8,65);" />
          </linearGradient>
          <filter id="eye_filter">
            <feGaussianBlur in="sourceGraphic" stdDeviation="4" />
          </filter>
          <path
            class="path_bottom"
            d="M300 310 C70 310,50 310,0 180 C270 210,260 200,300 310"
            style="fill:rgba(250,250,235,.9);stroke: transparent;"
          />
          <circle
            class="eye"
            cx="170"
            cy="245"
            r="60"
            style="fill:url(#eye_ra);stroke: black;"
          />
          <circle
            class="eye_center"
            cx="170"
            cy="245"
            r="5"
            style="fill:black;stroke: black;"
          />
          <circle
            id="eye_middle"
            cx="170"
            cy="245"
            r="40"
            style="fill: transparent;stroke-width:1;stroke: black;"
          />

          <!--<path id="eye_in_a" d="M198 269 Q205 270,195 285 Q196 280,194 275 Q193 270,198 269" style="fill:black;stroke: black;"/>
				<path id="eye_in_b" d="M142,272 Q136 273,129 270 Q136 270,136 266 Q145 265,142 272" style="fill:black;stroke: black;"/>
				<path id="eye_in_c" d="M168 207 Q170 200,181 202 Q178 201,175 207 Q170 211,168 207" style="fill:black;stroke: black;"/>-->

          <!--<path class="a_ce" d="M205 262 Q209 276,200 298 Q200 295,190 279 Q195 275,205 262" style="fill:black;stroke: black;"/>
				<path class="b_ce" d="M150 279 Q133 278,117 270 Q127 268,137 261 Q140 271,150 279" style="fill:black;stroke: black;"/>
				<path class="c_ce" d="M158 208 Q168 195,185 186 Q179 195,185 210 Q175 203,158 208" style="fill:black;stroke: black;"/>-->
          <path
            class="eye_left"
            d="M120 302 C70 294,50 296,0 180 C260 155,30 205,120 302"
            style="filter: url(#eye_filter);fill:url(#eye_lin);"
          />
          <path
            class="eye_right"
            d="M300 310 C260 310,295 300,283 258 Z"
            style="fill:blueviolet;"
          />
          <path
            class="path_bottom"
            d="M300 310 C70 310,50 310,0 180"
            style="stroke-width: 3;stroke:orange;fill: transparent;"
          />
          <path
            class="cover-bottom"
            d="M0 180 Q0 263,0 363 Q302 361,302 311 C70 311,50 311,0 180"
            style="stroke-width:3;stroke:black;fill: black;"
          />
          <path
            class="path_top"
            d="M300 310 C70 310,50 310,0 180 C180 20,300 200,300 310"
            style="stroke-width: 3;stroke:transparent;fill:black;"
          />
        </svg>

        <div id="circle-out">
          <svg width="475" height="400">
            <radialGradient
              id="ey_ra"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" style="stop-color: rgb(249,11,11);" />
              <stop offset="90%" style="stop-color: rgb(117,19,19);" />
              <stop offset="100%" style="stop-color: rgb(58,9,9);" />
            </radialGradient>

            <linearGradient id="ey_lin" x1="100%" y1="60%" x2="0%" y2="0%">
              <stop offset="0%" style="stop-color: rgb(248,236,250);" />
              <stop offset="40%" style="stop-color: rgb(201,173,207);" />
              <stop offset="100%" style="stop-color: rgb(55,8,65);" />
            </linearGradient>
            <filter id="ey_filter">
              <feGaussianBlur in="sourceGraphic" stdDeviation="4" />
            </filter>
            <path
              d="M300 310 C70 310,50 310,0 180 C270 210,260 200,300 310"
              style="fill:rgba(250,250,235,.9);stroke: transparent;"
            />
            <circle
              cx="170"
              cy="245"
              r="60"
              style="fill:url(#ey_ra);stroke: black;"
            />
            <circle cx="170" cy="245" r="5" style="fill:black;stroke: black;" />
            <circle
              cx="170"
              cy="245"
              r="35"
              style="fill: transparent;stroke-width:10;stroke: black;"
            />

            <path
              class="a_ce"
              d="M205 262 Q209 276,200 298 Q200 295,190 279 Q195 275,205 262"
              style="fill:black;stroke: black;"
            />
            <path
              class="b_ce"
              d="M150 279 Q133 278,117 270 Q127 268,137 261 Q140 271,150 279"
              style="fill:black;stroke: black;"
            />
            <path
              class="c_ce"
              d="M158 208 Q168 195,185 186 Q179 195,185 210 Q175 203,158 208"
              style="fill:black;stroke: black;"
            />

            <path
              d="M120 302 C70 294,50 296,0 180 C260 155,30 205,120 302"
              style="filter: url(#ey_filter);fill:url(#ey_lin);"
            />
            <path
              d="M300 310 C260 310,295 300,283 258 Z"
              style="fill:blueviolet;"
            />
            <path
              d="M300 310 C70 310,50 310,0 180"
              style="stroke-width: 3;stroke:orange;fill: transparent;"
            />
            <path
              d="M0 180 Q0 263,0 363 Q302 361,302 311 C70 311,50 311,0 180"
              style="stroke-width:3;stroke:transparent;fill: black;"
            />
            <path
              d="M300 310 C270 210,260 200,0 180 C180 20,300 200,300 310"
              style="stroke-width: 3;stroke:transparent;fill:black;"
            />
          </svg>
        </div>
      </div>
      <div class="white"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cool-eye",
  mounted() {
    var eye_in_a = document.getElementById("eye_in_a");
    var eye_in_b = document.getElementById("eye_in_b");
    var eye_in_c = document.getElementById("eye_in_c");
    var eye_middle = document.getElementById("eye_middle");
    var circle_inner = document.getElementById("circle_inner");
    var path_top = document.querySelector(".path_top");
    var path_bottom = document.querySelector(".path_bottom");
    var cover_bottom = document.querySelector(".cover-bottom");
    var circle_in = document.getElementById("circle-in");
    var eye_close = 1,
      eye_toggle = 1,
      canClick = false;

    //显示眼睛轮廓
    setTimeout(function() {
      cover_bottom.style.strokeDashoffset = "0";
    }, 1000);

    // 睁开眼睛
    setTimeout(function() {
      path_top.setAttribute(
        "d",
        "M300 310 C270 210,260 200,0 180 C180 20,300 200,300 310"
      );
    }, 6000);

    // setTimeout(function(){
    // 	path_top.setAttribute("d","M300 310 C70 310,50 310,0 180 C180 20,300 200,300 310");
    // 	path_top.style.transition="all 1s linear";

    // },10000);

    // setTimeout(function(){
    // 	path_top.setAttribute("d","M300 310 C270 210,260 200,0 180 C180 20,300 200,300 310");
    // 	path_top.style.transition="all 0.1s linear";
    // },13000);

    /*瞳孔旋转*/
    setTimeout(function() {
      circle_in.style.transform = "rotate(360deg)";
      circle_inner.style.border = "10px solid black";
      eye_in_a.setAttribute(
        "d",
        "M205 262 Q209 276,200 298 Q200 295,190 279 Q195 275,205 262"
      );
      eye_in_b.setAttribute(
        "d",
        "M150 279 Q133 278,117 270 Q127 268,137 261 Q140 271,150 279"
      );
      eye_in_c.setAttribute(
        "d",
        "M158 208 Q168 195,185 186 Q179 195,185 210 Q175 203,158 208"
      );
    }, 9000);

    setTimeout(function() {
      canClick = true;
    }, 12000);
    // setTimeout(function(){
    // 	path_top.setAttribute("d","M300 310 C70 310,50 310,0 180 C180 20,300 200,300 310");
    // 	path_top.style.transition="all 3s linear";
    // },35000);

    // setTimeout(function(){
    // 	cover_bottom.style.strokeDashoffset="371";
    // },39000);

    document.getElementsByClassName("center")[0].onclick = function(ev) {
      var w = window.innerWidth;
      var event = ev || window.event;
      var x = event.clientX;
      if (canClick === false) {
        return;
      }
      if (x <= w / 2) {
        // 点击左半屏
        eye_toggle % 2 == 0 ? tran_one() : tran_two();

        eye_toggle++;
      } else {
        // 点击右半屏
        if (eye_close % 2 == 0) {
          circle_in.style.transform = "rotate(360deg)";
          circle_inner.style.border = "10px solid black";
          eye_in_a.setAttribute(
            "d",
            "M205 262 Q209 276,200 298 Q200 295,190 279 Q195 275,205 262"
          );
          eye_in_b.setAttribute(
            "d",
            "M150 279 Q133 278,117 270 Q127 268,137 261 Q140 271,150 279"
          );
          eye_in_c.setAttribute(
            "d",
            "M158 208 Q168 195,185 186 Q179 195,185 210 Q175 203,158 208"
          );
        } else {
          circle_in.style.transform = "rotate(0deg)";
          circle_inner.style.border = "1px solid black";
          eye_in_a.setAttribute(
            "d",
            "M198 269 Q205 270,195 285 Q196 280,194 275 Q193 270,198 269"
          );
          eye_in_b.setAttribute(
            "d",
            "M142,272 Q136 273,129 270 Q136 270,136 266 Q145 265,142 272"
          );
          eye_in_c.setAttribute(
            "d",
            "M168 207 Q170 200,181 202 Q178 201,175 207 Q170 211,168 207"
          );
        }
        eye_close++;
      }
    };

    function tran_one() {
      //				eye_middle.setAttribute("r","35");
      //				eye_middle.style.strokeWidth="10";

      path_top.setAttribute(
        "d",
        "M300 310 C270 210,260 200,0 180 C180 20,300 200,300 310"
      );
    }
    function tran_two() {
      eye_middle.setAttribute("r", "40");
      eye_middle.style.strokeWidth = "1";

      path_top.setAttribute(
        "d",
        "M300 310 C70 310,50 310,0 180 C180 20,300 200,300 310"
      );
    }
  }
};
</script>
<style scoped>
body {
  background: black;
}
.center {
  position: relative;
  padding-top: 100px;
  width: 970px;
  margin: 0 auto;
}
.black {
  position: relative;
  width: 475px;
  height: 400px;
  left: 15px;
  top: 0;
  -webkit-box-reflect: right 1px;
  transform-style: preserve-3d;
  perspective: 1600px;
}
.svg {
  position: relative;
  top: 0;
  left: 0;
}

.path_top {
  transition: all 3s linear;
} /*transform属性可用，z-index属性不可用*/

#eye_in_a,
#eye_in_b,
#eye_in_c {
  transition: all 0.6s linear;
}

#circle-in {
  position: absolute;
  width: 475px;
  height: 400px;
  z-index: 500;
  left: 0;
  top: 0;
  transition: all 0.3s linear;
  transform-origin: 170px 245px;
  border: none;
}
/*#circle-in:hover{transform: rotate(50deg);}*/
#circle-in svg {
  border: none;
}

#circle-out {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  opacity: 0;
  animation: tranz 0.5s linear;
  animation-delay: 10s;
  animation-fill-mode: paused;
}

#circle_inner {
  position: absolute;
  left: 130px;
  top: 205px;
  width: 80px;
  height: 80px;
  border: 1px solid black;
  transition: all 0.8s linear;
  border-radius: 50%;
}
h1,
h2 {
  position: absolute;
  z-index: 800;
  font-size: 36px;
  width: auto;
  height: auto;
  color: white;
  text-align: center;
  opacity: 0;
}
.cover-bottom {
  transition: all 5s linear;
  stroke-dasharray: 436 436;
  stroke-dashoffset: 371;
}

/*眼睛变大特效*/
/*
			@keyframes tranz{
				0%{opacity: 1;transform: translateZ(0);top: 0;}
				50%{opacity:0.5;transform:scale(1.5)translateZ(800px);top: -50px;}
				100%{opacity:0;transform:scale(2)translateZ(1800px);top: -100px;}
			}
			*/
@keyframes peakf {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes peakg {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
