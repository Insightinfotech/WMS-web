<template>
  <div class="management">
    <h3>货架管理</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="货架管理" name="first">
        <el-button type="primary" style="marginBottom:15px;marginRight:30px">添加货架</el-button>
        <el-input clearable v-model="input" placeholder="请输入货架编号" class="input-with-input"></el-input>
        <el-input clearable placeholder="请输入货架名称" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 表格 -->
        <el-card class="box-card">

        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "first",
        input3: "",
        input: ""
      }
    },
  }

</script>
<style lang="scss" scoped>
  .management {

    .input-with-select {
      width: 15%;
    }

    .input-with-input {
      width: 10%;
      margin-right: 30px;
    }
  }

</style>
