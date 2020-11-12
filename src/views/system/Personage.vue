<template>
  <div class="personage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>修改密码</h3>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="ruleForm.oldPassword"
            style="width:80%"
            placeholder="请输入原密码"
            clearable
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="ruleForm.newPassword"
            style="width:80%"
            placeholder="请输入新密码"
            clearable
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item label="确定密码" prop="newPasswords">
          <el-input
            v-model="ruleForm.newPasswords"
            style="width:80%"
            placeholder="请输入确定密码"
            clearable
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="tijiaobutton"
            type="primary"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>
<script>

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      
      ruleForm: {},
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^.{6,18}$/,
            message: "密码为可填已知的数据6~18位"
          }
        ],
        newPasswords: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$network.log.log
            .userUpdatePassword({
              oldPassword: this.ruleForm.oldPassword,
              newPassword: this.ruleForm.newPassword
            })
            .then(res => {
              //   console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "修改密码成功",
                  type: "success"
                });
                this.$refs[ruleForm].resetFields();
              } else {
                this.$notify({
                  title: "失败",
                  message: res.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$notify({
                title: "失败",
                message: err,
                type: "error"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请填写完整信息",
            showClose: true
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.personage {
  display: flex;
  flex: 1;
  .box-card {
    width: 25%;
    margin-right: 15px;
    h3 {
      margin: 0;
    }

    .tijiaobutton {
      margin-top: 5%;
      margin-left: 65%;
    }
  }
}
</style>
