<template>
  <div id="app">
    <router-view />
    <my-tabbar></my-tabbar>
    <back-Top></back-Top>
  </div>
</template>
<script>
import backTop from "./components/backTop.vue";
import myTabbar from "./components/myTabbar.vue";
export default {
  components: {
    myTabbar,
    backTop
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a {
  color: #000;
}
</style>
