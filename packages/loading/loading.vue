<template>
  <div class="custom-loading">
    <!--动画1-->
    <div v-show="loadingType == 'border'" class="border-animate"></div>
    <!--动画2-->
    <div v-show="loadingType == 'circle'" class="circle-animate">
      <div class="circle-bg"></div>
      <div class="circle-bar"></div>
    </div>
    <!--动画3-->
    <div class="flower" v-show="loadingType == 'flower'">
      <li class="flower--bar a">
        <i class="bar-tone"></i>
        <i class="bar-tone"></i>
      </li>

      <li class="flower--bar b">
        <i class="bar-tone"></i>
        <i class="bar-tone"></i>
      </li>
      <li class="flower--bar c">
        <i class="bar-tone"></i>
        <i class="bar-tone"></i>
      </li>
      <li class="flower--bar d">
        <i class="bar-tone"></i>
        <i class="bar-tone"></i>
      </li>
    </div>

    <!--重载按钮-->
    <p class="reLoad">点击重载</p>
  </div>
</template>
<script>
export default {
  name: "cool-loading",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 加载
    useLoadingFail: {
      type: Boolean,
      default: true
    },
    loadingType: {
      type: String,
      default: "border"
    }
  },
  data() {
    return {
      showLoading: false,
      showReload: false
    };
  },
  methods: {}
};
</script>
<style scoped>
/*最小25px*/
:root {
  --c: red;
  --size: 25px;
}
div,
ul,
li {
  box-sizing: border-box;
}
.line-gap {
  height: 50px;
}
/*动画1*/
.border-animate {
  /*较深一点的颜色*/
  border-left: 2px solid black;
  /*较浅一点的颜色*/
  border-bottom: 1px solid gray;
  margin: 0 auto;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
  animation-name: borderAnimate;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
/*动画2*/
.circle-animate {
  position: relative;
  margin: 0 auto;
  width: var(--size);
  height: var(--size);
  border: 1px solid gray;
  border-radius: 50%;
  animation-name: circleAnimate;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  box-shadow: 0px 0px 10px gray;
}

.circle-animate > .circle-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid gray;
}

.circle-animate > .circle-bar {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  border-radius: 50%;

  box-shadow: 0px 0px 10px gray inset;
  border-left: 4px solid gray;
  border-top: 4px solid white;
  border-right: 4px solid gray;
  border-bottom: 4px solid gray;
}
/*动画3*/
/*动画3*/
.flower {
  position: relative;
  list-style: none;
  list-style-type: none;
  width: var(--size);
  height: var(--size);
  font-size: 12px;
  border-radius: 50%;
  animation-name: flowerAnimate;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  margin: 0 auto;
}
.flower > .flower--bar {
  position: absolute;
  width: 100%;
  height: 8%;
  text-align: justify;
  text-align-last: justify;
  left: 0;
  top: 46%;
  border-radius: 5px;
  transform-origin: 50% 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flower--bar > .bar-tone {
  display: block;
  width: 30%;
  height: 100%;
  background-color: deepskyblue;
}

.flower > .flower--in {
  width: 32%;
  height: 32%;
  position: absolute;
  top: 34%;
  left: 34%;
  border: 1px solid deepskyblue;
  border-radius: 50%;
}

.flower > .b {
  transform: rotate(45deg);
}

.flower > .c {
  transform: rotate(90deg);
}

.flower > .d {
  transform: rotate(135deg);
}
/**/
@keyframes borderAnimate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/**/
@keyframes circleAnimate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
/**/
@keyframes flowerAnimate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.reLoad {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(250, 250, 250, 0.7);
  text-align: center;
  font-size: 12px;
  color: gray;
}
</style>
