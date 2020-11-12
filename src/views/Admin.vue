<template>
  <div class="register">
    <el-card class="box-card">
      <h2>管理员登录</h2>
      <el-form :model="userForm" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm" :rules="rules"
        :status-icon="true">
        <el-form-item label="管理员账号" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password
            @keyup.native.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-button size="small" type="info" @click="resetForm('ruleForm')">重置</el-button>
        <el-button size="small" class="addlogin" style="margin-right:0px" type="primary"
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
          username: "wms",
          password: "root"
        },
        rules: {
          username: [{
              required: true,
              message: '请输入企业名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 32,
              message: '长度在 2 到 32 个字符',
              trigger: ['blur', 'change']
            }
          ],
          password: [{
              required: true,
              message: '请输入用户密码',
              trigger: 'blur'
            },
            {
              min: 2,
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
            this.$network.adminLogin(this.userForm).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "管理员登录成功",
                  type: "success"
                })
                this.$store.commit("startuserqiyeadminToken", res.data.token)
               
                  this.$router.push("/adminlist")
               
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
    },
  }

</script>

<style lang="scss" scoped>
  .register {
    position: relative;
    height: 100%;
    background-color: slategrey;



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

      span {
        display: block;
        margin-bottom: 10px;
      }

      .links {
        font-size: 14px;
        text-decoration: none;
        color: #175199;
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
