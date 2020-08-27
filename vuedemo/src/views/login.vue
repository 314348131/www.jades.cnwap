<template>
  <div class="reg">
    <div class="regtop">
      <a href class="home" @click="$router.push('/')"></a>
      <span>会员登录</span>
      <a class="login" href @click="$router.push('/reg')">注册</a>
    </div>
    <div class="form-box">
      <div>
        <van-field v-model="username" label="账号" :error="nameerror" placeholder="用户名/邮箱/已验证手机号" />
      </div>
      <div>
        <van-field
          v-model="password"
          type="password"
          label="密码"
          :error="passworderror"
          placeholder="登录密码"
        />
      </div>
    </div>
    <div class="remember-form">
      <input type="checkbox" v-model="checked" :disabled="!checked" />
      <span>七天自动登陆</span>
      <a class="pwd" href>忘记密码？</a>
    </div>
    <div style="text-align :center">
      <van-button class="van-button" type="default" round @click="login()">登录</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import qs from "qs";
export default {
  data() {
    return {
      username: "",
      password: "",
      nameerror: true,
      passworderror: true,
      disabledlogin: true,
      checked: ""
    };
  },
  watch: {
    username() {
      this.checkusername();
    },
    password() {
      this.checkpassword();
    }
  },
  methods: {
    checkusername() {
      let reg = /^([a-z0-9]){6,20}$/;
      if (reg.test(this.username)) {
        this.nameerror = false;
        return true;
      } else {
        this.nameerror = true;
        return false;
      }
    },
    checkpassword() {
      let reg = /^([a-z0-9]){6,20}$/;
      if (reg.test(this.password)) {
        this.passworderror = false;
        return true;
      } else {
        this.passworderror = true;
        return false;
      }
    },
    login() {
      if (this.checkusername() && this.checkpassword()) {
        // console.log(this.username, this.password);
        this.axios
          .post(
            "/user/login",
            qs.stringify({
              uname: this.username,
              upwd: this.password
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
              // console.log(res.data.result);
              Dialog.alert({
                title: "登录成功",
                message: "已登录成功！！！"
              }).then(() => {
                sessionStorage.setItem("user_id", res.data.result[0].user_id); //将登录信息放入sessionStorage里面
                this.$router.push("/productsList"); //返回上一层
              });
            } else if (res.data.code == 404) {
              Dialog.alert({
                title: "用户名或密码错误",
                message: "您好，您用户名或密码错误！请再次验证"
              });
            } else if (res.data.code == 403) {
              Dialog.alert({
                title: "该用户不存在",
                message: "您好，您用户名或密码错误！请再次验证"
              });
            }
          });
      } else {
        Dialog.alert({
          title: "注册信息不正确",
          message: "请检查并输入正确信息！！！"
        });
      }
    }
  }
};
</script>

<style scoped>
.van-button {
  width: 70%;
}
.login1 {
  display: inline-block;
  width: 90%;
  height: 45px;
  padding: 0;
  margin: 0 5%;
  font-size: 16px;
  line-height: 45px;
  text-align: center;
  color: #888;
  background: #eee;
  border: none;
  border-radius: 0.2rem;
}
.remember-form {
  margin: 30px;
}
.pwd {
  float: right;
}
.form-box {
  background: #fff;
}
.form-box > div {
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 10px;
  border-bottom: solid #eee 1px;
}
.form-box > div input {
  height: 33px;
  outline: none;
  background: #f5f5f5;
  border: solid 0.5px #eee;
  border-radius: 5px;
  width: 70%;
  padding: 0 5px;
}
.reg {
  background-color: #f5f5f5;
  height: 100vh;
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
  background-image: url("../assets/img/home_b.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 90%;
  opacity: 0.7;
  vertical-align: text-top;
  float: left;
}
.regtop .login {
  float: right;
  color: red;
  font-size: 18px;
}
</style>
