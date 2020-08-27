<template>
  <div>
    <div class="regtop">
      <van-icon name="arrow-left" class="home" @click="$router.go(-1)" />
      <span>购物车</span>
      <van-icon name="ellipsis" class="login" />
    </div>
    <div v-if="productList.length>0">
      <van-checkbox
        class="van-checkbox"
        style="margin:5px 5px 5px 16px"
        v-model="ischeckedAll"
        @click="selectProduct(ischeckedAll)"
      >全选</van-checkbox>
      <div class="shopping">
        <div class="shoppingitem" v-for="(val,index) of productList" :key="index">
          <div class="goods-check">
            <van-checkbox v-model="val.select" style="margin-top: 30px;"></van-checkbox>
          </div>
          <div class="goods-pic">
            <a href>
              <img :src="val.pic" alt />
            </a>
          </div>
          <div class="info">
            <div>
              <span>{{val.title}}</span>
            </div>
            <div class="pcires">
              <span>单价:￥{{val.price.toFixed(2)}}</span>
            </div>
            <div class="pcire">
              <span>总价:￥{{(val.price*val.count).toFixed(2)}}</span>
            </div>
          </div>
          <div class="remove">
            <van-icon
              name="delete"
              class="removep"
              @click="deleteOneProduct(index,val.product_id,val.user_id)"
            />
            <van-stepper :value="val.count" @plus="val.count++" @minus="val.count--" disable-input />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="nctouch-norecord cart">
      <div class="norecord-ico">
        <i></i>
      </div>
      <p style="font-size:18px;margin:10px 0">您的购物车还是空的</p>
      <p style="font-size:12px; color: #999;">去挑一些中意的商品吧</p>
      <a @click="$router.push('/productsList')" class="btn">随便逛逛</a>
    </div>
    <div class="nctouch-cart-bottom">
      <div class="total">
        <span class="total-money">
          合计总金额：
          <em class="em">{{getTotal.totalPrice.toFixed(2)}}</em>
        </span>
      </div>
      <div class="check-out ok">
        <a @click="look()">确认信息</a>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { Dialog } from "vant";
export default {
  data() {
    return {
      productList: [],
      checked: true
    };
  },
  watch: {},
  mounted() {
    this.getProductList();
  },
  methods: {
    look() {
      Dialog.alert({
        title: "联系管理员",
        message: "请联系管理员购买商品！！！"
      });
      console.log(this.productList);
    },

    deleteOneProduct: function(index, product_id, user_id) {
      //根据索引删除productList的记录
      this.productList.splice(index, 1);
      //根据product_id user_id删除数据库对应的记录
      this.axios
        .post(
          "/pro/delete",
          qs.stringify({
            product_id,
            user_id
          }),
          {
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            Dialog.alert({
              title: "删除成功",
              message: "删除商品成功"
            });
          }
        });
    },
    //全选与取消全选
    selectProduct: function(_isSelect) {
      //遍历productList，全部取反
      for (var i = 0, len = this.productList.length; i < len; i++) {
        this.productList[i].select = !_isSelect;
      }
    },
    //获取用户商品
    getProductList() {
      let user_id = sessionStorage.getItem("user_id"); //获取已登录的用户信息
      console.log(user_id);
      if (user_id) {
        //判断是否存在  存在就请求数据库拿取数据
        this.axios
          .post(
            "/pro/shopping",
            qs.stringify({
              user_id
            }),
            {
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            console.log();
            //为productList添加select（是否选中）字段，初始值为true
            //console.log(res.data);
            if (res.data) {
              res.data.map(function(item) {
                item.select = true;
              });
              //为productList添加select（是否选中）字段，初始值为true
              this.productList.push(...res.data);
              //console.log(this.productList);
            }
          });
      }
    }
  },

  computed: {
    //检测是否全选
    ischeckedAll: function() {
      //如果productList中每一条数据的select都为true，返回true，否则返回false;
      return this.productList.every(function(val) {
        return val.select;
      });
    },
    //获取总价和产品总件数
    getTotal: function() {
      //获取productList中select为true的数据。
      var _proList = this.productList.filter(function(val) {
          return val.select;
        }),
        totalPrice = 0;
      for (var i = 0, len = _proList.length; i < len; i++) {
        //总价累加
        totalPrice += _proList[i].count * _proList[i].price;
      }
      //选择产品的件数就是_proList.length，总价就是totalPrice
      return { totalNum: _proList.length, totalPrice: totalPrice };
    }
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
  background-image: url("../assets/img/cart_w.png");
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
.em {
  color: red;
  font-size: 18px;
}
.nctouch-cart-bottom .total-money {
  height: 50px;
  margin-right: 35%;
  padding: 10px 0;
  font-size: 12px;
  line-height: 50px;
}
.nctouch-cart-bottom .total {
  display: block;
  float: left;
  text-align: right;
  width: 75%;
}
.nctouch-cart-bottom .check-out a {
  display: block;
  text-align: center;
  font-size: 0.8rem;
  color: #fff;
  line-height: 50px;
}
.nctouch-cart-bottom .check-out {
  display: block;
  float: right;
  width: 25%;
  height: 50px;
}
.nctouch-cart-bottom .check-out.ok {
  background-color: #ed5564;
}
.nctouch-cart-bottom {
  position: fixed;
  z-index: 1;
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.85);
  border-top: solid 1px #eee;
  margin-bottom: 50px;
}
.remove {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.shoppingitem .pcires {
  margin-top: 15px;
  color: #db4453;
  font-size: 14px;
}
.shoppingitem .pcire {
  margin-top: 25px;
  color: #db4453;
  font-weight: 600;
  font-size: 14px;
}
.shoppingitem .goods-pic {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 5px;
}
.goods-check {
  height: 92px;
  line-height: 92px;
}
.shopping {
  position: relative;
}
.shoppingitem > div {
  margin: 0 5px;
  height: 80px;
}
.shoppingitem {
  display: flex;
  padding: 10px;
  border: 1px solid #eee;
  justify-content: space-between;
}

.shoppingitem .goods-pic img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.regtop {
  text-align: center;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  padding: 10px;
}
.regtop .home {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 90%;
  opacity: 0.7;
  vertical-align: text-top;
  float: left;
}
.regtop .login {
  float: right;
  font-size: 18px;
}
</style>