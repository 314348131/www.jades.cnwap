import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import ProductsDetails from "../views/ProductsDetails.vue";
import mySearch from "../views/mySearch.vue";
import myProductsList from "../views/myProductsList.vue";
import store from "../views/store.vue";
import reg from "../views/reg.vue";
import login from "../views/login.vue";
import shopping from "../views/myshopping.vue";

//为防止多次点击同一路由跳转控制台报错，做一个push处理
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/shopping",
    name: "shopping",
    component: shopping,
    meta: { grang: true },
    component: () => import("../views/myshopping.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: login,
    component: () => import("../views/login.vue"),
  },
  {
    path: "/reg",
    name: "reg",
    component: reg,
    component: () => import("../views/reg.vue"),
  },
  {
    path: "/store",
    name: "store",
    component: store,
    meta: { grang: true },
    component: () => import("../views/store.vue"),
  },
  {
    path: "/productsList",
    name: "myProductsList",
    component: myProductsList,
    meta: { grang: true },
    component: () => import("../views/myProductsList.vue"),
  },
  {
    path: "/search",
    name: "mySearch",
    component: mySearch,
    meta: { grang: true },
    component: () => import("../views/mySearch.vue"),
  },
  {
    path: "/productsdetails/:product_id",
    name: "ProductsDetails",
    component: ProductsDetails,
    meta: { grang: true },
    component: () => import("../views/ProductsDetails.vue"),
  },
  {
    path: "/products/:product_id",
    name: "Products",
    component: Products,
    meta: { grang: true },
    component: () => import("../views/Products.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    meta: { grang: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
