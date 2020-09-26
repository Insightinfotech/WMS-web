<template>
  <div>
    <h3>盘点管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" style="marginBottom:15px;marginRight:50px" @click="addCheck">添加盘点</el-button>
      <!--搜索 -->
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" style="width: 10%;"
        @change="getPickingClear"></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" style="width: 10%;"
        @change="getPickingClear"></el-date-picker>
      <el-input style="marginLeft:30px ;width:25%" placeholder="请输入盘点单号" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择类型" style="width:120px">
          <el-option :label="item.value" :value="index" v-for="(item,index) in statusListCopy" :key="index">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="checkSearch"></el-button>
      </el-input>

      <el-tab-pane label="盘点管理" name="first">
        <el-card>
          <el-table :data="stockTakingVOS" @expand-change="getexpandchange" border>
            <el-table-column type="expand">
              <template>
                <!-- <el-card>
                  <el-table :data="stockTakingRegionVOS" border>
                    <el-table-column align="center" type="index" label="#"></el-table-column>
                    <el-table-column align="center" label="编号">
                      <template slot-scope="scope">
                        <el-button type="text" size="mini">{{scope.row.id}}</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="编号" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" width="150">
              <template slot-scope="scope">
                <el-tag type="danger" size="mini">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="150">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 1">初始录入</el-tag>
                <el-tag size="small" type="warning" v-else-if="scope.row.status == 2">审核中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                <el-tag size="small" type="success" v-else-if="scope.row.status == 4">审核通过</el-tag>
                <el-tag size="small" type="info" v-else-if="scope.row.status == 5">盘点中</el-tag>
                <el-tag size="small" v-else>完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情" width="90">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看和编辑明细" placement="left">
                  <el-button :disabled="scope.row.status == 5?false:scope.row.status == 6?false:true "
                    @click="procurementDescId(scope.row.id)" type="primary" size="mini" icon="el-icon-s-grid">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.remark==null||scope.row.remark==''" type="info">暂无备注</el-tag>
                <el-input :rows="1" v-else disabled type="textarea" size="mini" :value="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="驳回备注">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.overruledRemark==null||scope.row.overruledRemark==''" type="info">暂无备注</el-tag>
                <el-input :rows="1" v-else disabled type="textarea" size="mini" :value="scope.row.overruledRemark">
                </el-input>
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
            <el-table-column align="center" label="操作" width="220">
              <template slot-scope="scope">
                <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==5" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定此盘点单盘点完成?"
                  @onConfirm="procurementShenHeRukusheng(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="盘点完成" placement="left">
                    <el-button type="text" icon="el-icon-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定此盘点单通过审核吗?" v-if="scope.row.status==2" @onConfirm="procurementShenHeTong(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="审核通过" placement="left">
                    <el-button type="text" icon="el-icon-success" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定此盘点单进行盘点吗?" v-if="scope.row.status==4" @onConfirm="procurementPanDianZhong(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="盘点中" placement="left">
                    <el-button type="text" icon="el-icon-loading" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip v-if="scope.row.status==2" class="item" effect="dark" content="审核驳回" placement="left">
                  <el-button type="text" icon="el-icon-error" size="medium" @click="procurementBohui(scope.row.id)"
                    style="marginRight:5px">
                  </el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定提交盘点单进行审核吗?" v-if="scope.row.status == 3 ||  scope.row.status == 1"
                  @onConfirm="procurementShenHe(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="盘点单审核" placement="left">
                    <el-button type="info" style="marginRight:5px" icon="el-icon-s-order" size="mini">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="procurementEdit(scope.row.id)">
                  </el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText='好的'
                  v-if="scope.row.status == 1? true :scope.row.status == 3? true : false " cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="red" title="确定删除采购订单吗？" @onConfirm="procurementDelete(scope.row.id)">
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
    <el-dialog :title="idsEdit ==''? '添加盘点':'编辑盘点' " :visible.sync="dialogVisible" width="25%"
      @close="dialogVisibleClose">
      <el-form :model="idsEdit ==''?ruleForm:stockTakingVO" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item v-if="idsEdit ==''?true:false" label='盘点单号' prop="code"
          :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]">
          <el-input style="width:200px;marginRight:20px" v-model="ruleForm.code"></el-input>
          <el-button type="success" round size="small" @click="dianjia">点击生成</el-button>
        </el-form-item>
        <el-form-item v-else label='盘点单号' prop="code"
          :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]">
          <el-input style="width:200px;marginRight:20px" v-model="stockTakingVO.code"></el-input>
          <el-button type="success" round size="small" @click="dianjia">点击生成</el-button>
        </el-form-item>


        <el-form-item v-if="idsEdit ==''?true:false" label="关联出库单号"
          :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]" prop="stockTakingRegions">
          <el-cascader v-model="ruleForm.stockTakingRegions" :options="warehouseVOS" :props="props" collapse-tags
            clearable @change="cascaderChange">
          </el-cascader>
        </el-form-item>
        <el-form-item v-else label="关联出库单号"
          :rules="[ { required: true, message: '请填写拣货单号', trigger: ['blur','change'] }]" prop="stockTakingRegions">
          <el-cascader v-model="stockTakingVO.stockTakingRegions" :options="warehouseVOS" :props="props" collapse-tags
            clearable @change="cascaderChange">
          </el-cascader>
        </el-form-item>


        <el-form-item v-if="idsEdit ==''?true:false" label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item v-else label="备注" prop="remark">
          <el-input type="textarea" v-model="stockTakingVO.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblePdAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog title="盘点详情" :visible.sync="dialogVisibleDesc" width="50%" @close="dialogVisibleCloseDesc">
      <el-card>
        <el-table :data="stockTakingRegionVOS" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.stockTakingObjectVOS" border style="width: 100%">
                <el-table-column prop="id" label="产品ID" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini">{{scope.row.id}}</el-button>
                  </template>
                </el-table-column>id
                <el-table-column prop="sku" label="产品" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini">{{scope.row.sku}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="inventoryQuantity" align="center" label="库存数量">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini">{{scope.row.inventoryQuantity}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="takingQuantity" align="center" label="盘点数量">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.takingQuantity" placeholder="请输入盘点数量"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="difference" align="center" label="差值">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.difference==null || scope.row.difference ==''" type="info" size="mini">暂无
                    </el-tag>
                    <el-button type="text" size="mini">{{scope.row.difference}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column align="center" type="index" label="#"></el-table-column>
          <!-- <el-table-column align="center" label="ID">
            <template slot-scope="scope">
              <el-tag type="" size="mini">{{scope.row.id}}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="仓库">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.warehouse}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="库区">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">{{scope.row.reservoir}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="货架">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">{{scope.row.shelves}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="层数">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.layer}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDesc = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblePdAddDesc">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import moment from 'moment'
  import {
    randomNumberCasePD,
    convertKey
  } from "@/plugins/unit.js";
  export default {
    data() {
      return {
        input3: "",
        activeName: "first",
        pageNum: 1,
        size: 10,
        total: 0,
        statusListCopy: [],
        stockTakingVOS: [],
        props: {
          multiple: true,
          value: "id",
          label: "name",
          children: "reservoirVOS"

        },
        warehouseVOS: [],
        values: [],
        form: {
          date1: "",
          date2: ""
        },
        select: "",
        dialogVisible: false,
        dialogVisibleDesc: false,
        ruleForm: {
          code: "",
          remark: "",
          stockTakingRegions: []
        },
        idsEdit: "",
        stockTakingVO: {
          code: "",
          remark: "",
          stockTakingRegions: []
        },
        stockTakingRegionVOS: [],
        descId: ""
      }
    },
    methods: {
      // 获取盘点列表
      getCheckListData() {
        this.$network.putwarehouse.check.checkList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockTakingVOS = res.data.stockTakingVOS
            // res.data.warehouseVOS[1].reservoirVOS[0].reservoirVOS[0]["reservoirVOS"] = []
            // let p1 = res.data.warehouseVOS[1].reservoirVOS[0].reservoirVOS[0].layer
            // for (let i = 0; i < p1; i++) {
            //   res.data.warehouseVOS[1].reservoirVOS[0].reservoirVOS[0].reservoirVOS.push({
            //     name: i + 1 + '层',
            //     id: i + 1
            //   })

            // }

            let p1 = res.data.warehouseVOS
            p1.forEach(element => {
              if (element.reservoirVOS.length >= 1) {
                element.reservoirVOS.forEach(v => {
                  if (v.reservoirVOS.length >= 1) {
                    v.reservoirVOS.forEach(m => {
                      m["reservoirVOS"] = []
                      for (let i = 0; i < m.layer; i++) {
                        m.reservoirVOS.push({
                          name: i + 1 + '层',
                          id: i + 1
                        })
                      }
                    })
                  }
                })
              }
            });
            // console.log(p1);
            this.warehouseVOS = res.data.warehouseVOS
            this.total = res.data.total
            let statusList = JSON.parse(JSON.stringify(res.data.statusList));
            let statusLists = convertKey(statusList, ["value"]);
            statusLists.unshift({
              value: "全部状态",
            });
            this.statusListCopy = statusLists;
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
        this.checkSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.checkSearch()
      },
      cascaderChange(val) {
        // console.log(val);
      },
      //添加盘点 
      addCheck() {
        this.dialogVisible = true
      },
      // 点击每一行展开回调
      getexpandchange(row, expandedRows) {
        // console.log(expandedRows);
        // if (expandedRows.length > 0 ) {
        //   let id = expandedRows[0].id
        //   if (expandedRows[0].status == 5 || expandedRows[0].status == 6) {
        //     this.$network.putwarehouse.check.checkstockDescId(id).then(res => {
        //       console.log(res);
        //       if (res.code === 0) {
        //         this.stockTakingRegionVOS = res.data.stockTakingRegionVOS
        //       } else {
        //         this.$notify({
        //           title: "失败",
        //           message: res.msg,
        //           type: "error"
        //         })
        //       }
        //     }).catch(err => {
        //       this.$notify({
        //         title: "失败",
        //         message: err,
        //         type: "error"
        //       })
        //     })
        //   }
        // } else {
        //   // console.log(1111);
        //   this.stockTakingRegionVOS = []
        // }


      },
      // 点击生成
      dianjia() {
        let PD = randomNumberCasePD()
        // console.log(JH);
        if (this.idsEdit == "") {
          this.ruleForm.code = PD
        } else {
          this.stockTakingVO.code = PD
        }
      },
      // 点击添加盘点
      dialogVisiblePdAdd(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (this.idsEdit == "") {
              this.$network.putwarehouse.check.checkstockTakingAdd({
                code: this.ruleForm.code,
                stockTakingRegions: this.ruleForm.stockTakingRegions,
                remark: this.ruleForm.remark
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "添加盘点单成功",
                    type: "success"
                  })
                  this.dialogVisible = false
                  this.$refs[ruleForm].resetFields();
                  this.getCheckListData()
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
              this.$network.putwarehouse.check.checkstockTakingAddEdit({
                id: this.stockTakingVO.id,
                code: this.stockTakingVO.code,
                stockTakingRegions: this.stockTakingVO.stockTakingRegions,
                remark: this.stockTakingVO.remark
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "编辑拣货单成功",
                    type: "success"
                  })
                  this.dialogVisible = false
                  this.$refs[ruleForm].resetFields();
                  this.getCheckListData()
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
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true
            })
          }
        })
      },
      // 关闭弹框回调
      dialogVisibleClose() {
        this.$refs['ruleForm'].resetFields()

        this.idsEdit = ""
        this.ruleForm = {
          code: "",
          remark: "",
          stockTakingRegions: []
        }
        this.stockTakingVO = {
          code: "",
          remark: "",
          stockTakingRegions: []
        }
        // this.stockTakingVO.stockTakingRegions = []
      },
      // 删除
      procurementDelete(id) {
        this.$network.putwarehouse.check.checkstockTakingAddDelete(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
             if (this.stockTakingVOS.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
            this.getCheckListData()
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
      // 点击编辑回显
      procurementEdit(id) {
        this.dialogVisible = true
        this.idsEdit = id
        this.$network.putwarehouse.check.checkstockTakingAddId(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.stockTakingVO = res.data.stockTakingVO
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
      // 审核
      procurementShenHe(id) {
        this.$network.putwarehouse.check.checkstockupdateStatus({
          id: id,
          status: 2,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getCheckListData()
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
      // 审核通过
      procurementShenHeTong(id) {
        this.$network.putwarehouse.check.checkstockupdateStatus({
          id: id,
          status: 4,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getCheckListData()
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
      // 盘点中
      procurementPanDianZhong(id) {
        this.$network.putwarehouse.check.checkstockupdateStatus({
          id: id,
          status: 5,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getCheckListData()
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
      // 盘点完成
      procurementShenHeRukusheng(id) {
        this.$network.putwarehouse.check.checkstockupdateStatus({
          id: id,
          status: 6,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getCheckListData()
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
      // 点击详情
      procurementDescId(id) {
        this.descId = id
        this.dialogVisibleDesc = true
        this.$network.putwarehouse.check.checkstockDescId(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.stockTakingRegionVOS = res.data.stockTakingRegionVOS
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
      // 点击保存
      dialogVisiblePdAddDesc() {
        this.$network.putwarehouse.check.checkstockDescsave({
          stockTakingRegionVOS: this.stockTakingRegionVOS
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.procurementDescId(this.descId)
            this.$notify({
              title: "成功",
              message: '编辑成功',
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
      },
      // 详情关闭回调
      dialogVisibleCloseDesc() {
        this.descId = ""
      },
      // 清除时间
      getPickingClear(val) {
        if (val == null || val == "") {
          this.form.date1 = ""
          this.form.date2 = ""
          this.checkSearch()
        }
      },
      // 搜索
      checkSearch() {
        let p1 = new Date(this.form.date1).valueOf()
        let p2 = new Date(this.form.date2).valueOf()
        // let p3 = this.input
        let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')
        let p6 = String(this.select)
        let p7 = this.input3
        // if (p6 == "" && p7 == "" && p4 == "Invalid date" && p5 == "Invalid date") {
        //   this.$notify({
        //     title: "失败",
        //     message: '请输入内容',
        //     type: "error"
        //   })
        //   //   console.log(12);
        // } else {
        this.$network.putwarehouse.check.checkList({
          pageNum: this.pageNum,
          size: this.size,
          code: p7 == "" ? null : p7,
          status: p6 == 0 ? null : p6,
          startTime: p4 == 'Invalid date' ? null : p4 == null ? null : p4 == '1970/01/01 08:00:00' ? null : p4,
          endTime: p5 == 'Invalid date' ? null : p5 == null ? null : p5 == '1970/01/01 08:00:00' ? null : p5,
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: '查询成功',
              type: "success",
            });
            this.stockTakingVOS = res.data.stockTakingVOS
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


      }

    },
    created() {
      this.getCheckListData()
    },
  }

</script>
