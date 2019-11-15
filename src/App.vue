<template>
  <div id="app" onselectstart="return false;">
    <router-view></router-view>
  </div>
</template>
<script>
import Axios from "axios";
import Vue from "vue";
export default {
  name: "app",
  async mounted() {
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import "./common/css/common";
#app {
  height: 100vh;
  width: 100vw;
  background: #1d2729;
}
</style>
