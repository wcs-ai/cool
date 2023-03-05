<template>
  <div class="hello">
    <layout>
      <div slot="center">
        <!-- prettier-ignore -->
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="30" cy="30" r="25" style="stroke:none;fill:#0000ff;">
            <animate id="one" attributeName="cx" attributeType="XML" from="30" to="90" begin="0s" dur="3s" fill="remove" repeatCount="10" />
          </circle>
        </svg>
        <div class="svg"></div>
      </div>
    </layout>
    <!--<rect x="30" y="100" width="100" rx="10" ry="10" height="60" style="fill:red;stroke-width:2;stroke:blue;"></rect>-->
  </div>
</template>

<script>
import { Button } from "muse-ui";
import layout from "@/components/layout";

const codeTemp = () => ({
  component: import("@/components/codeTemp"),
  //loading: Loading,
  delay: 200,
  timeout: 3000,
});

export default {
  name: "home",
  components: {
    layout,
    [Button.name]: Button,
    codeTemp,
  },
  data() {
    return {
      texts: ["aa", "bb"],
      popstate: true,
      pages: [],
    };
  },
  methods: {},
  created() {
    var s =
      '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
      '<circle cx="30" cy="30" r="25" style="stroke:none;fill:#0000ff;">' +
      '<animate id="one" attributeName="cx" attributeType="XML" from="30" to="90" begin="0s" dur="3s" fill="remove" repeatCount="10" />' +
      "</circle></svg>";
    var t = encodeURIComponent(s);
    console.info(t);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  height: 100%;
  .body-title {
    padding: 15px 0 0 15px;
    text-align: left;
  }
  .body {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .code-out {
      margin-bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      .code-box {
        margin-right: 35px;
      }
    }
  }
}

.svg {
  height: 300px;
  background: url("data:image/svg+xml,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%2225%22%20style%3D%22stroke%3Anone%3Bfill%3A%230000ff%3B%22%3E%3Canimate%20id%3D%22one%22%20attributeName%3D%22cx%22%20attributeType%3D%22XML%22%20from%3D%2230%22%20to%3D%2290%22%20begin%3D%220s%22%20dur%3D%223s%22%20fill%3D%22remove%22%20repeatCount%3D%2210%22%20%2F%3E%3C%2Fcircle%3E%3C%2Fsvg%3E")
    no-repeat center;
}
</style>
