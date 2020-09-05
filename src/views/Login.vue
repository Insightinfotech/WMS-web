<template>
  <div class="login">
    <vue-particles color="#dedede"></vue-particles>
    <el-card class="box-card">
      <h2>系统登录</h2>
      <el-form :model="userForm" ref="ruleForm" label-width="80px" class="demo-ruleForm" :rules="rules"
        :status-icon="true">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password
            @keyup.native.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        <el-button class="addlogin" style="margin-right:0px" type="primary" @click="submitForm('ruleForm')">登录
        </el-button>

      </el-form>
    </el-card>
  </div>
</template>
<script>
  // import {
  //   userLogin
  // } from "../network/api/helpers/login/login"
  export default {
    data() {
      return {
        userForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{
              required: true,
              message: '请输入用户名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: ['blur', 'change']
            }
          ],
          password: [{
              required: true,
              message: '请输入用户密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 18,
              message: '长度在 6 到 18 个字符',
              trigger: ['blur', 'change']
            }
          ],
        }
      }
    },
    methods: {
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$network.userLogin(this.userForm).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "登录成功",
                  type: "success"
                })
                let {
                  token
                } = res.data
                let {
                  username
                } = res.data
                this.$store.commit("startuserToken", token)
                this.$store.commit("getuser", username)
                this.$router.push('/home')
              } else {
                this.$notify({
                  title: "失败",
                  message: res.msg,
                  type: "error"
                })
              }
            }).catch(err => {
              this.$notify({
                title: "失败",
                message: err,
                type: "error"
              })
            })
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true
            })
          }
        })
      }
    }

  }

</script>
<style lang="scss" scoped>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/Starry.jpg");
    background-position: 0px 0px;
    background-repeat: no-repeat;

    #particles-js {
      height: 100%;

      /deep/ .particles-js-canvas-el {
        height: 930px;
      }
    }

    .box-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.7;
      background-image: linear-gradient(#0d2762, #436a91, #1d6dcf, #23d6fc);
      border: 1px solid #69789e;

      h2 {
        color: #fff;
        text-align: center;
        margin: 0 0 25px 0;
      }

      .el-form {
        position: relative;
        color: #fff !important;

        /deep/.el-form-item__label {
          width: 70px !important;
          color: #fff !important;

        }




        /deep/ .el-form-item__content {


          .el-input {
            width: 250px !important;

          }
        }

        .addlogin {
          position: absolute;
          right: 0px;
          bottom: 0px;
        }
      }
    }
  }

</style>
