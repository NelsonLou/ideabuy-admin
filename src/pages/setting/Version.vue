<template>
<!-- 版本管理 -->
<div id="version">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-form" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-button type="primary" icon="plus" @click="handleAdd()" class="header-right">添加信息</el-button>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" fixed="right" width="100">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 编辑&添加弹窗 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible" class="listPup" :before-close="handleClose">
      <el-form :model="formEdit" :key="editFormKey" :rules="rules" ref="ruleForm" class="adListForm">
        <el-form-item label="版本" prop="version" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.version"></el-input>
        </el-form-item>
        <!-- 下拉框版本 -->
        <el-form-item label="设备" prop="device" :label-width="formLabelWidth">
          <el-select v-model="formEdit.device" filterable placeholder="请选择" class="manageSel">
            <el-option v-for="item in selectS" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框更新模式 -->
        <el-form-item label="更新模式" prop="update_mode" :label-width="formLabelWidth">
          <el-select v-model="formEdit.update_mode" filterable placeholder="请选择" class="manageSel">
            <el-option v-for="item in selectM" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框更新类型 -->
        <el-form-item label="更新类型" prop="update_type" :label-width="formLabelWidth">
          <el-select v-model="formEdit.update_type" filterable placeholder="请选择" class="manageSel">
            <el-option v-for="item in selectT" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框模块 -->
        <el-form-item label="模块" prop="module" :label-width="formLabelWidth">
          <el-select v-model="formEdit.module" filterable placeholder="请选择" class="manageSel">
            <el-option v-for="item in selectE" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本内容" prop="version_content" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="formEdit.version_content" type="textarea" :autosize="{ minRows: 3, maxRows: 2}" class="applyTea"></el-input>
        </el-form-item>
        </el-form-item>
        <!-- 文件上传 -->
        <el-upload class="upload-demo" :action="fileUp" :data="{device: formEdit.device,module: formEdit.module}" :headers="header" :fileList="upFileClean" :on-success="handlePreview" :on-remove="handleRemove" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="color: red;">请选择文件</div>
        </el-upload>
        <div class="pupBtn">
          <el-button type="primary" @click="editPost()">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/version'
export default {
  data() {
    return {
      data,
      // 上传文件额外参数
      upData: {},
      // 筛选关键字
      filters: {},
      // 文件上传的请求头
      header: this.$api.config.headers,
      // 列表加载
      tableList: [],
      // 加载
      listLoading: false,
      // 表单弹窗的关闭开启
      dialogFormVisible: false,
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
      // 文件上传接口
      fileUp: this.$api.config.url + this.$api.setting.fileUpload,
      formLabelWidth: '120px',
      // 表单数据获取
      formEdit: {},
      // 下拉框数据
      // 版本
      selectS: [],
      // 更新模式
      selectM: [],
      // 模块
      selectT: [],
      // 更新类型
      selectE: [],
      // 批量选中列表
      // sels: [],
      // selectInp: '',
      dialogVisible: false,
      // 添加清空上传文件
      upFileClean: [],
      fileList: [],
      // 文件上传成功返回的地址
      fileInfo: [],
      // 表单验证重置
      editFormKey: 1,
      formData: {
        version: '',
        device: '',
        update_mode: '',
        update_type: '',
        module: '',
        version_content: '',
        file: ''
      },
      // 编辑表单验证
      rules: {
        version: [{
          required: true,
          message: '请输入版本号',
          trigger: 'blur'
        }],
        device: [{
          required: true,
          message: '请选择设备',
          trigger: 'change'
        }],
        update_mode: [{
          required: true,
          message: '请选择更新模式',
          trigger: 'change'
        }],
        update_type: [{
          required: true,
          message: '请选择更新类型',
          trigger: 'change'
        }],
        module: [{
          required: true,
          message: '请选择模块',
          trigger: 'change'
        }],
        version_content: [{
          required: true,
          message: '请输入版本内容',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    // 获取初始列表
    this.getData()
    this.handleManageSelect()
    this.formEdit = this.formData
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
      this.$refs['wk-list'].query(this.$api.setting.versionList, para, 'version')
    },
    // 文件上传成功返回的钩子
    handlePreview(response, file, fileList) {
      // console.log('111111', response.data.file_path)
      var arr = this.fileInfo
      var obj = {
        file_path: response.data.file_path,
        file_md5: response.data.file_md5
      }
      arr.push(obj)
      // console.log(this.fileInfo)
    },
    // 删除上传的文件返回的钩子
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    // 页面加载时加载下拉框数据
    handleManageSelect() {
      // console.log('handleManageSelect')
      this.axios.get(this.$api.setting.versionDispaly).then(res => {
        // console.log(res.data.data)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.selectS = data.device
          this.selectM = data.update_mode
          this.selectT = data.update_type
          this.selectE = data.module
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加信息
    handleAdd() {
      this.listLoading = true
      this.upFileClean = []
      this.dialogFormVisible = true
      this.formEdit = this.formData
      this.fileInfo = []
      // this.$refs['ruleForm'].resetFields()
      // console.log(this.formEdit)
    },
    // 添加完成提交方法
    editPost() {
      //  添加后提交
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // console.log(this.fileInfo)
          let para = {
            json: true,
            version: this.formEdit.version,
            device: this.formEdit.device,
            update_type: this.formEdit.update_type,
            update_mode: this.formEdit.update_mode,
            version_content: this.formEdit.version_content,
            module: this.formEdit.module,
            version_url: this.fileInfo
          }
          // console.log('111111', para)
          this.listLoading = true
          this.axios.post(this.$api.setting.versionAdd, para).then(res => {
            // console.log('11111', res)
            const {
              code,
              msg
            } = res.data
            if (code === 1) {
              this.listLoading = false
              this.$message.success(msg)
              this.$refs['ruleForm'].resetFields()
              this.getData()
            } else {
              this.$message.error(msg)
            }
          }).catch(error => {
            console.log(error)
          })
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.$refs['ruleForm'].resetFields()
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-form'].search()
    },
    // 删除方法
    handleDel(index, row) {
      // 请求参数
      const para = {
        id: row.id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.setting.versionDelete, para)
    },
    // 批量删除用户列表
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.id).toString()
      // 请求参数
      const para = {
        id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.setting.versionAllDelete, para, 'batch')
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
    padding: 0 52px 0 120px;
}
.manageSel {
    width: 320px;
}
.adListForm {
    width: 500px;
}
.toolBtn {
    overflow: hidden;
    border-bottom: 1px solid #f8f8f8;
    padding: 16px 20px;
    background: #fff;
}
.applyTea {
    width: 320px;
}
.pupBtn {
    width: 320px;
    margin-left: 120px;
    margin-top: 10px;
    overflow: hidden;
    .el-button--primary {
        float: left;
        margin: 0;
    }
}
</style>
