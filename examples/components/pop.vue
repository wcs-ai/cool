<template>
  <div class="pop">
    <div><input :value="state" v-on:input="alt($event)" placeholder="请输入"/></div>
  </div>
</template>

<script>
import {Button} from "muse-ui";
export default {
  name: 'pop',
  props:{
    state:{default:""},
    cs:Array
  },
  components:{
    [Button.name]:Button,
  },
  model:{
    prop:'state',
    event:'change'
  },
  data () {
    return {
      content:{ a:1, b:2}
    }
  },
  methods:{
    alt(e){
      let c = e.target.value;
      this.cs.push('hello');
      this.$emit('change',c);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
