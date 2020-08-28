<template>
  <div>
    <h3>订单管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName" >
      <!-- 添加采购订单订单 -->
      <el-button type="primary" style="marginBottom:15px">添加采购订单</el-button>
      <!--搜索 -->
      <el-input style="marginLeft:30px ;width:20%" placeholder="请输入订单号" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-tab-pane label="采购单管理" name="first">
        <el-card>
          <el-table border>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="编号"></el-table-column>
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
        input3: "",
        activeName: "first"
      }
    },
  }

</script>
