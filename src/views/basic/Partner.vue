<template>
  <div class="partner">
    <!-- 合作 -->
    <h3>合作方管理</h3>
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <!-- 供应商 -->
      <el-tab-pane label="供应商管理" name="first">
        <el-button type="primary" @click="partnerAdd">添加供应商</el-button>
        <el-input @input="partnerInput" clearable v-model="input" placeholder="请输入公司编码" class="input-with-input">
        </el-input>
        <el-input @input="partnerInput" clearable placeholder="请输入公司名称" v-model="input3" class="input-with-select">
          <!-- <el-select class="el_select" v-model="select" slot="prepend" placeholder="请选择分类"> -->
          <!-- <el-option :label="item.name" :value="item.id" v-for="item in ReservoirKuquCopy" :key="item.id"></el-option> -->
          <!-- </el-select> -->
          <el-button @click="partnerSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 卡片表格 -->
        <el-card style="marginTop:15px">
          <!--表格  -->
          <el-table :data="supplierVOS" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="rolesexpand">
                  <div>
                    <el-tag size="mini" type="info">供应商编号</el-tag> {{scope.row.code}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">供应商ID</el-tag> {{scope.row.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">供应商名称</el-tag> {{scope.row.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">联系人</el-tag> {{scope.row.contactName}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">联系人电话</el-tag> {{scope.row.phone}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">工具人</el-tag> {{scope.row.lastOperationUser}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">类型</el-tag> {{scope.row.type}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">邮箱</el-tag> {{scope.row.email}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">地址</el-tag>
                    {{scope.row.province}}{{scope.row.city}}{{scope.row.district}}{{scope.row.addressLine}}
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
            <el-table-column align="center" type="index" label="#" width="50">
            </el-table-column>
            <el-table-column align="center" prop="code" label="编码">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.code}}</el-button>
                <!-- <el-tag size="small" type="success">{{scope.row.phone}}</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="公司名称">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.name}}</el-button>
                <!-- <el-tag size="small" type="success">{{scope.row.phone}}</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="contactName" label="联系人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.contactName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="联系人电话">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.phone}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="lastOperationUser" label="工具人">
              <template slot-scope="scope">
                <el-tag size="small" type="warning">{{scope.row.lastOperationUser}}</el-tag>
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
            <el-table-column align="center" prop="address" label="操作" width="270">
              <template slot-scope="scope">
                <el-button icon="el-icon-menu" size="mini" type="primary" @click="partherSearchId(scope.row.id)">查看
                </el-button>
                <el-button type="info" icon="el-icon-edit" size="mini" @click="partnerEdit(scope.row.id)">编辑
                </el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="partnerDelete(scope.row.id)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background style="marginTop:15px" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 15, 20, 30]"
            :page-size="size" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <!-- 客户 -->
      <el-tab-pane label="客户管理" name="firss">
        <el-button type="primary" @click="partnerAdds">添加客户</el-button>
        <el-input @input="partnerInputs" clearable v-model="inputs" placeholder="请输入公司编码" class="input-with-input">
        </el-input>
        <el-input @input="partnerInputs" clearable placeholder="请输入公司名称" v-model="input3s" class="input-with-select">
          <!-- <el-select class="el_select" v-model="select" slot="prepend" placeholder="请选择分类"> -->
          <!-- <el-option :label="item.name" :value="item.id" v-for="item in ReservoirKuquCopy" :key="item.id"></el-option> -->
          <!-- </el-select> -->
          <el-button @click="partnerSearchs" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 卡片表格 -->
        <el-card style="marginTop:15px">
          <!--表格  -->
          <el-table :data="clientVOS" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="rolesexpand">
                  <div>
                    <el-tag size="mini" type="info">客户编号</el-tag> {{scope.row.code}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">客户ID</el-tag> {{scope.row.id}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">客户名称</el-tag> {{scope.row.name}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">联系人</el-tag> {{scope.row.contactName}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">联系人电话</el-tag> {{scope.row.phone}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">工具人</el-tag> {{scope.row.lastOperationUser}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">类型</el-tag> {{scope.row.type}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">邮箱</el-tag> {{scope.row.email}}
                  </div>
                  <div>
                    <el-tag size="mini" type="info">地址</el-tag>
                    {{scope.row.province}}{{scope.row.city}}{{scope.row.district}}{{scope.row.addressLine}}
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
            <el-table-column align="center" type="index" label="#" width="50">
            </el-table-column>
            <el-table-column align="center" prop="code" label="编码">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.code}}</el-button>
                <!-- <el-tag size="small" type="success">{{scope.row.phone}}</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="公司名称">
              <template slot-scope="scope">
                <el-button size="small" type="text">{{scope.row.name}}</el-button>
                <!-- <el-tag size="small" type="success">{{scope.row.phone}}</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="contactName" label="联系人">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.contactName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="联系人电话">
              <template slot-scope="scope">
                <el-tag size="small" type="success">{{scope.row.phone}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="lastOperationUser" label="工具人">

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
            <el-table-column align="center" prop="address" label="操作">
              <template slot-scope="scope">
                <el-button @click="partnerEdits(scope.row.id)" type="primary" icon="el-icon-edit" size="small">编辑
                </el-button>
                <el-button @click="partnerDelete(scope.row.id)" type="danger" icon="el-icon-delete" size="small">删除
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
    </el-tabs>
    <!-- 添加供应商 -->
    <el-dialog title="添加供应商" @close="addPartnerClose" :visible.sync="dialogVisible" width="25%">
      <el-form :model="addPartner" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="供应商编号" prop="code">
          <el-input v-model="addPartner.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjia">点击生成</el-button>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="addPartner.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="contactName">
          <el-input v-model="addPartner.contactName" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addPartner.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addPartner.province" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addPartner.city" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="addPartner.district" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressLine">
          <el-input v-model="addPartner.addressLine" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartner.email" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addPartner.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="partnerAddUser('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加客户 -->
    <el-dialog title="添加客户" @close="addPartnerCloses" :visible.sync="dialogVisibles" width="25%">
      <el-form :model="addPartners" ref="ruleForms" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="code">
          <el-input v-model="addPartners.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjiakh">点击生成</el-button>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="addPartners.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="contactName">
          <el-input v-model="addPartners.contactName" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addPartners.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addPartners.province" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addPartners.city" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="addPartners.district" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressLine">
          <el-input v-model="addPartners.addressLine" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartners.email" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addPartner.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="partnerAddUsers('ruleForms')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑供应商 -->
    <el-dialog title="编辑供应商" @close="addPartnerCloseEdit" :visible.sync="dialogVisibleEdit" width="25%">
      <el-form :model="addPartnerEdit" ref="ruleFormEdit" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="供应商编号" prop="code">
          <el-input v-model="addPartnerEdit.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjiaEDit">点击生成</el-button>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="addPartnerEdit.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="contactName">
          <el-input v-model="addPartnerEdit.contactName" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addPartnerEdit.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addPartnerEdit.province" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addPartnerEdit.city" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="addPartnerEdit.district" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressLine">
          <el-input v-model="addPartnerEdit.addressLine" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartnerEdit.email" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addPartnerEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="partnerAddUserEdit('ruleFormEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑客户 -->
    <el-dialog title="编辑客户" @close="addPartnerClosesEdit" :visible.sync="dialogVisiblesEdit" width="25%">
      <el-form :model="addPartnersEdit" ref="ruleFormsEdit" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="code">
          <el-input v-model="addPartnersEdit.code" style="width:60%"></el-input>
          <el-button type="success" round size="small" style="marginLeft:20px" @click="dianjiaEDitkh">点击生成</el-button>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="addPartnersEdit.name" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="contactName">
          <el-input v-model="addPartnersEdit.contactName" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="phone">
          <el-input v-model="addPartnersEdit.phone" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addPartnersEdit.province" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addPartnersEdit.city" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="addPartnersEdit.district" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressLine">
          <el-input v-model="addPartnersEdit.addressLine" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="addPartnersEdit.email" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addPartnersEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblesEdit = false">取 消</el-button>
        <el-button type="primary" @click="partnerAddUsersEdit('ruleFormsEdit')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="供应商产品" :visible.sync="dialogVisibleGongyinhzs" @close="addPartnerCloseGongyinhs" width="78%">
      <div class="gongyinhs">
        <el-card class="gongyinhs_one">
          <el-table :data="skuVOSCopy" border style="width: 100%">
            <el-table-column align="center" label="已绑定供应商的产品">
              <el-table-column prop="code" align="center" label="产品编号">
              </el-table-column>
              <el-table-column prop="name" align="center" label="产品名称">
              </el-table-column>
              <el-table-column prop="skuInfos[0].supplierName" align="center" width="220" label="供应商">
              </el-table-column>
              <el-table-column prop="skuInfos[0].price" align="center" label="价格" width="90">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                  <el-input v-model="scope.row.skuInfos[0].price"></el-input>
                  <!-- <input type="text" :value="scope.row.skuInfos[0].price"> -->
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="修改价格,添加时价格不可以为空" placement="top">
                    <el-button size="mini" type="primary" @click="partherupdateSkuPrice(scope.row.id)">+</el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="移除供应商所绑定的产品" placement="top">
                    <el-button size="mini" @click="partneroptionSkuDelete(scope.row.id)" type="danger">-</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-card>
        <el-card class="gongyinhs_two">
          <el-table :data="NoSupplierSkuVOS" border style="width: 100%">
            <el-table-column align="center" label="未绑定供应商的产品">
              <el-table-column prop="code" align="center" label="产品编号" width="100">
              </el-table-column>
              <el-table-column prop="name" align="center" label="产品名称">
              </el-table-column>
              <el-table-column align="center" label="价格" width="90">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                  <el-input v-model="scope.row.partnerprices"></el-input>
                </template>

              </el-table-column>
              <el-table-column align="center" label="备注">
                <template slot-scope="scope">
                  <el-input type="textarea" v-model="scope.row.partnerremarks" autosize></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="此产品绑定供应商" placement="top">
                    <el-button size="mini" type="primary" @click="partnerOptionSku(scope.row.id)">+</el-button>
                  </el-tooltip>
                  <!-- <el-tooltip class="item" effect="dark" content="移除供应商所绑定的产品" placement="top">
                  <el-button size="mini" @click="partneroptionSkuDelete(scope.row.id)" type="danger">-</el-button>
                </el-tooltip> -->
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    randomNumberGYS,
    randomNumberKH
  } from "@/plugins/unit.js"
  export default {
    data() {
      return {
        activeName: "first",
        input: "",
        input3: "",
        select: "",
        inputs: "",
        input3s: "",
        pageNum: 1,
        size: 10,
        total: 0,
        pageNums: 1,
        sizes: 10,
        totals: 0,
        supplierVOS: [],
        clientVOS: [],
        typeParther: 2,
        typeUser: 1,
        dialogVisible: false,
        dialogVisibles: false,
        dialogVisibleEdit: false,
        dialogVisiblesEdit: false,
        dialogVisibleGongyinhzs: false,
        addPartner: {
          code: "",
          name: "",
          province: "",
          city: "",
          district: "",
          addressLine: "",
          contactName: "",
          phone: "",
          email: "",
          remark: ""
        },
        addPartners: {
          code: "",
          name: "",
          province: "",
          city: "",
          district: "",
          addressLine: "",
          contactName: "",
          phone: "",
          email: "",
          remark: ""
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
          contactName: [{
            required: true,
            message: '请输入负责人',
            trigger: ['blur', 'change']
          }],
          phone: [{
              required: true,
              message: '请输入负责人电话',
              trigger: ['blur', 'change']
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请輸入正确的格式',
              trigger: ['blur', 'change']
            }
          ],
        },
        addPartnerEdit: {},
        addPartnersEdit: {},
        NoSupplierSkuVOS: [],
        skuVOSCopy: [],
        supplierId: ""
      }
    },
    methods: {
      dianjia() {
        let GYS = randomNumberGYS()
        // console.log(JH);
        this.addPartner.code = GYS
      },
      dianjiaEDit() {
        let GYS = randomNumberGYS()
        // console.log(JH);
        this.addPartnerEdit.code = GYS
      },
      dianjiakh() {
        let KH = randomNumberKH()
        // console.log(JH);
        this.addPartners.code = KH
      },
      dianjiaEDitkh() {
        let KH = randomNumberKH()
        // console.log(JH);
        this.addPartnersEdit.code = KH
      },
      // 供应商请求列表
      getpartnerList() {
        this.$network.basic.partner.partnerList({
          pageNum: this.pageNum,
          size: this.size,
          type: this.typeParther
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.supplierVOS = res.data.supplierVOS;
            this.total = res.data.supplierTotal
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
      // 客户请求列表
      getpartnerListuser() {
        this.$network.basic.partner.partnerList({
          pageNum: this.pageNums,
          size: this.sizes,
          type: this.typeUser
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.clientVOS = res.data.clientVOS
            this.totals = res.data.clientTotal
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
        this.partnerSearch()
      },
      handleCurrentChange(newpage) {
        this.pageNum = newpage
        this.partnerSearch()
      },
      handleSizeChanges(newsize) {
        this.sizes = newsize
        this.partnerSearchs()
      },
      handleCurrentChanges(newpage) {
        this.pageNums = newpage
        this.partnerSearchs()
      },
      partnerInput(vla) {
        if (vla === "") {
          this.getpartnerList()
        }
      },
      partnerInputs(vla) {
        if (vla === "") {
          this.getpartnerListuser()
        }
      },
      // 搜索供应商
      partnerSearch() {
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
        this.$network.basic.partner.partnerList({
          pageNum: this.pageNum,
          size: this.size,
          code: p2 == '' ? null : p2,
          name: p1 == "" ? null : p1,
          type: this.typeParther
        }).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.supplierVOS = res.data.supplierVOS;
            this.total = res.data.supplierTotal
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
      // 搜索客户
      partnerSearchs() {
        let p1 = this.input3s
        let p2 = this.inputs
        // console.log(p1, p2);
        // if (p1 == "" && p2 == "") {
        //   this.$notify({
        //     title: "失败",
        //     message: "查询内容不可以为空",
        //     type: "error"
        //   })
        // } else {
        this.$network.basic.partner.partnerList({
          pageNum: this.pageNum,
          size: this.size,
          code: p2 == "" ? null : p2,
          name: p1 == "" ? null : p1,
          type: this.typeUser
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.clientVOS = res.data.clientVOS;
            this.totals = res.data.clientTotal
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
      // 添加供应商
      partnerAdd() {
        this.dialogVisible = true
      },
      partnerAdds() {
        this.dialogVisibles = true
      },
      // 添加供应商
      partnerAddUser(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$network.basic.partner.partnerAdd({
              code: this.addPartner.code,
              name: this.addPartner.name,
              province: this.addPartner.province,
              city: this.addPartner.city,
              district: this.addPartner.district,
              addressLine: this.addPartner.addressLine,
              contactName: this.addPartner.contactName,
              phone: this.addPartner.phone,
              email: this.addPartner.email,
              remark: this.addPartner.remark,
              type: this.typeParther
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加供应商成功",
                  type: "success"
                })
                this.dialogVisible = false
                this.$refs[ruleForm].resetFields();
                this.getpartnerList()
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
      // 添加客户s
      partnerAddUsers(ruleForms) {
        this.$refs[ruleForms].validate((valid) => {
          if (valid) {
            this.$network.basic.partner.partnerAdd({
              code: this.addPartners.code,
              name: this.addPartners.name,
              province: this.addPartners.province,
              city: this.addPartners.city,
              district: this.addPartners.district,
              addressLine: this.addPartners.addressLine,
              contactName: this.addPartners.contactName,
              phone: this.addPartners.phone,
              email: this.addPartners.email,
              remark: this.addPartners.remark,
              type: this.typeUser
            }).then(res => {
              // console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "添加客户成功",
                  type: "success"
                })
                this.dialogVisibles = false
                this.$refs[ruleForms].resetFields();
                this.getpartnerListuser()
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
      // 删除
      partnerDelete(id) {
        this.$confirm('此操作将删除关联的所有数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$network.basic.partner.partnerDelete(id).then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.$notify({
                title: "删除成功",
                type: "success"
              })
              if (this.supplierVOS.length === 1 && this.pageNum > 1) {
                this.pageNum--

              }
              if (this.clientVOS.length === 1 && this.pageNums > 1) {
                this.pageNums--

              }
              this.getpartnerList()
              this.getpartnerListuser()

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
      // 回显供应商
      partnerEdit(id) {
        this.dialogVisibleEdit = true
        this.$network.basic.partner.partnerSearch(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.addPartnerEdit = res.data.companyVO;
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
      partnerAddUserEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$network.basic.partner.partnerAddUpdate({
              id: this.addPartnerEdit.id,
              code: this.addPartnerEdit.code,
              name: this.addPartnerEdit.name,
              province: this.addPartnerEdit.province,
              city: this.addPartnerEdit.city,
              district: this.addPartnerEdit.district,
              addressLine: this.addPartnerEdit.addressLine,
              contactName: this.addPartnerEdit.contactName,
              phone: this.addPartnerEdit.phone,
              email: this.addPartnerEdit.email,
              remark: this.addPartnerEdit.remark,
              type: this.typeParther
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑供应商成功",
                  type: "success"
                })
                this.dialogVisibleEdit = false
                this.$refs[ruleFormEdit].resetFields();
                this.getpartnerList()
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
      // 回显客户
      partnerEdits(id) {
        this.dialogVisiblesEdit = true
        this.$network.basic.partner.partnerSearch(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.addPartnersEdit = res.data.companyVO;
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
      // 回显客户添加
      partnerAddUsersEdit(ruleFormsEdit) {
        this.$refs[ruleFormsEdit].validate((valid) => {
          if (valid) {
            this.$network.basic.partner.partnerAddUpdate({
              id: this.addPartnersEdit.id,
              code: this.addPartnersEdit.code,
              name: this.addPartnersEdit.name,
              province: this.addPartnersEdit.province,
              city: this.addPartnersEdit.city,
              district: this.addPartnersEdit.district,
              addressLine: this.addPartnersEdit.addressLine,
              contactName: this.addPartnersEdit.contactName,
              phone: this.addPartnersEdit.phone,
              email: this.addPartnersEdit.email,
              remark: this.addPartnersEdit.remark,
              type: this.typeUser
            }).then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$notify({
                  title: "成功",
                  message: "编辑客户成功",
                  type: "success"
                })
                this.dialogVisiblesEdit = false
                this.$refs[ruleFormsEdit].resetFields();
                this.getpartnerListuser()
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
      // 关闭添加供应商的弹框回调
      addPartnerClose() {
        this.$refs["ruleForm"].resetFields();
      },
      addPartnerCloses() {
        this.$refs["ruleForms"].resetFields();
      },
      addPartnerCloseEdit() {
        this.$refs["ruleFormEdit"].resetFields();
      },
      addPartnerClosesEdit() {
        this.$refs["ruleFormsEdit"].resetFields();
      },
      addPartnerCloseGongyinhs() {
        this.supplierId = ""
      },
      // 查看产品
      partherSearchId(id) {
        // console.log(id);
        this.supplierId = id
        this.dialogVisibleGongyinhzs = true
        this.$network.basic.partner.partnerShowSkus(id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.NoSupplierSkuVOS = res.data.NoSupplierSkuVOS;
            this.skuVOSCopy = res.data.skuVOS
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
      // 修改产品价格
      partherupdateSkuPrice(id) {
        let ids = this.supplierId
        // console.log(id, ids);
        let data = this.skuVOSCopy.filter(v => {
          if (v.id == id) {
            return v
          }
        })
        this.$network.basic.partner.partnerupdateSkuPrice({
          supplierId: ids,
          skuId: id,
          price: data[0].skuInfos[0].price
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: '修改产品价格成功',
              type: "success"
            })
            this.partherSearchId(this.supplierId)
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
      // 移除已绑定产品
      partneroptionSkuDelete(id) {
        let ids = this.supplierId
        this.$network.basic.partner.partneroptionSkuDelete({
          supplierId: ids,
          skuId: id
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "移除已绑定的产品成功",
              type: "success"
            })
            this.partherSearchId(this.supplierId)
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
      // 产品绑定供应商
      partnerOptionSku(id) {
        let ids = this.supplierId
        let data = this.NoSupplierSkuVOS.filter(v => {
          if (v.id == id) {
            return v
          }
        })
        // console.log(data);
        this.$network.basic.partner.partnerOptionSku({
          supplierId: ids,
          skuId: id,
          price: data[0].partnerprices,
          remark: data[0].partnerremarks
        }).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.$notify({
              title: "成功",
              message: '绑定产品成功',
              type: "success"
            })
            this.partherSearchId(this.supplierId)
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
      this.getpartnerList()
      this.getpartnerListuser()
    },
  }

</script>
<style lang="scss" scoped>
  .partner {
    .gongyinhs {
      display: flex;

      &_one {
        flex: 1;
        margin-right: 5px;
        height: 100%;
      }

      &_two {
        flex: 1;
        margin-left: 5px;
        height: 100%;

      }
    }

    .rolesexpand {
      div {
        margin-bottom: 10px;

        .el-tag {
          margin-right: 5px;
        }
      }
    }

    .input-with-input {
      width: 12%;
      margin-left: 55px;
    }

    .input-with-select {

      width: 25%;
      margin-left: 50px;

      /deep/ .el-input-group__prepend {
        background-color: #fff;
      }

      .el_select {
        width: 140px;
      }
    }
  }

</style>
