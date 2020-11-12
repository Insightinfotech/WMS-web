<template>
  <div class="menutop">
    <div>
      <img class="menutop_img"  />
    </div>
    <div class="menutop_title">
      <span>WMS系统面板</span>
    </div>
    <div class="menutop_bottom">
      <el-link :underline="false" icon="el-icon-edit-outline" type="primary" :href="url">帮助手册</el-link>
      <el-button icon="el-icon-s-custom" type="text" disabled>{{
        $store.state.username
      }}</el-button>
      <el-button type="info" @click="loginout">退出</el-button>
    </div>
  </div>
</template>
<script>
// import pufu from "../assets/images/shemu.jpg";
export default {
  data() {
    return {
      // topimage: pufu,
      dialogVisible: false,
      url:"https://docs.qq.com/doc/DTm9EZ2xWZkZsS0xL"
    };
  },
  methods: {
    loginout() {
      sessionStorage.clear();
      this.$store.commit("clearToken");
      this.$router.push("/enterpriselogin");
    },
    // 修改密码
    userEidtPassword() {
      console.log(1);
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.menutop {
  display: flex;
  line-height: 58px;

  justify-content: space-between;

  &_title {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }

  .menutop_img {
    //   width: 30%;
    width: 132px;
    box-sizing: border-box;
    vertical-align: middle;
    // border: none;
    // height: 100%;
  }
  &_bottom{
    .el-link{
      margin-right: 10px;
    }
    
  }

  .el-dialog {
    z-index: 9999999;
  }
}
</style>
