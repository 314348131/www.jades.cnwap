import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

//导入VantUI
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

axios.defaults.baseURL = "http://127.0.0.1:10201";

Vue.prototype.axios = axios;

Vue.config.productionTip = false;

//使用路由拦截只应许首页和注册  在未登录时 访问
router.beforeEach(function(to, from, next) {
  //判断哪些需要使用路由拦截
  if (to.meta.grang) {
    //判断是否登录 拦截对应页面
    sessionStorage.getItem("user_id") ? next() : next("/login");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
