<template>
  <div>
    <h3>出库单管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" style="marginBottom:15px" @click="outboundAdd">添加出库单</el-button>
      <!--搜索 -->
      <el-select v-model="value1" placeholder="请选择类型" style="marginLeft:10px">
        <el-option v-for="(item,index) in statusListsCopy" :key="index" :label="item.value" :value="index -1">
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择状态" style="marginLeft:10px">
        <el-option v-for="(item,index) in statusListCopy" :key="index" :label="item.value" :value="index"></el-option>
      </el-select>
      <el-select v-model="value3" placeholder="请选择客户" style="marginLeft:10px">
        <el-option v-for="item in companyVOSCopy" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input style="marginLeft:30px ;width:20%" clearable @input="clearableVal" placeholder="请输入出库单号"
        v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="GostorageSearch"></el-button>
      </el-input>
      <el-tab-pane label="出库单管理" name="first">
        <el-card>
          <el-table :data="stockOutVOSData" border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-card style="width:20%">
                  <!-- {{scope.row}} -->
                  <el-form class="demo-table-expand">
                    <el-form-item label="物流商:">
                      <!-- {{scope.row}} -->
                      <el-tag v-if="scope.row.logisticsName==null" type="info">暂无</el-tag>
                      <el-tag v-else type="warning">{{scope.row.logisticsName}}</el-tag>
                    </el-form-item>
                    <el-form-item label="物流单号:">
                      <el-tag v-if="scope.row.logisticsNumber==null" type="info">暂无</el-tag>
                      <el-tag v-else type="warning">{{scope.row.logisticsNumber}}</el-tag>
                    </el-form-item>
                    <el-form-item label="备注:">
                      {{scope.row.remark==null ? '':scope.row.remark}}
                    </el-form-item>
                    <el-form-item label="驳回备注:">
                      {{scope.row.overruledRemark==null ? '':scope.row.overruledRemark}}
                    </el-form-item>
                  </el-form>
                </el-card>
              </template>


            </el-table-column>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="出库编号">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="mini">{{scope.row.code}}</el-button> -->
                <el-link type="primary" :underline="false">{{scope.row.code}}</el-link>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.company}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经办人" width="120">
              <template slot-scope="scope">
                <el-tag size="mini">{{scope.row.gestore}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" width="120">
              <template slot-scope="scope">
                <el-tag type="danger" size="mini">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情" width="100">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看和编辑明细" placement="left">
                  <el-button @click="stockInDetail(scope.row.id)" type="primary" size="mini" icon="el-icon-s-grid">
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="出库类型" width="120">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.type==1">成品出库</el-tag>
                <el-tag size="mini" type="info" v-else>其他出库</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="出库状态" width="120">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.status == 1">初始录入</el-tag>
                <el-tag size="small" type="warning" v-else-if="scope.row.status == 2">审核中</el-tag>
                <el-tag size="small" type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                <el-tag size="small" type="info" v-else-if="scope.row.status == 4">已审核</el-tag>
                <el-tag size="small" type="info" v-else-if="scope.row.status == 5">拣货中</el-tag>
                <el-tag size="small" type="success" v-else-if="scope.row.status == 6">拣货完成</el-tag>
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
                <el-popconfirm confirmButtonText="好的" v-if="scope.row.status==6" cancelButtonText="不用了"
                  icon="el-icon-info" iconColor="#e3c048" title="确定订单可以出库?" @onConfirm="procurementchuku(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="出库" placement="left">
                    <el-button type="text" icon="el-icon-truck" style="marginRight:5px" size="medium"></el-button>
                  </el-tooltip>
                </el-popconfirm>
                <!-- <el-popconfirm confirmButtonText="好的" v-if="scope.row.status==5" cancelButtonText="不用了"
                  icon="el-icon-info" iconColor="#e3c048" title="确定订单拣货完成?"
                  @onConfirm="procurementJianhuowanc(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="拣货完成" placement="left">
                    <el-button type="text" icon="el-icon-loading" style="marginRight:5px" size="medium"></el-button>
                  </el-tooltip>
                </el-popconfirm> -->
                <!-- <el-popconfirm confirmButtonText="好的" v-if="scope.row.status==4" cancelButtonText="不用了"
                  icon="el-icon-info" iconColor="#e3c048" title="确定订单可以拣货?"
                  @onConfirm="procurementJianhuo(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="拣货" placement="left">
                    <el-button type="text" icon="el-icon-takeaway-box" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm> -->
                <el-popconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="el-icon-info" iconColor="#e3c048"
                  title="确定此出库订单通过审核吗?" v-if="scope.row.status==2" @onConfirm="procurementShenHeTong(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="审核通过" placement="left">
                    <el-button type="text" icon="el-icon-success" style="marginRight:5px" size="medium"></el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip v-if="scope.row.status==2" class="item" effect="dark" content="审核驳回" placement="left">
                  <el-button type="text" icon="el-icon-error" size="medium" @click="procurementBohui(scope.row.id)"
                    style="marginRight:5px"></el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="el-icon-info" iconColor="#e3c048"
                  title="确定提交出库订单进行审核吗?" v-if="scope.row.status == 3 || scope.row.count!==null && scope.row.status == 1"
                  @onConfirm="procurementShenHe(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="出库单审核" placement="left">
                    <el-button type="info" style="marginRight:5px" icon="el-icon-s-order" size="mini"></el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="procurementEdit(scope.row.id)">
                  </el-button>
                </el-tooltip>
                <el-popconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="el-icon-info" iconColor="red"
                  title="确定删除采购订单吗？" @onConfirm="procurementDelete(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="删除"
                    v-if="scope.row.status != 1? false :true" placement="right">
                    <el-button style="marginLeft:5px" icon="el-icon-delete" type="danger" size="mini"></el-button>
                  </el-tooltip>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background style="marginTop:15px" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
            :page-size="size" layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加弹框 和编辑 -->
    <el-dialog :title="outboundId==''?'添加出库单':'编辑出库单'" :visible.sync="dialogVisible" width="24%"
      @close="dialogVisibleClose">
      <el-form :model="outboundId==''? outboundFormdata:stockOutVOs" ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item v-if="outboundId==''" label="出库单编号" prop="code" :rules="[{
            required: true,
            message: '请输入出库单编号',
            trigger: ['blur','change']
          }]">
          <el-input v-model="outboundFormdata.code" clearable style="width:200px"></el-input>
          <el-button style="marginLeft:10px" round size="small" @click="addrandomNumber" type="success">自动生成</el-button>
        </el-form-item>
        <el-form-item v-else label="出库单编号" prop="code" :rules="[{
            required: true,
            message: '请输入出库单编号',
            trigger: ['blur','change']
          }]">
          <el-input v-model="stockOutVOs.code" disabled clearable style="width:200px"></el-input>
          <!-- <el-button style="marginLeft:10px" round size="small" @click="addrandomNumber" type="success">自动生成</el-button> -->
        </el-form-item>

        <el-form-item v-if="outboundId==''" label="出库类型" prop="type" :rules="[{
            required: true,
            message: '请输入出库类型',
            trigger: ['blur','change']
          }]">
          <el-select v-model="outboundFormdata.type" placeholder="请选择出库类型">
            <el-option v-for="(item,index) in typeListCopy" :key="index" :label="item.value" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="出库类型" prop="type" :rules="[{
            required: true,
            message: '请输入出库类型',
            trigger: ['blur','change']
          }]">
          <el-select v-model="stockOutVOs.type" placeholder="请选择出库类型">
            <el-option v-for="(item,index) in typeListCopy" :key="index" :label="item.value" :value="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="outboundId==''" label="客户" prop="companyId" :rules="[{
            required: true,
            message: '请输入客户',
            trigger: ['blur','change']
          }]">
          <el-select v-model="outboundFormdata.companyId" placeholder="请选择客户">
            <el-option v-for="(item,index) in companyVOS" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="客户" prop="companyId" :rules="[{
            required: true,
            message: '请输入客户',
            trigger: ['blur','change']
          }]">
          <el-select v-model="stockOutVOs.companyId" placeholder="请选择客户">
            <el-option v-for="(item,index) in companyVOS" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="outboundId==''" label="经办人" prop="gestore"
          :rules="[{ required: true, message: '请输入经办人', trigger: ['blur','change'] },{  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]">
          <el-input v-model="outboundFormdata.gestore" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item v-else label="经办人" prop="gestore"
          :rules="[{ required: true, message: '请输入经办人', trigger: ['blur','change'] },{  pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入正确的经办人', trigger: ['blur', 'change']}]">
          <el-input v-model="stockOutVOs.gestore" style="width:200px" clearable></el-input>
        </el-form-item>

        <el-form-item v-if="outboundId==''" label="备注" prop="remark">
          <el-input v-model="outboundFormdata.remark" type="textarea" clearable></el-input>
        </el-form-item>
        <el-form-item v-else label="备注" prop="remark">
          <el-input v-model="stockOutVOs.remark" type="textarea" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleOutboundAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击详情弹框 -->
    <el-dialog :title="'出库详情单'+ (stockInVOSCode == ''? '': stockInVOSCode)" :visible.sync="dialogVisibleDetail"
      width="75%" @close="dialogVisibleDetails">
      <el-button
        :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :stockInVOStatus==6?true:stockInVOStatus==7?true:false"
        type="primary" size="mini" style="marginBottom:10px" @click="stockInDetailAdd">添加</el-button>
      <!-- 打印 -->
      <el-card>
        <el-table id="printMe" :data="stockOutDetailVOS" border style="width: 100%">
          <el-table-column align="center" label="产品">
            <template slot-scope="scope">
              <el-button type="text" size="mini">{{scope.row.sku}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="单位">
            <template slot-scope="scope">
              <el-tag type="info" size="mini" v-if="scope.row.category==null">暂无</el-tag>
              <el-tag type="success" size="mini" v-else>{{scope.row.category}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="估计数量">
            <template slot-scope="scope">
              <el-tag type="warning">{{scope.row.estimatedQuantity}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="现在数量">
            <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.currentQuantity}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工具人">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.lastOperationUser}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" width="190">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.createTime | dateTimeFormat}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" width="190">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
              <el-tag size="small" type="info" v-else>{{scope.row.updateTime |dateTimeFormat}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                <el-button :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :false"
                  type="primary" icon="el-icon-edit" size="mini" @click="procurementSkuEdit(scope.row.id)"></el-button>
              </el-tooltip>
              <el-popconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="el-icon-info" iconColor="red"
                title="确定删除采购订单吗？" @onConfirm="procurementSkuDelete(scope.row.id)">
                <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="right">
                  <el-button :disabled="stockInVOStatus==2?true:stockInVOStatus==4?true:stockInVOStatus==5?true :false"
                    icon="el-icon-delete" style="marginLeft:5px" type="danger" size="mini"></el-button>
                </el-tooltip>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <!-- 详情添加 -->
    <el-dialog :title="SkuEditId=='' ?'详情添加':'详情编辑'" :visible.sync="dialogVisibleDetailAdd" width="20%"
      @close="dialogVisibleDetailAddClose">
      <el-form :model="SkuEditId=='' ?ruleFormDetailAdd:ruleFormDetailAddEdit" ref="ruleFormDetailAdd"
        label-width="100px" class="demo-ruleForm">
        <el-form-item v-if="SkuEditId==''" label="产品" prop="skuId"
          :rules="[ { required: true, message: '请选择出库产品', trigger: ['blur','change'] }]">
          <el-select v-model="ruleFormDetailAdd.skuId" placeholder="请选择产品" @change="skuIdChange">
            <el-option v-for="item in skuVOS" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-else label="产品" prop="selectedSku"
          :rules="[ { required: true, message: '请选择出库产品', trigger: ['blur','change'] }]">
          <el-select v-model="ruleFormDetailAddEdit.selectedSku" placeholder="请选择产品" @change="skuIdChange">
            <el-option v-for="item in skuVOS" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="SkuEditId==''" label="字典单位" prop="name">
          <el-input disabled v-model="arrs.name"></el-input>
        </el-form-item>
        <el-form-item v-else label="字典单位" prop="name">
          <el-input disabled v-model="arrs.name"></el-input>
        </el-form-item>
        <el-form-item v-if="SkuEditId==''" label="数量" prop="quantity"
          :rules="[{ required: true, message: '请输入数量', trigger: ['blur','change'] },{pattern: /^[0-9]*$/, message: '请输入正确的数量', trigger: ['blur', 'change']}]">
          <el-input v-model="ruleFormDetailAdd.quantity"></el-input>
        </el-form-item>
        <el-form-item label="数量" v-else prop="estimatedQuantity"
          :rules="[{ required: true, message: '请输入数量', trigger: ['blur','change'] },{pattern: /^[0-9]*$/, message: '请输入正确的数量', trigger: ['blur', 'change']}]">
          <el-input v-model="ruleFormDetailAddEdit.estimatedQuantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDetailAdd = false">取 消</el-button>
        <el-button type="primary" @click="detailAddSkus('ruleFormDetailAdd')">确 定</el-button>
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
    <!-- 弹出物流信息 -->
    <el-dialog title="添加物流" :visible.sync="dialogVisiblewuliu" width="20%" @close="dialogVisiblewuliuclose">
      <el-form :model="ruleFormwuliu" ref="ruleFormwuliu" label-width="100px" class="demo-ruleForm">
        <el-form-item label="物流商" prop="logisticsName" :rules="[{
            required: true,
            message: '请输入物流商',
            trigger: ['blur','change']
          }]">
          <el-input v-model="ruleFormwuliu.logisticsName"></el-input>
        </el-form-item>
        <el-form-item label="物流单号" prop="logisticsNumber" :rules="[{
            required: true,
            message: '请输入物流单号',
            trigger: ['blur','change']
          }]">
          <el-input v-model="ruleFormwuliu.logisticsNumber"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblewuliu = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblewuliuAdd('ruleFormwuliu')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    randomNumberCaseChuku,
    convertKey
  } from "@/plugins/unit.js";
  export default {
    data() {
      return {
        activeName: "first",
        input3: "",
        pageNum: 1,
        size: 10,
        total: 0,
        stockOutVOSData: [],
        statusList: [],
        companyVOS: [],
        typeListCopy: [],
        dialogVisible: false,
        dialogVisibleDetail: false,
        dialogVisibleDetailAdd: false,
        dialogVisibleBohui: false,
        dialogVisiblewuliu: false,
        outboundFormdata: {
          code: "",
          type: "",
          companyId: "",
          gestore: "",
          remark: "",
        },
        stockOutVOs: {},
        outboundId: "",
        value1: "",
        value2: "",
        value3: "",
        companyVOSCopy: [],
        statusListCopy: [],
        statusListsCopy: [],
        stockOutDetailVOS: [],
        skuVOS: [],
        stockInVOSCode: "",
        stockInVOStatus: "",
        ruleFormDetailAdd: {
          skuId: "",
          quantity: "",
        },
        stockOutId: "",
        arrs: {},
        SkuEditId: "",
        ruleFormDetailAddEdit: {},
        printObj: {
          id: "printMe",
          popTitle: "good print",
        },
        ruleFormBohui: {},
        ruleFormwuliu: {

        },
        wuliuId: ""
      };
    },
    methods: {
      // 获取列表
      getOutboundList() {
        this.$network.putwarehouse.outbound
          .OutboundList({
            pageNum: this.pageNum,
            size: this.size,
          })
          .then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.stockOutVOSData = res.data.stockOutVOS;
              this.total = res.data.total;
              this.statusList = res.data.statusList;
              this.companyVOS = res.data.companyVOS;

              let typeList = JSON.parse(JSON.stringify(res.data.typeList));
              let typeListCopy = convertKey(typeList, ["value"]);
              this.typeListCopy = typeListCopy;

              let companyVOS = JSON.parse(JSON.stringify(res.data.companyVOS));
              companyVOS.unshift({
                name: "全部客户",
              });
              this.companyVOSCopy = companyVOS;

              let statusList = JSON.parse(JSON.stringify(res.data.statusList));
              let statusLists = convertKey(statusList, ["value"]);
              statusLists.unshift({
                value: "全部状态",
              });
              this.statusListCopy = statusLists;

              let typeLists = JSON.parse(JSON.stringify(res.data.typeList));
              let statusListss = convertKey(typeLists, ["value"]);
              statusListss.unshift({
                value: "全部类型",
              });
              this.statusListsCopy = statusListss;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      // 分页
      handleSizeChange(newsize) {
        this.size = newsize;
        this.GostorageSearch();
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage;
        this.GostorageSearch();
      },
      //添加出库单
      outboundAdd() {
        this.dialogVisible = true;
      },
      //   生成出库单编号
      addrandomNumber() {
        let code = randomNumberCaseChuku();
        if (this.outboundId == "") {
          this.outboundFormdata.code = code;
        } else {
          this.stockOutVOs.code = code;
        }
      },
      //   添加弹框关闭回调
      dialogVisibleClose() {
        this.outboundId = "";
        this.$refs["ruleForm"].resetFields();
      },
      //   点击弹框  添加
      dialogVisibleOutboundAdd(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (this.outboundId == "") {
              this.$network.putwarehouse.outbound
                .OutboundAdd({
                  code: this.outboundFormdata.code,
                  companyId: this.outboundFormdata.companyId,
                  type: this.outboundFormdata.type,
                  gestore: this.outboundFormdata.gestore,
                  remark: this.outboundFormdata.remark,
                })
                .then((res) => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: "添加出库单成功",
                      type: "success",
                    });
                    this.dialogVisible = false;
                    this.$refs[ruleForm].resetFields();
                    this.getOutboundList();
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error",
                  });
                });
            } else {
              this.$network.putwarehouse.outbound
                .OutboundAddDeit({
                  id: this.stockOutVOs.id,
                  code: this.stockOutVOs.code,
                  companyId: this.stockOutVOs.companyId,
                  type: this.stockOutVOs.type,
                  gestore: this.stockOutVOs.gestore,
                  remark: this.stockOutVOs.remark,
                })
                .then((res) => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: "编辑出库单成功",
                      type: "success",
                    });
                    this.dialogVisible = false;
                    this.$refs[ruleForm].resetFields();
                    this.getOutboundList();
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error",
                  });
                });
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true,
            });
          }
        });
      },
      //删除
      procurementDelete(id) {
        this.$network.putwarehouse.outbound
          .OutboundListDelete(id)
          .then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success",
              });
              this.getOutboundList();
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      //   回显
      procurementEdit(id) {
        this.outboundId = id;
        this.dialogVisible = true;
        this.$network.putwarehouse.outbound
          .OutboundListEdit(id)
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.stockOutVOs = res.data.stockOutVO;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      // 搜索
      clearableVal(val) {
        if (val == "") {
          this.getOutboundList();
        }
      },
      GostorageSearch() {
        // if (
        //   this.value1 === "" &&
        //   this.value2 === "" &&
        //   this.value3 === "" &&
        //   this.input3 === ""
        // ) {
        //   this.$notify({
        //     title: "请输入或者选择数据进行搜索",
        //     type: "error",
        //   });
        // } else {
        this.$network.putwarehouse.outbound
          .OutboundList({
            pageNum: this.pageNum,
            size: this.size,
            code: this.input3,
            type: this.value1 == -1 ? null : this.value1,
            status: this.value2 == 0 ? null : this.value2,
            companyId: this.value3 == undefined ? null : this.value3,
          })
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.stockOutVOSData = res.data.stockOutVOS;
              this.total = res.data.total;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
        // }
      },
      // 点击详情
      stockInDetail(id) {
        // console.log(id);
        this.dialogVisibleDetail = true;
        this.stockOutId = id;
        this.getStatus(id);
        this.$network.putwarehouse.outbound
          .stockOutDetailList(id)
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.skuVOS = res.data.skuVOS;
              this.stockOutDetailVOS = res.data.stockOutDetailVOS;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      // 查看状态
      getStatus(id) {
        this.$network.putwarehouse.outbound
          .OutboundListEdit(id)
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.stockInVOSCode = res.data.stockOutVO.code;
              this.stockInVOStatus = res.data.stockOutVO.status;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      // 详情关闭回调
      dialogVisibleDetails() {
        // console.log(1);
        this.stockOutId = "";
      },
      stockInDetailAdd() {
        this.dialogVisibleDetailAdd = true;
      },
      dialogVisibleDetailAddClose() {
        this.arrs = {};
        this.SkuEditId = "";
        this.$refs["ruleFormDetailAdd"].resetFields();
      },
      skuIdChange(val) {
        // console.log(val);
        let p1 = val;
        let datas = JSON.parse(JSON.stringify(this.skuVOS));
        var arrs = {};
        datas.filter((v) => {
          if (v.id == p1) {
            // console.log(v);
            arrs.name = v.categoryVO.name;
            arrs.id = v.categoryVO.id;
          }
        });
        this.arrs = arrs;
      },
      // 添加或编辑
      detailAddSkus(ruleFormDetailAdd) {
        this.$refs[ruleFormDetailAdd].validate((valid) => {
          if (valid) {
            if (this.SkuEditId == "") {
              this.$network.putwarehouse.outbound
                .stockOutDetailCreate({
                  stockOutId: this.stockOutId,
                  skuId: this.ruleFormDetailAdd.skuId,
                  estimatedQuantity: this.ruleFormDetailAdd.quantity,
                  categoryId: this.arrs.id,
                })
                .then((res) => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: "添加产品成功",
                      type: "success",
                    });
                    this.dialogVisibleDetailAdd = false;
                    this.$refs[ruleFormDetailAdd].resetFields();
                    this.stockInDetail(this.stockOutId);
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error",
                  });
                });
            } else {
              this.$network.putwarehouse.outbound
                .stockOutDetailUpdate({
                  id: this.ruleFormDetailAddEdit.id,
                  stockOutId: this.stockOutId,
                  skuId: this.ruleFormDetailAddEdit.selectedSku,
                  estimatedQuantity: this.ruleFormDetailAddEdit.estimatedQuantity,
                  categoryId: this.arrs.id,
                })
                .then((res) => {
                  // console.log(res);
                  if (res.code === 0) {
                    this.$notify({
                      title: "成功",
                      message: "编辑产品成功",
                      type: "success",
                    });
                    this.dialogVisibleDetailAdd = false;
                    this.$refs[ruleFormDetailAdd].resetFields();
                    this.stockInDetail(this.stockOutId);
                  } else {
                    this.$notify({
                      title: "失败",
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                  this.$notify({
                    title: "失败",
                    message: err,
                    type: "error",
                  });
                });
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true,
            });
          }
        });
      },
      // 点击编辑回显
      procurementSkuEdit(id) {
        this.SkuEditId = id;
        this.dialogVisibleDetailAdd = true;
        this.$network.putwarehouse.outbound
          .stockOutDetailListId(id)
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.ruleFormDetailAddEdit = res.data.stockOutDetailVO;

              let p1 = JSON.parse(
                JSON.stringify(res.data.stockOutDetailVO.selectedSku)
              );
              // let p1 = res.data.stockOutDetailVO.selectedSku
              let datas = JSON.parse(JSON.stringify(this.skuVOS));
              // console.log(p1);
              var arrs = {};
              datas.filter((v1) => {
                // console.log(v);
                if (v1.id === p1) {
                  // console.log(v1);
                  // console.log(p1);
                  arrs.name = v1.categoryVO.name;
                  arrs.id = v1.categoryVO.id;
                }
              });
              this.arrs = arrs;
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      procurementSkuDelete(id) {
        this.$network.putwarehouse.outbound
          .stockOutDetailListIdDelete(id)
          .then((res) => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success",
              });
              this.stockInDetail(this.stockOutId);
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: err,
              type: "error",
            });
          });
      },
      // 入库单审核
      procurementShenHe(id) {
        // console.log(id);
        this.$network.putwarehouse.outbound.OutboundupdateStatus({
          id: id,
          status: 2,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "提交成功",
              type: "success"
            })
            this.getOutboundList()
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
        this.$network.putwarehouse.outbound.OutboundupdateStatus({
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
            this.getOutboundList()
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
      // 拣货中
      procurementJianhuo(id) {
        this.$network.putwarehouse.outbound.OutboundupdateStatus({
          id: id,
          status: 6,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "拣货完成",
              type: "success"
            })
            this.getOutboundList()
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
      // 拣货完成
      // procurementJianhuowanc(id) {
      //   this.$network.putwarehouse.outbound.OutboundupdateStatus({
      //     id: id,
      //     status: 7,
      //     overruledRemark: ""
      //   }).then(res => {
      //     // console.log(res);
      //     if (res.code === 0) {
      //       this.$notify({
      //         title: "拣货出库",
      //         type: "success"
      //       })
      //       this.getOutboundList()
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
      // 拣货出库
      procurementchuku(id) {
        this.dialogVisiblewuliu = true
        this.wuliuId = id
        // this.$network.putwarehouse.outbound.OutboundupdateStatus({
        //   id: id,
        //   status: 7,
        //   overruledRemark: ""
        // }).then(res => {
        //   // console.log(res);
        //   if (res.code === 0) {
        //     this.$notify({
        //       title: "出库",
        //       type: "success"
        //     })
        //     this.getOutboundList()
        //   } else {
        //     this.$notify({
        //       title: "失败",
        //       message: res.msg,
        //       type: "error"
        //     })
        //   }
        // }).catch(err => {
        //   this.$notify({
        //     title: "失败",
        //     message: err,
        //     type: "error"
        //   })
        // })
      },
      // 添加物流
      dialogVisiblewuliuAdd(ruleFormwuliu) {
        this.$refs[ruleFormwuliu].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.outbound.OutboundupdateStatus({
              id: this.wuliuId,
              status: 7,
              overruledRemark: "",
              logisticsName: this.ruleFormwuliu.logisticsName,
              logisticsNumber: this.ruleFormwuliu.logisticsNumber
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "出库",
                  type: "success"
                })
                this.dialogVisiblewuliu = false
                this.getOutboundList()
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
              showClose: true,
            });
          }
        })
      },
      // 
      dialogVisiblewuliuclose() {
        this.wuliuId = ""
      },
      // 审核驳回
      procurementBohui(id) {
        this.bohuiID = id
        this.dialogVisibleBohui = true
      },
      dialogVisibleBohuiq() {
        this.$refs["ruleFormBohui"].resetFields();
        this.bohuiID = ""
      },
      Bohuiq(ruleFormBohui) {
        this.$refs[ruleFormBohui].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.outbound.OutboundupdateStatus({
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

                this.getOutboundList()
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
      this.getOutboundList();
    },
  };

</script>
<style lang="scss" scoped>
  .el-link {
    font-size: 12px;
  }

</style>
