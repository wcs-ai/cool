<template>
  <div class="zuiti">
  <div id="stage">
			<div id="fu">
			<div id="huabu1">
				<div id="top">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
				</div>
				</div>

				<div id="bottom">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
				</div>
				</div>
				
				<div id="left">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
				</div>
				</div>
				
				<div id="right">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
				</div>
				</div>
				
				<div id="award">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
				</div>
				</div>
				
				<div id="back">
					<div class="yy">
					<div class="top">
						<div class="kk">
						<div class="cone_left"><div class="cone_child"></div></div><div class="cone_right"><div class="cone_child"></div></div>
						<div class="cone_back"><div class="cone_child"></div></div><div class="cone_award"><div class="cone_child"></div></div>
						</div>
					</div>
					<div class="ti le"><div class="ti_child"></div></div>
					<div class="ti ri"><div class="ti_child"></div></div>
					<div class="ti ba"><div class="ti_child"></div></div>
					<div class="ti aw"><div class="ti_child"></div></div>
					</div>
				</div>
			</div>
			<div id="huabu2"></div></div>
		</div>
		<!--按钮-->
		<div id="buttons">
			<p id="left_bt">左</p>
			<p id="up_bt">></p>
			<p id="down_bt">></p>
			<p id="right_bt">></p>
		</div>
  </div>
</template>
<script>
export default {
  mounted(){
    $(document).ready(function(){
				var yy=2;
				var kk=2;
				var cone=2;
				var ti=2;
				$("#left_bt").click(function(){
					if(yy%2==0){
						$(".yy").css("transform","translateZ(150px)");
						yy++;
					}
					else{$(".yy").css("transform","translateZ(0px)");yy++;}
				});
				$("#right_bt").click(function(){
					if(kk%2==0){
						$(".kk").css("transform","translateZ(100px)");
						kk++;
					}
					else{$(".kk").css("transform","translateZ(0px)");kk++;}	
				});
				$("#up_bt").click(function(){
					if(cone%2==0){
						$(".cone_child").css("transform","translateZ(60px)");
						cone++;
					}
					else{$(".cone_child").css("transform","translateZ(0px)");cone++;}	
				});
				$("#down_bt").click(function(){
					if(ti%2==0){
						$(".ti_child").css("transform","translateZ(80px)");
						ti++;
					}
					else{$(".ti_child").css("transform","translateZ(0px)");ti++;}	
				});

				$(window).keydown(function(){
					if(event.which==37)
					{
						if(yy%2==0)
						{
						$(".yy").css("transform","translateZ(150px)");
						yy++;
						}
						else{$(".yy").css("transform","translateZ(0px)");yy++;}
					}
					
					if(event.which==39)
					{
						if(kk%2==0)
						{
						$(".kk").css("transform","translateZ(100px)");
						kk++;
						}
						else{$(".kk").css("transform","translateZ(0px)");kk++;}
					}
					
					if(event.which==40)
					{
						if(cone%2==0)
						{
						$(".cone_child").css("transform","translateZ(60px)");
						cone++;
						}
						else{$(".cone_child").css("transform","translateZ(0px)");cone++;}
					}
					if(event.which==38)
					{
						if(ti%2==0)
						{
						$(".ti_child").css("transform","translateZ(80px)");
						ti++;
						}
						else{$(".ti_child").css("transform","translateZ(0px)");ti++;}
					}	
				})
			})
  }
}
			
