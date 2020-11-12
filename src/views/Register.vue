<template>
  <div class="register">
    <el-card class="box-card">
      <h2>企业注册</h2>
      <el-form :model="userForm" size="small" ref="ruleForm" label-width="80px" class="demo-ruleForm" :rules="rules"
        :status-icon="true">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input  v-model="userForm.phone" @keyup.native.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div style="marginBottom:10px">
          <span>
            <router-link class="links" to="/enterpriselogin">已有账号请登录</router-link>
          </span>
        </div>
        <el-button size="small" type="info" @click="resetForm('ruleForm')">重置</el-button>
        <el-button size="small" class="addlogin" style="margin-right:0px" type="primary"
          @click="submitForm('ruleForm')">注册
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
          name: "",
          password: "",
          phone: ""
        },
        rules: {
          name: [{
              required: true,
              message: '请输入用户名称',
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
              min: 6,
              max: 18,
              message: '长度在 6 到 18 个字符',
              trigger: ['blur', 'change']
            }
          ],
          phone: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请輸入正确的格式',
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
            this.$network.businessRegistration(this.userForm).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "注册成功",
                  type: "success"
                })
                this.$router.push("/enterpriselogin")
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

      .links {
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
