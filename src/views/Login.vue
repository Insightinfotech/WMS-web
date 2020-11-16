<template>
  <div class="login">
    <el-card class="box-card">
      <h2>系统登录</h2>
      <el-form :model="userForm" size="small" ref="ruleForm" label-width="80px" class="demo-ruleForm" :rules="rules"
        :status-icon="true">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password
            @keyup.native.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div style="marginBottom:10px">
          <router-link to="/enterpriselogin" class="links">企业登录</router-link>
        </div>
        <el-button type="info" size="small" @click="resetForm('ruleForm')">重置</el-button>
        <el-button class="addlogin" size="small" style="margin-right:0px" type="primary"
          @click="submitForm('ruleForm')">登录
        </el-button>

      </el-form>
    </el-card>
  </div>
</template>
<script>
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
              trigger: ['blur', 'change']
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
              trigger: ['blur', 'change']
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
              // console.log(err);
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
    height: 100%;
    background-color: slategrey;
    background-image: url("../assets/images/Starry.jpg");
    background-position: 0px 0px;
    background-repeat: no-repeat;

    .box-card {
      width: 18%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eee;

      h2 {
        text-align: center;
        margin: 0 0 25px 0;
      }

      .links {
        display: block;
        font-size: 14px;
        text-decoration: none;
        color: #175199;
        margin-bottom: 15px;
      }

      .el-form {
        position: relative;

        .addlogin {
          position: absolute;
          right: 0px;
          bottom: 0px;
        }
      }
    }
  }

</style>
