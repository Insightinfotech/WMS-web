<template>
  <div class="procurement">
    <h3>采购管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" @click="procurementAdd" style="marginBottom:15px">添加采购</el-button>
      <!--搜索 -->
      <el-input @input="procurementSearchInput" style="marginLeft:30px ;width:25%" clearable placeholder="请输入入库单号"
        v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option :label="item.value" v-for="(item,index) in statusList" :key="index" :value="index">
            {{item.value}}</el-option>
        </el-select>
        <el-button slot="append" @click="procurementSearch" icon="el-icon-search"></el-button>
      </el-input>
      <el-tab-pane label="采购管理" name="first">
        <el-card>
          <el-table :data="procurementData" border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="编号">
              <template slot-scope="scope">
                <el-button size="mini" type="text">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经办人" width="120">
              <template slot-scope="scope">
                <el-button size="mini" type="text">{{scope.row.gestore}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="采购单明细" width="120">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看和编辑明细" placement="left">
                  <el-button @click="procurementRuku(scope.row.id)" type="primary" size="mini" icon="el-icon-s-grid">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="入库状态" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 1">初始录入</el-tag>
                <el-tag size="small" type="warning" v-else-if="scope.row.status == 2">审核中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                <el-tag size="small" type="success" v-else-if="scope.row.status == 4">审核通过</el-tag>
                <el-tag size="small" type="info" v-else-if="scope.row.status == 5">采购中</el-tag>
                <el-tag size="small" v-else>完成</el-tag>
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
            <el-table-column align="center" label="操作" width="250">
              <template slot-scope="scope">
                <!-- {{scope.row.count}} -->
                <!-- <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==5" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定此采购订单入库?"
                  @onConfirm="procurementShenHeRuku(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库" placement="left">
                    <el-button type="text" icon="el-icon-s-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm> -->
                <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==5" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定此采购订单采购?"
                  @onConfirm="procurementShenHeRukusheng(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="采购入库" placement="left">
                    <el-button type="text" icon="el-icon-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定此采购订单通过审核吗?" v-if="scope.row.status==2" @onConfirm="procurementShenHeTong(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="审核通过" placement="left">
                    <el-button type="text" icon="el-icon-success" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip v-if="scope.row.status==2" class="item" effect="dark" content="审核驳回" placement="left">
                  <el-button type="text" icon="el-icon-error" size="medium" @click="procurementBohui(scope.row.id)"
                    style="marginRight:5px">
                  </el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定提交采购订单进行审核吗?" v-if="scope.row.status == 3 ||  scope.row.status == 1"
                  @onConfirm="procurementShenHe(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="采购单审核" placement="left">
                    <el-button type="info" style="marginRight:5px" icon="el-icon-s-order" size="mini">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="procurementEdit(scope.row.id)">
                  </el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
                  title="确定删除采购订单吗？" @onConfirm="procurementDelete(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="删除"
                    v-if="scope.row.status == 6? false :true " placement="right">
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
    <el-dialog title="添加采购单" :visible.sync="dialogVisible" @close="dialogVisibleOff" width="20%">
      <!-- 添加表单 -->
      <el-form :model="ruleForm" ref="formName" label-width="90px" class="demo-ruleForm">
        <el-form-item label="采购编码" prop="code">
          <el-input disabled v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="经办人" :rules="[
      { required: true, message: '请输入经办人', trigger: ['blur','change'] },
      {  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]"
          prop="gestore">
          <el-input v-model="ruleForm.gestore"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="procurementAddUser('formName')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑采购单" :visible.sync="dialogVisibleEdit" @close="dialogVisibleOffEdit" width="20%">
      <!-- 添加表单 -->
      <el-form :model="ruleFormEdit" ref="formNameEdit" label-width="90px" class="demo-ruleForm">
        <el-form-item label="采购编码" prop="code">
          <el-input disabled v-model="ruleFormEdit.code"></el-input>
        </el-form-item>
        <el-form-item label="经办人" :rules="[
      { required: true, message: '请输入经办人', trigger: ['blur','change'] },
      {  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]"
          prop="gestore">
          <el-input v-model="ruleFormEdit.gestore"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleFormEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="procurementAddUserEdit('formNameEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 采购单明细弹框 -->
    <el-dialog :title="'入库单明细'+ruleFormEditRuku.code" :visible.sync="dialogVisibleRuku" width="60%"
      @close="dialogVisibleRuke">
      <el-button size="mini" type="primary" style="marginBottom:10px" @click="procurementAddkuqu"
        :disabled="ruleFormEditRuku.status == 2  ? true: ruleFormEditRuku.status == 4?true :ruleFormEditRuku.status == 5?true:false">
        添加</el-button>
      <el-button size="mini" type="primary" style="marginBottom:10px" @click="procurementAddkuqusm"
        :disabled="ruleFormEditRuku.status == 2  ? true: ruleFormEditRuku.status == 4?true :ruleFormEditRuku.status == 5?true:false">
        扫码添加</el-button>
      <el-card>
        <el-table :data="purchaseDetailVOS" border style="width: 100%">
          <el-table-column type="index" align="center" label="#">
          </el-table-column>
          <el-table-column prop="sku" align="center" label="产品名称">
            <template slot-scope="scope">
              <el-button size="mini" type="text">{{scope.row.sku}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="company" align="center" label="产品供应商">
            <template slot-scope="scope">
              <el-button size="mini" type="text">{{scope.row.company}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="price" align="center" label="产品价格">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">{{scope.row.price}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="category" align="center" label="产品单位">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">{{scope.row.category}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="estimatedQuantity" align="center" label="计划数量">
            <template slot-scope="scope">
              <el-tag type="warning" size="mini">{{scope.row.estimatedQuantity}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="currentQuantity" align="center" label="已到数量">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.currentQuantity}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                <el-button type="primary" :disabled="statusSku==2?true:statusSku==4?true:statusSku==5?true :false"
                  icon="el-icon-edit" size="mini" @click="procurementSkuEdit(scope.row.id)">
                </el-button>
              </el-tooltip>
              <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
                title="确定删除采购订单吗？" @onConfirm="procurementSkuDelete(scope.row.id)">
                <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="right">
                  <el-button icon="el-icon-delete" style="marginLeft:5px"
                    :disabled="statusSku==2?true:statusSku==4?true:statusSku==5?true :false" type="danger" size="mini">
                  </el-button>
                </el-tooltip>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <!-- 添加采购入库弹框 -->
    <el-dialog title="添加采购产品" :visible.sync="dialogVisibleAddkuqu" width="20%" @close="dialogVisibleAddkuquClose">
      <el-form :model="ruleFormSku" ref="ruleFormSku" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品" prop="companyId" :rules="[{
            required: true,
            message: '请选择产品',
            trigger: ['blur','change']
          }]">
          <el-cascader @change="cascaderSku" v-model="ruleFormSku.companyId" placeholder="请选择产品" :options="companyVOS"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="价格" prop="price" style="width:60%">
          <el-input disabled v-model="arrSku.price"></el-input>
        </el-form-item>
        <el-form-item label="字典单位" prop="price" style="width:80%">
          <el-input disabled v-model="arrSku.name"></el-input>
        </el-form-item>
        <el-form-item label="预计数量" prop="estimatedQuantity" style="width:50%" :rules="[{
              required: true,
              message: '请输入数量',
              trigger: ['blur','change']
            },
            {
              pattern: /^[1-9]*[1-9][0-9]*$/,
              message: '请輸入正确的数量',
              trigger: ['blur','change']
            }]">
          <el-input v-model="ruleFormSku.estimatedQuantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddkuqu = false">取 消</el-button>
        <el-button type="primary" @click="procurementRukuSku('ruleFormSku')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑采购弹框 -->
    <el-dialog title="添加采购产品" :visible.sync="dialogVisibleAddkuquEdit" width="25%"
      @close="dialogVisibleAddkuquCloseEdit">
      <el-form :model="purchaseDetailVOSku" ref="ruleFormSkuEdit" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品" prop="selectedSku" :rules="[{
            required: true,
            message: '请选择产品',
            trigger: ['blur','change']
          }]">
          <el-cascader @change="cascaderSku" v-model="purchaseDetailVOSku.selectedSku" placeholder="请选择产品"
            :options="companyVOS" :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input disabled v-model="arrSku.price"></el-input>
        </el-form-item>
        <el-form-item label="字典单位" prop="price">
          <el-input disabled v-model="arrSku.name"></el-input>
        </el-form-item>
        <el-form-item label="预计数量" prop="estimatedQuantity" :rules="[{
              required: true,
              message: '请输入数量',
              trigger: ['blur','change']
            },
            {
              pattern: /^[1-9]*[1-9][0-9]*$/,
              message: '请輸入正确的数量',
              trigger: ['blur','change']
            }]">
          <el-input v-model="purchaseDetailVOSku.estimatedQuantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddkuquEdit = false">取 消</el-button>
        <el-button type="primary" @click="procurementRukuSkuEdit('ruleFormSkuEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提交审核驳回弹框 -->
    <el-dialog title="请填写驳回理由" :visible.sync="dialogVisibleBohui" width="20%" @close="dialogVisibleBohuiq">
      <el-form :model="ruleFormBohui" ref="ruleFormBohui" label-width="100px" class="demo-ruleForm">
        <el-form-item label="驳回理由" prop="overruledRemark" :rules="[{
            required: true,
            message: '请输入内容',
            trigger: ['blur','change']
          }]">
          <el-input type="textarea" v-model="ruleFormBohui.overruledRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Bohuiq('ruleFormBohui')">提交驳回理由</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 扫码添加 -->
    <el-dialog title="扫码添加采购产品" :visible.sync="dialogVisibleAddkuqusm" width="20%" @close="dialogVisibleAddkuquClosesm">
      <el-form :model="ruleFormSkusm" ref="ruleFormSkusm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品编号" style="width:80%">
          <el-input clearable v-model="ruleFormSkusm.name" @change="valuesm"></el-input>
        </el-form-item>
        <el-form-item label="产品" style="width:80%">
          <el-input disabled v-model="skuVOData.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格" style="width:60%">
          <el-input disabled v-model="skuVOData.price"></el-input>
        </el-form-item>
        <el-form-item label="字典单位" style="width:80%">
          <el-input disabled v-model="skuVOData.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="预计数量" prop="estimatedQuantity" style="width:50%"  :rules="[{
              required: true,
              message: '请输入数量',
              trigger: ['blur','change']
            },
            {
              pattern: /^[1-9]*[1-9][0-9]*$/,
              message: '请輸入正确的数量',
              trigger: ['blur','change']
            }]">
          <el-input v-model="ruleFormSkusm.estimatedQuantity" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddkuqusm = false">取 消</el-button>
        <el-button type="primary" @click="procurementRukuSkusm('ruleFormSkusm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    convertKey,
    randomNumber
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        activeName: "first",
        select: "",
        input3: "",
        pageNum: 1,
        size: 10,
        total: 0,
        procurementData: [],
        statusList: [],
        dialogVisible: false,
        dialogVisibleEdit: false,
        dialogVisibleRuku: false,
        dialogVisibleAddkuqu: false,
        dialogVisibleAddkuquEdit: false,
        dialogVisibleBohui: false,
        dialogVisibleAddkuqusm: false,
        ruleForm: {
          code: "",
          gestore: "",
          remark: ""
        },
        ruleFormEdit: {},
        ruleFormEditRuku: {},
        companyVOS: [],
        purchaseDetailVOS: [],
        statusSku: "",
        ruleFormSku: {
          purchaseId: "",
          // skuId: "",
          companyId: "",
          price: "",
          estimatedQuantity: ""
        },
        props: {
          expandTrigger: "click",
          label: "name",
          children: "skuVOS",
          value: "id"
        },
        rukuXiangQingId: "",
        arrSku: {},
        purchaseDetailVOSku: {},
        ruleFormBohui: {
          overruledRemark: ""
        },
        bohuiID: "",
        ruleFormSkusm: {},
        skuVOData: {}
      }
    },
    methods: {
      // 获取列表
      getProcurementList() {
        this.$network.putwarehouse.procurement.procurementList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.procurementData = res.data.purchaseVOS
            this.total = res.data.total
            var datas = JSON.parse(JSON.stringify(res.data.statusList))
            var data1 = convertKey(datas, ["value"])
            data1.unshift({
              value: "全部类型"
            })
            this.statusList = data1
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
        this.procurementSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.procurementSearch()
      },
      procurementSearchInput(val) {
        if (val == "") {
          this.procurementSearch()
        }
      },
      // 搜索
      procurementSearch() {
        this.$network.putwarehouse.procurement.procurementList({
          pageNum: this.pageNum,
          size: this.size,
          code: this.input3,
          status: this.select == 0 ? null : this.select
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.procurementData = res.data.purchaseVOS
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
      // 点击添加  开启弹框
      procurementAdd() {
        this.dialogVisible = true
        let code = randomNumber()
        this.ruleForm.code = code
      },
      //弹窗关闭回调
      dialogVisibleOff() {
        this.$refs["formName"].resetFields();
      },
      // 添加
      procurementAddUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementAdd({
              code: this.ruleForm.code,
              gestore: this.ruleForm.gestore,
              remark: this.ruleForm.remark
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加采购单成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[formName].resetFields();
                this.getProcurementList()
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
        });
      },
      // 点击扫码添加
      procurementAddkuqusm() {
        this.dialogVisibleAddkuqusm = true
      },
      // 关闭扫码弹框
      dialogVisibleAddkuquClosesm() {
        this.skuVOData = {}
        this.ruleFormSkusm = {}
        this.$refs["ruleFormSkusm"].resetFields()
      },
      // 扫码获取产品
      valuesm(val) {
        // console.log(val);
        if (val != "") {
          this.$network.putwarehouse.gostorage.gostorageDetailEditIdSm({
            code: val
          }).then(res => {
            console.log(res);
            if (res.code === 0) {
              // console.log(res);
              this.skuVOData = res.data.skuInfoVO
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
      // 扫码添加
      procurementRukuSkusm(ruleFormSkusm) {
        this.$refs[ruleFormSkusm].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementSkuAdd({
              purchaseId: this.rukuXiangQingId,
              skuId: this.skuVOData.skuId,
              companyId: this.skuVOData.supplierId,
              price: this.skuVOData.price,
              categoryId: this.skuVOData.categoryId,
              estimatedQuantity: this.ruleFormSkusm.estimatedQuantity
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加采购产品成功",
                  type: "success"
                })
                this.dialogVisibleAddkuqusm = false
                this.$refs[ruleFormSkusm].resetFields();
                this.procurementKuQuLists(this.rukuXiangQingId)
                this.getProcurementList()
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
        });
      },
      dialogVisibleOffEdit() {
        this.$refs["formNameEdit"].resetFields();
      },
      // 点击回显
      procurementEdit(id) {
        // console.log(id);
        this.dialogVisibleEdit = true
        this.$network.putwarehouse.procurement.procurementEditId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.ruleFormEdit = res.data.purchaseVO
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
      procurementAddUserEdit(formNameEdit) {
        this.$refs[formNameEdit].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementEdit({
              id: this.ruleFormEdit.id,
              code: this.ruleFormEdit.code,
              gestore: this.ruleFormEdit.gestore,
              remark: this.ruleFormEdit.remark
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑采购单成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[formNameEdit].resetFields();
                this.getProcurementList()
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
        });
      },
      // 删除采购订单
      procurementDelete(id) {
        // console.log(id);
        this.$network.putwarehouse.procurement.procurementDelete(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            if (this.procurementData.length === 1 && this.pageNum > 1) {
              this.pageNum--
            }
            this.getProcurementList()
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
      // 查看入库明细
      procurementRuku(id) {
        this.rukuXiangQingId = id
        this.dialogVisibleRuku = true
        this.$network.putwarehouse.procurement.procurementEditId(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.ruleFormEditRuku = res.data.purchaseVO
            this.statusSku = res.data.purchaseVO.status
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
        this.procurementKuQuLists(id)
      },
      // 入库详情列表
      procurementKuQuLists(id) {
        // console.log(id);
        this.$network.putwarehouse.procurement.procurementKuQuList(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.companyVOS = res.data.companyVOS
            this.purchaseDetailVOS = res.data.purchaseDetailVOS
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
      dialogVisibleRuke() {
        this.statusSku = ""
        this.rukuXiangQingId = ""
      },
      // 入库明细弹框
      procurementAddkuqu() {
        // console.log(id);
        this.dialogVisibleAddkuqu = true
      },
      // 添加采购产品关闭弹框回调
      dialogVisibleAddkuquClose() {
        this.$refs["ruleFormSku"].resetFields();
        this.arrSku = {}
      },
      // 入库明细 产品添加
      procurementRukuSku(ruleFormSku) {
        this.$refs[ruleFormSku].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementSkuAdd({
              purchaseId: this.rukuXiangQingId,
              skuId: this.ruleFormSku.companyId[1],
              companyId: this.ruleFormSku.companyId[0],
              price: this.arrSku.price,
              categoryId: this.arrSku.id,
              estimatedQuantity: this.ruleFormSku.estimatedQuantity
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加采购产品成功",
                  type: "success"
                })
                this.dialogVisibleAddkuqu = false
                this.$refs[ruleFormSku].resetFields();
                this.procurementKuQuLists(this.rukuXiangQingId)
                this.getProcurementList()
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
        });
      },
      cascaderSku(val) {
        let p1 = val[0]
        let p2 = val[1]
        let datas = JSON.parse(JSON.stringify(this.companyVOS))
        var arr = {}
        datas.filter(v => {
          if (v.id == p1) {
            v.skuVOS.filter(v1 => {
              if (v1.id == p2) {
                arr.id = v1.categoryVO.id
                arr.name = v1.categoryVO.name
                arr.price = v1.skuInfos[0].price
                // console.log(v1);
              }
            })
          }

        })
        this.arrSku = arr
      },
      dialogVisibleAddkuquCloseEdit() {
        this.arrSku = {}
      },
      // 采购单明细编辑回显
      procurementSkuEdit(id) {
        this.dialogVisibleAddkuquEdit = true
        this.$network.putwarehouse.procurement.procurementDeleteSkuEditId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            let p1 = res.data.purchaseDetailVO.selectedSku[0]
            let p2 = res.data.purchaseDetailVO.selectedSku[1]
            let datas = JSON.parse(JSON.stringify(this.companyVOS))
            var arr = {}
            datas.filter(v => {
              if (v.id == p1) {
                v.skuVOS.filter(v1 => {
                  if (v1.id == p2) {
                    arr.id = v1.categoryVO.id
                    arr.name = v1.categoryVO.name
                    arr.price = v1.skuInfos[0].price
                  }
                })
              }

            })
            this.arrSku = arr
            // console.log(datas);
            this.purchaseDetailVOSku = res.data.purchaseDetailVO

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
      //采购明细编辑添加 
      procurementRukuSkuEdit(ruleFormSkuEdit) {
        this.$refs[ruleFormSkuEdit].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementSkuAddUpdate({
              id: this.purchaseDetailVOSku.id,
              purchaseId: this.rukuXiangQingId,
              skuId: this.purchaseDetailVOSku.selectedSku[1],
              companyId: this.purchaseDetailVOSku.selectedSku[0],
              price: this.arrSku.price,
              categoryId: this.arrSku.id,
              estimatedQuantity: this.purchaseDetailVOSku.estimatedQuantity
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑采购产品成功",
                  type: "success"
                })
                this.dialogVisibleAddkuquEdit = false
                this.$refs[ruleFormSkuEdit].resetFields();
                this.procurementKuQuLists(this.rukuXiangQingId)
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
        });
      },
      // 采购单明细删除
      procurementSkuDelete(id) {
        this.$network.putwarehouse.procurement.procurementDeleteSku(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            this.procurementKuQuLists(this.rukuXiangQingId)
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
      // 采购单审核
      procurementShenHe(id) {
        // console.log(id);
        this.$network.putwarehouse.procurement.procurementUpdateStatus({
          id: id,
          status: 2,
          overruledRemark: ""
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getProcurementList()
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
      // 通过审核
      procurementShenHeTong(id) {
        // console.log(id);
        this.$network.putwarehouse.procurement.procurementUpdateStatus({
          id: id,
          status: 4,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "通过审核成功",
              type: "success"
            })
            this.getProcurementList()
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
      //  审核中
      procurementShenHeRukusheng(id) {
        this.$network.putwarehouse.procurement.procurementUpdateStatus({
          id: id,
          status: 6,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "采购成功",
              type: "success"
            })
            this.getProcurementList()
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

      // 入库
      // procurementShenHeRuku(id) {
      //   this.$network.putwarehouse.procurement.procurementUpdateStatus({
      //     id: id,
      //     status: 6,
      //     overruledRemark: ""
      //   }).then(res => {
      //     console.log(res);
      //     if (res.code === 0) {
      //       this.$notify({
      //         title: "入库成功",
      //         type: "success"
      //       })
      //       this.getProcurementList()
      //     } else {
      //       this.$notify({
      //         title: "失败",
      //         message: res.msg,
      //         type: "error"
      //       })
      //     }
      //   }).catch(err => {
      //     this.$notify({
      //       title: "失败",
      //       message: err,
      //       type: "error"
      //     })
      //   })
      // },
      dialogVisibleBohuiq() {
        this.$refs["ruleFormBohui"].resetFields();
        this.bohuiID = ""
      },
      // 订单驳回理由
      procurementBohui(id) {
        this.bohuiID = id
        this.dialogVisibleBohui = true
      },
      Bohuiq(ruleFormBohui) {
        this.$refs[ruleFormBohui].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.procurement.procurementUpdateStatus({
              id: this.bohuiID,
              status: 3,
              overruledRemark: this.ruleFormBohui.overruledRemark
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "驳回成功",
                  type: "success"
                })

                this.getProcurementList()
                this.dialogVisibleBohui = false

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
      this.getProcurementList()
    },
  }

</script>
<style lang="scss" scoped>
  .procurement {
    .el-select {
      width: 130px;
    }
  }

</style>
