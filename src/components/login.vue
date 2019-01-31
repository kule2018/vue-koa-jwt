<template>
  <div class="container">
    <div class="d-flex justify-content-center my-5">
      <div class="card">
        <div class="card-header">登录</div>
        <div class="card-body">
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["attemptLogin"]),
    async submitForm() {
      if (!this.name || !this.password) {
        this.$message.warning("用户名或密码填写不完整！");
        return false;
      }
      try {
        await this.attemptLogin({
          name: this.name,
          password: this.password
        });
        this.$message.success("登录成功！");
        this.$router.push({
          name: "user"
        });
      } catch (e) {
        this.$message.error(e.data);
      }
    }
  }
};
</script>

