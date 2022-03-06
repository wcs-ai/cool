import textTable from "./autoTable.vue";

textTable.install = function(vue){
  vue.component(textTable.name,textTable);
}

export default textTable;