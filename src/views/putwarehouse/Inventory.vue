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
          <el-table :data="inventoryVOS" border style="width: 100%">
            <el-table-column prop="date" label="#" type="index" align="center">
            </el-table-column>
            <el-table-column label="产品编号" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.skuCode}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.skuName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="产品数量" align="center">
              <template slot-scope="scope">
                <el-tag size="mini">{{scope.row.quantity}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="产品单位" align="center">
              <template slot-scope="scope">
                <el-tag size="mini">{{scope.row.categoryName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="所在仓库/库区/货架/层数" align="center" width="310">
              <template slot-scope="scope">
                <el-tag size="mini">{{scope.row.warehouseName==null?'暂无':scope.row.warehouseName}}</el-tag>
                <el-tag size="mini" style="marginLeft:4px">
                  {{scope.row.reservoirName==null?'暂无':scope.row.reservoirName}}</el-tag>
                <el-tag size="mini" style="marginLeft:4px">{{scope.row.shelvesName==null?'暂无':scope.row.shelvesName}}
                </el-tag>
                <el-tag size="mini" style="marginLeft:4px">{{scope.row.layer==null?'暂无':scope.row.layer}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 0">完成</el-tag>
                <!-- <el-tag size="small" type="warning" v-else-if="scope.row.status == 2">审核中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                <el-tag size="small" type="info" v-else-if="scope.row.status == 4">入库中</el-tag>
                <el-tag size="small" v-else>完成</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.updateTime |dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页 -->
          <el-pagination background style="marginTop:15px" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
            :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
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
        input3: "",
        pageNum: 1,
        size: 10,
        total: 0,
        inventoryVOS: [],
        warehouseVOS: []
      }
    },
    methods: {
      // 获取列表
      getinventoryList() {
        this.$network.putwarehouse.inventory.inventoryList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.total = res.data.total
            this.inventoryVOS = res.data.inventoryVOS
            this.warehouseVOS = res.data.warehouseVOS
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
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.getinventoryList()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getinventoryList()
      },
    },
    created() {
      this.getinventoryList()
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
