<template>
  <div style="margin-bottom:100px">
    <!--商品详情头部-->
    <van-sticky>
      <van-row class="van-row">
        <van-col span="6" @click="back">
          <van-icon name="arrow-left" size="30" />
        </van-col>
        <van-col span="6">
          <router-link :to="`/products/${product.product_id}`">商品</router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="`/productsDetails/${product.product_id}`">详情</router-link>
        </van-col>
        <van-col span="6">
          <van-icon name="ellipsis" size="30" />
        </van-col>
      </van-row>
    </van-sticky>
    <!--商品详细信息-->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image,index) in product.images" :key="index">
        <img :src="image" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <p class="productP">{{product.title}}</p>
    <div class="price">
      <span class="productPrice">￥{{product.price?product.price.toFixed(2):""}}</span>
      <span class="productSell">销售:{{product.pageView}}件</span>
    </div>
    <div class="productaddr">
      <p>
        送至
        <span class="addr">{{resAddr?resAddr:"全国"}}</span>
        <span style="color:red">有货</span>
        <van-icon name="aim" @click="showPopup" style="float:right" />
      </p>
      <p class="charge">免费运送</p>
    </div>
    <!--商品其余信息-->
    <span>
      <img src="../assets/img/05992339042087247.jpg" width="100%" alt />
    </span>
    <div class="button">
      <van-button icon="phone" color="#fe3f35">热线咨询：037765978073</van-button>
      <van-button icon="comment-circle" color="#fe3f35">微信号：13723012860</van-button>
    </div>
    <!--地址详情选项-->

    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-area
        title="请选择城市"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="changeAddr"
        @cancel="showPopup"
      />
    </van-popup>
    <!--加入购物车-->
    <van-tabbar class="van-tabbar" v-model="active">
      <van-tabbar-item icon="shopping-cart-o" name="shopping" @click="$router.push('/shopping')">购物车</van-tabbar-item>
      <van-tabbar-item name="shopping" @click="toshopping()">立即购买</van-tabbar-item>
      <van-tabbar-item name="shopping" @click="toshopping()">加入购物车</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import qs from "qs";
import { Dialog } from "vant";
import areaList from "./area";

export default {
  data() {
    return {
      show: false,
      areaList: areaList,
      resAddr: "",
      active: "",
      product: ""
    };
  },

  methods: {
    toshopping() {
      let user_id = sessionStorage.getItem("user_id");
      let product_id = this.product.product_id;
      if (user_id) {
        this.axios
          .post(
            "/pro/insert",
            qs.stringify({
              user_id,
              product_id,
              count: 1
            }),
            {
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code) {
              Dialog.alert({
                title: "添加成功",
                message: "添加商品成功"
              });
            }
          });
      } else {
        Dialog.alert({
          title: "添加失败",
          message: "请用户登录"
        }).then(success => {
          this.$router.push("/login");
        });
      }
    },
    showPopup() {
      this.show = !this.show;
    },
    changeAddr(picker) {
      //隐藏地址栏选项卡
      this.show = false;
      this.resAddr = "";
      picker.forEach(element => {
        this.resAddr += " " + element.name + " ";
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  },
  mounted() {
    let product_id = this.$route.params.product_id;

    this.axios
      .get(`/pro/product_dateail?product_id=${product_id}`)
      .then(res => {
        res.data.images = res.data.images.split("|");
        this.product = res.data;
        // console.log(this.product );
      });
  }
};
</script>
<style  scoped>
.van-tabbar {
  margin-bottom: 50px;
}
.van-tabbar > .van-tabbar-item:nth-child(2) {
  background-color: #ed5564;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.van-tabbar > .van-tabbar-item:nth-child(3) {
  background-color: #fb6e52;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.van-row > .van-col {
  height: 50px;
  line-height: 50px;
  background: #f8f8f8;
  text-align: center;
}
.van-row > .van-col:first-child > .van-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin: 10px 0;
}
.van-row > .van-col:nth-child(2) {
  border-bottom: 2px solid red;
}
.van-row > .van-col:last-child > .van-icon {
  float: right;
  margin: 10px 0;
}
.productP {
  margin: 10px 0;
  font-size: 18px;
}
.productPrice {
  color: #db4453;
  font-size: 24px;
}
.productSell {
  float: right;
}
.price {
  margin: 20px 0;
}
.addr {
  font-size: 12px;
}
.productaddr {
  border-bottom: 1px solid #eee;
}
.charge {
  color: #888;
  margin: 10px 10px;
  font-size: 12px;
}
.button {
  text-align: center;
}
.button button {
  width: 70%;
  margin: 10px 0;
  border-radius: 10px;
  text-shadow: 1px 1px 1px #333;
  border: solid 1px #ccc;
}
</style>