<template>
    <div class="detalis">
            <!--商品详情头部-->
      <van-sticky >
      <van-row class="van-row1">
          <van-col span="6" @click="back"><van-icon name="arrow-left" size="30" /></van-col>
          <van-col span="6" > <router-link :to="`/products/${product.product_id}`">商品</router-link> </van-col>
          <van-col span="6" > <router-link :to="`/productsDetails/${product.product_id}`">详情</router-link> </van-col>
          <van-col span="6"><van-icon name="ellipsis"  size="30" /></van-col>
     </van-row>
     </van-sticky>
      <!--商品标题-->
     <h2>{{product.title}}</h2>
      <van-row class="detalis-row">
        <van-col span="12" v-for="(val,index) in product.specification" :key="index">{{val}}</van-col>
      </van-row>
 <div>
   <div class="goods_album">
     <img v-for="(val,index) in product.images" :key="index" :src="val">
  
  </div>
 </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      product:''
    }
  },
  methods:{
     back(){
      this.$router.go(-1);//返回上一层
    },
     
  },
   mounted() {
    let product_id = this.$route.params.product_id;

    this.axios.get(`/pro/product_dateail?product_id=${product_id}`).then(res=>{
      res.data.images = res.data.images.split("|");
      res.data.specification = res.data.specification.split("|");
      this.product = res.data;
      //console.log(this.product );
    })


  },
}
</script>
<style  scoped>

.van-row> .van-col{
    height: 50px;
   line-height: 50px;
   background: #F8F8F8;
   text-align: center;
}
.van-row> .van-col:first-child >.van-icon{
  width: 20px;
  height: 20px;
  float: left;
  margin: 10px 0;
}
.van-row1> .van-col:nth-child(3){
  border-bottom:2px solid red;
}
.van-row> .van-col:last-child >.van-icon{
  float: right;
  margin: 10px 0;
}
.detalis{
  margin-bottom:100px;
  text-align: center;
  padding: 0 10px;
}
.detalis h2{
  margin: 10px 0;
  font-weight: bold;
}
.detalis-row> .van-col{
      
      background-color: #fafafa;
      color: #990000;
      font-size: 12px;

}
.goods_album img{
  width:100%;
}
</style>