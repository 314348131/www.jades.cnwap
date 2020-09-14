<template>
  <div>
    <div v-if="backtop" class="fix-block-r">
      <a href="#" class="gotop-btn gotop" id="goTopBtn">
        <i></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backtop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.debounce(this.scrollHeader, 1000));
  },
  methods: {
    // 简单的防抖函数
    debounce(func, wait, immediate) {
      // 定时器变量
      var timeout;
      return function() {
        // 每次触发 scroll handler 时先清除定时器
        clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
        timeout = setTimeout(func, wait);
      };
    },
    scrollHeader() {
      var scroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      console.log(scroll);
      if (scroll > 50) {
        this.backtop = true;
      } else {
        this.backtop = false;
      }
    }
  }
};
</script>
<style  scoped>
.fix-block-r {
  width: 48px;
  position: fixed;
  z-index: 5;
  right: 0.5rem;
  bottom: 100px;
}

.fix-block-r a {
  display: block;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 100%;
  border: solid 0.05rem #eee;
}
.fix-block-r a i {
  width: 100%;
  height: 100%;
  display: block;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 60%;
  opacity: 0.5;
  background-image: url("./../assets/img/gotop_b.png");
}
</style>