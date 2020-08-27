<template>
  <div class="reg">
    <div class="regtop">
      <a href class="home" @click="$router.push('/')"></a>
      <span>会员注册</span>
      <a class="login" @click="$router.push('/login')">登录</a>
    </div>
    <van-tabs v-model="active">
      <van-tab>
        <template #title>
          <van-icon class="van-icon" name="friends-o" size="18" />普通注册
        </template>
        <div class="form-box">
          <div>
            <van-field v-model="username" label="用户名" :error="nameerror" placeholder="请输入6-20个字符" />
          </div>
          <div>
            <van-field
              v-model="password"
              type="password"
              :error="passworderror"
              label="密码"
              placeholder="请输入6-20个位密码"
            />
          </div>
          <div>
            <van-field
              v-model="password1"
              type="password"
              :error="password1error"
              label="密码"
              placeholder="请正确输入密码"
            />
          </div>
          <div>
            <van-field
              v-model="email"
              :error="emailerror"
              type="email"
              label="邮箱"
              placeholder="请输入常用邮箱"
            />
          </div>
        </div>
      </van-tab>
      <van-tab>
        <template #title>
          <van-icon class="van-icon" name="phone-circle-o" size="18" />手机注册
        </template>
      </van-tab>
    </van-tabs>
    <div class="remember-form">
      <input type="checkbox" v-model="checked" />
      <span>同意用户协议</span>
    </div>
    <div style="text-align :center">
      <van-button class="van-button" type="default" :disabled="!checked" round @click="reg()">注册</van-button>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { Dialog } from "vant";
export default {
  data() {
    return {
      active: 0,
      username: "",
      email: "",
      password: "",
      password1: "",
      nameerror: true,
      passworderror: true,
      password1error: true,
      emailerror: true,
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
    },
    password1() {
      this.checkpassword1();
    },
    email() {
      this.checkemail();
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
    checkpassword1() {
      if (this.password1 == this.password) {
        this.password1error = false;
        return true;
      } else {
        this.password1error = true;
        return false;
      }
    },
    checkemail() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(this.email)) {
        this.emailerror = false;
        return true;
      } else {
        this.emailerror = true;
        return false;
      }
    },
    reg() {
      if (
        this.checkusername() &&
        this.checkpassword() &&
        this.checkpassword1() &&
        this.checkemail()
      ) {
        this.axios
          .post(
            "/user/userReg",
            qs.stringify({
              uname: this.username,
              email: this.email,
              upwd: this.password
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
              Dialog.alert({
                title: "注册成功",
                message: "您好，您已注册成功！！"
              }).then(() => {
                this.$router.push("/login");
              });
            } else {
              Dialog.alert({
                title: "用户名已存在",
                message: "您好，该用户名已存在！请更换用户名"
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
.van-icon {
  margin-right: 5px;
  vertical-align: -5px;
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
  margin-top: 10px;
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
