<template>
  <div class="picking">
    <!-- 拣货 -->
    <h3>拣货管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" style="marginBottom:15px;marginRight:40px" @click="pickingAdd">添加拣货订单</el-button>
      <!--搜索 -->
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-select v-model="value" placeholder="请选择类型" style="width:120px">
        <el-option v-for="(item,index) in statusListCopy" :key="index" :label="item.value" :value="index">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="PickingSearch"></el-button>
      <el-tab-pane label="拣货单管理" name="first">
        <el-card>
          <el-table border :data="pickingVOS">
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="编号" prop="code" width="300">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" prop="lastOperationUser" width="220">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情" prop="code" width="160">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看详情" placement="left">
                  <el-button @click="stockInDetail(scope.row.id)" type="primary" size="mini" icon="el-icon-s-grid">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="打印" placement="left">
                  <el-button @click="stockInDetailDayin(scope.row.id)" type="primary" size="mini"
                    icon="el-icon-printer">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="status" width="130">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 1">拣货中</el-tag>
                <el-tag size="small" v-else>完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="280">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="280">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.updateTime |dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==1" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定已拣货完成?"
                  @onConfirm="procurementShenHeRukusheng(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库" placement="left">
                    <el-button type="text" icon="el-icon-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
                  title="确定删除采购订单吗？" @onConfirm="procurementDelete(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="right">
                    <el-button style="marginLeft:5px" icon="el-icon-delete" type="danger" size="mini">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
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
    <!-- 添加弹框 -->
    <el-dialog title="添加拣货单" :visible.sync="dialogVisible" width="25%" @close="dialogVisibleClose">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label='拣货单号' prop="code"
          :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]">
          <el-input style="width:200px;marginRight:20px" v-model="ruleForm.code"></el-input>
          <el-button type="success" round size="small" @click="dianjia">点击生成</el-button>
        </el-form-item>
        <el-form-item label="关联出库单号" :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]"
          prop="stockOutCodes">
          <el-select multiple v-model="ruleForm.stockOutCodes" placeholder="请选择关联单号">
            <el-option v-for="item in stockOutVOS" :key="item.id" :label="item.code" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur'] }]"
          v-for="(domain, index) in ruleForm.stockOutCodes" :label="'关联出库单号' + (index+1)" :key="index"
          :prop="'stockOutCodes.'+ index + '.supplierId'">
          <el-select multiple v-model="domain.supplierId" placeholder="请选择关联单号">
            <el-option v-for="item in stockOutVOS" :key="item.id" :label="item.code" :value="item.code">
            </el-option>
          </el-select>
          <el-button type="danger" style="marginLeft:20px" v-if="index==0?false:true"
            @click.prevent="removeDomain(domain)" size="small">删除
          </el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button @click="addDomain" type="success">新增关联</el-button> -->
        <el-button type="primary" @click="dialogVisibleJianhouAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹框 -->
    <el-dialog title="关联出库单详情" :visible.sync="dialogVisibleParticulars" width="20%">
      <el-alert v-for="(item,index) in stockOutCodes" :title="'出库单单号 '+item" :key="index" type="success"
        :closable="false" center>
      </el-alert>
    </el-dialog>
    <!-- 打印弹框 -->
    <el-dialog title="打印拣货单" :visible.sync="dialogVisibledy" width="57%">
      <el-button type="primary" size="small" v-print="'#printTest'">打印</el-button>
      <el-card style="marginTop:20px" id="printTest">
        <el-alert :title="'拣货单号'+pickingVO.code" type="success" :closable="false" center
          style="width:30%;marginBottom:20px">
        </el-alert>
        <el-table :data="pickingVO.pickingDetailVOS" border style="width: 100%;">
          <el-table-column type="index" label='#' align="center">
          </el-table-column>
          <el-table-column prop="warehouse" label="仓库" align="center">
          </el-table-column>
          <el-table-column prop="reservoir" label="库区" align="center">
          </el-table-column>
          <el-table-column prop="shelves" label="货架" align="center">
          </el-table-column>
          <el-table-column prop="layer" label="层数" align="center">
          </el-table-column>
          <el-table-column prop="sku" label="产品名称" align="center">
          </el-table-column>
          <el-table-column prop="quantity" label="可拣数量" align="center">
          </el-table-column>
        </el-table>
        <el-alert v-for="(item,index) in pickingVO.stockOutCodes" style="width:30%;marginTop:20px"
          :title="'出库单单号 '+item" :key="index" type="info" :closable="false" center>
        </el-alert>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    randomNumberCaseJH,
    convertKey
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        input3: "",
        activeName: "first",
        pageNum: 1,
        size: 10,
        total: 0,
        dialogVisible: false,
        dialogVisibleParticulars: false,
        dialogVisibledy: false,
        ruleForm: {
          code: "",
          stockOutCodes: []
        },
        stockOutVOS: [],
        statusList: [],
        pickingVOS: [],
        form: {
          date1: "",
          date2: ""
        },
        value: "",
        statusListCopy: [],
        stockOutCodes: [],
        pickingVO: []
      }
    },
    methods: {
      addDomain() {
        this.ruleForm.stockOutCodes.push({
          supplierId: "",
        });
      },
      removeDomain(item) {
        // console.log(item);
        var index = this.ruleForm.stockOutCodes.indexOf(item)
        if (index !== -1) {
          this.ruleForm.stockOutCodes.splice(index, 1)
        }

      },
      // 获取拣货单列表
      getPicingList() {
        this.$network.putwarehouse.picking.PickingList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockOutVOS = res.data.stockOutVOS
            this.pickingVOS = res.data.pickingVOS
            this.statusList = res.data.statusList
            this.total = res.data.total
            var data3 = JSON.parse(JSON.stringify(res.data.statusList))
            var data5 = convertKey(data3, ["value"])
            data5.unshift({
              value: "全部类型"
            })
            this.statusListCopy = data5
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
      // 点击生成
      dianjia() {
        let JH = randomNumberCaseJH()
        // console.log(JH);
        this.ruleForm.code = JH
      },
      // 关闭添加弹框回调
      dialogVisibleClose() {

        this.$refs['ruleForm'].resetFields()
        // this.ruleForm.stockOutCodes = []
        // this.getPicingList()
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.PickingSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.PickingSearch()
      },
      // 添加拣货单
      pickingAdd() {
        this.dialogVisible = true
      },
      // domainChange(val) {
      //   // console.log(val);
      //   // let data = JSON.parse(JSON.stringify(this.ruleForm.stockOutCodes))
      //   // console.log(data);
      //   // data.filter(v => {
      //   //   if (v.supplierId === val) {
      //   //     // console.log(1);
      //   //     this.$message({
      //   //       type: "error",
      //   //       message: "已选择该订单，请重新选择",
      //   //       showClose: true
      //   //     })
      //   //   }
      //   // })
      //   // let datas = JSON.parse(JSON.stringify(this.stockOutVOS))
      //   // let p1 = datas.filter(v => v.code !== val)
      //   // console.log(p1);
      //   // this.stockOutVOS = p1

      // },
      dialogVisibleJianhouAdd(ruleForm) {

        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            // let data = this.ruleForm.stockOutCodes
            // let stockOutCodes = []
            // console.log(data);
            // data.forEach(v => {
            //   stockOutCodes.push(v.supplierId)
            // })
            this.$network.putwarehouse.picking.PickingListCreate({
              code: this.ruleForm.code,
              stockOutCodes: this.ruleForm.stockOutCodes
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加拣货单成功",
                  type: "success"
                })
                this.pickingVO = res.data.pickingVO

                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getPicingList()
                this.dialogVisibledy = true
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
      // 提交订单状态
      procurementShenHeRukusheng(id) {
        this.$network.putwarehouse.picking.PickingupdateStatus({
          id: id,
          status: 2,
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "拣货成功",
              type: "success"
            })
            this.getPicingList()
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
      PickingSearch() {
        let p1 = new Date(this.form.date1).valueOf()
        let p2 = new Date(this.form.date2).valueOf()
        let p3 = this.value
        let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')

        // console.log(p4);

        this.$network.putwarehouse.picking.PickingList({
          pageNum: this.pageNum,
          size: this.size,
          status: p3 == "" ? null : p3 == 0 ? null : p3,
          startTime: p4 == 'Invalid date' ? null : p4 == null ? null : p4 == '1970/01/01 08:00:00' ? null : p4,
          endTime: p5 == 'Invalid date' ? null : p5 == null ? null : p5 == '1970/01/01 08:00:00' ? null : p5,
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.pickingVOS = res.data.pickingVOS
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
      getPickingClear(val) {
        // console.log(val);
        if (val == null || val == "") {
          this.PickingSearch()
        }
      },
      // 删除
      procurementDelete(id) {
        this.$network.putwarehouse.picking.PickingListDelete(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            this.getPicingList()
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
      // 通过ID查询
      stockInDetail(id) {
        this.dialogVisibleParticulars = true
        this.$network.putwarehouse.picking.PickingselectStockOutCodes(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            let datas = res.data.stockOutCodes
            // console.log(datas);
            this.stockOutCodes = datas
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
      stockInDetailDayin(id) {
        this.$network.putwarehouse.picking.PickingselectStockOutCodesId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            let datas = res.data.stockOutCodes
            // console.log(datas);
            this.pickingVO = res.data.pickingVO
            this.dialogVisibledy = true
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
      }

    },
    created() {
      this.getPicingList()
    },
  }

</script>

<style>

</style>
