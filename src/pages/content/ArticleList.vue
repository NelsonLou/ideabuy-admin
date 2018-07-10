<template>
<div id='article-list'>
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-form" :form-item="searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="handleSearch" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-button @click="openAddForm" icon="plus" type="primary" class="header-right">添加</el-button>
      </wk-form-base>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="180" fixed="right">
        <template scope="scope">
          <!-- 操作按钮 -->
          <el-button @click="openEditForm(scope.row)" type="primary" size="small" icon="edit">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="danger" size="small" icon="delete">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog :visible.sync="dialogVisible" :title="formType ? '添加文章':'编辑文章'" :before-close="closeForm" size="large">
      <el-form v-loading.body="editLoading" :key="editFormKey" :model="formEidt" :rules="formRules" ref="formEidt" label-width="80px" style="max-width:100%;">
        <el-form-item label="分类" prop="type_id">
          <el-select v-model="formEidt.type_id" placeholder="请选择" style="width:130px;">
            <el-option v-for="opt in selectOption" :label="opt.type_name" :value="opt.type_id" :key="opt.type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="article_title">
          <el-input v-model="formEidt.article_title" placeholder="清输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor class="editor-content" v-model="formEidt.article_content" :config="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="articleAction" :loading="submitLoading" type="primary">确 定</el-button>
          <el-button @click="closeForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'ArticleList',
  data: () => ({
    // 搜索表单元素
    searchItem: [{
      eleType: 'search',
      value: 'keyword',
      plh: '请输入标题'
    }],
    filters: {},
    // 表格列数据
    columns: [{
      value: 'article_id',
      label: 'ID',
      width: 100
    }, {
      value: 'type_name',
      label: '分类',
      width: 150
    }, {
      value: 'article_title',
      label: '标题',
      minw: 200
    }],
    // 加载状态
    editLoading: false,
    submitLoading: false,
    // 是否显示编辑对话框
    dialogVisible: false,
    formType: true,
    editFormKey: 1,
    formInit: {
      admin_id: 0,
      type_id: null,
      article_title: '',
      article_content: ''
    },
    formEidt: {},
    // 表单验证规则
    formRules: {
      type_id: [{
        type: 'integer',
        required: true,
        message: '请选择文章类型',
        trigger: 'blur'
      }],
      article_title: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }]
    },
    // 分类编辑 下拉列表
    selectOption: '',
    // 编辑器配置
    editorOption: {}
  }),
  mounted() {
    this.getData()
    this.getSelectOption()
  },
  methods: {
    // 获取文章列表
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-table'].query(this.$api.content.getArticleList, para, 'article_list')
    },
    // 获取编辑分类下拉列表
    getSelectOption() {
      this.axios.get(this.$api.content.getSelectOption).then(res => {
        // console.log('getSelectOption Success', res)
        if (res.data.code === 1) {
          this.selectOption = res.data.data.articletype_select
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 搜索
    handleSearch() {
      this.$refs['wk-form'].search()
    },
    // 删除文章
    handleDel(row) {
      // 请求参数
      const para = {
        article_id: row.article_id
      }
      // 调用组件删除数据
      this.$refs['wk-table'].delete(this.$api.content.deleteArticle, para)
    },
    // 批量删除文章
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.article_id).toString()
      // 请求参数
      const para = {
        article_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-table'].delete(this.$api.content.deleteArticle, para, 'batch')
    },
    // 打开添加对话框
    openAddForm() {
      this.formType = true
      this.formEidt = Object.assign({}, this.formInit)
      this.dialogVisible = true
    },
    // 打开编辑对话框
    openEditForm(row) {
      this.formType = false
      this.dialogVisible = true
      this.editLoading = true
      const para = {
        params: {
          article_id: row.article_id
        }
      }
      // console.log('getDetail', para)
      this.axios.get(this.$api.content.getDetail, para).then(res => {
        // console.log('getDetail success', para)
        if (res.data.code === 1) {
          this.editLoading = false
          var resAtc = res.data.data.article_info
          this.formEidt = {
            admin_id: resAtc.admin_id,
            article_id: resAtc.article_id,
            type_id: resAtc.type_id,
            article_title: resAtc.article_title,
            article_content: resAtc.article_content
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 关闭对话框并清空表单
    closeForm() {
      this.dialogVisible = false
      this.$refs.formEidt.resetFields()
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 提交文章
    articleAction() {
      this.$refs.formEidt.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.subImgSrc()
        }
      })
    },
    // 截取内容中图片的base64
    subImgSrc() {
      var content = this.formEidt.article_content
      var n = 0
      var str = ''
      var arr = []
      var srcIndex = []
      while (content !== null && content.search('src="') !== -1) {
        n = content.search('src="')
        str = content.substr(0, n + 5)
        arr.push(str)
        content = content.substr(n + 5)
        if (content.search('https://') !== 0) {
          srcIndex.push(arr.length)
        }
        n = content.search('"')
        str = content.substr(0, n)
        arr.push(str)
        content = content.substr(n)
      }
      arr.push(content)
      if (srcIndex.length > 0) {
        this.uploadImg(arr, srcIndex)
      } else {
        this.editSubmit()
      }
    },
    // 上传图片base64
    uploadImg(arr, srcIndex) {
      var para = {}
      var editorContent = ''
      for (let i = 0; i < srcIndex.length; i++) {
        para = {
          article_img: arr[srcIndex[i]]
        }
        this.axios.post(this.$api.content.uploadImg, para).then(res => {
          // console.log('uploadImg success', res)
          if (res.data.code === 1) {
            arr[srcIndex[i]] = res.data.data.img_path
            if (i === srcIndex.length - 1) {
              for (let j = 0; j < arr.length; j++) {
                editorContent += arr[j]
              }
              this.formEidt.article_content = editorContent
              this.editSubmit()
            }
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 提交编辑
    editSubmit() {
      let reqUrl = this.formType ? this.$api.content.addArticle : this.$api.content.editArticle
      let para = this.formEidt
      // console.log('editSubmit', para)
      this.axios.post(reqUrl, para).then(res => {
        // console.log('editSubmit success', para)
        this.submitLoading = false
        this.$message.success(res.data.msg)
        this.getData()
        this.closeForm()
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.submitLoading = false
        this.closeForm()
      })
    }
  }
}
</script>

<style lang="scss">
#article-list {
    .editor-content {
        border: 1px solid #ccc;
    }
    .ql-container .ql-editor {
        min-height: 300px;
        padding-bottom: 10px;
        max-height: 500px;
    }
}
</style>
