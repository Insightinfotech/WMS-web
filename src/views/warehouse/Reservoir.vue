<template>
  <div class="reservoir">
    <h3>库区管理</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="库区管理" name="first">
        <el-button type="primary" style="marginBottom:15px;marginRight:30px" @click="reservoirAdd">添加库区</el-button>
        <el-input @input="reservoirInput" clearable v-model="input" placeholder="请输入库区编码" class="input-with-input">
        </el-input>
        <el-input @input="reservoirInput" clearable placeholder="请输入库区名称" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择所属仓库">
            <el-option :label="item.name" :value="item.id" v-for="item in ReservoirKuquCopy" :key="item.id"></el-option>
          </el-select>
          <el-button slot="append" @click="reservoirSearch" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 表格 -->
        <el-card class="box-card">
          <el-table :data="ReservoirList" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="rolesexpand">
                  <div>
                    <el-tag size="mini" type="info">库区编码</el-tag> {{scope.row.code}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">库区ID</el-tag> {{scope.row.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">库区名称</el-tag> {{scope.row.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">所属仓库</el-tag>
                    <span v-if="scope.row.warehouseVO == null"></span>
                    <span v-else>{{scope.row.warehouseVO.name}}</span>
                  </div>
                  <div>
                    <el-tag size="mini" type="info">所属仓库ID</el-tag>
                    <span v-if="scope.row.warehouseVO == null"></span>
                    <span v-else>{{scope.row.warehouseVO.id}}</span>
                  </div>
                  <div>
                    <el-tag size="mini" type="info">库区面积</el-tag> {{scope.row.acreage}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">字典单位</el-tag> {{scope.row.category.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">字典ID</el-tag> {{scope.row.category.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">备注</el-tag> {{scope.row.remark}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">创建时间</el-tag> {{scope.row.createTime | dateTimeFormat}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">修改时间</el-tag><span v-if="scope.row.updateTime == null"></span> <span
                      v-else>{{scope.row.updateTime | dateTimeFormat}}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column type="index" align="center" label="#" width="50">
            </el-table-column>
            <el-table-column prop="code" align="center" label="库区编码">
            </el-table-column>
            <el-table-column prop="name" align="center" label="库区名称">
            </el-table-column>
            <el-table-column prop="lastOperationUser" align="center" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="warehouseVO.name" align="center" label="所属仓库">
            </el-table-column>
            <el-table-column align="center" label="库区面积">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.acreage==null">暂无</el-tag>
                <el-tag size="small" v-else-if="scope.row.acreage==''">暂无</el-tag>
                <el-tag size="small" type="success" v-else>{{scope.row.acreage}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="category.name" align="center" label="字典单位">
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else> {{scope.row.updateTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作" width="300">
              <template slot-scope="scope">
                <el-button icon="el-icon-menu" size="mini" type="primary" @click="reservoirSearchHoujia(scope.row.id)">
                  查看</el-button>
                <el-button icon="el-icon-edit" size="mini" type="info" @click="reservoirAddEdit(scope.row.id)">编辑
                </el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="reservoirDelete(scope.row.id)">删除
                </el-button>
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
    <!-- 添加库区 -->
    <el-dialog title="添加仓库" @close="addreservoirClose" :visible.sync="dialogVisible" width="25%">
      <el-form :model="addreservoir" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库编号" prop="code">
          <el-input v-model="addreservoir.code"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="addreservoir.name"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="acreage">
          <el-input v-model="addreservoir.acreage"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" prop="warehouseId">
          <el-select v-model="addreservoir.warehouseId" placeholder="请选择所属仓库">
            <el-option v-for="item in ReservoirKuqu" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addreservoir.remark"></el-input>
        </el-form-item>
        <el-form-item label="字典" prop="categoryId">
          <el-cascader v-model="addreservoir.categoryId" :options="options" :props="optionsProps">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reservoirAddUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑回显 -->
    <el-dialog title="编辑库区" @close="addreservoirCloseEdit" :visible.sync="dialogVisibleEdit" width="25%">
      <el-form :model="addreservoirEdit" ref="ruleFormEdit" :rules="rulesEdit" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="仓库编号" prop="code">
          <el-input v-model="addreservoirEdit.code"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="addreservoirEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="acreage">
          <el-input v-model="addreservoirEdit.acreage"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" prop="warehouseId">
          <el-select v-model="addreservoirEdit.warehouseVO" placeholder="请选择所属仓库">
            <el-option v-for="item in ReservoirKuqu" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addreservoirEdit.remark"></el-input>
        </el-form-item>
        <el-form-item label="字典" prop="selectedCategory">
          <el-cascader v-model="addreservoirEdit.selectedCategory" :options="options" :props="optionsProps">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="reservoirAddUserEdit('ruleFormEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看库区 -->
    <el-dialog title="查看库区" :visible.sync="dialogVisibleSearch" @close="kuquClose" width="70%">
      <div class="dialogVisibleSearchkuqu">
        <div class="tables_ps">
          <el-table :data="reservoirVOSdata">
            <el-table-column align="center" label="已绑定货架">
              <el-table-column align="center" label="货架编码">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">{{scope.row.code}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="货架名称">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所属库区">
                <template slot-scope="scope">
                  <el-tag size="small">{{scope.row.reservoir.name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="addkuquDelete(scope.row.id)">移除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="tables_ps2">
          <el-table border :data="whNullResVOSdata">
            <el-table-column align="center" label="未绑定货架">
              <el-table-column align="center" label="货架名称">
                <template slot-scope="scope">
                  <el-tag size="small">{{scope.row.name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="addkuqu(scope.row.id)">添加</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "first",
        input3: "",
        input: "",
        select: "",
        ReservoirList: [],
        options: [],
        ReservoirKuqu: [],
        ReservoirKuquCopy: [],
        pageNum: 1,
        size: 10,
        total: 0,
        dialogVisible: false,
        dialogVisibleEdit: false,
        dialogVisibleSearch: false,
        addreservoir: {
          code: "",
          name: "",
          acreage: "",
          warehouseId: "",
          remark: "",
          categoryId: []
        },
        addreservoirEdit: {
          // warehouseVO: {
          //   id: ""
          // }
        },
        rules: {
          code: [{
            required: true,
            message: '请输入库区编号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入库区名称',
            trigger: 'blur'
          }],
          categoryId: [{
            required: true,
            message: '请输入仓库字典',
            trigger: 'change'
          }],
        },
        rulesEdit: {
          code: [{
            required: true,
            message: '请输入库区编号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入库区名称',
            trigger: 'blur'
          }],
          selectedCategory: [{
            required: true,
            message: '请输入仓库字典',
            trigger: 'change'
          }],
        },
        optionsProps: {
          label: "name",
          value: "id",
          children: "categories",
          expandTrigger: "hover"
        },
        reservoirVOSdata: [],
        whNullResVOSdata: [],
        huoId: ""
      }
    },
    methods: {
      // 查看货架
      reservoirSearchHoujia(id) {
        this.huoId = id
        this.dialogVisibleSearch = true
        this.$network.warehouse.reservoir.showShelves(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.reservoirVOSdata = res.data.shelvesVOS
            this.whNullResVOSdata = res.data.ResNullSheVOS
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
      // 添加货架
      addkuqu(id) {
        let wid = this.huoId
        this.$network.warehouse.reservoir.optionShelves(wid, id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: "添加到本库区成功",
              type: "success"
            })
            this.reservoirSearchHoujia(this.huoId)
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
      // 删除货架
      addkuquDelete(id) {
        let wid = this.huoId
        this.$network.warehouse.reservoir.optionShelvesDelete(wid, id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: "删除关联货架成功",
              type: "success"
            })
            this.reservoirSearchHoujia(this.huoId)
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
      // 获取库区列表
      getReservoirList() {
        this.$network.warehouse.reservoir.getReservoirList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            res.data.warehouseVOS
            this.ReservoirList = res.data.reservoirVOS
            this.options = res.data.categoryTypeVOS
            this.ReservoirKuqu = res.data.warehouseVOS
            let data = JSON.parse(JSON.stringify(res.data.warehouseVOS))
            data.unshift({
              name: "全部"
            })
            this.ReservoirKuquCopy = data
            this.total = res.data.total
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
        this.getReservoirList()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getReservoirList()
      },
      // 添加库区
      reservoirAdd() {
        this.dialogVisible = true
      },
      // 添加库区
      reservoirAddUser(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$network.warehouse.reservoir.reservoirAdd({
              code: this.addreservoir.code,
              name: this.addreservoir.name,
              acreage: this.addreservoir.acreage,
              remark: this.addreservoir.remark,
              warehouseId: this.addreservoir.warehouseId,
              categoryId: this.addreservoir.categoryId[1]
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加库区成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getReservoirList()
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
      // 回显
      reservoirAddEdit(id) {
        this.dialogVisibleEdit = true
        this.$network.warehouse.reservoir.getReservoirById(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            if (res.data.reservoirVO.warehouseVO != null) {
              res.data.reservoirVO.warehouseVO = res.data.reservoirVO.warehouseVO.id
            }
            this.addreservoirEdit = res.data.reservoirVO
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
      // 回显添加
      reservoirAddUserEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$network.warehouse.reservoir.reservoirAddEdit({
              id: this.addreservoirEdit.id,
              code: this.addreservoirEdit.code,
              name: this.addreservoirEdit.name,
              acreage: this.addreservoirEdit.acreage,
              remark: this.addreservoirEdit.remark,
              warehouseId: this.addreservoirEdit.warehouseVO == null ? '' : this.addreservoirEdit.warehouseVO,
              categoryId: this.addreservoirEdit.selectedCategory[1]
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑库区成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[ruleFormEdit].resetFields();
                this.getReservoirList()
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
      // 关闭弹框回调
      addreservoirClose() {
        this.$refs["ruleForm"].resetFields();
      },
      // 回显关闭的弹框
      addreservoirCloseEdit() {
        this.$refs["ruleFormEdit"].resetFields();
      },
      kuquClose() {
        this.huoId = ""
      },
      // 搜索
      reservoirSearch() {
        let p1 = this.input3
        let p2 = this.input
        let p3 = this.select
        // console.log(p1, p2, p3);
        if (p1 == "" && p2 == "" && p3 == "") {
          this.$notify({
            title: "失败",
            message: "查询内容不可以为空",
            type: "error"
          })
        } else {
          this.$network.warehouse.reservoir.getReservoirList({
            pageNum: this.pageNum,
            size: this.size,
            code: p2,
            name: p1,
            warehouseId: p3
          }).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.ReservoirList = res.data.reservoirVOS
              this.total = res.data.total
              this.$notify({
                title: "成功",
                message: "查询成功",
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
        }
      },
      reservoirInput(val) {
        if (val == "") {
          this.getReservoirList()
        }
      },
      // 删除
      reservoirDelete(id) {
        // console.log(id);
        this.$confirm('此操作将删除所绑定的货架, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.warehouse.reservoir.reservoirIdDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.ReservoirList.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getReservoirList()
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    },
    created() {
      this.getReservoirList()
    },
  }

</script>
<style lang="scss" scoped>
  .reservoir {
    .dialogVisibleSearchkuqu {
      display: flex;

      div {
        flex: 1;
      }

      .tables_ps {
        margin-right: 5px;
      }

      .tables_ps2 {
        margin-left: 5px;
      }


    }

    .el-select {
      width: 130px;
    }

    .input-with-select {
      width: 25%;
    }

    .input-with-input {
      width: 10%;
      margin-right: 30px;
    }

    .rolesexpand {
      div {
        margin-top: 10px;
      }
    }
  }

</style>
