<template>
  <div>
    <h3>出库记录</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->

      <!--搜索 -->
      <!--搜索 -->
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" @change="getPickingClear"
        style="width: 10%;"></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" @change="getPickingClears"
        style="width: 10%;"></el-date-picker>
      <!-- <el-input v-model="input" style="width: 13%;marginLeft:20px" clearable @input="shiftingSearchclearInput"
        placeholder="请输入采购单号"></el-input> -->
      <el-input v-model="input1" style="width: 13%;marginLeft:20px" clearable @input="shiftingSearchclearInput"
        placeholder="请输入出库库单号"></el-input>
      <el-input style="marginBottom:15px ;width:20%;marginLeft:20px" clearable @input="shiftingSearchclearInput"
        placeholder="请输入经办人" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择类型" style="width:120px">
          <el-option :label="item.value" :value="index - 1" v-for="(item,index) in typeListCopy" :key="index">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="shiftingSearch"></el-button>
      </el-input>
      <el-tab-pane label="出库记录管理" name="first">
        <el-card>
          <el-table :data="stockLogVOS" border>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <!-- <el-table-column align="center" label="采购单号" width="160">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.purchaseCode == null " size="mini">暂无</el-tag>
                <el-button type="text" v-else size="mini">{{scope.row.purchaseCode}}</el-button>
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="出库单号" width="160">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.stockCode}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="出库类型" prop="status" width="120">
              <template slot-scope="scope">
                <el-tag size="mini" type="success" v-if="scope.row.stockType == 0">其他出库</el-tag>

                <el-tag size="mini" v-else>成品出库</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="仓库" width="120">
              <template slot-scope="scope">
                <el-tag size="mini" type="danger">{{scope.row.warehouse}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库区" width="120">
              <template slot-scope="scope">
                <el-tag size="mini" type="info">{{scope.row.reservoir}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="货架" width="120">
              <template slot-scope="scope">
                <el-tag size="mini" type="warning">{{scope.row.shelves}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="层数" width="50">
              <template slot-scope="scope">
                <el-button size="mini" type="text">{{scope.row.layer}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="产品/数量">
              <template slot-scope="scope">
                <el-tag size="mini" type="success">{{scope.row.sku}}</el-tag>
                <el-button style="marginLeft:5px" type="text" size="mini">
                  {{scope.row.quantity==null?0:scope.row.quantity}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位" width="120">
              <template slot-scope="scope">
                <el-button size="mini" type="text">{{scope.row.category}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经办人" prop="lastOperationUser" width="110">
              <template slot-scope="scope">
                <el-button size="mini" type="text">{{scope.row.gestore}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="出库时间" width="180">
              <template slot-scope="scope">
                <el-tag size="mini">{{scope.row.endTime | dateTimeFormat}}</el-tag>
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
  import moment from 'moment'
  import {
    convertKey,
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        input3: "",
        activeName: "first",
        pageNum: 1,
        size: 10,
        total: 0,
        stockLogVOS: [],
        typeListCopy: [],
        form: {
          date1: "",
          date2: ""
        },
        input: "",
        input1: "",
        select: ""
      }
    },
    methods: {
      // 获取出库库记录列表
      getstockInOutLogList() {
        // let p1 = new Date(this.form.date1).valueOf()
        // let p2 = new Date(this.form.date2).valueOf()
        // // let p3 = this.input
        // let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        // let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')
        // let p6 = this.input3
        // let p7 = this.input1
        // let p8 = String(this.select)
        // console.log(p4, p5);
        this.$network.putwarehouse.outbound.OutboundstockOutLogList({
          pageNum: this.pageNum,
          size: this.size,
          // startTime: p4 == 'Invalid date' ? null : p4 == null ? "" : p4,
          // endTime: p5 == 'Invalid date' ? null : p5 == null ? "" : p5,
          // stockOutCode: p7 == "" ? null : p7,
          // stockOutType: p8 == -1 ? null : p8 == "" ? null : p8,
          // gestore: p6 == "" ? null : p6
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockLogVOS = res.data.stockLogVOS
            this.total = res.data.total
            if (res.data.typeList != undefined) {
              var dataw = JSON.parse(JSON.stringify(res.data.typeList))
              var data2 = convertKey(dataw, ["value"])
              data2.unshift({
                value: "全部类型"
              })
              this.typeListCopy = data2
            }

          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error",
            });
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
        this.shiftingSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.shiftingSearch()
        // if (String(this.select) == "") {
        //   
        //   console.log(1);
        // } else {
        //   this.shiftingSearch()
        //   console.log(2);
        // }

        // console.log(this.form.date1);
        // console.log(this.form.date2);
        // console.log(this.input3);
        // console.log(this.input1);
        // console.log(this.select);

        // if()
      },
      // 清除时间
      getPickingClear(val) {
        if (val == null || val == "") {
          // this.form.date1 = ""
          // this.form.date2 = ""
          this.shiftingSearch()
        }

        // if (val == null || val == "") {
        //   this.getstockInOutLogList()
        // }
      },
      getPickingClears(val) {
        // if (val == null) {
        //   this.form.date2 = ""
        // }
        if (val == null || val == "") {
          // this.form.date1 = ""
          // this.form.date2 = ""
          this.shiftingSearch()
        }
      },
      shiftingSearch() {
        let p1 = new Date(this.form.date1).valueOf()
        let p2 = new Date(this.form.date2).valueOf()
        // let p3 = this.input
        let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')
        let p6 = this.input3
        let p7 = this.input1
        let p8 = String(this.select)
        // console.log(p8);
        // if (p6 == "" && p7 == "" && p4 == "Invalid date" && p5 == "Invalid date" && p8 == "") {
        //   this.$notify({
        //     title: "失败",
        //     message: '请输入内容',
        //     type: "error"
        //   })
        //   //   console.log(12);
        // } else {
        //   console.log(34);
        this.$network.putwarehouse.outbound.OutboundstockOutLogList({
          pageNum: this.pageNum,
          size: this.size,
          startTime: p4 == 'Invalid date' ? null : p4 == null ? null : p4 == '1970/01/01 08:00:00' ? null : p4,
          endTime: p5 == 'Invalid date' ? null : p5 == null ? null : p5 == '1970/01/01 08:00:00' ? null : p5,
          stockOutCode: p7 == "" ? null : p7,
          stockOutType: p8 == -1 ? null : p8 == "" ? null : p8,
          gestore: p6 == "" ? null : p6
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockLogVOS = res.data.stockLogVOS
            this.total = res.data.total
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error",
            });
          }
        }).catch(err => {
          this.$notify({
            title: "失败",
            message: err,
            type: "error"
          })
        })
        // }

      },
      // 清除
      shiftingSearchclearInput(val) {
        if (val == '') {
          this.getstockInOutLogList()
        }
      }
    },
    created() {
      this.getstockInOutLogList()
    },
  }

</script>
