<template>
  <div class="inventory">
    <h3>库存管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="库存管理" name="first">
        <el-button type="primary" style="marginBottom:15px;marginRight:20px">添加库存</el-button>
        <!-- 搜索 -->
        <el-select v-model="value" placeholder="请选择">
          <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        </el-select>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 数据表格 -->
        <el-card>
          <!-- 表格 -->
          <el-table border style="width: 100%">
            <el-table-column prop="date" label="#" type="index" align="center">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center">
            </el-table-column>
          </el-table>
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
        value: "",
        input3: ""
      }
    },
  }

</script>
<style lang="scss" scoped>
  .inventory {


    .el-select {
      margin-right: 20px;
    }

    .input-with-select {
      width: 15%;
    }
  }

</style>
