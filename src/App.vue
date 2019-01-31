<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand">主页</router-link>
    </nav>
    <router-view></router-view>
    <div class="text-center my-5">{{ isLogged ? '用户已登录，可直接进入后台' : '用户未登录，请先登录' }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLogged"])
  }
};
</script>


<style>
html,
body {
  background: rgb(255, 255, 251);
}
</style>
