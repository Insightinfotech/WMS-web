<template>
  <div class="inventory">
    <h3>库存管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="库存管理" name="first">
        <!-- <el-button type="primary" style="marginBottom:15px;marginRight:20px">添加库存</el-button> -->
        <!-- 搜索 -->
        <!-- <el-select v-model="value" placeholder="请选择"> -->
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        <!-- </el-select> -->
        <!-- <el-select v-model="value" placeholder="请选择"> -->
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        <!-- </el-select> -->
        <!-- <el-select v-model="value" placeholder="请选择"> -->
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        <!-- </el-select> -->
        <!-- <el-select v-model="value" placeholder="请选择"> -->
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        <!-- </el-select> -->
        <el-cascader v-model="ruleFormykuadd" :options="warehouseVOS" style="width:200px;marginBottom:15px"
          :props="warehouseVOSProps">
        </el-cascader>
        <el-input placeholder="请输入产品名称" v-model="input3" class="input-with-select" clearable @input="clearableInput">
          <el-button slot="append" icon="el-icon-search" @click="inventorySearch"></el-button>
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
                <el-tag size="mini" type="info" v-if="scope.row.quantity==null">暂无</el-tag>
                <el-tag size="mini" v-else>{{scope.row.quantity}}</el-tag>
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
                <el-tag size="small" type="success" v-if="scope.row.status == 0">正常</el-tag>
                <el-tag size="small" type="warning" v-else-if="scope.row.status == 1">部分锁定中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 2">冻结中</el-tag>
                <!-- <el-tag size="small" type="info" v-else-if="scope.row.status == 4">入库中</el-tag> -->
                <!-- <el-tag size="small" v-else>完成</el-tag> -->
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
        warehouseVOS: [],
        warehouseVOSProps: {
          value: "id",
          label: "name",
          children: "reservoirVOS",
          checkStrictly: true
        },
        ruleFormykuadd: []
      }
    },
    methods: {
      // 获取列表
      getinventoryList() {
        this.$network.putwarehouse.inventory.inventoryList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.total = res.data.total
            this.inventoryVOS = res.data.inventoryVOS
            let data = JSON.parse(JSON.stringify(res.data.warehouseVOS))
            data.unshift({
              name: "全部",
              id: 0
            })
            this.warehouseVOS = data
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
        this.inventorySearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.inventorySearch()
      },
      // 搜索
      inventorySearch() {
        let p1 = this.input3
        // console.log(p1);
        let p2 = this.ruleFormykuadd[0]
        let p3 = this.ruleFormykuadd[1]
        let p4 = this.ruleFormykuadd[2]
        // console.log(p2, p3, p4);
        this.$network.putwarehouse.inventory.inventoryList({
          pageNum: this.pageNum,
          size: this.size,
          skuName: p1 == "" ? null : p1,
          warehouseId: p2 == undefined ? null : p2 == 0 ? null : p2,
          reservoirId: p3 == undefined ? null : p3,
          shelvesId: p4 == undefined ? null : p4,
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.total = res.data.total
            this.inventoryVOS = res.data.inventoryVOS
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
      // 清空
      clearableInput(val) {
        // console.log(val);
        if (val == "" || val == null) {
          this.inventorySearch()
        }
      }
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
