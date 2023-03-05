<script>
export default {
  name: "my-rander",
  // 设置此项，render第二个参数才能使用
  functional: true,
  data() {
    return {
      version: "1.0",
    };
  },
  props: {
    aa: {
      type: Number,
      default: 34,
    },
  },
  render(createElement, context) {
    console.dir(context);

    return createElement(
      "h1",
      {
        class: "h1-test",
        name: "my-render",
        style: { color: "white" },
      },
      "标签内容"
    );
  },
};
</script>
