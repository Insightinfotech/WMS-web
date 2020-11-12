<template>
  <div class="warning">
    <h3>预警管理</h3>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="预警列表" name="first">
          <el-button type="primary" size="small" @click="warningAddSku" style="marginBottom:15px">预警产品</el-button>
          <el-button type="primary" size="small" @click="warningRole">通知角色</el-button>
          <div class="warning_card">
            <div style="width:50%;marginRight:10px">
              <el-card>
                <el-table :data="warningList" border style="width: 100%" size="mini">
                  <el-table-column type="index" label="#" align="center">
                  </el-table-column>
                  <el-table-column prop="id" label="ID" align="center">
                  </el-table-column>
                  <el-table-column label="产品名称" align="center">
                    <template slot-scope="scope">
                      <el-tag size="mini">{{ scope.row.skuName }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品预警数量" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini">{{
                    scope.row.alertNum
                  }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="info" size="mini" style="marginRight:10px" @click="warningEchoIds(scope.row.id)">
                        编辑
                      </el-button>
                      <el-popconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="el-icon-info" iconColor="red"
                        title="确定将此产品删除吗？" @onConfirm="warningDelete(scope.row.id)">
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination background style="margin-top:10px" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
                  :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
                </el-pagination>
              </el-card>
            </div>
            <!-- ======= -->
            <div style="width:50%">
              <el-card>
                <el-table :data="adminList" border style="width: 100%" size="mini">
                  <el-table-column type="index" label="#" align="center">
                  </el-table-column>
                  <el-table-column prop="id" label="ID" align="center">
                  </el-table-column>
                  <el-table-column label="通知角色" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini">{{
                    scope.row.name
                  }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.flag==0" type="info" size="mini">不通知</el-tag>
                      <el-tag v-else type="danger" size="mini">通知</el-tag>

                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加预警产品 -->
      <el-dialog :title="warningEchoId==''?'添加预警产品':'编辑预警产品'" :visible.sync="dialogVisible" width="20%"
        @close="dialogVisibleClose">
        <el-form :model="warningEchoId==''?ruleForm:alertVO" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item v-if="warningEchoId==''?true:false" label="产品" prop="skuId" :rules="[
              {
                required: true,
                message: '请选择产品',
                trigger: ['blur', 'change']
              }
            ]">
            <el-cascader size="small" v-model="ruleForm.skuId" :options="options" :props="props" clearable>
            </el-cascader>
          </el-form-item>
          <el-form-item v-if="warningEchoId==''" label="预警数量" prop="alertNum" :rules="[
              {
                required: true,
                message: '请输入预警数量',
                trigger: ['blur', 'change']
              },
              {
                pattern: /^\d+$|^\d?\d+$/,
                message: '请输入正确的数量',
                trigger: ['blur', 'change']
              }
            ]">
            <el-input size="small" v-model="ruleForm.alertNum" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item v-else label="预警数量" prop="alertNum" :rules="[
              {
                required: true,
                message: '请输入预警数量',
                trigger: ['blur', 'change']
              },
              {
                pattern: /^\d+$|^\d?\d+$/,
                message: '请输入正确的数量',
                trigger: ['blur', 'change']
              }
            ]">
            <el-input size="small" v-model="alertVO.alertNum" style="width:40%"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="warningUserSkuAdd('ruleForm')" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加通知角色 -->
      <el-dialog title="添加通知角色" :visible.sync="dialogVisibleRole" width="25%" @close="dialogVisibleRoleClose">
        <el-form :model="ruleFormRoles" ref="ruleForm" label-width="100px" :label-position="labelPosition">
          <el-form-item label="角色列表">
            <el-checkbox-group v-model="ruleFormRoles.roleslist">
              <el-checkbox v-for="item in adminList" :key="item.id" :label="item.id" :checked="item.flag==0?false:true">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="warningRolesAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNum: 1,
        size: 10,
        total: 0,
        activeName: "first",
        dialogVisible: false,
        dialogVisibleRole: false,
        warningList: [],
        ruleForm: {},
        options: [],
        props: {
          expandTrigger: "click",
          children: "skuVOS",
          label: "name",
          value: "id"
        },
        warningEchoId: "",
        alertVO: {},
        adminList: [],
        ruleFormRoles: {
          roleslist: []
        },
        labelPosition: "top"
      };
    },
    methods: {
      //获取列表
      getListDatas() {
        this.$network.home.warning
          .getListData({
            pageNum: this.pageNum,
            size: this.size
          })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.warningList = res.data.alertVOS;
              this.total = res.data.total;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error"
            });
          });
      },
      // 获取产品列表
      gitSkuListDatas() {
        this.$network.home.warning
          .getSkuListData()
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.options = res.data.TypeAndSkus;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error"
            });
          });
      },
      // 点击添加产品弹框
      warningAddSku() {
        this.dialogVisible = true;
      },
      // 点击删除
      warningDelete(id) {
        this.$network.home.warning.deleteSkuListId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            if (this.warningList.length === 1 && this.pageNum > 1) {
              this.pageNum--
            }
            this.getListDatas()
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
      // 点击添加产品预警 和 编辑
      warningUserSkuAdd(ruleForm) {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            if (this.warningEchoId == "") {
              this.$network.home.warning
                .createSkuList({
                  skuId: this.ruleForm.skuId[1],
                  alertNum: this.ruleForm.alertNum
                })
                .then(res => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: '添加预警产品成功',
                      type: "success"
                    });
                    this.dialogVisible = false
                    this.getListDatas()
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error"
                  });
                });
            } else {
              this.$network.home.warning
                .createSkuListEchoAdd({
                  id: this.warningEchoId,
                  alertNum: this.alertVO.alertNum
                })
                .then(res => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: '编辑预警产品成功',
                      type: "success"
                    });
                    this.dialogVisible = false
                    this.getListDatas()
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error"
                  });
                });
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true
            });
          }
        });
      },
      // 关闭弹框回调
      dialogVisibleClose() {
        this.$refs["ruleForm"].resetFields();
        this.warningEchoId = ""
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.getListDatas()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getListDatas()
      },
      // 点击回显
      warningEchoIds(id) {
        this.warningEchoId = id
        this.dialogVisible = true
        this.$network.home.warning.createSkuListEchoId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.alertVO = res.data.alertVO
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
      // 获取通知人员列表
      gitAdminList() {
        this.$network.home.warning
          .getAdminListData()
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.adminList = res.data.list;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error"
            });
          });
      },
      // 关闭通知角色弹框
      dialogVisibleRoleClose() {
        this.gitAdminList()
      },
      // 通知角色
      warningRole() {
        this.dialogVisibleRole = true
      },
      // 添加通知角色
      warningRolesAdd() {
        let p1 = this.ruleFormRoles.roleslist
        let p2 = p1.join(",")
       
        this.$network.home.warning
          .getAdminListDataRoles({
            roleIds:p2
          })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "成功",
                message: "添加角色成功",
                type: "success"
              });
              this.dialogVisibleRole = false
              this.gitAdminList()
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error"
            });
          });
      }
    },
    created() {
      this.gitAdminList()
      this.getListDatas();
      this.gitSkuListDatas();
    }
  };

</script>

<style lang="scss" scoped>
  .warning {
    .warning_card {
      display: flex;


    }
  }

</style>
