<template>
  <div class="unit">
    <h3>单位字典</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="字典管理" name="first">
        <!-- 添加字典按钮 -->
        <el-button type="primary" style="marginRight:35px" @click="addUserUnit">添加字典</el-button>
        <!-- 搜索框 -->
        <el-input clearable @input="unitval" placeholder="请输入内容" v-model="inputunit" style="marginBottom:15px"
          class="input-with-select">
          <el-select class="select_option" v-model="select" slot="prepend" placeholder="请选择分类">
            <el-option :label="item.name" v-for="item in unitdataclasscopy" :key="item.id" :value="item.id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="unitSearch"></el-button>
        </el-input>
        <el-card class="box-card">
          <el-table border :data="unitdata" style="width: 100%">
            <el-table-column type="index" align="center" label="#" width="50">
            </el-table-column>
            <el-table-column prop="id" align="center" label="ID" width="100">
            </el-table-column>
            <el-table-column align="center" label="字典名称">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="字典分类">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.categoryType.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" align="center" label="备注">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.remark === null" type="info">暂无</el-tag>
                <el-tag size="small" v-else-if="scope.row.remark =='' " type="info">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.remark}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.createTime|dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.updateTime|dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-setting" size="mini" @click="unituserEdit(scope.row.id)">
                  编辑
                </el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background style=" margin-top:15px" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
            :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="字典类型" name="one">
        <!-- 添加字典分类按钮 -->
        <el-button type="primary" style="marginBottom:15px" @click="addclassify">添加分类</el-button>
        <!-- 分类列表 -->
        <el-card>
          <el-table :data="unitdataclass" style="width: 100%" border>
            <el-table-column type="index" align="center" label="#" width="50">
            </el-table-column>
            <el-table-column prop="id" align="center" label="ID" width="100">
            </el-table-column>
            <el-table-column prop="name" align="center" label="字典类型">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.createTime|dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.updateTime|dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-setting" size="mini" @click="unitTypeEdit(scope.row.id)">
                  编辑
                </el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="unitTypeDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background style="margin-top:15px" @size-change="handleSizeChanges"
            @current-change="handleCurrentChanges" :current-page="pageNums" :page-sizes="[10, 15, 20, 30]"
            :page-size="sizes" layout="total, sizes, prev, pager, next" :total="totals">
          </el-pagination>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加字典弹框 -->
    <el-dialog title="添加字典" @close="closeUnit" :visible.sync="dialogVisibleuseradd" width="20%">
      <el-form ref="ruleFormunit" :model="addunitdata" label-width="100px" :rules="rulesunitunit" class="demo-ruleForm">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="addunitdata.name"></el-input>
        </el-form-item>
        <el-form-item label="字典分类" prop="categoryTypeId">
          <el-select v-model="addunitdata.categoryTypeId" placeholder="请选择分类">
            <el-option v-for="item in typesdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addunitdata.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleuseradd = false">取 消</el-button>
        <el-button type="primary" @click="unitUserAddDate('ruleFormunit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑字典弹框 -->
    <el-dialog title="编辑字典" @close="closeUnitEdit" :visible.sync="dialogVisibleuseraddEdit" width="20%">
      <el-form ref="ruleFormunitEdit" :model="addunitdataEdit" label-width="100px" :rules="rulesunitunitEdit"
        class="demo-ruleForm">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="addunitdataEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="字典分类" prop="id">
          <el-select v-model="addunitdataEdit.categoryType.id" placeholder="请选择分类">
            <el-option v-for="item in typesdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addunitdataEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleuseraddEdit = false">取 消</el-button>
        <el-button type="primary" @click="unitUserAddDateEdit('ruleFormunitEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加字典分类弹框 -->
    <el-dialog title="添加字典分类" @close="closeUnitTypt" :visible.sync="dialogVisibleclassify" width="20%">
      <el-form :model="classify" :rules="rulesunittype" ref="ruleFormtype" label-width="120px">
        <el-form-item label="字典分类名称" prop="name">
          <el-input v-model="classify.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleclassify = false">取 消</el-button>
        <el-button type="primary" @click="addUnitType('ruleFormtype')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑字典分类 -->
    <el-dialog title="编辑字典分类" @close="closeUnitTyptedit" :visible.sync="dialogVisibleclassifyedit" width="20%">
      <el-form :model="classifyedit" :rules="rulesunittypeedit" ref="ruleFormtypeedit" label-width="120px">
        <el-form-item label="字典分类名称" prop="name">
          <el-input v-model="classifyedit.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleclassifyedit = false">取 消</el-button>
        <el-button type="primary" @click="addUnitTypeedit('ruleFormtypeedit')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    unitType
  } from "@/utils/index"
  export default {
    data() {
      return {
        activeName: "first",
        inputunit: '',
        select: "",
        addunitdata: {
          name: "",
          categoryTypeId: "",
          remark: ""
        },
        addunitdataEdit: {
          categoryType: {
            id: ""
          },
          name: "",
          remark: ""
        },
        dialogVisibleuseradd: false,
        dialogVisibleclassify: false,
        dialogVisibleclassifyedit: false,
        dialogVisibleuseraddEdit: false,
        unitdata: [],
        pageNum: 1,
        size: 10,
        total: 0,
        pageNums: 1,
        sizes: 10,
        totals: 0,
        typesdata: [],
        classify: {
          name: ""
        },
        classifyedit: {},
        unitdataclass: [],
        unitdataclasscopy: [],
        rulesunittype: {
          name: [{
              required: true,
              message: '请输入字典类型',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: 'blur'
            }
          ]
        },
        rulesunittypeedit: {
          name: [{
              required: true,
              message: '请输入字典类型',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: 'blur'
            }
          ]
        },
        rulesunitunit: {
          name: [{
            required: true,
            message: '请输入字典',
            trigger: 'blur'
          }],
          categoryTypeId: [{
            required: true,
            message: '请选择字典类型',
            trigger: 'change'
          }]
        },
        rulesunitunitEdit: {
          name: [{
            required: true,
            message: '请输入字典',
            trigger: 'blur'
          }],
          categoryTypeId: [{
            required: true,
            message: '请选择字典类型',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      addUserUnit() {
        this.dialogVisibleuseradd = true
      },
      // 获取字典列表
      getUnitlist() {
        this.$network.home.unit.getCaterogyList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.unitdata = res.data.categoryVOS
            this.total = res.data.total
            this.typesdata = res.data.categoryTypeVOS
            let data = JSON.parse(JSON.stringify(res.data.categoryTypeVOS))
            data.unshift({
              name: "全部"
            })
            this.unitdataclasscopy = data
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
      // 添加字典
      unitUserAddDate(unitUserAddDate) {
        this.$refs[unitUserAddDate].validate((valid) => {
          if (valid) {
            this.$network.home.unit.addUserUnit({
              name: this.addunitdata.name,
              categoryTypeId: this.addunitdata.categoryTypeId,
              remark: this.addunitdata.remark
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加字典成功",
                  type: "success"
                })
                this.dialogVisibleuseradd = false
                this.addunitdata = {
                  remark: ""
                }
                this.getUnitlist()
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
      // 编辑字典
      unituserEdit(id) {
        this.dialogVisibleuseraddEdit = true
        let data = JSON.parse(JSON.stringify(this.unitdata))
        let d1 = data.filter(v => {
          if (v.id === id) {
            return v
          }
        })
        this.addunitdataEdit = d1[0]
      },
      unitUserAddDateEdit(ruleFormunitEdit) {
        this.$refs[ruleFormunitEdit].validate((valid) => {
          if (valid) {
            // console.log(this.addunitdataEdit);
            this.$network.home.unit.unitUserAddEdit({
              id: this.addunitdataEdit.id,
              name: this.addunitdataEdit.name,
              categoryTypeId: this.addunitdataEdit.categoryType.id,
              remark: this.addunitdataEdit.remark
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑字典成功",
                  type: "success"
                })
                this.getUnitlist()
                this.dialogVisibleuseraddEdit = false
                this.addunitdataEdit = {
                  categoryType: {
                    id: ""
                  },
                  name: "",
                  remark: ""
                }
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
      unitval(val) {
        if (val == "") {
          this.getUnitlist()
        }
      },
      // 搜索
      unitSearch() {
        this.$network.home.unit.unitSearchName({
          pageNum: 1,
          size: 10,
          categoryTypeId: this.select,
          name: this.inputunit
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.unitdata = res.data.categoryVOS
            this.total = res.data.total
            // this.getUnitlist()
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
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.getUnitlist()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getUnitlist()
      },
      handleSizeChanges(newsize) {
        this.sizes = newsize
        this.getTypeList()
      },
      handleCurrentChanges(newpage) {
        this.pageNums = newpage
        this.getTypeList()
      },
      // 删除
      deleteUser(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          // console.log(id);
          this.$network.home.unit.unitUserDelete(id).then(res => {
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.unitdata.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getUnitlist()
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
      // 添加分类弹框
      addclassify() {
        this.dialogVisibleclassify = true
      },
      // 获取分类列表
      getTypeList() {
        this.$network.home.unit.unitTypeList({
          pageNum: this.pageNums,
          size: this.sizes
        }).then(res => {
          if (res.code === 0) {
            this.unitdataclass = res.data.categoryTypeVOS
            this.totals = res.data.total
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
      // 添加分类
      addUnitType(ruleFormtype) {
        this.$refs[ruleFormtype].validate((valid) => {
          if (valid) {
            this.$network.home.unit.unitTypeadd({
              name: this.classify.name
            }).then(res => {
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: '添加字典分类成功',
                  type: "success"
                })
                this.classify.name = ""
                this.getTypeList()
                this.dialogVisibleclassify = false
                this.getUnitlist()
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
      // 删除分类
      unitTypeDelete(id) {
        // console.log(id);
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          // console.log(id);
          this.$network.home.unit.unitTypeDelete(id).then(res => {
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.unitdataclass.length === 1 && this.pageNums > 1) {
                this.pageNums--
              }
              this.getTypeList()
              this.getUnitlist()
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
      // 编辑分类
      unitTypeEdit(id) {
        this.dialogVisibleclassifyedit = true
        // console.log(id);
        let data = JSON.parse(JSON.stringify(this.unitdataclass))
        let d1 = data.filter(v => {
          if (v.id === id) {
            return v
          }
        })
        this.classifyedit = d1[0]
      },
      // 编辑分类
      addUnitTypeedit(ruleFormtypeedit) {
        this.$refs[ruleFormtypeedit].validate((valid) => {
          if (valid) {
            this.$network.home.unit.unitTypeEdit({
              id: this.classifyedit.id,
              name: this.classifyedit.name
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: '编辑字典分类成功',
                  type: "success"
                })
                this.classifyedit = {}
                this.getTypeList()
                this.getUnitlist()
                this.dialogVisibleclassifyedit = false

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
      //分类弹框关闭回调 
      closeUnit() {
        this.$refs["ruleFormunit"].resetFields();
      },
      closeUnitTypt() {
        this.$refs["ruleFormtype"].resetFields();
      },
      // 编辑分类弹框回调
      closeUnitTyptedit() {
        this.classifyedit = {}

      },
      // 编辑字典弹框回调
      closeUnitEdit() {
        this.$refs["ruleFormunitEdit"].resetFields();
        this.addunitdataEdit = {
          categoryType: {
            id: ""
          },
          name: "",
          remark: ""
        }
      }
    },
    created() {
      this.getUnitlist()
      this.getTypeList()
    },
  }

</script>
<style lang="scss" scoped>
  .input-with-select {
    width: 30%;
    background-color: #fff !important;
  }

  .select_option {
    width: 130px;
    border-radius: 5px;
  }

</style>
