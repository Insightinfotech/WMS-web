<template>
  <div>
    <h3>入库管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" @click="gostorageAdd" style="marginBottom:15px">添加入库单</el-button>
      <!--搜索 -->
      <el-select style="marginLeft:30px" v-model="input1" placeholder="请选择类型">
        <el-option v-for="(item,index) in typeListCopy" :key="index" :label="item.value" :value="index">
        </el-option>
      </el-select>
      <el-select v-model="input2" style="marginLeft:30px " placeholder="请选择状态">
        <el-option v-for="(item,index) in statusList" :key="index" :label="item.value" :value="index">
        </el-option>
      </el-select>
      <el-input style="marginLeft:30px ;width:20%" placeholder="请输入入库单号" @input="clearableVal" clearable
        v-model="input3" class="input-with-select">
        <el-button slot="append" @click="GostorageSearch" icon="el-icon-search"></el-button>
      </el-input>
      <el-tab-pane label="入库列表" name="first">
        <el-card>
          <el-table :data="gostorageData" border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="rolesexpand">
                  <div>
                    <el-tag size="mini" type="info">入库编号</el-tag> {{scope.row.code}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">经办人</el-tag> {{scope.row.gestore}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">入库单id</el-tag> {{scope.row.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">工具人</el-tag> {{scope.row.lastOperationUser}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">采购单编号</el-tag> {{scope.row.purchaseCode}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">备注</el-tag> {{scope.row.remark==null ? "" :scope.row.remark}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">驳回理由</el-tag>
                    {{scope.row.overruledRemark ==null? '':scope.row.overruledRemark}}
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
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="入库编号" prop="code">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="采购单号" prop="purchaseCode">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.purchaseCode}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="负责人" prop="gestore" width="100">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.gestore}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" prop="lastOperationUser" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情" prop="code" width="80">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看和编辑明细" placement="left">
                  <el-button @click="stockInDetail(scope.row.id)" type="primary" size="mini" icon="el-icon-s-grid">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="类型" prop="type" width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.type==1" type="success">采购入库</el-tag>
                <el-tag size="small" v-else-if="scope.row.type==2" type="info">退货入库</el-tag>
                <el-tag size="small" v-else type="warning">其他入库</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="status" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 1">初始录入</el-tag>
                <el-tag size="small" type="warning" v-else-if="scope.row.status == 2">审核中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                <!-- <el-tag size="small" type="success" v-else-if="scope.row.status == 4">已审核</el-tag> -->
                <el-tag size="small" type="info" v-else-if="scope.row.status == 4">入库中</el-tag>
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
            <el-table-column align="center" label="操作" width="230">
              <template slot-scope="scope">
                <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==4" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定订单入库?"
                  @onConfirm="procurementShenHeRukusheng(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库" placement="left">
                    <el-button type="text" icon="el-icon-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <!-- <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==5" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定订单入库?"
                  @onConfirm="procurementShenHeRuku(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库" placement="left">
                    <el-button type="text" icon="el-icon-s-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm> -->
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
                  title="确定提交采购订单进行审核吗?" v-if="scope.row.status == 3 || scope.row.count!==null && scope.row.status == 1"
                  @onConfirm="procurementShenHe(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库单审核" placement="left">
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
                    v-if="scope.row.status == 5? false :true " placement="right">
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
    <el-dialog :title="ids == '' ? '添加入库单':'修改入库单'" :visible.sync="dialogVisible" @close="gostorageClose" width="23%">
      <el-form :model=" ids ==''?ruleForm:stockInVO" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item v-if="ids ==''" label="采购单号" prop="purchaseCode">
          <el-select v-model="ruleForm.purchaseCode" placeholder="选择状态为入库中的">
            <el-option v-for="item in purchaseVOList" :key="item.id" :label="item.code" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="采购单号" prop="purchaseCode">
          <el-select v-model="stockInVO.purchaseCode" placeholder="选择状态为入库中的">
            <el-option v-for="item in purchaseVOList" :key="item.id" :label="item.code" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ids ==''" label="入库单号" prop="code">
          <el-input disabled v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item v-else label="入库单号" prop="code">
          <el-input disabled v-model="stockInVO.code"></el-input>
        </el-form-item>

        <el-form-item v-if="ids ==''" label="入库类型" prop="type"
          :rules="[ { required: true, message: '请选择采购单号', trigger: ['blur','change'] }]">
          <el-select v-model="ruleForm.type" placeholder="选择入库类型">
            <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="入库类型" prop="type"
          :rules="[ { required: true, message: '请选择采购单号', trigger: ['blur','change'] }]">
          <el-select v-model="stockInVO.type" placeholder="选择入库类型">
            <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ids ==''" label="经办人" prop="gestore" :rules="[
      { required: true, message: '请输入经办人', trigger: ['blur','change'] },
      {  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]">
          <el-input v-model="ruleForm.gestore"></el-input>
        </el-form-item>
        <el-form-item v-else label="经办人" prop="gestore" :rules="[
      { required: true, message: '请输入经办人', trigger: ['blur','change'] },
      {  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]">
          <el-input v-model="stockInVO.gestore"></el-input>
        </el-form-item>
        <el-form-item v-if="ids ==''" label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item v-else label="备注" prop="remark">
          <el-input type="textarea" v-model="stockInVO.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="gostorageAddDate('ruleForm')">确 定</el-button>
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
    <!-- 入库详情 -->
    <el-dialog :title="'入库详情'+ (stockInVOSCode == ''? '': stockInVOSCode)" :visible.sync="dialogVisibleStockInDetail"
      width="70%" @close="dialogVisibleStockInDetailClose">
      <el-button :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :false"
        type="primary" size="mini" style="marginBottom:10px" @click="stockInDetailAdd">添加</el-button>
      <el-card>
        <el-table :data="stockInDetailVOS" border style="width: 100%">
          <el-table-column align="center" label="产品/数量">
            <template slot-scope="scope">
              {{scope.row.sku}}/{{scope.row.quantity}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="供应商">
            <template slot-scope="scope">
              {{scope.row.company}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="单位">
            <template slot-scope="scope">
              {{scope.row.category}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在仓库/建议厂库">
            <template slot-scope="scope">
              {{scope.row.warehouse}}/{{scope.row.adviseWarehouse==null?"无":scope.row.adviseWarehouse}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在库区/建议库区">
            <template slot-scope="scope">
              {{scope.row.reservoir}}/{{scope.row.adviseReservoir==null?"无":scope.row.adviseReservoir}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在货架/建议货架">
            <template slot-scope="scope">
              {{scope.row.shelves}}/{{scope.row.adviseShelves==null?"无":scope.row.adviseShelves}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在层数/建议层数">
            <template slot-scope="scope">
              {{scope.row.layer}}/{{scope.row.adviseLayer==null?"无":scope.row.adviseLayer}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                <el-button :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :false"
                  type="primary" icon="el-icon-edit" size="mini" @click="procurementSkuEdit(scope.row.id)">
                </el-button>
              </el-tooltip>
              <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
                title="确定删除采购订单吗？" @onConfirm="procurementSkuDelete(scope.row.id)">
                <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="right">
                  <el-button :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :false"
                    icon="el-icon-delete" style="marginLeft:5px" type="danger" size="mini">
                  </el-button>
                </el-tooltip>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <!-- 添加产品和编辑 -->
    <el-dialog :title="SkuEditId==''?'添加':'编辑'" :visible.sync="dialogVisibleDetail" width="25%"
      @close="dialogVisibleDetailClose">
      <el-form :model="SkuEditId==''? detailAdd :stockInDetailVO" ref="ruleFormDetail" label-width="100px"
        class="demo-ruleForm">
        <el-form-item v-if="SkuEditId==''" label="选择产品" prop="skuVOSId">
          <el-cascader v-model="detailAdd.skuVOSId" style="width:220px" :options="skuVOS" @change="skuVOSChange"
            :props="skuVOSprops"></el-cascader>
        </el-form-item>
        <el-form-item v-else label="选择产品" prop="skuVOSId">
          <el-cascader v-model="stockInDetailVO.selectedSku" style="width:220px" :options="skuVOS"
            @change="skuVOSChange" :props="skuVOSprops"></el-cascader>
        </el-form-item>
        <el-form-item label="产品单位" prop="name">
          <el-input style="width:100px" disabled v-model="arrs.name"></el-input>
        </el-form-item>

        <el-form-item v-if="SkuEditId==''" label="选择仓库" prop="skuVOSIds">
          <el-cascader v-model="detailAdd.skuVOSIds" style="width:280px" :options="warehouseVOS"
            @change="skuVOSIdsChange" :props="warehouseVOSprops">
          </el-cascader>
        </el-form-item>
        <el-form-item v-else label="选择仓库" prop="selectedShelves">
          <el-cascader v-model="stockInDetailVO.selectedShelves" style="width:280px" :options="warehouseVOS"
            @change="skuVOSIdsChange" :props="warehouseVOSprops">
          </el-cascader>
        </el-form-item>

        <el-form-item v-if="SkuEditId==''" label="选择层数" prop="valueceng">
          <el-select v-model="detailAdd.valueceng" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in arrlayer" :key="index" :label="index + 1 + '层'" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="选择层数" prop="valueceng">
          <el-select v-model="stockInDetailVO.layer" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in arrlayer" :key="index" :label="index + 1 + '层'" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="SkuEditId==''" label="产品数量" prop="quantity"
          :rules="[{pattern: /^[0-9]*$/, message: '请输入正确的数量', trigger: ['blur', 'change']}]">
          <el-input style="width:120px" v-model="detailAdd.quantity"></el-input>
        </el-form-item>

        <el-form-item v-else label="产品数量" prop="quantity"
          :rules="[{pattern: /^[0-9]*$/, message: '请输入正确的数量', trigger: ['blur', 'change']}]">
          <el-input style="width:120px" v-model="stockInDetailVO.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDetail = false">取 消</el-button>
        <el-button type="primary" @click="detailAddSkus('ruleFormDetail')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    convertKey,
    randomNumberCase,
    typeList,
    typeListAsd
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        input3: "",
        input1: "",
        input2: "",
        activeName: "first",
        pageNum: 1,
        size: 10,
        total: 0,
        gostorageData: [],
        statusList: [],
        typeList: [],
        typeListCopy: [],
        purchaseVOList: [],
        dialogVisible: false,
        dialogVisibleBohui: false,
        dialogVisibleStockInDetail: false,
        dialogVisibleDetail: false,
        ids: "",
        ruleForm: {},
        ruleFormBohui: {},
        stockInVO: {},
        stockInDetailVOS: [],
        skuVOS: [],
        warehouseVOS: [],
        StockInDetailId: '',
        stockInVOStatus: "",
        stockInVOSCode: "",
        skuVOSprops: {
          value: "id",
          label: "name",
          children: "skuVOS"
        },
        warehouseVOSprops: {
          value: "id",
          label: "name",
          children: "reservoirVOS"
        },
        arrs: {},
        detailAdd: {
          skuVOSId: [],
          skuVOSIds: [],
          valueceng: "",
          quantity: ""
        },
        arrlayer: "",
        SkuEditId: "",
        stockInDetailVO: {}
      }
    },
    methods: {
      // 获取入库列表
      getGostorageList() {
        this.$network.putwarehouse.gostorage.gostorageList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.purchaseVOList = res.data.purchaseVOList
            this.gostorageData = res.data.stockInVOS
            this.total = res.data.total

            var data3 = JSON.parse(JSON.stringify(res.data.typeList))
            var data5 = convertKey(data3, ["value"])
            this.typeList = data5
            var datas = JSON.parse(JSON.stringify(res.data.statusList))
            var data1 = convertKey(datas, ["value"])
            data1.unshift({
              value: "全部类型"
            })
            var dataw = JSON.parse(JSON.stringify(res.data.typeList))
            var data2 = convertKey(dataw, ["value"])
            data2.unshift({
              value: "全部类型"
            })

            this.statusList = data1
            this.typeListCopy = data2
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
      // 点击开启添加弹框
      gostorageAdd() {
        this.dialogVisible = true
        let code = randomNumberCase()
        // console.log(code);
        this.ruleForm.code = code
      },
      // 添加弹框的  关闭弹框回调
      gostorageClose() {
        // console.log(1);
        this.ids = ""
        this.$refs["ruleForm"].resetFields();
      },
      // 开启编辑
      gostorageEdit() {
        this.ids = 1
        this.dialogVisible = true
      },
      // 添加和编辑
      gostorageAddDate(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (this.ids == "") {
              this.$network.putwarehouse.gostorage.gostorageAddList({
                purchaseCode: this.ruleForm.purchaseCode,
                code: this.ruleForm.code,
                type: typeList(this.ruleForm.type),
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
                  this.$refs[ruleForm].resetFields();
                  this.getGostorageList()
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
              this.$network.putwarehouse.gostorage.gostorageAddListEdit({
                id: this.stockInVO.id,
                purchaseCode: this.stockInVO.purchaseCode,
                code: this.stockInVO.code,
                type: typeList(this.stockInVO.type),
                gestore: this.stockInVO.gestore,
                remark: this.stockInVO.remark
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改采购单成功",
                    type: "success"
                  })
                  this.dialogVisible = false
                  this.$refs[ruleForm].resetFields();
                  this.getGostorageList()
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
        });
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize
        this.GostorageSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.GostorageSearch()
      },
      // 编辑
      procurementEdit(id) {
        // console.log(id);
        this.dialogVisible = true
        this.ids = id
        this.$network.putwarehouse.gostorage.gostorageEditId(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            res.data.stockInVO.type = typeListAsd(res.data.stockInVO.type)
            this.stockInVO = res.data.stockInVO
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
      // 删除
      procurementDelete(id) {
        this.$network.putwarehouse.gostorage.gostorageDelete(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            if (this.gostorageData.length === 1 && this.pageNum > 1) {
              this.pageNum--
            }
            this.getGostorageList()
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

      // 入库单审核
      procurementShenHe(id) {
        // console.log(id);
        this.$network.putwarehouse.gostorage.gostorageUpdateStatus({
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
            this.getGostorageList()
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
        this.$network.putwarehouse.gostorage.gostorageUpdateStatus({
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
            this.getGostorageList()
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
      procurementShenHeRukusheng(id){
        this.$network.putwarehouse.gostorage.gostorageUpdateStatus({
          id: id,
          status: 5,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "审核成功",
              type: "success"
            })
            this.getGostorageList()
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
      //   this.$network.putwarehouse.gostorage.gostorageUpdateStatus({
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
      //       this.getGostorageList()
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
      // 订单驳回
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
            this.$network.putwarehouse.gostorage.gostorageUpdateStatus({
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

                this.getGostorageList()
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
      },
      // 搜索
      clearableVal(val) {
        if (val == "") {
          this.GostorageSearch()
        }
      },
      GostorageSearch() {
        // if (this.input3 === "" && this.input2 === "" && this.input1 === "") {
        //   this.$notify({
        //     title: '请输入或者选择数据进行搜索',
        //     type: "error"
        //   })
        // } else {
          this.$network.putwarehouse.gostorage.gostorageList({
            pageNum: this.pageNum,
            size: this.size,
            code: this.input3,
            type: this.input1 == 0 ? null : this.input1,
            status: this.input2 == 0 ? null : this.input2
          }).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.gostorageData = res.data.stockInVOS
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
        // }
      },
      // 查看详情按钮
      stockInDetail(id) {
        // console.log(id);
        this.StockInDetailId = id
        this.dialogVisibleStockInDetail = true
        this.getStatus(id)
        this.$network.putwarehouse.gostorage.gostoragekinId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockInDetailVOS = res.data.stockInDetailVOS
            this.skuVOS = res.data.skuVOS

            this.warehouseVOS = res.data.warehouseVOS
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
      dialogVisibleStockInDetailClose() {
        this.StockInDetailId = ""
        this.stockInVOStatus = ""
        this.stockInVOSCode = ""
        // console.log(1);
      },
      // 查看状态
      getStatus(id) {
        this.$network.putwarehouse.gostorage.gostorageEditId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockInVOSCode = res.data.stockInVO.code
            this.stockInVOStatus = res.data.stockInVO.status
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
      // 添加
      stockInDetailAdd() {
        this.dialogVisibleDetail = true
      },
      dialogVisibleDetailClose() {
        this.arrs = {}
        this.arrlayer = ""
        this.SkuEditId = ""
        // this.stockInDetailVO = {}
        this.$refs['ruleFormDetail'].resetFields()
      },
      // 添加
      detailAddSkus(ruleFormDetail) {
        this.$refs[ruleFormDetail].validate((valid) => {
          if (valid) {
            if (this.SkuEditId == '') {
              this.$network.putwarehouse.gostorage.stockInDetailAdd({
                stockInId: this.StockInDetailId,
                skuId: this.detailAdd.skuVOSId[1],
                companyId: this.detailAdd.skuVOSId[0],
                categoryId: this.arrs.id,
                warehouseId: this.detailAdd.skuVOSIds[0],
                reservoirId: this.detailAdd.skuVOSIds[1],
                shelvesId: this.detailAdd.skuVOSIds[2],
                layer: this.detailAdd.valueceng,
                quantity: this.detailAdd.quantity
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "添加产品成功",
                    type: "success"
                  })
                  this.dialogVisibleDetail = false
                  this.$refs[ruleFormDetail].resetFields();
                  this.stockInDetail(this.StockInDetailId)
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
              this.$network.putwarehouse.gostorage.stockInDetailAddEdit({
                id: this.stockInDetailVO.id,
                stockInId: this.StockInDetailId,
                skuId: this.stockInDetailVO.selectedSku[1],
                companyId: this.stockInDetailVO.selectedSku[0],
                categoryId: this.arrs.id,
                warehouseId: this.stockInDetailVO.selectedShelves[0],
                reservoirId: this.stockInDetailVO.selectedShelves[1],
                shelvesId: this.stockInDetailVO.selectedShelves[2],
                layer: this.stockInDetailVO.layer,
                quantity: this.stockInDetailVO.quantity
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "编辑产品成功",
                    type: "success"
                  })
                  this.dialogVisibleDetail = false
                  this.$refs[ruleFormDetail].resetFields();
                  this.stockInDetail(this.StockInDetailId)
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
      // 详情编辑
      procurementSkuEdit(id) {
        this.SkuEditId = id
        this.dialogVisibleDetail = true
        this.$network.putwarehouse.gostorage.gostorageDetailEditId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.stockInDetailVO = res.data.stockInDetailVO
            let p1 = JSON.parse(JSON.stringify(res.data.stockInDetailVO.selectedSku[0]))
            let p2 = res.data.stockInDetailVO.selectedSku[1]
            let datas = JSON.parse(JSON.stringify(this.skuVOS))
            // console.log(datas, p1, p2);
            let arr = {}
            datas.filter(v => {
              if (v.id == p1) {
                // console.log(v);
                v.skuVOS.filter(v1 => {
                  if (v1.id == p2) {
                    // console.log(v1);
                    arr.id = v1.categoryVO.id
                    arr.name = v1.categoryVO.name
                  }
                })
              }
            })
            this.arrs = arr;

            let p3 = JSON.parse(JSON.stringify(res.data.stockInDetailVO.selectedShelves[0]))
            let p4 = JSON.parse(JSON.stringify(res.data.stockInDetailVO.selectedShelves[1]))
            let p5 = JSON.parse(JSON.stringify(res.data.stockInDetailVO.selectedShelves[2]))
            let datas1 = JSON.parse(JSON.stringify(this.warehouseVOS))
            // console.log(datas, p1, p2);
            datas1.filter(v => {
              if (v.id == p3) {
                v.reservoirVOS.filter(v1 => {
                  if (v1.id == p4) {
                    // console.log(v1);
                    v1.reservoirVOS.filter(v2 => {
                      if (v2.id == p5) {
                        return this.arrlayer = v2.layer
                      }
                    })
                  }
                })
              }
            })
            // console.log(res);
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
      skuVOSChange(val) {
        // console.log(val);
        let p1 = val[0]
        let p2 = val[1]
        let datas = JSON.parse(JSON.stringify(this.skuVOS))
        // console.log(datas, p1, p2);
        var arr = {}
        datas.filter(v => {
          if (v.id == p1) {
            // console.log(v);
            v.skuVOS.filter(v1 => {
              if (v1.id == p2) {
                // console.log(v1);
                arr.id = v1.categoryVO.id
                arr.name = v1.categoryVO.name
              }
            })
          }
        })
        this.arrs = arr
        // console.log(arr);
      },
      skuVOSIdsChange(val) {
        // console.log(val);
        let p1 = val[0]
        let p2 = val[1]
        let p3 = val[2]
        let datas = JSON.parse(JSON.stringify(this.warehouseVOS))
        datas.filter(v => {
          if (v.id == p1) {
            v.reservoirVOS.filter(v1 => {
              if (v1.id == p2) {
                // console.log(v1);
                v1.reservoirVOS.filter(v2 => {
                  if (v2.id == p3) {
                    return this.arrlayer = v2.layer
                  }
                })
              }
            })
          }
        })
      },
      // 详情删除
      procurementSkuDelete(id) {
        this.$network.putwarehouse.gostorage.gostorageDetailDelete(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            this.stockInDetail(this.StockInDetailId)
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

    },
    created() {
      this.getGostorageList()
    },
  }

</script>
<style lang="scss" scoped>
  .rolesexpand {
    div {
      margin-top: 5px;
    }
  }

</style>
