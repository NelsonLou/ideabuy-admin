<template>
<!-- 消息公告发布 -->
<div id="mass-msg">
  <el-card class="box-card">
    <!-- 群发表单 -->
    <el-form :model="formEdit" :loading="listLoading" :key="editFormKey" :rules="MassMsgRules" ref="AdTypeForm" class="adTypeForm">
      <el-form-item label="主消息类型" prop="type" :label-width="formLabelWidth">
        <el-select v-model="formEdit.type" @change="mainChange" filterable placeholder="请选择" class="manageSel">
          <el-option v-for="item in selectMain" :key="item.key" :label="item.statement" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="主消息类型" prop="type" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.type"></el-input>
      </el-form-item> -->
      <el-form-item label="子消息类型" prop="message_type" :label-width="formLabelWidth">
        <el-select v-model="formEdit.message_type" filterable placeholder="请选择" class="manageSel">
          <el-option v-for="item in selectChirld" :key="item.key" :label="item.statement" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="子消息类型" prop="value" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.value"></el-input>
      </el-form-item> -->
      <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="description" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.description" type="textarea" :autosize="{ minRows: 3, maxRows: 2}" class="applyTea"></el-input>
      </el-form-item>
      <el-form-item label="发送对象" prop="audience" :label-width="formLabelWidth">
        <el-select v-model="formEdit.audience" filterable placeholder="请选择" class="manageSel">
          <el-option v-for="item in audienceS" :key="item.key" :label="item.statement" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="发送对象" prop="audience" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.audience"></el-input>
      </el-form-item> -->
      <el-form-item label="操作类型" prop="operate_type" :label-width="formLabelWidth">
        <el-select v-model="formEdit.operate_type" filterable placeholder="请选择" class="manageSel">
          <el-option v-for="item in operate_typeS" :key="item.key" :label="item.statement" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="操作类型" prop="operate_type" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.operate_type"></el-input>
      </el-form-item> -->
      <el-form-item label="对象ID" prop="user_id" :label-width="formLabelWidth">
        <el-input auto-complete="off" v-model="formEdit.user_id"></el-input>
        <p class="popTit">"0"默认发送所有人</p>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="dialog-footer" style="overflow: hidden;">
      <el-button type="primary" @click="handleMassMsgPost()">发送</el-button>
      <el-button type="danger" @click="resetForm('AdTypeForm')">重置</el-button>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'mass-msg',
  data: () => ({
    // 表单验证重置
    editFormKey: 1,
    // 加添理由必填
    MassMsgRules: {
      type: [{
        required: true,
        message: '请输入主消息类型',
        trigger: 'change'
      }],
      message_type: [{
        required: true,
        message: '请输入子消息类型',
        trigger: 'change'
      }],
      title: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }],
      description: [{
        required: true,
        message: '请输入内容',
        trigger: 'blur'
      }],
      audience: [{
        required: true,
        message: '请输入发送对象',
        trigger: 'change'
      }],
      operate_type: [{
        required: true,
        message: '请输入操作类型',
        trigger: 'change'
      }],
      user_id: [{
        required: true,
        message: '请输入对象ID',
        trigger: 'blur'
      }]

    },
    // 下拉数据
    selectMain: [],
    selectChirld: [],
    audienceS: [],
    operate_typeS: [],
    // 点击添加清空表单数据
    formEdit: {
      type: '',
      message_type: '',
      title: '',
      description: '',
      audience: '',
      operate_type: '',
      user_id: ''
    },
    // 加载
    listLoading: false,
    // 表格信息列表
    tableList: [],
    // 搜索框
    input2: '',
    // 弹窗的显示和关闭
    dialogFormVisible: false,
    visible2: false,
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
    // 弹窗表格宽度
    formLabelWidth: '120px',
    // 分页
    currentPage: 1,
    total: 0
  }),
  mounted() {
    // 获取初始列表
    this.handleManageSelect()
  },
  methods: {
    mainChange(val) {
      // console.log(val)
      var selMain = this.selectMain
      for (let i = 0; i < selMain.length; i++) {
        if (selMain[i].value === val) {
          this.selectChirld = selMain[i].message_type
        }
      }
    },
    // 获取下拉数据
    handleManageSelect() {
      // console.log('handleManageSelect')
      this.axios.get(this.$api.message.messagePushSel).then(res => {
        // console.log(res)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.selectMain = data.type
          this.audienceS = data.audience
          this.operate_typeS = data.operate_type
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 发送信息方法
    handleMassMsgPost() {
      // console.log(this.formEdit, '1111111')
      this.$refs.AdTypeForm.validate(valid => {
        if (valid) {
          // console.log(this.formEdit, '111111')
          this.listLoading = true
          this.axios.post(this.$api.message.messagePush, this.formEdit).then(res => {
            // console.log(res)
            const {
              code,
              msg
            } = res.data
            if (code === 1) {
              // console.log('1111111')
              this.$refs['AdTypeForm'].resetFields()
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
            this.listLoading = false
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(AdTypeForm) {
      this.$refs[AdTypeForm].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
#mass-msg {}
.adTypeForm {
    width: 500px;
}
.dialog-footer {
    width: 441px;
    overflow: hidden;
    button:nth-of-type(1) {
        float: left;
        margin-left: 120px;
    }
}
.popTit {
    margin: 0;
    line-height: 18px;
    font-size: 12px;
    color: red;
    width: 320px;
}
.applyTea {
    width: 320px;
}
.manageSel {
    width: 320px;
}
</style>
