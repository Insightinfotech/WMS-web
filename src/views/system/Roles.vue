<template>
  <div class="roles">
    <div>
      <h3>权限管理</h3>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <div class="roles_coneten">
          <div>
            <!-- 添加用户 -->
            <el-button type="primary" style="marginBottom:15px" @click="adduser">添加用户</el-button>
            <el-card>
              <el-table stripe :data="userList">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="rolesexpand">
                      <div>
                        <el-tag size="mini" type="info">用户名</el-tag> {{scope.row.username}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">用户ID</el-tag> {{scope.row.id}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">用户密码</el-tag> {{scope.row.password}}
                      </div>
                      <div class="rolesexpand_roles">
                        <el-tag size="mini" type="info">角色</el-tag>
                        <div>
                          <el-tag size="mini" v-for="item in scope.row.roles" :key="item.id">
                            {{item.name}}</el-tag>
                        </div>
                      </div>
                      <div class="rolesexpand_roles">
                        <el-tag size="mini" type="info">权限</el-tag>
                        <div>
                          <el-tag size="mini" v-for="item in scope.row.permissions" :key="item.id">
                            {{item.permission}}</el-tag>
                        </div>
                      </div>
                      <div>
                        <el-tag size="mini" type="info">创建时间</el-tag> {{scope.row.createTime|dateTimeFormat}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">更新时间</el-tag> {{scope.row.updateTime|dateTimeFormat}}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column type="index" align="center" label="编号">
                </el-table-column>
                <el-table-column align="center" prop="id" label="用户ID">
                </el-table-column>
                <el-table-column align="center" label="用户名">
                  <template slot-scope="scope">
                    <el-tag effect="dark">{{scope.row.username}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="创建于">
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.createTime|dateTimeFormat}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作">
                  <template slot-scope="scope">
                    <!-- {{scope.row}} -->
                    <el-button type="success" icon="el-icon-setting" size="mini" @click="editUserRols(scope.row.id)">
                      编辑用户</el-button>
                    <el-button type="primary" icon="el-icon-lock" size="mini" @click="addUserRols(scope.row.id)">添加角色
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)">删除用户
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination background style="margin-top:10px" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
                :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加弹框 -->
    <el-dialog title="添加角色" @close="usereditRoles" :visible.sync="dialogVisible" width="25%">
      <div class="roles_user ">
        <div>当前角色</div>
        <div v-if="meuserroles.length<=0" class="roles_items">
          <el-tag>暂无角色</el-tag>
        </div>
        <div v-else class="roles_user_me ">
          <template v-for="item in meuserroles">
            <div :key="item.id" class="roles_item ">
              <p>{{item.name}}</p>
              <div>
                <el-button type="danger" size="mini" @click="removeRoles(item.id)">移除</el-button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择角色">
            <el-select placeholder="请选择" v-model="userRolesListId">
              <el-option v-for="item in userRoleslist" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUsersRoles">添加角色</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑用户" @close="editRolesId" :visible.sync="dialogVisibleedit" width="25%">
      <div v-if="editData.length<=0"></div>
      <div v-else>
        <el-form :model="editData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editData.password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox-group v-model="checkList">
              <el-checkbox :checked="item.checked" v-for="item in editData.roles" :key="item.id" :label="item.id">
                {{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click="edituserRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" @close="useredit" :visible.sync="dialogVisibleuseradd" width="25%">
      <el-form :model="adduserForm" :rules="rules" ref="adduserruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adduserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adduserForm.password" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleuseradd = false">取 消</el-button>
        <el-button type="primary" @click="addUserForm('adduserruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "first",
        dialogVisible: false,
        dialogVisibleedit: false,
        dialogVisibleuseradd: false,
        adduserForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{
              required: true,
              message: '请输入用户名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在 2 到 16 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入用户密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 18,
              message: '长度在 6 到 18 个字符',
              trigger: 'blur'
            }
          ],
        },
        userList: [],
        userRoleslist: [],
        pageNum: 1,
        size: 10,
        total: 0,
        userRolesListId: "",
        meuserroles: [],
        rolesId: "",
        editData: [],
        checkedValue: [],
        checkList: []
      }
    },
    watch: {
      checkedValue: function (new_v, ola_v) {
        console.log(new_v, ola_v);
      }
    },
    methods: {
      // 用户列表
      getuserlist() {
        this.$network.home.roles.getUserList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          if (res.code === 0) {
            this.userList = res.data.list
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
      // 添加角色
      addUserRols(id) {
        this.dialogVisible = true
        this.rolesId = id
        // this.getRolesList()
        this.$network.home.roles.getUserRolesList(id).then(res => {
          if (res.code === 0) {
            this.meuserroles = res.data.roles
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
      // 添加角色
      addUsersRoles() {
        let uid = this.rolesId
        let rid = this.userRolesListId
        if (rid != "") {
          this.$network.home.roles.addUserRoles(uid, rid).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.getuserlist()
              this.addUserRols(uid)
              this.userRolesListId = ""
              this.$notify({
                title: "成功",
                message: '添加成功',
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
        } else {
          this.$notify({
            title: "失败",
            message: "请添加角色",
            type: "error"
          })
        }
      },
      // 移除角色
      removeRoles(id) {
        // console.log(id);
        this.$network.home.roles.removeRolesId(this.rolesId, id).then(res => {
          if (res.code === 0) {
            this.addUserRols(this.rolesId)
            this.$notify({
              title: "成功",
              message: '移除角色成功',
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
      // 添加用户
      adduser() {
        this.dialogVisibleuseradd = true
      },
      addUserForm(addUserForm) {
        this.$refs[addUserForm].validate((valid) => {
          if (valid) {
            // console.log(this.adduserForm);
            this.$network.home.roles.addUser(this.adduserForm).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "添加用户成功",
                  type: "success"
                })
                this.getuserlist()
                this.dialogVisibleuseradd = false
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
      // 删除用户
      deleteUser(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$network.home.roles.removeUserId(id).then(res => {
            if (res.code === 0) {
              this.$notify({
                title: "删除用户成功",
                type: "success"
              })
              if (this.userList.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getuserlist()
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
      // 获取角色列表
      getRolesList() {
        this.$network.home.roles.getRolesList().then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.userRoleslist = res.data.list
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
      // 编辑用户
      editUserRols(id) {
        this.rolesId = id
        this.dialogVisibleedit = true
        let data = this.userList.filter(v => {
          if (v.id === id) {
            return v
          }
        })
        let rolesId = data[0].roles
        let roleslist = this.userRoleslist
        roleslist.forEach(item => {
          if (rolesId.find(i => item.id === i.id)) {
            // console.log(item);
            item.checked = true
          }
        })
        data[0].roles = roleslist
        this.editData = data[0]
        this.getRolesList()
      },
      // 编辑消失的回调
      useredit() {
        this.$refs["adduserruleForm"].resetFields();
      },
      usereditRoles() {
        this.rolesId = ""
        this.userRolesListId = ""
      },
      editRolesId() {
        this.editData = []
        this.checkList = []
        this.rolesId = ""
        this.getuserlist()

      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.getuserlist()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getuserlist()
      },
      // 编辑添加sd
      edituserRoles() {
        let id = this.rolesId
        let datasd = this.editData.username
        let roleIds = this.checkList
        // console.log(data, rolelds);
        this.$network.home.roles.editUser(id, datasd, roleIds).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "编辑用户成功",
              type: "success"
            })
            this.getuserlist()
            this.dialogVisibleedit = false
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
    created() {
      this.getuserlist()
      this.getRolesList()
    },
    filters: {
      dateTimeFormat(val) {
        const date = new Date(val)
        return date.toLocaleString() || "非法日期"
      }
    }
  }

</script>
<style lang="scss" scoped>
  .roles {
    .demo-ruleForm {
      /deep/.el-input {
        width: 300px;
      }
    }

    .roles_user {
      display: flex;

      .roles_items {
        margin-left: 20px;
        margin-bottom: 10px;
      }

      &_me {
        margin-left: 30px;

        .roles_item {
          width: 300px;
          margin-bottom: 5px;
          display: flex;
          justify-content: space-between;

          p {
            margin: 0;
            line-height: 28px;
          }

        }
      }
    }

    .clearfix:before {
      /*伪元素是行内元素 正常浏览器清除浮动方法*/
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .rolesexpand {
      div {
        margin-bottom: 10px;
      }

      &_roles {
        display: flex;

        div {
          margin-left: 10px;

          .el-tag {
            margin-left: 10px;
          }
        }
      }
    }
  }

</style>
