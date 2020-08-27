<template>
  <div>
    <div v-if="urls!=-1">
      <!--商品搜索-->
      <van-search v-model="value" show-action placeholder="请输入搜索关键词">
        <template #left>
          <van-icon name="arrow-left" size="30" @click="back" />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!--商品排序-->
      <van-dropdown-menu class="van-dropdown-menu">
        <van-dropdown-item v-model="value1" :options="option1" @change="getvaule" />
        <van-dropdown-item v-model="value2" :options="option2" @change="getvaule" />
      </van-dropdown-menu>
    </div>
    <!--首页商品分类动态加载-->
    <van-tabs v-model="active">
      <van-tab
        v-for="(val,index) of product"
        :title="val.cname"
        :key="index+1"
        title-style=" font-weight: bold;"
        animated
      >
        <van-row class="van-row" v-if="productItme">
          <van-col span="12" v-for="(val,index) of productItme" :key="index">
            <router-link :to="`/products/${val.product_id}`">
              <img :src="val.pic" alt width="95%" />
              <p>{{val.title}}</p>
              <span>￥{{val.price.toFixed(2)}}</span>
            </router-link>
          </van-col>
        </van-row>

        <div v-if="productItme==''" class="nctouch-norecord cart">
          <div class="norecord-ico">
            <i></i>
          </div>
          <p style="font-size:18px;margin:10px 0">没有找到任何相关信息</p>
          <p style="font-size:12px; color: #999;">选择或搜索其它商品分类/名称...</p>
          <a @click="$router.push('/search')" class="btn">重新选择</a>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      option1: [
        { text: "价格筛选", value: "" },
        { text: "价格从高到低", value: "desc" },
        { text: "价格从低到高", value: "asc" },
        { text: "人气排序", value: "Hits" }
      ],
      option2: [
        { text: "筛选", value: "" },
        { text: "销量优先", value: "priority" }
      ],
      product: [{ cname: "全部" }, { cname: "新品" }, { cname: "推荐" }],
      active: "",
      productItme: "",
      keyword1: "",
      urls: location.href.indexOf("/productsList"),
      start: ""
    };
  },
  watch: {
    //监听商品导航变化
    active() {
      //console.log(this.class_id,"vuex");
      // console.log(this.active,78)
      this.productItme = ""; //清空商品分类数据
      if (this.active != 0) {
        this.keyword1 = "";
        this.setkeyword(""); //清空vuex商品搜索数据
      }

      if (location.href.indexOf("/productsList") == -1) {
        //判断是否是商品分类页面
        this.classid("");
      }
      // console.log(this.class_id,this.active,"刷新");
      this.getProductItem();
      this.value1 = "";
      this.value2 = "";
    }
  },
  methods: {
    ...mapMutations(["classid", "setkeyword"]), //语法糖 获取vuex中的方法

    getvaule(e) {
      //商品条件函数
      this.getProductItem(e);
    },
    back() {
      this.$router.go(-1); //返回上一层
    },

    onSearch() {
      //搜索事件
      this.active = 0;
      this.keyword1 = this.value;
      this.getProductItem();
      this.value = "";
    },

    getProductTab() {
      //获取商品导航数据
      this.axios.get("/pro/product").then(res => {
        this.product.push(...res.data);

        this.active = this.class_id;
      });
    },
    getProductItem(key) {
      //获取商品分类数据
      // console.log(this.active,this.keyword1,key);
      this.axios
        .get(
          `/pro/productItme?class_id=${this.active - 3}&title=${
            this.keyword1
          }&value=${key}`
        )
        .then(res => {
          this.productItme = res.data;
          // console.log(this.class_id,this.active,7878)
          //   console.log(this.productItme,"搜索");
        });
    }
  },
  mounted() {},
  created() {
    // this.active = this.class_id;
    this.keyword1 = this.keyword;
    this.getProductTab();
  },
  computed: {
    ...mapState(["class_id", "keyword"]) //语法糖 用于获取vuex中的数据
  }
};
</script>
<style scoped>
.btn {
  display: inline-block !important;
  height: 30px;
  padding: 0 5px;
  margin: 0 auto;
  font-size: 14px;
  color: #555 !important;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin: 10px 0;
}
.nctouch-norecord .norecord-ico i {
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  background-image: url("../assets/img/search_w.png");
}
.nctouch-norecord .norecord-ico {
  width: 75px;
  height: 75px;
  padding: 5px;
  margin: 0 auto;
  background-color: #ddd;
  border-radius: 100%;
}
.nctouch-norecord {
  margin-top: 200px;
  text-align: center;
}
.van-row img {
  border-radius: 10px;
  padding: 5px;
}
.van-row p {
  font-size: 12px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
.van-row span {
  line-height: 30px;
  color: #db4453;
  font-weight: bold;
}
</style>