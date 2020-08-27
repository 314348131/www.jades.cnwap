<template>
  <div class="store">
    <div class="member-top">
      <div>
        <a href>
          <i class="set"></i>
        </a>
        <a href>
          <i class="more"></i>
        </a>
      </div>
      <div class="member-info" v-if="userinfo">
        <a class="default-avatar-login"></a>
        <a class="to-login">{{userinfo.uname}}</a>
      </div>
      <div class="member-info" v-else>
        <a class="default-avatar"></a>
        <a class="to-login" @click="$router.push('/login')">点击登录</a>
      </div>

      <div class="member-collect">
        <span>
          <a>
            <i class="favorite-goods"></i>
            <p>商品收藏</p>
          </a>
        </span>
        <span>
          <a>
            <i class="favorite-store"></i>
            <p>店铺收藏</p>
          </a>
        </span>
        <span @click="quit()">
          <a>
            <i class="goods-browse"></i>
            <p>退出登录</p>
          </a>
        </span>
      </div>
    </div>
    <div class="mt5">
      <div class="top">
        <a href>
          <div class="left">
            <h3>
              <i>
                <img src alt />
              </i> 我的订单
            </h3>
          </div>
          <div class="right">
            <h5>
              查看全部订单
              <van-icon name="arrow" size="20" class="van-icon" />
            </h5>
          </div>
        </a>
      </div>
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="paid" text="待付款" />
        <van-grid-item icon="send-gift-o" text="待收货" />
        <van-grid-item icon="logistics" text="待自取" />
        <van-grid-item icon="records" text="待评价" />
        <van-grid-item icon="after-sale" text="退货/退款" />
      </van-grid>
    </div>

    <div class="mt5">
      <div class="top">
        <a href>
          <div class="left1">
            <h3>
              <i>
                <img src alt />
              </i> 我的财产
            </h3>
          </div>
          <div class="right">
            <h5>
              查看全部财产
              <van-icon name="arrow" size="20" class="van-icon" />
            </h5>
          </div>
        </a>
      </div>
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="gold-coin-o" text="预存款" />
        <van-grid-item icon="idcard" text="充值卡" />
        <van-grid-item icon="balance-pay" text="代金券" />
        <van-grid-item icon="cash-on-deliver" text="红包" />
        <van-grid-item icon="gem-o" text="积分" />
      </van-grid>
    </div>
    <div class="mt5">
      <div class="top">
        <a href>
          <div class="left2">
            <h3>
              <i>
                <img src alt />
              </i>收货地址管理
            </h3>
          </div>
          <div class="right">
            <h5>
              <van-icon name="arrow" size="20" class="van-icon" />
            </h5>
          </div>
        </a>
      </div>
    </div>
    <div class="mt5">
      <div class="top">
        <a href>
          <div class="left3">
            <h3>
              <i>
                <img src alt />
              </i> 用户设置
            </h3>
          </div>
          <div class="right">
            <h5>
              <van-icon name="arrow" size="20" class="van-icon" />
            </h5>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      userinfo: ""
    };
  },
  methods: {
    quit() {
      let user_id = sessionStorage.getItem("user_id");
      // console.log(user_id);
      this.axios
        .post(
          "/user/quit",
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
          //console.log(res.data);
          if (res.data.code == 200) {
            sessionStorage.clear();
            this.$router.push("/login");
          }
        });
    }
  },
  created() {
    let user_id = sessionStorage.getItem("user_id");
    if (user_id) {
      this.axios
        .post(
          "/user/login_uid",
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
          this.userinfo = res.data;
        });
    }
  }
};
</script>
<style  scoped>
.store {
  background-color: #f5f5f5;
}
.mt5 > .top > a > .left img {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/mc_01.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
}
.mt5 > .top > a > .left1 img {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/mc_02.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
}
.mt5 > .top > a > .left2 img {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/mc_03.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
}
.mt5 > .top > a > .left3 img {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/mc_04.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70%;
}
.mt5 > .top > a .van-icon {
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
.mt5 > .top > a > .right {
  color: #999;
  float: right;
}
.mt5 > .top > a {
  line-height: 25px;
  display: block;
  height: 25px;
  padding: 15px;
  border-bottom: solid 0.05rem #eee;
}
.mt5 > .top > a > div {
  display: inline-block;
}
.mt5 {
  margin-top: 10px !important;
  background-color: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}
@keyframes memberInfoDown {
  0% {
    top: -20%;
  }
  30% {
    top: -10%;
  }
  75% {
    top: 10%;
  }
  85% {
    top: 20%;
  }
  95% {
    top: 30%;
  }
  100% {
    top: 25%;
  }
}
@keyframes changeBg {
  0% {
    background-color: #ed5564;
  }
  10% {
    background-color: #fb6e52;
  }
  20% {
    background-color: #ffce55;
  }
  30% {
    background-color: #a0d468;
  }
  40% {
    background-color: #48cfae;
  }
  50% {
    background-color: #4fc0e8;
  }
  60% {
    background-color: #5d9cec;
  }
  70% {
    background-color: #ac92ed;
  }
  80% {
    background-color: #ec87bf;
  }
  90% {
    background-color: #ed5564;
  }
}
.member-top {
  width: 100%;
  height: 15rem;
  animation: changeBg 20s infinite;
  background-color: #ed5564;
  background-image: url("../assets/img/member_top_bg.png");
  position: relative;
}

.member-top .set {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/set_w.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 1;
  margin: 10px;
}
.member-top .more {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("../assets/img/more_w.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 1;
  margin: 10px;
  float: right;
}
.member-top .member-info {
  position: absolute;
  text-align: center;
  top: 25%;
  left: 38%;

  z-index: 1;

  animation: memberInfoDown 1000ms ease-in;
}
.member-top .default-avatar-login {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../assets/img/default_user_portrait.gif");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
  border-radius: 100%;
}

.member-top .default-avatar {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../assets/img/member_w.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60%;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
  border-radius: 100%;
}
.member-top .to-login {
  display: block;
  font-size: 1.2rem;
  color: #fff;
  line-height: 1rem;
  height: 1rem;
  margin: 0.25rem auto;
}

.member-collect {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.member-collect span {
  display: inline-block;
  width: 33.33%;
  height: 3rem;
  padding: 0.5rem 0;
  text-align: center;
}
.member-collect span a {
  display: block;
}
.member-collect span i {
  vertical-align: top;
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 auto;
  padding-bottom: 5px;
}
.member-collect span i.favorite-goods {
  background-image: url("../assets/img/favorite_w.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
}
.member-collect span i.favorite-store {
  background-image: url("../assets/img/store_w.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
}
.member-collect span i.goods-browse {
  background-image: url("../assets/img/goods-browse_w.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
}
.member-collect span p {
  font-size: 0.6rem;
  line-height: 1rem;
  color: #fff;
  height: 1rem;
}
</style>