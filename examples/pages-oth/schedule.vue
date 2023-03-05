<template>
  <div class="home-schedule">
    <div id="linea">
			<p id="p"></p>
			<canvas id="can" width="300" height="400"></canvas>
		</div>
  </div>
</template>
<script>
export default{
  mounted(){
    var can = document.getElementById("can");
			var p = document.getElementById("p");
			var num = 70,play,wi = 1;
			var pi = Math.PI;
			// 点的x轴,y轴位置初始
			var x = [],
				y = [];
			// y轴各点每次的变化值
			var yi = [],
				iv = [],
				a = [];
			var x_m, y_m, random_y = [];
			var exe = 150,
				w_ = 996;
            var dec_x = 400;

			function sec(){
				for(var g = 0; g < num; g++) {
					// 初始时的x轴y轴位置，
					yi.push(Math.random() * 2 + 0.5);
					x.push(Math.random()*300 + 120);
					y.push(Math.random() * 30 + 140);
					random_y.push(Math.random() * 40);
					iv.push(Math.random() * 2 + 1);
					a.push(1);
				}
               // dec_x = 100;
			}

			function run() {
				var av = can.getContext("2d");
                //var grd = ct.createLinearGradient(0, 100, w_, 50);
				av.globalCompositeOperation = "copy";
				av.beginPath();
				av.fillStyle = "transparent";
				av.arc(30, 150, 3, 0, Math.PI * 2);
				av.fill();

				for(var i = 0; i < num; i++) {
					y_m = random_y[i] * Math.cos(yi[i] * Math.PI / 180);
					av.globalCompositeOperation = "source-over";
					av.beginPath();
					av.fillStyle = "rgba(14,241,238," + a[i] + ")";
					av.shadowBlur = 25;
					av.shadowColor = "white";
					av.arc(x[i], y[i] + y_m, 3, 0, Math.PI * 2);
					av.fill();
				}

				//dec_x += 3;
				w_ -= 1;
				wi ++ ;
				for(var t = 0; t < num; t++){
					yi[t] += iv[t];
					x[t] -= 2.5;

					if(x[t] <= dec_x * 4 / 5){
						a[t] = 0.8;
					}
					if(x[t] <= dec_x * 3 / 5) {
						a[t] = 0.5;
					}
					if(x[t] <= dec_x / 3) {
						a[t] = 0.2;
					}
					if(x[t] <= 20){
						//console.log(2);
						x[t] = 400 - Math.random()*100;
						a[t] = 1;
					}

				}
				
                play = requestAnimationFrame(run);
                if(w_<=0){
                    cancelAnimationFrame(play);
                    can.style.display = "none";
                }
                can.style.right = w_ + "px";
				p.style['width'] = wi + "px";
			}
			sec();
			run();
  }
}
</script>
<style scoped>
#linea {
				position: relative;
				top: 350px;
				width: 1000px;
				height: 35px;
				margin: 50px auto;
				border: 2px solid #1ba9f3;
				box-shadow: 1px 1px 15px white;
				-webkit-box-shadow: 1px 1px 15px white;
				-moz-box-shadow: 1px 1px 15px white;
				-ms-box-shadow: 1px 1px 15px white;
			}
            #can{
                position: absolute;
                right:1000px;
                top:-140px;
			}
			#p{
				position: absolute;
				width: 0;
				height: 31px;
				top: -16px;
				left: 0;
				background: -webkit-linear-gradient(left,#de21f4 20%,#f00d78 60%,#168dfc 95%,#35f5fc 100%);
				background: -moz-linear-gradient(left,#de21f4 20%,#f00d78 60%,#168dfc 95%,#35f5fc 100%);
				background: -ms-linear-gradient(left,#de21f4 20%,#f00d78 60%,#168dfc 95%,#35f5fc 100%);
			}
</style>