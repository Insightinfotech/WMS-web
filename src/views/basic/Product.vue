<template>
  <div class="product">
    <!-- 合作 -->
    <h3>产品管理</h3>
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="产品管理" name="first">
        <el-button type="primary" @click="productAdd">添加产品</el-button>
        <el-input @input="productInputss" clearable v-model="input" placeholder="请输入产品编码" class="input-with-input">
        </el-input>
        <el-select style="marginLeft:20px" placeholder="请选择供应商" v-model="select1">
          <el-option :label="item.name" :value="item.id" v-for="item in supplierVOSCopy" :key="item.id"></el-option>
        </el-select>
        <el-input @input="productInputss" clearable placeholder="请输入产品名称" v-model="input3" class="input-with-select">
          <el-select class="el_select" v-model="select" slot="prepend" placeholder="请选择产品分类">
            <el-option :label="item.name" :value="item.id" v-for="item in skuTypeVOSsCopy" :key="item.id"></el-option>
          </el-select>
          <el-button slot="append" @click="productSearch" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 卡片表格 -->
        <el-card style="marginTop:15px">
          <!--表格  -->
          <el-table :data="skuVOS" border style="width: 100%">
            <el-table-column align="center" type="expand">
              <template slot-scope="scope">
                <div class="product_card">
                  <el-card class="product_card_one">
                    <div class="rolesexpand">
                      <div>
                        <el-tag size="mini" type="info">产品编号</el-tag> {{scope.row.code}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">产品ID</el-tag> {{scope.row.id}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">产品名称</el-tag> {{scope.row.name}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">工具人</el-tag> {{scope.row.lastOperationUser}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">产品单位</el-tag> {{scope.row.categoryVO.name}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">产品分类</el-tag>
                        <span v-if="scope.row.skuTypeVO==null"></span>
                        <span v-else>{{scope.row.skuTypeVO.name}}</span>
                      </div>
                      <div>
                        <el-tag size="mini" type="info">产品分类ID</el-tag>
                        <span v-if="scope.row.skuTypeVO==null"></span>
                        <span v-else>{{scope.row.skuTypeVO.id}}</span>
                      </div>
                      <div>
                        <el-tag size="mini" type="info">备注</el-tag> {{scope.row.remark}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">创建时间</el-tag> {{scope.row.createTime | dateTimeFormat}}
                      </div>
                      <div>
                        <el-tag size="mini" type="info">修改时间</el-tag><span v-if="scope.row.updateTime == null"></span>
                        <span v-else>{{scope.row.updateTime | dateTimeFormat}}</span>
                      </div>
                    </div>
                  </el-card>
                  <el-card class="product_card_two">
                    <el-table :data="scope.row.skuInfos" border style="width: 100%">
                      <el-table-column align="center" label="供应商名称">
                        <template slot-scope="scope">
                          <el-tag>{{scope.row.supplierName}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="name" label="价格">
                        <template slot-scope="scope">
                          <el-tag type="success">{{scope.row.price}}</el-tag>
                        </template>
                      </el-table-column>

                    </el-table>
                  </el-card>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" type="index" label="#">
            </el-table-column>
            <el-table-column align="center" prop="code" label="产品编号">
              <template slot-scope="scope">
                <el-tag size="small" type="info">{{scope.row.code}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="产品名称">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="lastOperationUser" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="skuTypeVO.name" label="产品分类">
              <template slot-scope="scope">
                <el-tag size="small" type="info" v-if="scope.row.skuTypeVO == null">暂无</el-tag>
                <el-tag size="small" type="success" v-else>{{scope.row.skuTypeVO.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="categoryVO.name" label="产品单位">
              <template slot-scope="scope">
                <el-tag size="small" type="info" v-if="scope.row.categoryVO == null">暂无</el-tag>
                <el-tag size="small" effect="dark" type="primary">{{scope.row.categoryVO.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="updateTime" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else> {{scope.row.updateTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="productEdits(scope.row.id)" type="primary" icon="el-icon-edit" size="small">编辑
                </el-button>
                <el-button @click="productDelete(scope.row.id)" type="danger" icon="el-icon-delete" size="small">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background style="marginTop:15px" @size-change="handleSizeChanges"
            @current-change="handleCurrentChanges" :current-page="pageNums" :page-sizes="[10, 15, 20, 30]"
            :page-size="sizes" layout="total, sizes, prev, pager, next" :total="totals">
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <!-- ====================== -->
      <el-tab-pane label="产品类型" name="firsts">
        <el-button type="primary" @click="productTypeAddId">添加产品类型</el-button>
        <!-- <el-input clearable v-model="inputs" placeholder="请输入公司编码" class="input-with-input">
        </el-input> -->
        <el-input @input="productInputs" clearable placeholder="请输入产品类型" v-model="input3s" class="input-with-select">
          <el-button slot="append" @click="productTypeSearch" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 卡片表格 -->
        <el-card style="marginTop:15px">
          <!--表格  -->
          <el-table :data="skuTypeVOS" border style="width: 100%">
            <el-table-column align="center" type="index" label="#">
            </el-table-column>
            <el-table-column align="center" prop="id" label="ID" width="50">
            </el-table-column>
            <el-table-column align="center" prop="name" label="产品分类名称">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="lastOperationUser" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="修改时间">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else> {{scope.row.updateTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="productTypeEdit(scope.row.id)" size="small">编辑
                </el-button>
                <el-button type="danger" icon="el-icon-delete" @click="productTypeDelete(scope.row.id)" size="small">删除
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
    <!-- 添加产品分类 -->
    <el-dialog title="添加产品分类" @close="addPartnerCloses" :visible.sync="dialogVisibles" width="20%">
      <el-form :model="addPartners" ref="ruleForms" label-width="120px" class="demo-ruleForm">
        <el-form-item label="产品分类名称" prop="name" :rules="[{ required: true,
            message: '产品分类名称',
            trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartners.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="productTypeAdd('ruleForms')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 产品分类编辑 -->
    <el-dialog title="编辑产品分类" @close="addPartnerClosesEdit" :visible.sync="dialogVisiblesEdit" width="20%">
      <el-form :model="addPartnersEdit" ref="ruleFormsEdit" label-width="120px" class="demo-ruleForm">
        <el-form-item label="产品分类名称" prop="name" :rules="[{ required: true,
            message: '产品分类名称',
            trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartnersEdit.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblesEdit = false">取 消</el-button>
        <el-button type="primary" @click="productTypeAddEdit('ruleFormsEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加产品 -->
    <el-dialog title="添加产品" @close="addPartnerClose" :visible.sync="dialogVisible" width="25%">
      <el-form :model="addProduct" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品编号" prop="code">
          <el-input v-model="addProduct.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjia">点击生成</el-button>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="addProduct.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="skuTypeId">
          <el-select v-model="addProduct.skuTypeId" placeholder="请选择产品类型">
            <el-option v-for="item in skuTypeVOS" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典" prop="categoryId">
          <el-cascader v-model="addProduct.categoryId" :options="categoryTypeVOS" :props="optionsProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addProduct.remark"></el-input>
        </el-form-item>
        <el-form-item v-for="(domain, index) in addProduct.skuInfos" :label="'供应商产品' + (index+1)" :key="index">
          <el-select v-model="domain.supplierId" placeholder="请选择供应商">
            <el-option v-for="item in supplierVOS" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-form-item prop="price">
            <el-input placeholder="请填写供应商价格" style="marginTop:5px;width:50%" v-model="domain.price"></el-input>
          </el-form-item>

          <el-input style="marginTop:5px" type="textarea" placeholder="备注" v-model="domain.remark"></el-input>
          <el-button type="danger" style="marginTop:5px" @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="addDomain" type="success">新增供应商产品</el-button>
        <el-button type="primary" @click="productAddUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑产品 -->
    <el-dialog title="编辑产品" @close="addPartnerCloseEdit" :visible.sync="dialogVisibleEdit" width="25%">
      <el-form :model="addProductEdit" ref="ruleFormEdit" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品编号" prop="code">
          <el-input v-model="addProductEdit.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjiaEDit">点击生成</el-button>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="addProductEdit.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="skuTypeId">
          <el-select v-model="addProductEdit.skuTypeVO" placeholder="请选择产品类型">
            <el-option v-for="item in skuTypeVOS" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典" prop="categoryId">
          <el-cascader v-model="addProductEdit.categoryId" :options="categoryTypeVOS" :props="optionsProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addProductEdit.remark"></el-input>
        </el-form-item>
        <el-form-item v-for="(domain, index) in addProductEdit.skuInfos" :label="'供应商产品' + (index+1)" :key="index">
          <el-select v-model="domain.supplierId" placeholder="请选择供应商">
            <el-option v-for="item in supplierVOS" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-form-item prop="price">
            <el-input placeholder="请填写供应商价格" style="marginTop:5px;width:50%" v-model="domain.price"></el-input>
          </el-form-item>
          <el-input style="marginTop:5px" type="textarea" placeholder="备注" v-model="domain.remark"></el-input>
          <el-button type="danger" style="marginTop:5px" @click.prevent="removeDomains(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button @click="addDomains" type="success">新增供应商产品</el-button>
        <el-button type="primary" @click="productAddUserEdit('ruleFormEdit')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    randomNumberCP
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        activeName: "first",
        input: "",
        input3: "",
        select: "",
        select1: "",
        inputs: "",
        input3s: "",
        pageNum: 1,
        size: 10,
        total: 0,
        pageNums: 1,
        sizes: 10,
        totals: 0,
        skuTypeVOS: [],
        dialogVisibles: false,
        dialogVisiblesEdit: false,
        dialogVisible: false,
        dialogVisibleEdit: false,
        addPartners: {
          name: ""
        },
        addProduct: {
          code: "",
          name: "",
          skuTypeId: "",
          categoryId: "",
          remark: "",
          skuInfos: []
        },
        rules: {
          code: [{
            required: true,
            message: '请输入供应商编号',
            trigger: ['blur', 'change']
          }],
          name: [{
            required: true,
            message: '请输入供应商名称',
            trigger: ['blur', 'change']
          }],
          categoryId: [{
            required: true,
            message: '请输入仓库字典',
            trigger: ['blur', 'change']
          }],
        },
        addPartnersEdit: {},
        skuVOS: [],
        categoryTypeVOS: [],
        skuTypeVOSs: [],
        supplierVOS: [],
        optionsProps: {
          label: "name",
          value: "id",
          children: "categories",
          expandTrigger: "hover"
        },
        addProductEdit: {
          skuInfos: [{
            supplierId: "",
            price: "",
            remark: ""
          }]
        },
        skuTypeVOSsCopy: [],
        supplierVOSCopy: []
      }
    },
    methods: {
      dianjia() {
        let CP = randomNumberCP()
        // console.log(JH);
        this.addProduct.code = CP
      },
      dianjiaEDit() {
        let CP = randomNumberCP()
        // console.log(JH);
        this.addProductEdit.code = CP
      },
      addDomain() {
        this.addProduct.skuInfos.push({
          supplierId: "",
          price: "",
          remark: ""
        });
      },
      addDomains() {
        this.addProductEdit.skuInfos.push({
          supplierId: "",
          price: "",
          remark: ""
        });
      },
      removeDomain(item) {
        // console.log(item);
        var index = this.addProduct.skuInfos.indexOf(item)
        if (index !== -1) {
          this.addProduct.skuInfos.splice(index, 1)
        }
      },
      removeDomains(item) {
        // console.log(item);
        var index = this.addProductEdit.skuInfos.indexOf(item)
        if (index !== -1) {
          this.addProductEdit.skuInfos.splice(index, 1)
        }
      },
      // 获取产品类型列表
      getProductTypeList() {
        this.$network.basic.product.productTypeList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.skuTypeVOS = res.data.skuTypeVOS;
            this.total = res.data.total
            // console.log(res.data);
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
        this.productTypeSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.productTypeSearch()
      },
      handleSizeChanges(newsize) {
        this.sizes = newsize
        this.productSearch()
      },
      handleCurrentChanges(newpage) {
        this.pageNums = newpage
        this.productSearch()
      },
      // 搜索
      productTypeSearch() {
        let p1 = this.input3s
        // console.log(p1);
        // if (p1 != "") {
        this.$network.basic.product.productTypeList({
          pageNum: this.pageNum,
          size: this.size,
          name: p1 == "" ? null : p1
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.skuTypeVOS = res.data.skuTypeVOS;
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
            message: res.msg,
            type: "error"
          })
        })
        // } else {
        //   this.$notify({
        //     title: "失败",
        //     message: "查询内容不可以为空",
        //     type: "error"
        //   })
        // }
      },
      // 监听input框的变化
      productInputs(vla) {
        if (vla === "") {
          this.getProductTypeList()
        }
      },
      // 添加产品分类
      productTypeAddId() {
        this.dialogVisibles = true
      },
      productTypeAdd(ruleForms) {
        this.$refs[ruleForms].validate((valid) => {
          if (valid) {
            this.$network.basic.product.productTypeAdd({
              name: this.addPartners.name,
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加产品分类成功",
                  type: "success"
                })
                this.dialogVisibles = false
                this.$refs[ruleForms].resetFields();
                this.getProductTypeList()
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
      productTypeEdit(id) {
        this.dialogVisiblesEdit = true
        this.$network.basic.product.productTypeEdit(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.addPartnersEdit = res.data.skuTypeVO;
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
      productTypeAddEdit(ruleFormsEdit) {
        this.$refs[ruleFormsEdit].validate((valid) => {
          if (valid) {
            this.$network.basic.product.productTypeAddUpdate({
              id: this.addPartnersEdit.id,
              name: this.addPartnersEdit.name,
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑产品分类成功",
                  type: "success"
                })
                this.dialogVisiblesEdit = false
                this.$refs[ruleFormsEdit].resetFields();
                this.getProductTypeList()
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
      // 产品分类弹框回调
      addPartnerCloses() {},
      addPartnerClosesEdit() {},
      addPartnerClose() {
        this.$refs["ruleForm"].resetFields();
        this.addProduct = {
          skuInfos: []
        }
      },
      addPartnerCloseEdit() {
        this.$refs["ruleFormEdit"].resetFields();
        this.addProductEdit = {
          skuInfos: []
        }
      },
      // 产品分类删除
      productTypeDelete(id) {
        this.$confirm('此操作将删除产品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.basic.product.productTypeDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.skuTypeVOS.length === 1 && this.pageNum > 1) {
                this.pageNum--
              }
              this.getProductTypeList()
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
      // 获取产品列表
      getProductList() {
        this.$network.basic.product.productList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.categoryTypeVOS = res.data.categoryTypeVOS
            this.skuTypeVOSs = res.data.skuTypeVOS
            this.supplierVOS = res.data.supplierVOS
            this.skuVOS = res.data.skuVOS;
            let data = JSON.parse(JSON.stringify(res.data.skuTypeVOS))
            data.unshift({
              name: "全部"
            })
            let data1 = JSON.parse(JSON.stringify(res.data.supplierVOS))
            data1.unshift({
              name: "全部"
            })
            this.skuTypeVOSsCopy = data
            this.supplierVOSCopy = data1
            this.totals = res.data.total
            // console.log(res.data);
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
      // 开启添加产品弹框
      productAdd() {
        this.dialogVisible = true
      },
      // 添加产品
      productAddUser(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$network.basic.product.productAdd({
              code: this.addProduct.code,
              name: this.addProduct.name,
              skuTypeId: this.addProduct.skuTypeId,
              categoryId: this.addProduct.categoryId[1],
              remark: this.addProduct.remark,
              skuInfos: this.addProduct.skuInfos
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加产品成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getProductList()
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
      productInputss(vla) {
        if (vla === "") {
          this.getProductList()
        }
      },
      // 搜索
      productSearch() {
        let p1 = this.input3
        let p2 = this.input
        let p3 = this.select
        let p4 = this.select1
        // console.log(p1, p2);
        // if (p1 == "" && p2 == "" && p3 == "" && p4 == "") {
        //   this.$notify({
        //     title: "失败",
        //     message: "查询内容不可以为空",
        //     type: "error"
        //   })
        // } else {
        this.$network.basic.product.productList({
          pageNum: this.pageNums,
          size: this.sizes,
          code: p2 == '' ? null : p2,
          name: p1 == "" ? null : p1,
          skuType: p3 == undefined ? null : p3,
          supplier: p4 == undefined ? null : p4
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.skuVOS = res.data.skuVOS;
            this.totals = res.data.total
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

      },
      // 删除
      productDelete(id) {
        // console.log(id);
        this.$confirm('此操作将删除所绑定的货架, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.basic.product.productDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.skuVOS.length === 1 && this.pageNums > 1) {
                this.pageNums--
              }
              this.getProductList()
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
      // 编辑回显
      productEdits(id) {
        this.dialogVisibleEdit = true
        this.$network.basic.product.productId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            if (res.data.skuVO.skuTypeVO != null) {
              res.data.skuVO.skuTypeVO = res.data.skuVO.skuTypeVO.id
            }
            res.data.skuVO.categoryId = res.data.skuVO.selectedCategory
            this.addProductEdit = res.data.skuVO;
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
      productAddUserEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$network.basic.product.productAddUpdate({
              id: this.addProductEdit.id,
              code: this.addProductEdit.code,
              name: this.addProductEdit.name,
              skuTypeId: this.addProductEdit.skuTypeVO,
              categoryId: this.addProductEdit.selectedCategory[1],
              remark: this.addProductEdit.remark,
              skuInfos: this.addProductEdit.skuInfos
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑产品成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[ruleFormEdit].resetFields();
                this.getProductList()
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
      }
    },
    created() {
      this.getProductTypeList()
      this.getProductList()
    },

  }

</script>
<style lang="scss" scoped>
  .product {
    .product_card {
      display: flex;

      &_one {
        flex: 1;
        margin-right: 5px;
        height: 100%;

        .rolesexpand {
          div {
            margin-top: 5px;
          }
        }
      }

      &_two {
        flex: 1;
        margin-left: 5px;
        height: 100%;

      }
    }

    .input-with-input {
      width: 12%;
      margin-left: 55px;
    }

    .input-with-select {

      width: 25%;
      margin-left: 30px;

      /deep/ .el-input-group__prepend {
        background-color: #fff;
      }

      .el_select {
        width: 150px;
      }
    }
  }

</style>
