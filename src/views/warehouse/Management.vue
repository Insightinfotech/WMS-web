<template>
  <div class="management">
    <h3>仓库管理</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="仓库管理" name="first">
        <el-button type="primary" style="marginBottom:15px;marginRight:30px" @click="managementAdd">添加仓库</el-button>
        <el-input @input="managementInput" clearable v-model="input" placeholder="请输入仓库编号" class="input-with-input">
        </el-input>
        <el-input @input="managementInput3" clearable placeholder="请输入仓库名称" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="managementSearch"></el-button>
        </el-input>
        <!-- 表格 -->
        <el-card class="box-card">
          <el-table :data="managementList" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="rolesexpand">
                  <div>
                    <el-tag size="mini" type="info">仓库编号</el-tag> {{scope.row.code}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">仓库ID</el-tag> {{scope.row.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">仓库名称</el-tag> {{scope.row.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">仓库面积</el-tag> {{scope.row.acreage}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">字典单位</el-tag> {{scope.row.category.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">字典ID</el-tag> {{scope.row.category.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">仓库负责人</el-tag> {{scope.row.manager}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">负责人电话</el-tag> {{scope.row.phone}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">仓库地址</el-tag> {{scope.row.address}}
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
            <el-table-column type="index" align="center" label="#">
            </el-table-column>
            <el-table-column prop="code" align="center" label="仓库编号" width="150">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="仓库名称" width="150">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="仓库面积">
              <template slot-scope="scope">
                <el-tag size="small" type="info" v-if="scope.row.acreage == null">暂无</el-tag>
                <el-tag size="small" v-else type="success">{{scope.row.acreage}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="category.name" align="center" label="字典单位">
              <template slot-scope="scope">
                <!-- {{scope.row.category}} -->
                <el-tag v-if="scope.row.category.name==null || scope.row.category.name ==''" type="info">暂无</el-tag>
                <el-button v-else size="small" type="text">{{scope.row.category.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="仓库负责人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.manager}}</el-tag>
              </template>
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
            <!-- <el-table-column prop="address" align="center" label="备注">
            </el-table-column> -->
            <el-table-column prop="address" align="center" label="操作" width="300">
              <template slot-scope="scope">
                <el-button icon="el-icon-menu" size="mini" type="primary" @click="managementSearchKuqu(scope.row.id)">查看
                </el-button>
                <el-button icon="el-icon-edit" size="mini" type="info" @click="managementAddEdit(scope.row.id)">编辑
                </el-button>
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="managementDelete(scope.row.id)">删除
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
    <!-- 添加仓库弹框 -->
    <el-dialog title="添加仓库" @close="addmanagementClose" :visible.sync="dialogVisible" width="23%">
      <el-form :model="addmanagement" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库编号" prop="code">
          <el-input v-model="addmanagement.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjia">点击生成</el-button>
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="addmanagement.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="acreage">
          <el-input v-model="addmanagement.acreage" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库负责人" prop="manager">
          <el-input v-model="addmanagement.manager" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addmanagement.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="addmanagement.address" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addmanagement.remark" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="字典" prop="categoryId">
          <el-cascader v-model="addmanagement.categoryId" :options="options" :props="optionsProps">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="managementAddUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑仓库弹框 -->
    <el-dialog title="编辑仓库" @close="addmanagementCloseEdit" :visible.sync="dialogVisibleEdit" width="25%">
      <el-form :model="addmanagementEdit" ref="ruleFormEdit" :rules="rulesedit" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="仓库编号" prop="code">
          <el-input v-model="addmanagementEdit.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjiaEDit">点击生成</el-button>
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="addmanagementEdit.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="acreage">
          <el-input v-model="addmanagementEdit.acreage" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库负责人" prop="manager">
          <el-input v-model="addmanagementEdit.manager" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addmanagementEdit.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="addmanagementEdit.address" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addmanagementEdit.remark" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="字典" prop="selectedCategory">
          <el-cascader v-model="addmanagementEdit.selectedCategory" :options="options" :props="optionsProps">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="managementAddUserEdit('ruleFormEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看库区弹框 -->
    <el-dialog title="查看库区" :visible.sync="dialogVisibleSearch" @close="kuquClose" width="70%">
      <div class="dialogVisibleSearchkuqu">
        <div class="tables_ps">
          <el-table :data="reservoirVOSdata">
            <el-table-column align="center" label="已绑定库区">
              <el-table-column align="center" label="库区编码">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">{{scope.row.code}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="库区名称">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所属仓库">
                <template slot-scope="scope">
                  <el-tag size="small">{{scope.row.warehouseVO.name}}</el-tag>
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
            <el-table-column align="center" label="未绑定库区">
              <el-table-column align="center" label="库区名称">
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
  import {
    randomNumberCK
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        addmanagement: {
          code: "",
          name: "",
          acreage: "",
          manager: "",
          phone: "",
          address: "",
          remark: "",
          categoryId: [],
        },
        addmanagementEdit: {},
        activeName: "first",
        input3: "",
        input: "",
        pageNum: 1,
        size: 10,
        status: 1,
        total: 0,
        managementList: [],
        dialogVisible: false,
        dialogVisibleEdit: false,
        dialogVisibleSearch: false,
        options: [],
        optionsProps: {
          label: "name",
          value: "id",
          children: "categories",
          expandTrigger: "hover"
        },
        rules: {
          code: [{
            required: true,
            message: '请输入仓库编号',
            trigger: ['blur', 'change']
          }],
          name: [{
            required: true,
            message: '请输入仓库名称',
            trigger: ['blur', 'change']
          }],
          manager: [{
            required: true,
            message: '请输入仓库负责人',
            trigger: ['blur', 'change']
          }],
          phone: [{
              required: true,
              message: '请输入负责人电话号码',
              trigger: ['blur', 'change']
            },
            {
              pattern: /1[34578][012356789]\d{8}/,
              message: '请輸入正确的格式',
              trigger: ['blur', 'change']
            }
          ],
          categoryId: [{
            required: true,
            message: '请选择字典',
            trigger: ['blur', 'change']
          }]
        },
        rulesedit: {
          code: [{
            required: true,
            message: '请输入仓库编号',
            trigger: ['blur', 'change']
          }],
          name: [{
            required: true,
            message: '请输入仓库名称',
            trigger: ['blur', 'change']
          }],
          manager: [{
            required: true,
            message: '请输入仓库负责人',
            trigger: ['blur', 'change']
          }],
          phone: [{
              required: true,
              message: '请输入负责人电话号码',
              trigger: ['blur', 'change']
            },
            {
              pattern: /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/,
              message: '请輸入正确的格式',
              trigger: ['blur', 'change']
            }
          ],
          selectedCategory: [{
            required: true,
            message: '请选择字典',
            trigger: ['blur', 'change']
          }]
        },
        reservoirVOSdata: [],
        whNullResVOSdata: [],
        kuquId: "",
      }
    },
    methods: {
      // 查看库区
      managementSearchKuqu(id) {
        this.kuquId = id
        this.dialogVisibleSearch = true
        this.$network.warehouse.management.showReservoirs(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.reservoirVOSdata = res.data.reservoirVOS
            this.whNullResVOSdata = res.data.whNullResVOS
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
      dianjia() {
        let CK = randomNumberCK()
        // console.log(JH);
        this.addmanagement.code = CK
      },
      dianjiaEDit() {
        let CK = randomNumberCK()
        // console.log(JH);
        this.addmanagementEdit.code = CK
      },
      // 添加库区
      addkuqu(id) {
        let wid = this.kuquId
        // console.log(wid);
        // console.log(id);
        this.$network.warehouse.management.optionReservoirsAdd(wid, id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: "添加到本仓库成功",
              type: "success"
            })
            this.managementSearchKuqu(this.kuquId)
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
      // 删除库区
      addkuquDelete(id) {
        let wid = this.kuquId

        this.$network.warehouse.management.optionReservoirsDelete(wid, id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: "删除关联库区成功",
              type: "success"
            })
            this.managementSearchKuqu(this.kuquId)
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
      kuquClose() {
        this.kuquId = ""
      },
      // 获取仓库列表
      getManagementList() {
        this.$network.warehouse.management.getManagementList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.info(res);
          if (res.code === 0) {
            this.managementList = res.data.warehouseVOS
            this.options = res.data.categoryTypeVOS
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
        this.managementSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.managementSearch()
      },
      // 添加仓库开启弹框
      managementAdd() {
        this.dialogVisible = true
      },
      // 关闭弹框清除数据
      addmanagementClose() {
        this.$refs["ruleForm"].resetFields();
      },
      addmanagementCloseEdit() {
        this.$refs["ruleFormEdit"].resetFields();
      },
      // 添加
      managementAddUser(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$network.warehouse.management.managementAdd({
              code: this.addmanagement.code,
              name: this.addmanagement.name,
              acreage: this.addmanagement.acreage,
              manager: this.addmanagement.manager,
              phone: this.addmanagement.phone,
              address: this.addmanagement.address,
              remark: this.addmanagement.remark,
              categoryId: this.addmanagement.categoryId[1]
            }).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加仓库成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getManagementList()
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
            this.dialogVisible = false
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true
            })
          }
        })
      },
      // 编辑回显
      managementAddEdit(id) {
        this.dialogVisibleEdit = true
        this.$network.warehouse.management.managementAddEdit(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            // res.data.warehouseVO["categoryId"] = [1, 8]
            this.addmanagementEdit = res.data.warehouseVO
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
      // 编辑
      managementAddUserEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$network.warehouse.management.managementAddEditPut({
              id: this.addmanagementEdit.id,
              code: this.addmanagementEdit.code,
              name: this.addmanagementEdit.name,
              acreage: this.addmanagementEdit.acreage,
              manager: this.addmanagementEdit.manager,
              phone: this.addmanagementEdit.phone,
              address: this.addmanagementEdit.address,
              remark: this.addmanagementEdit.remark,
              categoryId: this.addmanagementEdit.selectedCategory[1]
            }).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑仓库成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[ruleFormEdit].resetFields();
                this.getManagementList()
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
            this.dialogVisible = false
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
      managementDelete(id) {
        this.$confirm('此操作将删除所绑定的库区和货架, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.warehouse.management.managementDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.managementList.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getManagementList()
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
      },
      managementInput(vla) {
        if (vla === "") {
          this.managementSearch()
        }
      },
      managementInput3(vla) {
        if (vla === "") {
          this.managementSearch()
        }
      },
      // 搜索
      managementSearch() {
        let p1 = this.input3
        let p2 = this.input
        // console.log(p1, p2);
        // if (p1 == "" && p2 == "") {
        //   this.$notify({
        //     title: "失败",
        //     message: "查询内容不可以为空",
        //     type: "error"
        //   })
        // } else {
        this.$network.warehouse.management.getManagementList({
          pageNum: this.pageNum,
          size: this.size,
          code: p2 == '' ? null : p2,
          name: p1 == "" ? null : p1
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.managementList = res.data.warehouseVOS
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
        // }

      }
    },
    created() {
      this.getManagementList()
    },
  }

</script>
<style lang="scss" scoped>
  .management {
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

    .input-with-select {
      width: 15%;
    }

    .input-with-input {
      width: 10%;
      margin-right: 30px;
    }

    .rolesexpand {
      div {
        margin-bottom: 10px;
      }
    }
  }

</style>
