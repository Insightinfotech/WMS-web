<template>
  <div class="adminlist">
    <el-container>
      <el-header>
        <div>
          <h3>企业审核</h3>
        </div>
      </el-header>
      <el-main>
        <el-card>
          <div slot="header" class="clearfix">
            <span>审核列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="logout">退出</el-button>
          </div>
          <el-table :data="organizationVOS" border style="width: 100%" size="small">
            <el-table-column type="index" label="#" align="center">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="dbName" label="数据库名" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="状态" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isCheck" disabled>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.gmtCreate}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.gmtModified == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.gmtModified}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="同意通过审核" v-if="scope.row.isCheck==false"
                  placement="left">
                  <el-button type="success" icon="el-icon-check" circle size="mini"
                    @click="isCheckSuccess(scope.row.id)">
                  </el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="拒绝通过审核" v-if="scope.row.isCheck==true" placement="left">
                  <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isCheckClose(scope.row.id)">
                  </el-button>
                </el-tooltip>

              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination small background style="marginTop:15px" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
            :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNum: 1,
        size: 10,
        total: 0,
        organizationVOS: [],
      }
    },
    methods: {
      // 点击退出
      logout() {
        sessionStorage.removeItem("admintoken")
        this.$router.push("/adminlogin")
      },
      // 获取token
      getAdminToken() {
        let token = sessionStorage.getItem("admintoken")
        // console.log(token);
        if (!token) {
          return this.$router.push("/adminlogin")
        } else {
          this.$network.adminLoginToken().then(res => {
            if (res == false) {
              return this.$router.push("/adminlogin")
            } else {
              return this.getQiyeList()
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
      // 获取企业列表
      getQiyeList() {
        this.$network.adminGetList({
            pageNum: this.pageNum,
            size: this.size
          })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              res.data.organizationVOS.map(v => {
                v.gmtCreate = new Date(v.gmtCreate).toLocaleString(),
                  v.gmtModified = new Date(v.gmtModified).toLocaleString()
              })
              this.organizationVOS = res.data.organizationVOS;
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
      // 企业状态
      // isCheck(event, val) {
      //   this.$network.adminIsCheck({
      //       id: val,
      //       isCheck: event
      //     })
      //     .then(res => {
      //       // console.log(res);
      //       if (res.code === 0) {

      //         this.$notify({
      //           title: "成功",
      //           message: '更新状态成功',
      //           type: "success"
      //         });
      //         this.getQiyeList()
      //       } else {
      //         this.$notify({
      //           title: "失败",
      //           message: res.msg,
      //           type: "error"
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       this.$notify({
      //         title: "失败",
      //         message: err,
      //         type: "error"
      //       });
      //     });

      // },
      //点击成功 
      isCheckSuccess(id) {
        this.$network.adminIsCheck({
            id: id,
            isCheck: true
          })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {

              this.$notify({
                title: "成功",
                message: '更新状态成功',
                type: "success"
              });
              this.getQiyeList()
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
      // 点击失败
      isCheckClose(id) {
        this.$network.adminIsCheck({
            id: id,
            isCheck: false
          })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {

              this.$notify({
                title: "成功",
                message: '更新状态成功',
                type: "success"
              });
              this.getQiyeList()
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
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.getQiyeList()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.getQiyeList()
      },
    },
    created() {
      this.getAdminToken()

    },
    mounted() {
      // this.getQiyeList()
    },
  }

</script>
<style lang="scss" scoped>
  .adminlist {
    .el-header {
      background-color: #03132c;
      text-align: center;
      color: #fff;
      line-height: 60px;

      h3 {
        margin: 0;
      }
    }

    .clearfix {
      line-height: 24px;

      span {
        font-size: 17px;
        font-weight: bold;
      }
    }
  }

</style>
