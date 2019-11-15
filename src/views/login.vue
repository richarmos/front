<template>
  <div id>
    <div class="login">
      <div style="text-align: center;">运行品质监控系统</div>
      <div>
        <el-input placeholder="请输入用户名" v-model="username">
          <i slot="suffix" class="el-input__icon fa fa-user-circle-o"></i>
        </el-input>
      </div>
      <div>
        <el-input placeholder="请输入密码" show-password v-model="password">
          <i slot="suffix" class="el-input__icon fa fa-unlock-alt"></i>
        </el-input>
      </div>
      <div>
        <span style="float: left;">注册</span>
        <u style="float:right;">忘记密码</u>
      </div>
      <div style="margin-top: 20px;">
        <el-button
          @click="login"
          style="margin: auto;width:200px;border-radius: 20px;text-align: center;"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      username: "admin",
      password: "123"
    };
  },
  components: {},
  methods: {
    login() {
      this.$router.push({ path: "/baseMain" });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  border: 1px solid;
  width: 360px;
  height: 42vh;
  padding: 20px;
  margin: auto;
  transform: translate(0, 50%);
  & > div {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
