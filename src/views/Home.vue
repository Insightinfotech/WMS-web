<template>
  <div class="home">
    <el-container>
      <el-header>
        <headers></headers>
      </el-header>
      <el-container>
        <el-aside :width="collapse?'64px':'200px'">
          <asids @isfolup="isfolups"></asids>
        </el-aside>
        <el-main :style="collapse?'marginLeft:64px':'marginLeft:200px'">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Asids from "../components/Asids"
  import Headers from "../components/Headers"
  export default {
    components: {
      Asids,
      Headers
    },
    data() {
      return {
        collapse: false,
      }
    },
    methods: {
      isfolups(val) {
        // console.log(val);
        this.collapse = val
      }
    },
  }

</script>
<style lang="scss" scoped>
  .home {
    height: 100%;

    .el-container {
      height: 100%;

      .el-header {
        background-color: #03132c;
        padding: 0 30px;
        width: 100%;
        position: fixed;
      }

      .el-aside {
        height: 100%;
        position: fixed;
        background-color: #03132c;
        color: #fff;
        margin-top: 60px;
      }

      .el-main {
        margin-top: 60px;
        background-color: #eee;

      }
    }

  }

</style>
