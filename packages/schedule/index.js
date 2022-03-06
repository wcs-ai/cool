import schedule from "./schedule.vue";

schedule.install = function(vue){
  vue.component(schedule.name,schedule);
}

export default schedule;