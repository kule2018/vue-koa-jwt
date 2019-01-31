<template>
  <div class="container">
    <div class="d-flex justify-content-center my-5">
      <div class="card">
        <div class="card-header">个人中心</div>
        <div class="card-body">
          <h3 class="my-4">欢迎你！{{ user.name }}</h3>
          <el-button type="danger" @click="handleLogout">退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      await this.logout();
      this.$message.success("您已成功退出！");
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

