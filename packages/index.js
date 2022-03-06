import flex from "./flex";
import textlTable from "./textTable";
import eye from "./eye";
import map from "./map";
import schedule from "./schedule";
import svgflex from "./svgflex";
import tree from "./tree";

//const req = require.context('./svg', false, /\.svg$/)

const components = [
  flex,
  textlTable,
  eye,
  map,
  schedule,
  svgflex,
  tree
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  flex,
  textlTable,
  eye,
  map,
  schedule,
  svgflex,
  tree
}
