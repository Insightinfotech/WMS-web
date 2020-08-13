<template>
  <div class="menutop">
    <div>
      <img :src="topimage">
    </div>
    <div class="menutop_title">
      <span>WMS系统面板</span>
    </div>
    <div class="menutop_bottom">
      <el-button icon="el-icon-s-custom" type="text" disabled>{{$store.state.username}}</el-button>
      <el-button type="info" @click="loginout">退出</el-button>
    </div>
  </div>
</template>
<script>
  import pufu from "../assets/images/pufu.png"
  export default {
    data() {
      return {
        topimage: pufu
      }
    },
    methods: {
      loginout() {
        localStorage.clear()
        this.$store.commit("clearToken")
        this.$router.push("/login")
      }
    },
  }

</script>
<style lang="scss" scoped>
  .menutop {
    display: flex;
    line-height: 60px;

    justify-content: space-between;

    &_title {
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }

    &_bottom {}

    img {
      //   width: 30%;
      width: 132px;
      box-sizing: border-box;
      vertical-align: middle;


    }
  }

</style>
