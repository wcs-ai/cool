<template>
  <div id="scroll-bar">
    <div class="tags-out" id="tags-out">
      <div class="tags-in" id="tags-in">tag tag..</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cool-scroll-bar",
  data() {
    return {
      tagIn: null,
      tagOut: null
    };
  },
  methods: {
    // 点击滚动
    clickScrolling(award) {
      //if (this.scrolling) return;

      const INEL = this.tagIn;
      const inw = INEL.offsetWidth;
      const outw = this.tagOut.offsetWidth;
      // 每次最大移动距离
      const MOVE_WIDTH = 80;
      const maxw = inw - outw;
      //_lf最大为0，最小为maxw
      const left = INEL.offsetLeft;
      const absLeft = Math.abs(left);
      // 右侧移动可用距离
      const useableRight = absLeft;
      // 左侧可移动距离
      const useableLeft = Math.abs(maxw - absLeft);
      // 移动的距离
      let usew = 0;

      if (inw <= outw) return;

      if (award === "left") {
        // 向左移动
        usew = MOVE_WIDTH > useableLeft ? useableLeft : MOVE_WIDTH;

        if (absLeft >= maxw && left < 0) return;
        // 滚动
        this.$nextTick(() => {
          INEL.style.setProperty("left", left - usew + "px");
        });
      } else {
        // 向右移动
        usew = MOVE_WIDTH > useableRight ? useableRight : MOVE_WIDTH;
        if (left >= 0) return;

        this.$nextTick(() => {
          INEL.style.setProperty("left", left + usew + "px");
        });
      }
    },
    // 初始化滚动条
    initScroll() {
      const inw = this.tagIn.offsetWidth;
      const outw = this.tagOut.offsetWidth;

      if (inw <= outw) this.tagIn.style.setProperty("left", 0);
    }
  },
  mounted() {
    this.tagIn = document.getElementById("tags-in");
    this.tagOut = document.getElementById("tags-out");
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
