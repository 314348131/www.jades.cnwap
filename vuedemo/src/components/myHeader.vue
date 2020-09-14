<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        shape="round"
        background="#DB4453"
        @focus="onmySearch"
        @search="onSearch"
        @cancel="onCancel"
        placeholder="请输入搜索关键词"
        fixed
      >
        <template #left-icon>
          <img src="../assets/img/logo_r.png" width="20" alt />
        </template>
        <template #action>
          <van-icon name="chat-o" color="#fff" @click="$router.push('/store')">
            <p>消息</p>
          </van-icon>
        </template>
      </van-search>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    },
    onmySearch() {
      this.$router.push("/search");
    }
  }
};
</script>

<style scoped>
</style>
