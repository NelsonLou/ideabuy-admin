<template>
<div class='ArticleType'>
  <el-card class="box-card" v-loading.body='loading'>
    <!--工具条 更新-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-form" :form-item="data.searchItem" @query="getData">
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-button icon='plus' :loading='loading' class="header-right" type="primary" @click="handleAddType">添加</el-button>
      </wk-form-base>
    </div>

    <!-- 工具条 -->
    <h2 class="clearfloat">
    </h2>
    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
      <el-table-column label="操作" width="180">
        <template scope="scope">
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 修改 -->
    <el-dialog :title="formTitle" :visible.sync="dialogVisible">
      <el-form :key='editFormKey' ref='editForm' :model="editForm" :rules='editFormRules' label-width="100px">
        <el-form-item label="分类名称:" prop='type_name'>
          <el-input v-model="editForm.type_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父栏目ID:" prop='parent_id'>
          <!-- 下拉框 -->
          <el-select v-model="editForm.parent_id" placeholder="请选择">
            <el-option :value='zero' label='顶级分类'></el-option>
            <el-option v-for="item in typeIdList" :key="item.type_id" :value="item.type_id" :label="item.type_name"></el-option>
          </el-select>
          <!-- ****** -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="formAction">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/ArticleType'
export default {
  name: 'classify',
  data: () => ({
    data,
    editFormKey: 0,
    zero: 0,
    keyword: {}, // 筛选关键字
    dialogVisible: false, // 输入框绑定
    editForm: {}, // 修改/添加数据
    formTitle: '', // 弹窗title
    isEdit: false, // 判定添加/修改
    typeIdList: [], // 选择父级下拉框用
    loading: false,
    editFormRules: { // 表单验证规则
      type_name: [{
        required: true,
        message: '请输入显示名称',
        trigger: 'blur'
      }, {
        min: 2,
        max: 20,
        message: '长度在 2 到 20 个字符',
        trigger: 'blur'
      }],
      parent_id: [{
        type: 'integer',
        required: true,
        message: '请选择父级',
        trigger: 'blur'
      }]
    }
  }),
  // ************************初始化******************************
  mounted() {
    this.getData()
  },
  methods: {
    getData(obj) { // 列表获取
      if (obj) {
        this.keyword = obj
      }
      const para = Object.assign({}, this.keyword)
      this.$refs['wk-table'].query(this.$api.content.ATList, para, 'articletype_list')
    },
    searchForm() { // 搜索
      this.$refs['wk-form'].search()
    },
    pageChange(currentPage) { // 翻页
      this.getData()
    },
    handleAddType() { // 添加
      this.handleTypeSelect()
      this.isEdit = false
      this.formTitle = '添加分类'
      this.editForm = {
        type_name: '',
        parent_id: '',
        type_id: ''
      }
    },
    handleEdit(index, row) { // 修改
      this.handleTypeSelect()
      this.loading = true
      this.axios.get(this.$api.content.ATDetail, { // 获取详细信息
        params: {
          type_id: row.type_id
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.editForm = res.data.data.articletype_info
        } else {
          this.$message.success(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.loading = false
      })
      this.isEdit = true
      this.formTitle = '编辑分类'
    },
    formAction() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (!this.isEdit) { // 添加传输
            this.axios.post(this.$api.content.ATAdd, {
              type_name: this.editForm.type_name,
              parent_id: this.editForm.parent_id
            }).then(res => {
              if (res.data.code === 1) {
                this.getData()
                this.$message.success(res.data.msg)
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(error => {
              console.log(error)
            })
          } else { // 修改 传输
            const Edit = this.editForm
            if (Edit.parent_id === '') {
              Edit.parent_id = 0
            }
            this.axios.post(this.$api.content.ATEdit, {
              type_id: Edit.type_id,
              type_name: Edit.type_name,
              parent_id: Edit.parent_id
            }).then(res => {
              const back = res.data
              if (back.code === 1) {
                this.$message.success(back.msg)
              } else {
                this.$message.error(back.msg)
              }
              this.getData()
            }).catch(error => {
              console.log(error)
            })
          }
          this.dialogVisible = false
        }
      })
    },
    cancel() { // 取消修改/添加
      this.editFormKey = Date.parse(new Date()) / 1000
      this.dialogVisible = false
      this.editForm = {
        type_id: '',
        parent_id: '',
        type_name: ''
      }
    },
    handleTypeSelect() { // 获取所有id 下拉框用
      this.loading = true
      this.axios.get(this.$api.content.ATSelect).then(res => {
        const list = res.data
        if (list.code === 1) {
          this.typeIdList = res.data.data.articletype_select
          this.dialogVisible = true
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#ArticleType {}
</style>