</script>
<style scoped>
  #stage{
				position: relative;
				min-height:600px;
				perspective: 1800px;
			}
			#fu{
				position: absolute;
				height:100%;
				width: 100%;
				left: 0;
				top: 0;
				transform-style:preserve-3d;
			}
			
			#huabu2{
				position: absolute;
				width: 100px;
				height: 200px;
				top: 400px;
				left: calc(50% - 50px);
				transform: translateZ(-700px);
			
				background-size: cover;
			}
			#huabu1{
				position: relative;
				width:400px;
				height:400px;
				left:calc(50% - 200px);
				top: 400px;
				animation: an 120s linear infinite;				
				transform: translateZ(-700px)rotateX(75deg)rotateZ(30deg);
				transform-style: preserve-3d;
			}
			#top,#bottom,#left,#right,#award,#back{
				position: absolute;
				width: 200px;
				height:200px;
				background: rgba(0,0,0,0.6);
				left: 100px;
				top: 100px;
				border:1px solid red;
				transform-style: preserve-3d;
			}
			.yy{
				position: absolute;
				width: 200px;
				height:200px;
				background: black;
				left: 0;
				top: 0;				
				border:1px solid red;
				transform-style: preserve-3d;
				transition: all 0.2s;
			}
			#top{transform: translateZ(200px);}
			#bottom{transform:rotateX(180deg);}
			#left{transform: translateZ(100px)rotateY(-90deg)translateZ(100px);}
			#right{transform: translateZ(100px)rotateY(90deg)translateZ(100px);}
			#award{transform: translateZ(100px)rotateX(-90deg)translateZ(100px);}
			#back{transform: translateZ(100px)rotateX(90deg)translateZ(100px);}
			.ti{
				position:absolute;
				width: 200px;
				height:0;
				border-bottom: 50px inset red;
				border-left: 25px solid transparent;
				border-right:25px solid transparent;
				top: 75px;
				left:0;
				transform-style: preserve-3d;
			}
			.ti_child{
				position: absolute;
				width:190px;
				height: 0;
				top: 5px;
				left:-20px;
				border-bottom:40px solid black;
				border-left:20px solid transparent;
				border-right: 20px solid transparent;
				transition: all 0.3s;
			}
			.le{transform: rotateZ(90deg)translateZ(25px)rotateX(-90deg)translateZ(87px)rotateX(30deg);}
			.ri{transform: rotateZ(-90deg)translateZ(25px)rotateX(-90deg)translateZ(87px)rotateX(30deg);}
			.aw{transform: translateZ(25px)rotateX(-90deg)translateZ(87px)rotateX(30deg);}
			.ba{transform: translateZ(25px)rotateX(-90deg)translateZ(-87px)rotateX(-30deg)rotateY(180deg);}
			.top{
				position:absolute;
				width:150px;
				height: 150px;
				left: 25px;
				top: 25px;
				border: 5px solid red;
				background: black;
				transform-style:preserve-3d;
				transform: translateZ(45px);
			}
			.kk{
				position:absolute;
				width:150px;
				height: 150px;
				left: 0;
				top: 0;				
				transform-style:preserve-3d;
				transition: all 0.2s;			
			}
			.cone_left,.cone_right,.cone_award,.cone_back{
				position: absolute;
				width: 0;
				height: 0;
				left: 20px;
				bottom: -25px;
				border-left: 50px solid transparent;
				border-right: 50px solid transparent;
				transform-style: preserve-3d;
			}
			.cone_child{
				position: absolute;
				width: 0;
				height: 0;
				left: -45px;
				top: 5px;
				border-bottom: 190px solid black;
				border-left: 45px solid transparent;
				border-right:45px solid transparent;
				transition: all 0.3s;
			}
			.cone_left{
				border-bottom: 200px solid red;
				transform:rotateZ(45deg)translateZ(100px)rotateX(-75deg)translateZ(26px);
			}
			.cone_right{
				border-bottom: 200px solid red;
				transform:rotateZ(135deg)translateZ(100px)rotateX(-75deg)translateZ(26px);
			}
			.cone_back{
				border-bottom:200px solid red;
				transform:rotateZ(225deg)translateZ(100px)rotateX(-75deg)translateZ(26px);
			}
			.cone_award{
				border-bottom:200px solid red;
				transform:rotateZ(315deg)translateZ(100px)rotateX(-75deg)translateZ(26px);
			}
			#buttons{
				position: fixed;
				width: 150px;
				left: 80px;
				margin-left: -75px;
				top: 40px;
				height: 50px;
			}
			#buttons>p{
				position: absolute;
				width: 50px;
				height: 30px;
				background: black;
				color: white;
				text-align: center;
				line-height: 30px;
				border-radius: 10px;
    			-webkit-border-radius: 10px;
    			-moz-border-radius: 10px;
    			-ms-border-radius: 10px;
				cursor: pointer;
			}
			#left_bt{
				left: 0;
				top: 0;
			}
			#right_bt{
				right: 0;
				top: 0;
			}
			#up_bt{
				left: 50%;
				margin-left: -25px;
				top: -30px;
				transform: rotate(-90deg);
			}
			#down_bt{
				left: 50%;
				margin-left: -25px;
				top: 30px;
				transform: rotate(90deg);
			}
			@keyframes an{
				from{transform:translateZ(-700px)rotateX(75deg)rotateZ(30deg);}
				to{transform:translateZ(-700px)rotateX(75deg)rotateZ(390deg);}
			}
			
			@media only screen and (min-width: 300px) and (max-width: 768px) {
				#fu{transform: scale(0.7);top: -200px;}
			}
</style>