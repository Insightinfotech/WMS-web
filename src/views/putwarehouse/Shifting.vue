<template>
  <div>
    <h3>移库管理</h3>
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <!-- 添加采购订单订单 -->
      <el-button type="primary" style="marginBottom:15px;marginRight:20px" @click="shiftingAdd">添加移库</el-button>
      <!--搜索 -->
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" @change="getPickingClear"
        style="width: 15%;"></el-date-picker>
      <el-input style="marginLeft:30px ;width:25%" placeholder="请输入订单号" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择订单状态">
          <el-option v-for="(item,index) in statusListCopy" :label="item.value" :key="index" :value="index"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="shiftingSearch"></el-button>
      </el-input>
      <!-- <el-cascader v-model="valueoptions" :options="options" :props="{ multiple: true,}" clearable collapse-tags>
      </el-cascader> -->
      <el-tab-pane label="采购单管理" name="first">
        <el-card>
          <el-table :data="moveVOS" border style="width:100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="备注">
                    <el-tag v-if="scope.row.remark === null">暂无</el-tag>
                    <el-tag v-else>{{ scope.row.remark}}</el-tag>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" label="#" type="index"></el-table-column>
            <el-table-column align="center" label="编号" width="180">
              <template slot-scope="scope">
                <el-button type="text" size="mini">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工具人" width="100">
              <template slot-scope="scope">
                <el-tag type="danger" size="mini">{{scope.row.lastOperationUser}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="120">
              <template slot-scope="scope">
                <el-tag type="success" size="mini" v-if="scope.row.status==1">初始录入</el-tag>
                <el-tag type="warning" size="mini" v-else-if="scope.row.status==2">审核中</el-tag>
                <el-tag type="danger" size="mini" v-else-if="scope.row.status==3">审核驳回</el-tag>
                <el-tag type="info" size="mini" v-else-if="scope.row.status==4">移库中</el-tag>
                <el-tag size="mini" v-else>完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情" width="100">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-s-grid" @click="getyikuData(scope.row.id)" size="mini">
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="源仓库/库区/货架/层数">
              <template slot-scope="scope">
                <el-tag size="mini" type="info" v-if="scope.row.sourceWarehouse==null">暂无</el-tag>
                <el-tag size="mini" v-else>{{scope.row.sourceWarehouse}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.sourceReservoir==null">暂无
                </el-tag>
                <el-tag size="mini" v-else style="marginLeft:5px">{{scope.row.sourceReservoir}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.sourceShelves==null">暂无</el-tag>
                <el-tag size="mini" v-else style="marginLeft:5px">{{scope.row.sourceShelves}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.sourceLayer==null">暂无</el-tag>
                <el-tag size="mini" v-else style="marginLeft:5px">{{scope.row.sourceLayer}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="目标仓库/库区/货架/层数">
              <template slot-scope="scope">
                <el-tag size="mini" type="info" v-if="scope.row.targetWarehouse==null">暂无</el-tag>
                <el-tag size="mini" v-else type="danger">{{scope.row.targetWarehouse}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.targetReservoir==null">暂无
                </el-tag>
                <el-tag size="mini" v-else type="danger" style="marginLeft:5px">{{scope.row.targetReservoir}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.targetShelves==null">暂无</el-tag>
                <el-tag size="mini" v-else type="danger" style="marginLeft:5px">{{scope.row.targetShelves}}</el-tag>
                <el-tag size="mini" type="info" style="marginLeft:5px" v-if="scope.row.targetLayer==null">暂无</el-tag>
                <el-tag size="mini" v-else type="danger" style="marginLeft:5px">{{scope.row.targetLayer}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small">{{scope.row.createTime | dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="180">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
                <el-tag size="small" type="info" v-else>{{scope.row.updateTime |dateTimeFormat}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">

                <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="#e3c048"
                  title="确定提交采购订单进行审核吗?" v-if="scope.row.status == 3 ||  scope.row.status == 1"
                  @onConfirm="procurementShenHe(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库单审核" placement="left">
                    <el-button type="info" style="marginRight:5px" icon="el-icon-s-order" size="mini">
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
                <el-popconfirm confirmButtonText='好的' v-if="scope.row.status==4" cancelButtonText='不用了'
                  icon="el-icon-info" iconColor="#e3c048" title="确定移库?"
                  @onConfirm="procurementShenHeRukusheng(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="入库" placement="left">
                    <el-button type="text" icon="el-icon-check" style="marginRight:5px" size="medium">
                    </el-button>
                  </el-tooltip>
                </el-popconfirm>
                <el-tooltip class="item" effect="dark" content="编辑"
                  v-if="scope.row.status === 1 ? true : scope.row.status ===3?true :false" placement="left">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="procurementEdit(scope.row.id)">
                  </el-button>
                </el-tooltip>
                <el-popconfirm
                  v-if="scope.row.status === 1 ? true:scope.row.status === 3?true:scope.row.status === 5?true:false"
                  confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red" title="确定删除采购订单吗？"
                  @onConfirm="procurementDelete(scope.row.id)">
                  <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="right">
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
    <!-- 添加移库 -->
    <el-dialog :title="ids == '' ? '添加移库单':'编辑移库单'" :visible.sync="dialogVisibleykadd" width="25%"
      @close="dialogVisibleykaddClose">
      <el-form :model="ids == ''?ruleFormykuadd : moveVO" ref="ruleFormykadd" label-width="100px" class="demo-ruleForm">
        <el-form-item v-if="ids==''? true :false" label="移库单号" prop="code"
          :rules="[ { required: true, message: '请输入移库单号', trigger: ['blur','change'] }]">
          <el-input v-model="ruleFormykuadd.code" style="width:220px;marginRight:20px;height:20px"></el-input>
          <el-button type="success" @click="dianjia" size="small">自动生成</el-button>
        </el-form-item>
        <el-form-item v-else label="移库单号" prop="code"
          :rules="[ { required: true, message: '请输入移库单号', trigger: ['blur','change'] }]">
          <el-input v-model="moveVO.code" style="width:220px;marginRight:20px;height:20px"></el-input>
          <el-button type="success" @click="dianjia" size="small">自动生成</el-button>
        </el-form-item>


        <el-form-item v-if="ids==''? true :false" label="源仓库" prop="value"
          :rules="[ { required: true, message: '请选择源仓库', trigger: ['blur','change'] }]">
          <el-cascader v-model="ruleFormykuadd.value" :options="warehouseVOS" style="width:220px"
            :props="warehouseVOSProps" @change="skuVOSIdsChange"></el-cascader>
        </el-form-item>
        <el-form-item v-else label="源仓库" prop="selectedSource"
          :rules="[ { required: true, message: '请选择源仓库', trigger: ['blur','change'] }]">
          <el-cascader v-model="moveVO.selectedSource" :options="warehouseVOS" style="width:220px"
            :props="warehouseVOSProps" @change="skuVOSIdsChange"></el-cascader>
        </el-form-item>

        <el-form-item v-if="ids==''? true :false" label="源层数" prop="valueceng"
          :rules="[ { required: true, message: '请选择源层数', trigger: ['blur','change'] }]">
          <el-select v-model="ruleFormykuadd.valueceng" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in arrlayer" :key="index" :label="index + 1 + '层'" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="源层数" prop="sourceLayer"
          :rules="[ { required: true, message: '请选择源层数', trigger: ['blur','change'] }]">
          <el-select v-model="moveVO.sourceLayer" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in selectedSourcearrlayer" :key="index" :label="index + 1 + '层'"
              :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="ids==''? true :false" label="目标仓库" prop="values"
          :rules="[ { required: true, message: '请选择目标仓库', trigger: ['blur','change'] }]">
          <el-cascader v-model="ruleFormykuadd.values" :options="warehouseVOS" style="width:220px"
            :props="warehouseVOSProps" @change="skuVOSIdsChanges"></el-cascader>
        </el-form-item>
        <el-form-item v-else label="目标仓库" prop="selectedTarget"
          :rules="[ { required: true, message: '请选择目标仓库', trigger: ['blur','change'] }]">
          <el-cascader v-model="moveVO.selectedTarget" :options="warehouseVOS" style="width:220px"
            :props="warehouseVOSProps" @change="skuVOSIdsChanges"></el-cascader>
        </el-form-item>

        <el-form-item v-if="ids==''? true :false" label="目标层数" prop="valuecengs"
          :rules="[ { required: true, message: '请选择目标层数', trigger: ['blur','change'] }]">
          <el-select v-model="ruleFormykuadd.valuecengs" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in arrlayers" :key="index" :label="index + 1 + '层'" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="目标层数" prop="targetLayer"
          :rules="[ { required: true, message: '请选择目标层数', trigger: ['blur','change'] }]">
          <el-select v-model="moveVO.targetLayer" placeholder="请选择" style="width:100px">
            <el-option v-for="(item,index) in selectedTargetarrlayer" :key="index" :label="index + 1 + '层'"
              :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="ids==''? true :false" label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleFormykuadd.remark"></el-input>
        </el-form-item>
        <el-form-item v-else label="备注" prop="remark">
          <el-input type="textarea" v-model="moveVO.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleykadd = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleykaddYk('ruleFormykadd')">确 定</el-button>
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
    <!-- 详情弹框 -->
    <el-dialog title="移库详情" :visible.sync="dialogVisibleDesc" width="65%" @close="dialogVisibleDescyk">
      <el-button :disabled="moveStatus == 2?true:moveStatus==4?true:moveStatus==5?true:false" type="primary"
        size="small" style="marginBottom:10px" @click="shiftingSkuAdd">添加产品
      </el-button>
      <el-card>
        <el-table :data="moveDetailVOS" border style="width: 100%">
          <el-table-column label="#" align="center" type="index">
          </el-table-column>
          <el-table-column prop="sku.name" align="center" label="产品名称">
            <template slot-scope="scope">
              <el-button type="text" size="mini">{{scope.row.sku}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="category.name" align="center" label="产品单位">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.category}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" align="center" label="产品数量">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">{{scope.row.quantity}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" align="center" label="操作人">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.lastOperationUser}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" width="180">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.createTime | dateTimeFormat}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" width="180">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.updateTime == null">暂无</el-tag>
              <el-tag size="small" type="info" v-else>{{scope.row.updateTime |dateTimeFormat}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                <el-button :disabled="moveStatus == 2?true:moveStatus==4?true:moveStatus==5?true:false" type="primary"
                  icon="el-icon-edit" size="mini" @click="procurementEdit(scope.row.id)">
                </el-button>
              </el-tooltip> -->
              <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
                title="确定删除采购订单吗？" @onConfirm="procurementDeleteSku(scope.row.id)">
                <el-button slot="reference" :disabled="moveStatus == 2?true:moveStatus==4?true:moveStatus==5?true:false"
                  style="marginLeft:5px" icon="el-icon-delete" type="danger" size="mini">
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
    <!-- 详情弹框  添加产品 -->
    <el-dialog title="添加产品" :visible.sync="dialogVisibleDescSku" width="20%" @close="dialogVisibleDescSkuClose">
      <el-form :model="ruleFormDescSku" ref="ruleFormDescSku" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择产品" prop="value"
          :rules="[{ required: true, message: '请选择产品', trigger: ['blur','change'] }]">
          <el-select v-model="ruleFormDescSku.value" placeholder="请选择产品" @change="ruleFormDescSkuSelect">
            <el-option v-for="(item,index) in inventoryList" :key="index" :label="item.sku.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位">
          <el-input v-model="skuarr.categoryName" style="width:60%" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品已有数量">
          <el-input v-model="skuarr.quantity" style="width:40%" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品数量" prop="quantity"
          :rules="[{ required: true, message: '请输入数量', trigger: ['blur','change'] },{pattern: /^[1-9]*$/, message: '请输入正确的数量', trigger: ['blur', 'change']}]">
          <el-input v-model="ruleFormDescSku.quantity" style="width:40%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDescSku = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleDescSkuAdd('ruleFormDescSku')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import moment from 'moment'
  import {
    randomNumberCaseYK,
    convertKey
  } from "@/plugins/unit.js";
  export default {
    data() {
      return {
        input3: "",
        activeName: "first",
        form: {
          date1: "",
          date2: ""
        },
        select: "",
        pageNum: 1,
        size: 10,
        total: 0,
        statusList: [],
        moveVOS: [],
        warehouseVOS: [],
        statusListCopy: [],
        dialogVisibleykadd: false,
        dialogVisibleBohui: false,
        dialogVisibleDesc: false,
        dialogVisibleDescSku: false,
        ruleForm: {},
        ruleFormBohui: {},
        bohuiID: "",
        ruleFormykuadd: {
          code: ""
        },
        warehouseVOSProps: {
          value: "id",
          label: "name",
          children: "reservoirVOS"
        },
        arrlayer: "",
        arrlayers: "",
        ids: "",
        moveVO: {},
        selectedSourcearrlayer: "",
        selectedTargetarrlayer: "",
        inventoryList: [],
        moveId: "",
        moveStatus: "",
        moveDetailVOS: [],
        ruleFormDescSku: {
          value: ""
        },
        skuarr: {}
      }
    },
    methods: {
      // 监听搜索时间
      getPickingClear(val) {
        if (val == null || val == "") {
          this.shiftingSearch()
        }
      },
      // 获取列表
      getShiftingList() {
        this.$network.putwarehouse.shifting.shiftingList({
          pageNum: this.pageNum,
          size: this.size
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.statusList = res.data.statusList
            this.moveVOS = res.data.moveVOS
            this.warehouseVOS = res.data.warehouseVOS
            this.total = res.data.total
            let statusList = JSON.parse(JSON.stringify(res.data.statusList));
            let statusLists = convertKey(statusList, ["value"]);
            statusLists.unshift({
              value: "全部状态",
            });
            this.statusListCopy = statusLists;
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error",
            });
          }
        }).catch(err => {
          this.$notify({
            title: "失败",
            message: err,
            type: "error"
          })
        })
      },
      // 搜索
      shiftingSearch() {
        let p1 = new Date(this.form.date1).valueOf()
        let p2 = new Date(this.form.date2).valueOf()
        let p3 = this.value
        let p4 = moment(p1).format('YYYY/MM/DD HH:mm:ss')
        let p5 = moment(p2).format('YYYY/MM/DD HH:mm:ss')
        let p6 = this.input3
        let p7 = this.select
        this.$network.putwarehouse.shifting.shiftingList({
          pageNum: this.pageNum,
          size: this.size,
          code: p6 == "" ? null : p6,
          status: p7 == 0 ? null : p7,
          startTime: p4 == 'Invalid date' ? null : p4 == null ? null : p4 == '1970/01/01 08:00:00' ? null : p4,
          endTime: p5 == 'Invalid date' ? null : p5 == null ? null : p5 == '1970/01/01 08:00:00' ? null : p5,
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.moveVOS = res.data.moveVOS
            this.total = res.data.total
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error",
            });
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
        this.shiftingSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.shiftingSearch()
      },

      // 移货审核
      procurementShenHe(id) {
        // console.log(id);
        this.$network.putwarehouse.shifting.shiftingupdateStatus({
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
            this.getShiftingList()
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
      //  审核通过
      procurementShenHeTong(id) {
        // console.log(id);
        this.$network.putwarehouse.shifting.shiftingupdateStatus({
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
            this.getShiftingList()
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
      // 移库完成
      procurementShenHeRukusheng(id) {
        this.$network.putwarehouse.shifting.shiftingupdateStatus({
          id: id,
          status: 5,
          overruledRemark: ""
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "移库成功",
              type: "success"
            })
            this.getShiftingList()
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
      // 审核驳回
      // 订单驳回理由
      procurementBohui(id) {
        this.bohuiID = id
        this.dialogVisibleBohui = true
      },
      Bohuiq(ruleFormBohui) {
        this.$refs[ruleFormBohui].validate((valid) => {
          if (valid) {
            this.$network.putwarehouse.shifting.shiftingupdateStatus({
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
                this.getShiftingList()
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
      dialogVisibleBohuiq() {
        this.$refs["ruleFormBohui"].resetFields();
        this.bohuiID = ""
      },
      // 点击自动生成
      dianjia() {
        // console.log(1);
        let YK = randomNumberCaseYK()
        // console.log(YK);
        this.ruleFormykuadd.code = YK
      },
      // 添加移库
      shiftingAdd() {
        this.dialogVisibleykadd = true
      },
      // 关闭弹框清楚数据
      dialogVisibleykaddClose() {

        this.$refs['ruleFormykadd'].resetFields()

        this.ids = ""

      },
      // 点击添加移库
      dialogVisibleykaddYk(ruleFormykadd) {
        this.$refs[ruleFormykadd].validate((valid) => {
          if (valid) {
            if (this.ids == "") {

              this.$network.putwarehouse.shifting.shiftingAdd({
                code: this.ruleFormykuadd.code.trim(),
                sourceWarehouseId: this.ruleFormykuadd.value[0],
                sourceReservoirId: this.ruleFormykuadd.value[1],
                sourceShelvesId: this.ruleFormykuadd.value[2],
                sourceLayer: this.ruleFormykuadd.valueceng,
                targetWarehouseId: this.ruleFormykuadd.values[0],
                targetReservoirId: this.ruleFormykuadd.values[1],
                targetShelvesId: this.ruleFormykuadd.values[2],
                targetLayer: this.ruleFormykuadd.valuecengs,
                remark: this.ruleFormykuadd.remark
              }).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "添加移库单成功",
                    type: "success"
                  })
                  this.dialogVisibleykadd = false
                  this.$refs[ruleFormykadd].resetFields();
                  this.getShiftingList()
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

              this.$network.putwarehouse.shifting.shiftingAddUpdate({
                id: this.moveVO.id,
                code: this.moveVO.code.trim(),
                sourceWarehouseId: this.moveVO.selectedSource[0],
                sourceReservoirId: this.moveVO.selectedSource[1],
                sourceShelvesId: this.moveVO.selectedSource[2],
                sourceLayer: this.moveVO.sourceLayer,
                targetWarehouseId: this.moveVO.selectedTarget[0],
                targetReservoirId: this.moveVO.selectedTarget[1],
                targetShelvesId: this.moveVO.selectedTarget[2],
                targetLayer: this.moveVO.targetLayer,
                remark: this.moveVO.remark
              }).then(res => {
                console.log(res);
                if (res.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "编辑移库单成功",
                    type: "success"
                  })
                  this.dialogVisibleykadd = false
                  this.$refs[ruleFormykadd].resetFields();
                  this.getShiftingList()
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
      // 删除
      procurementDelete(id) {
        this.$network.putwarehouse.shifting.shiftingDeleteId(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            this.getPicingList()
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
      // 点击编辑 
      procurementEdit(id) {
        this.dialogVisibleykadd = true
        this.ids = id
        this.$network.putwarehouse.shifting.shiftingselectById(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.moveVO = res.data.moveVO
            let p1 = this.skuVOSIdsChangeOne(res.data.moveVO.selectedSource)
            let p2 = this.skuVOSIdsChangeOne(res.data.moveVO.selectedTarget)
            // console.log(p2);
            this.selectedSourcearrlayer = p1
            this.selectedTargetarrlayer = p2
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
      // 方法
      skuVOSIdsChangeOne(arr) {
        let p1 = arr[0]
        let p2 = arr[1]
        let p3 = arr[2]
        let datas = JSON.parse(JSON.stringify(this.warehouseVOS))
        let selectedSourcearrlayer = ""
        datas.filter(v => {
          if (v.id == p1) {
            v.reservoirVOS.filter(v1 => {
              if (v1.id == p2) {
                // console.log(v1);
                v1.reservoirVOS.filter(v2 => {
                  if (v2.id == p3) {
                    return selectedSourcearrlayer = v2.layer
                  }
                })
              }
            })
          }
        })
        return selectedSourcearrlayer
      },
      // 选择源仓库层数
      skuVOSIdsChange(val) {
        // console.log(val);
        if (val != undefined) {
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
                      return this.ids == '' ? this.arrlayer = v2.layer : this.selectedSourcearrlayer = v2
                        .layer
                    }
                  })
                }
              })
            }
          })
        }

      },
      // 选择目标仓库层数
      skuVOSIdsChanges(val) {
        // console.log(val);
        if (val != undefined) {
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
                      return this.ids == '' ? this.arrlayers = v2.layer : this.selectedTargetarrlayer = v2
                        .layer
                    }
                  })
                }
              })
            }
          })
        }

      },
      // 点击详情
      getyikuData(id) {
        this.moveId = id
        this.dialogVisibleDesc = true
        // console.log(id);
        this.$network.putwarehouse.shifting.shiftingselectByMove(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.moveDetailVOS = res.data.moveDetailVOS
            this.moveStatus = res.data.status
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
        this.$network.putwarehouse.shifting.shiftingselectUsableInventory(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.inventoryList = res.data.inventoryList
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
      // 详情弹框关闭回调
      dialogVisibleDescyk() {
        this.moveId = ""
        this.moveStatus = ""
      },
      // 移库添加产品
      shiftingSkuAdd() {
        this.dialogVisibleDescSku = true

      },
      // 选择产品所对应的单位
      ruleFormDescSkuSelect(val) {
        // console.log(val);
        let p1 = JSON.parse(JSON.stringify(this.inventoryList))
        let data = p1.filter(v => {
          if (v.id == val) {
            return v
          }
        })
        // console.log(data);
        let arr = {}
        arr["skuId"] = data[0].sku.id
        arr["categoryId"] = data[0].category.id
        arr["categoryName"] = data[0].category.name
        arr["quantity"] = data[0].quantity
        this.skuarr = arr
      },
      // 添加详情产品弹框
      dialogVisibleDescSkuClose() {
        this.skuarr = {}
        this.$refs["ruleFormDescSku"].resetFields()
      },
      // 添加详情产品
      dialogVisibleDescSkuAdd(ruleFormDescSku) {
        this.$refs[ruleFormDescSku].validate((valid) => {
          if (valid) {
            // if (this.ids == "") {
            this.$network.putwarehouse.shifting.shiftingSkuAdd({
              moveId: this.moveId,
              skuId: this.skuarr.skuId,
              quantity: this.ruleFormDescSku.quantity,
              categoryId: this.skuarr.categoryId,
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加移库产品成功",
                  type: "success"
                })
                this.dialogVisibleDescSku = false
                this.$refs[ruleFormDescSku].resetFields();
                this.getyikuData(this.moveId)
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
            // } else {

            // this.$network.putwarehouse.shifting.shiftingAddUpdate({
            //   id: this.moveVO.id,
            //   code: this.moveVO.code.trim(),
            //   sourceWarehouseId: this.moveVO.selectedSource[0],
            //   sourceReservoirId: this.moveVO.selectedSource[1],
            //   sourceShelvesId: this.moveVO.selectedSource[2],
            //   sourceLayer: this.moveVO.sourceLayer,
            //   targetWarehouseId: this.moveVO.selectedTarget[0],
            //   targetReservoirId: this.moveVO.selectedTarget[1],
            //   targetShelvesId: this.moveVO.selectedTarget[2],
            //   targetLayer: this.moveVO.targetLayer,
            //   remark: this.moveVO.remark
            // }).then(res => {
            //   console.log(res);
            //   if (res.code === 0) {
            //     this.$notify({
            //       title: "成功",
            //       message: "编辑移库单成功",
            //       type: "success"
            //     })
            //     this.dialogVisibleykadd = false
            //     this.$refs[ruleFormykadd].resetFields();
            //     this.getShiftingList()
            //   } else {
            //     this.$notify({
            //       title: "失败",
            //       message: res.msg,
            //       type: "error"
            //     })
            //   }
            //   }).catch(err => {
            //     this.$notify({
            //       title: "失败",
            //       message: err,
            //       type: "error"
            //     })
            //   })
            // }
          } else {
            this.$message({
              type: "error",
              message: "请填写完整信息",
              showClose: true
            })
          }
        });
      },
      //  删除产品
      procurementDeleteSku(id) {
        this.$network.putwarehouse.shifting.shiftingDeleteSkuId(id).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "删除成功",
              type: "success"
            })
            this.getyikuData(this.moveId)
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
      this.getShiftingList()
    },
  }

</script>
<style lang="scss" scoped>
  .input-with-select {
    .el-select {
      width: 150px;
    }
  }

</style>
