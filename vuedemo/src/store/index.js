import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    class_id: 0,
    keyword: "",
  },
  mutations: {
    classid(state, item) {
      state.class_id = item;
      //console.log(1);
    },
    setkeyword(state, item) {
      state.keyword = item;
      //console.log(2);
    },
  },
  actions: {},
  modules: {},
});
