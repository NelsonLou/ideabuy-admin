<template>
<!-- 会员列表 -->
<div class="">
  <el-card class="box-card" v-show='infoSwitch'>
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-forms" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <!-- 添加按钮 -->
        <!-- <el-button type="primary" icon="plus" @click="handleAdd()" :class={adClass_add:adClass_add} style="float: right;">添加信息</el-button> -->
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
      <el-table-column label="操作" fixed="right" width="100" class="table_btn">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.row)" size="small" icon="document" :disabled="scope.row.is_BasicInfo < 1 ? true : false" type="primary">详情</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 添加的弹窗 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <wk-form-base :key="editFormKey" label-width="120px" ref="wk-form" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData">
        <el-form-item>
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
  <!-- 详情页 -->
  <el-card v-show='listSwitch' v-loading.dialog="listLoading" class="userdeta">
    <!--工具条-->
    <div slot="header" class="card-header">
      <!-- 返回按钮 -->
      <el-button type="primary" icon="arrow-left" @click="listBack()" :class={list_back:list_back} style="float: left;">返回</el-button>
    </div>
    <el-form :model="form" class="userFrom">
      <el-form-item label="省份:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userAddress.user_province" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="市级:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userAddress.user_city" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="管辖区:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userAddress.user_district" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="详细地址:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userAddress.user_address" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="学历:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_education" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="专业:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_profession" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所在公司:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_company" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收入:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_income" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="QQ:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_qq" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.user_email" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备用联系人:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.link_man" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备用联系人电话:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.link_mobile" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备用联系人关系:" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="userInfo.link_relation" :disabled="true"></el-input>
      </el-form-item>
      <div class="idCardImg">
        <el-form-item :label="idTag[userIdPhotos.tag]" :label-width="formLabelWidth" v-for="userIdPhotos in userIdPhoto" :key="userIdPhotos.file_id">
          <template scope="scope">
            <img :src="userIdPhotos.file_path" alt="" class="applyImg">
          </template>
        </el-form-item>
      </div>
      <div class="bank_info_foth">
        <div class="bank_info" v-for="cardInfos in cardInfo">
          <el-form-item :label-width="formLabelWidth" label="银行logo:">
            <template scope="scope">
              <img :src="cardInfos.bank_logo" alt="" class="applyBank">
            </template>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="银行名称:">
            <el-input auto-complete="off" v-model="cardInfos.bank_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="银行卡卡号:">
            <el-input auto-complete="off" v-model="cardInfos.card_number" :disabled="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </el-card>
</div>
</template>

<script>
import data from './Data/member'
export default {
  name: 'member-list',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 编辑对话框是否显示
    dialogFormVisible: false,
    formType: true,
    editFormKey: 1,
    // 页切换
    listSwitch: false,
    // 加载
    listLoading: false,
    // 返回按钮隐藏和显示
    list_back: true,
    // 搜索框的显示和隐藏
    adClass_serch: false,
    // 添加按钮的显示和隐藏
    adClass_add: false,
    // 表单
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    // 详情用户地址信息
    userAddress: {},
    // 详情用户信息
    userInfo: {},
    // 详情银行卡信息
    cardInfo: {},
    // 用户身份证照片
    userIdPhoto: {},
    // 用户身份证照片类型
    idTag: ['身份证正面照', '身份证背面照', '身份证手持照'],
    // 弹窗表格宽度
    formLabelWidth: '120px',
    // 弹窗切换
    infoSwitch: true
  }),
  mounted() {
    // 获取初始列表
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-table'].query(this.$api.user.userList, para, 'user_list')
    },
    // 获取新增数据
    handleAdd() {
      this.dialogFormVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 获取补充数据
    getInfo(obj) {
      // 角色列表
      this.data.editItem[0].options = obj.role_list.map(item => {
        return {
          value: item.id,
          label: item.display_name
        }
      })
      // 新增数据
      this.$refs['wk-form'].merge(obj)
    },
    // 点击编辑获取本行详情
    handleEdit(row) {
      this.list_back = false
      this.adClass_add = true
      this.adClass_serch = true
      this.listSwitch = true
      this.infoSwitch = false
      let userId = {
        params: {
          user_id: row.user_id
        }
      }
      // console.log(userId)
      this.listLoading = true
      this.axios.get(this.$api.user.userDetail, userId).then(res => {
        // console.log(res, '222')
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.userAddress = data.user_address
          this.userInfo = data.user_info
          this.cardInfo = data.card_info
          this.userIdPhoto = data.user_idphoto
          this.listLoading = false
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加保存
    editSave(obj) {
      this.dialogFormVisible = false
      // 添加请求参数
      const para = {
        real_name: obj.real_name,
        user_idcard: obj.user_idcard,
        user_mobile: obj.user_mobile,
        user_password: 'a1234567'
      }
      // console.log(para)
      // 调用组件提交数据
      this.$refs['wk-form'].save(this.$api.user.userAdd, para)
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-form'].submit()
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    },
    // 点击返回
    listBack() {
      this.list_back = true
      this.adClass_add = false
      this.adClass_serch = false
      this.listSwitch = false
      this.infoSwitch = true
    }
  }
}
</script>

<style lang="scss" scoped>
.list_back {
    display: none;
}
.adClass_add {
    display: none;
}
.adClass_serch {
    display: none;
}
.applyImg {
    width: 100%;
    height: 100%;
}
.idCardImg {
    width: 100%;
    overflow: hidden;
}
.applyBank {
    height: 79px;
    border: 2px solid #f2f2f2;
    border-radius: 5px;
    box-shadow: 0 0 5px #999;
}
.bank_info {
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
    border-left: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    padding-right: 5px;
    padding-top: 15px;
    .el-form-item {
        margin: 0;
    }
    &:nth-of-type(1) {
        border-top: 1px solid #f2f2f2;
    }
}
</style>
<style lang="scss">
.userFrom {
    width: 100%;
    overflow: hidden;
    .el-form-item {
        width: 33.3%;
        float: left;
    }
}
.idCardImg .el-form-item__content {
    max-width: 320px;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 5px #cdcdcd;
    height: 170px;
    margin-top: 2px;
}
</style>
