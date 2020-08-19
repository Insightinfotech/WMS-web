<template>
  <div class="parcel">
    <h3>货架管理</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="货架管理" name="first">
        <el-button type="primary" style="marginBottom:15px;marginRight:30px" @click="parcelAdd">添加货架</el-button>
        <el-input @input="reservoirInput" clearable v-model="input" placeholder="请输入货架编号" class="input-with-input">
        </el-input>
        <el-input @input="reservoirInput" clearable placeholder="请输入货架名称" v-model="input3" class="input-with-select">
          <el-cascader class="el_cascader" slot="prepend" placeholder="请选择所属库区" v-model="select"
            :options="warehouseVOSDataCopy" :props="optionsProps">
          </el-cascader>
          <el-button slot="append" @click="reservoirSearch" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 表格 -->
        <el-card class="box-card">
          <el-table :data="parcelListData" border style="width: 100%">
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
                    <el-tag size="mini" type="info">所属仓库</el-tag> {{scope.row.warehouse.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">所属仓库ID</el-tag> {{scope.row.warehouse.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">所属库区</el-tag> {{scope.row.reservoir.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">所属库区ID</el-tag> {{scope.row.reservoir.id}}
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
            <el-table-column prop="code" align="center" label="货架编码">
            </el-table-column>
            <el-table-column prop="name" align="center" label="货架名称">
            </el-table-column>
            <el-table-column prop="lastOperationUser" align="center" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="warehouse.name" align="center" label="所属仓库">
            </el-table-column>
            <el-table-column prop="reservoir.name" align="center" label="所属库区">
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.createTime == null">暂无</el-tag>
                <el-tag size="small" v-else type="success">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else> {{scope.row.updateTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button icon="el-icon-edit" size="mini" type="info" @click="parcelAddEdit(scope.row.id)">编辑
                </el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="parcelDelete(scope.row.id)">删除
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
    <!-- 添加货架弹框 -->
    <el-dialog title="添加货架" @close="addreservoirClose" :visible.sync="dialogVisible" width="25%">
      <el-form :model="addreservoir" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="货架编号" prop="code">
          <el-input v-model="addreservoir.code"></el-input>
        </el-form-item>
        <el-form-item label="货架名称" prop="name">
          <el-input v-model="addreservoir.name"></el-input>
        </el-form-item>
        <el-form-item label="货架层数" prop="layer">
          <el-input v-model="addreservoir.layer"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" prop="warehouseId">
          <el-cascader v-model="addreservoir.warehouseId" :options="warehouseVOSData" :props="optionsProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addreservoir.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parcelAddUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑货架" @close="addreservoirCloseEdit" :visible.sync="dialogVisibleEdit" width="25%">
      <el-form :model="addreservoirEdit" ref="ruleFormEdit" :rules="rulesEdit" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="货架编号" prop="code">
          <el-input v-model="addreservoirEdit.code"></el-input>
        </el-form-item>
        <el-form-item label="货架名称" prop="name">
          <el-input v-model="addreservoirEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="货架层数" prop="layer">
          <el-input v-model="addreservoirEdit.layer"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" prop="warehouseId">
          <el-cascader v-model="addreservoirEdit.warehouseId" :options="warehouseVOSData" :props="optionsProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addreservoirEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="parcelAddUserEdit('ruleFormEdit')">确 定</el-button>
      </span>
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
        pageNum: 1,
        size: 10,
        total: 0,
        select: "",
        parcelListData: [],
        warehouseVOSData: [],
        warehouseVOSDataCopy: [],
        dialogVisible: false,
        dialogVisibleEdit: false,
        addreservoir: {
          warehouseId: []
        },
        addreservoirEdit: {},
        rules: {
          code: [{
            required: true,
            message: '请输入货架编号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入货架名称',
            trigger: 'blur'
          }],
          layer: [{
            required: true,
            message: '请输入层数',
            trigger: 'blur'
          }],
          // warehouseId: [{
          //   required: true,
          //   message: '请选择货架所属',
          //   trigger: 'change'
          // }],
        },
        rulesEdit: {
          code: [{
            required: true,
            message: '请输入货架编号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入货架名称',
            trigger: 'blur'
          }],
          layer: [{
            required: true,
            message: '请输入层数',
            trigger: 'blur'
          }]
        },
        optionsProps: {
          label: "name",
          value: "id",
          children: "reservoirVOS",
          expandTrigger: "hover",

        }
      }
    },
    methods: {
      // 获取货架列表
      getparcelList() {
        this.$network.warehouse.Parcel.parcelList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.parcelListData = res.data.shelvesVOS
            this.total = res.data.total
            this.warehouseVOSData = res.data.warehouseVOS
            let data = JSON.parse(JSON.stringify(res.data.warehouseVOS))
            data.unshift({
              name: "全部",
              id: 0
            })
            this.warehouseVOSDataCopy = data
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
        this.getparcelList()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getparcelList()
      },
      // 添加弹框关闭回调
      addreservoirClose() {
        this.$refs["ruleForm"].resetFields();
        this.addreservoir = {
          warehouseId: []
        }
      },
      addreservoirCloseEdit() {
        this.$refs["ruleFormEdit"].resetFields();
      },
      // 添加货架
      parcelAdd() {
        this.dialogVisible = true
      },
      // 添加
      parcelAddUser(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$network.warehouse.Parcel.parcelUserAdd({
              code: this.addreservoir.code,
              name: this.addreservoir.name,
              layer: this.addreservoir.layer,
              remark: this.addreservoir.remark,
              warehouseId: this.addreservoir.warehouseId.length <= 0 ? '' : this.addreservoir.warehouseId[0],
              reservoirId: this.addreservoir.warehouseId.length <= 0 ? '' : this.addreservoir.warehouseId[1]
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加货架成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getparcelList()
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
      // 查询
      reservoirSearch() {
        let p1 = this.input3
        let p2 = this.input
        let p3 = this.select[0] == 0 ? '' : this.select[0]
        let p4 = this.select[1]
        let p5 = this.select
        // console.log(p1, p2, p3);
        if (p1 == "" && p2 == "" && p5.length <= 0) {
          this.$notify({
            title: "失败",
            message: "查询内容不可以为空",
            type: "error"
          })
        } else {
          this.$network.warehouse.Parcel.parcelList({
            code: p2,
            name: p1,
            warehouseId: p3,
            reservoirId: p4
          }).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.parcelListData = res.data.shelvesVOS
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
          this.getparcelList()
        }
      },
      // 编辑
      parcelAddEdit(id) {
        this.dialogVisibleEdit = true
        this.$network.warehouse.Parcel.getShelvesById(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            if (res.data.shelvesVO.warehouse == null || res.data.shelvesVO.reservoir == null) {
              res.data.shelvesVO['warehouseId'] = ''
            } else {
              res.data.shelvesVO['warehouseId'] = [res.data.shelvesVO.warehouse.id, res.data.shelvesVO.reservoir.id]
            }
            this.addreservoirEdit = res.data.shelvesVO
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
      // 编辑添加
      parcelAddUserEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$network.warehouse.Parcel.parcelUserEdit({
              id: this.addreservoirEdit.id,
              code: this.addreservoirEdit.code,
              name: this.addreservoirEdit.name,
              layer: this.addreservoirEdit.layer,
              remark: this.addreservoirEdit.remark,
              warehouseId: this.addreservoirEdit.warehouseId.length <= 0 ? '' : this.addreservoirEdit.warehouseId[
                0],
              reservoirId: this.addreservoirEdit.warehouseId.length <= 0 ? '' : this.addreservoirEdit.warehouseId[1]
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "修改货架成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[ruleFormEdit].resetFields();
                this.getparcelList()
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
      // 删除
      parcelDelete(id) {
        this.$confirm('此操作将删除货架, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.warehouse.Parcel.shelvesDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.parcelListData.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getparcelList()
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
      this.getparcelList()
    },
  }

</script>
<style lang="scss" scoped>
  .parcel {
    .rolesexpand {
      div {
        margin-bottom: 10px;
      }
    }

    .el_cascader {
      width: 180px;
    }

    .input-with-select {
      width: 28%;

      /deep/ .el-input-group__prepend {
        padding: 0px !important;
      }
    }

    .input-with-input {
      width: 10%;
      margin-right: 30px;
    }
  }

</style>
