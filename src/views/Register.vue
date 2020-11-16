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
          <el-input v-model="userForm.phone" @keyup.native.enter="submitForm('ruleForm')" style="width:64%"></el-input>
          <el-button class="yzm" size="mini" type="primary" @click="yzmClick" :disabled="disabled">{{yzm}}</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="userForm.code" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="企业介绍" prop="content">
          <el-input type="textarea" size="mini" v-model="userForm.content"></el-input>
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
          phone: "",
          code: "",
          content: ""
        },
        rules: {
          name: [{
              required: true,
              message: '请输入用户名称',
              trigger: ['blur', 'change']
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
              trigger: ['blur', 'change']
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
              trigger: ['blur', 'change']
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请輸入正确的格式',
              trigger: ['blur', 'change']
            }
          ],
          content: [{
            required: true,
            message: '请输入企业介绍',
            trigger: ['blur', 'change']
          }],
          code: [{
            required: true,
            message: '请输入企业介绍',
            trigger: ['blur', 'change']
          }],
        },
        yzm: "获取验证码",
        disabled: false
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
      },
      // 验证码
      yzmClick() {
        if (this.userForm.phone != "" && this.userForm.phone.length == 11) {
          let miao = 59
          let timer = setInterval(() => {
            if (miao == 0) {
              clearInterval(timer)
              this.disabled = false
              this.yzm = '获取验证码'
            } else {
              this.yzm = miao + 'S后重试';
              this.disabled = true
              miao--
            }
          }, 1000);
          this.$network.businessRegistrationPhone({
            phone: this.userForm.phone
          }).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "发送验证码成功",
                type: "success"
              })

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
          this.$notify({
            title: "失败",
            message: '验证码不可以为空或手机号不正确',
            type: "error"
          })
        }

      }
    },
  }

</script>

<style lang="scss" scoped>
  .register {
    position: relative;
    height: 100%;
    background-color: slategrey;
    background-image: url("../assets/images/Starry.jpg");
    background-position: 0px 0px;
    background-repeat: no-repeat;

    .box-card {
      width: 20%;
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

      .yzm {
        margin-left: 3px;
      }
    }
  }

</style>
