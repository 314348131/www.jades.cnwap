<template>
    <div>
        <van-tabbar class="van-tabbar" v-model="active" >
            <van-tabbar-item icon="wap-home-o" name="home">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" name="products">分类</van-tabbar-item>
            <van-tabbar-item icon="search" name="search">搜索</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" name="shopping">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager-o" name="store">我的商城</van-tabbar-item>
          </van-tabbar>
    </div>
</template>
<script>

export default {
    data() {
    return {
      active: "",
    };
  },
  watch: {
    active(){
        switch(this.active){
                case "home":
                    this.$router.push("/")
                    break;
                case "products":
                    this.$router.push("/productsList")
                    break;
                case "search":
                    this.$router.push("/search")
                    break;
                case "shopping":
                    this.$router.push("/shopping")
                    break;
                case "store":
                    this.$router.push("/store")
                    break;
            }
    }
  },
}
</script>
<style  scoped>

</style>