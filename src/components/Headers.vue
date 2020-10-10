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
    <!-- 修改弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import pufu from "../assets/images/pufu.png"
  export default {
    data() {
      return {
        topimage: pufu,
        dialogVisible: false
      }
    },
    methods: {
      loginout() {
        localStorage.clear()
        this.$store.commit("clearToken")
        this.$router.push("/login")
      },
      // 修改密码
      userEidtPassword() {
        console.log(1);
        this.dialogVisible = true
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



    img {
      //   width: 30%;
      width: 132px;
      box-sizing: border-box;
      vertical-align: middle;


    }

    .el-dialog {
      z-index: 9999999;
    }
  }

</style>
