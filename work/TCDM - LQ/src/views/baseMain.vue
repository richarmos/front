<template>
  <el-container style="padding: 6px; height: 100%;">
    <el-aside width="200px">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航一
          </template>
          <el-menu-item index="1-1" @click="push('/test')">灰名单管理</el-menu-item>
          <el-menu-item index="1-2" @click="push('/test1')">黑名单管理</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- <el-header>这里预留全局页头处理</el-header> -->
      <el-main style="background: #fff">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted: function() {},
  methods: {
    push(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #1d2729;
}
</style>
