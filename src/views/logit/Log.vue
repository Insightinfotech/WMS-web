<template>
  <div>
    <h3>日志管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <!-- <el-button type="primary" style="marginBottom:15px">添加采购订单</el-button> -->
      <!--搜索 -->
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-input v-model="input" style="width: 15%;marginLeft:20px" clearable @input="shiftingSearchclearInput"
        placeholder="请输入操作人"></el-input>
      <el-input style="marginBottom:15px ;width:20%;marginLeft:20px" clearable @input="shiftingSearchclearInput"
        placeholder="请输入关键字，模块，菜单，内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="shiftingSearch"></el-button>
      </el-input>
      <el-tab-pane label="日志列表" name="first">
        <el-card>
          <el-table :data="operateLogVOS" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                </el-form>
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="Params">
                    <span>{{ props.row.params }}</span>
                  </el-form-item>
                </el-form>
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="Result">
                    <span>{{ props.row.result }}</span>
                  </el-form-item>
                </el-form>
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="Uri">
                    <span>{{ props.row.uri }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="IP">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{scope.row.ip}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作模块">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.module}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作菜单">
              <template slot-scope="scope">
                <el-tag size="small" type="info">{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作内容">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.explain}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作人">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.operatorName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作时间">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.createTime | dateTimeFormat}}</el-tag>
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
  export default {
    data() {
      return {
        input: "",
        input3: "",
        activeName: "first",
        pageNum: 1,
        size: 10,
        total: 0,
        operateLogVOS: [],
        form: {
          date1: "",
          date2: ""
        }
      }
    },
    methods: {
      // 获取日志列表
      getLogList() {
        this.$network.log.log.logList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.operateLogVOS = res.data.operateLogVOS
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
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.shiftingSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.shiftingSearch()
      },
      // 清除时间
      getPickingClear(val) {
        if (val == null || val == "") {
          this.shiftingSearch()
        }
      },
      // 搜索
      shiftingSearch() {
        let p1 = new Date(this.form.date1).valueOf()
        let p2 = new Date(this.form.date2).valueOf()
        let p3 = this.input
        let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')
        let p6 = this.input3
        // if (p3 == "" && p6 == "" && p4 == "Invalid date" && p5 == "Invalid date") {
        //   this.$notify({
        //     title: "失败",
        //     message: '请输入内容',
        //     type: "error"
        //   })
        // } else {
        this.$network.log.log.logList({
          pageNum: this.pageNum,
          size: this.size,
          username: p3 == "" ? null : p3,
          keyWork: p6 == "" ? null : p6,
          startTime: p4 == 'Invalid date' ? null : p4 == '1970/01/01 08:00:00' ? null : p4,
          endTime: p5 == 'Invalid date' ? null : p5 == '1970/01/01 08:00:00' ? null : p5,
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            // if (res.data.operateLogVOS.length >= 1) {
              // this.$notify({
              //   title: "成功",
              //   message: '查询成功',
              //   type: "success",
              // });
              this.operateLogVOS = res.data.operateLogVOS
              this.total = res.data.total
            // } else {
            //   this.$notify({
            //     title: "成功",
            //     message: '暂无数据',
            //     type: "success",
            //   });
            // }
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
        if (val == ''|| val == null) {
          this.getLogList()
        }
      }
    },
    created() {
      this.getLogList()
    },
  }

</script>
