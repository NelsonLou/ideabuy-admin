<template>
<!-- 会员审核 -->
<div class="">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-forms" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" @keyup.enter.native="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
      <el-table-column label="操作" fixed="right" width="100" class="table_btn">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.row)" size="small" :icon="scope.row.status < 2 ? 'edit':'document'" :type="scope.row.status < 2 ? 'warning':'primary'">{{scope.row.status < 2 ? '审核' : '详情'}}</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 审核&详情的弹窗 -->
    <el-dialog :title="pupTitle < 2 ? '用户信息审核':'用户信息详情'" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :key="editFormKey" :model="formEdit" :rules="applyRules" ref="applysForm" class="applyForm">
        <el-form-item label="审核ID" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.apply_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.real_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.user_idcard" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核理由" prop="reason" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.reason" :disabled="pupTitle < 2 ? false:true" type="textarea" :autosize="{ minRows: 3, maxRows: 2}" class="applyTea"></el-input>
        </el-form-item>
        <el-form-item :label="idTag[userIdPhotos.tag]" :label-width="formLabelWidth" v-for="userIdPhotos in userIdPhoto" :key="userIdPhotos.file_id">
          <template scope="scope">
            <img :src="userIdPhotos.file_path" alt="" class="applyImg">
          </template>
        </el-form-item>
        <div class="pupBtn">
          <el-button type="primary" @click="editPost()">{{pupTitle
            < 2 ? '审核通过': '确定'}}</el-button>
              <el-button @click="canselPost()">{{pupTitle
                < 2 ? '审核驳回': '取消'}}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import data from './Data/memberVerify'
export default {
  data() {
    return {
      data,
      // 筛选关键字
      filters: {},
      // 加载
      listLoading: false,
      // 弹窗的显示和关闭
      dialogFormVisible: false,
      // 表单类型
      // formType: true,
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
      // 用户身份证照片类型
      idTag: ['身份证正面照', '身份证背面照', '身份证手持照'],
      // 弹出框标题
      pupTitle: null,
      // 弹窗表格宽度
      formLabelWidth: '120px',
      // 表单验证重置
      editFormKey: 1,
      // 修改信息的映射
      formEdit: {},
      // 用户身份证照片
      userIdPhoto: [],
      // 编辑表单验证
      applyRules: {
        reason: [{
          required: true,
          message: '请输入通过或驳回的理由',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 审核状态转换
    applyZT: row => {
      return row.status === 1 ? '未审核' : row.status === 2 ? '审核成功' : '审核失败'
    },
    // 获取列表数据
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-table'].query(this.$api.user.applyList, para, 'userapply_list')
    },
    // 点击编辑获取本行详情
    handleEdit(row) {
      this.listLoading = true
      // console.log(row)
      const classId = {
        params: {
          user_id: row.user_id
        }
      }
      this.axios.get(this.$api.user.applyDetail, classId).then(res => {
        // console.log(res, '123456')
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.listLoading = false
          this.dialogFormVisible = true
          var newData = data.apply_info
          this.formEdit = {
            user_id: newData.user_id,
            apply_id: newData.apply_id,
            real_name: newData.real_name,
            user_idcard: newData.user_idcard,
            id_img: newData.id_img,
            status: newData.status,
            reason: newData.reason
          }
          this.userIdPhoto = data.user_idphoto
          this.pupTitle = this.formEdit.status
          // console.log(this.userIdPhoto, '111111')
          // commit('AD_CLASS', res.data.data.tableList)
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 编辑完成提交方法
    editPost() {
      // 审核通过提交
      this.listLoading = true
      if (this.pupTitle < 2) {
        this.formEdit.status = 2
        // console.log(this.pupTitle)
        this.axios.post(this.$api.user.applyEdit, this.formEdit).then(res => {
          // console.log(res.data, '11111')
          const {
            code,
            msg
          } = res.data
          if (code === 1) {
            this.listLoading = false
            this.getData(null)
          } else {
            this.$message.error(msg)
          }
        }).catch(error => {
          console.log(error)
        })
        this.dialogFormVisible = false
      } else {
        // console.log('1111111')
        this.listLoading = false
        this.dialogFormVisible = false
      }
    },
    canselPost() {
      // 审核驳回提交
      this.listLoading = true
      if (this.pupTitle < 2) {
        this.$refs.applysForm.validate(valid => {
          if (valid) {
            this.formEdit.status = 3
            // console.log(this.formEdit.status)
            this.axios.post(this.$api.user.applyEdit, this.formEdit).then(res => {
              // console.log(res.data, '11111')
              const {
                code,
                msg
              } = res.data
              if (code === 1) {
                this.listLoading = false
                this.getData(null)
              } else {
                this.$message.error(msg)
              }
            }).catch(error => {
              console.log(error)
            })
            this.dialogFormVisible = false
            this.editFormKey = Date.parse(new Date()) / 1000
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        // console.log('1111111')
        this.listLoading = false
        this.dialogFormVisible = false
        this.editFormKey = Date.parse(new Date()) / 1000
      }
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    }
  }
}
</script>

<style lang="scss" scoped>
.adClass_serch {
    width: 260px;
    float: left;
}
.applyImg {
    width: 320px;
    display: block;
}
.applyForm {
    width: 500px;
}
.applyTea {
    width: 320px;
}
.toolBtn {
    overflow: hidden;
    border-bottom: 1px solid #f8f8f8;
    padding: 16px 20px;
    background: #fff;
}
.pupBtn {
    width: 320px;
    margin-left: 120px;
    overflow: hidden;
    text-align: left;
    .el-button--primary {
        margin: 0;
    }
}
</style>
