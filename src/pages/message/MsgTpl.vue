<template>
<!-- 消息模板列表 -->
<div id="msg-tpl">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-forms" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData">
      <el-table-column label="操作" fixed="right" width="180" class="table_btn">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!--编辑添加对话框-->
    <el-dialog :visible.sync="dialogFormVisible" :title="formType ? '添加信息模板' : '编辑信息模板'" :before-close="handleClose">
      <wk-form-base :key="editFormKey" ref="wk-edit" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData">
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/msgTpl'
export default {
  name: 'msg-tpl',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 表单类型
    formType: true,
    // 弹窗的显示和关闭
    dialogFormVisible: false,
    // 修改信息的映射
    formEdit: {},
    // 表单验证重置
    editFormKey: 1
  }),
  mounted() {
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
      this.$refs['wk-list'].query(this.$api.message.msgtemplateList, para, 'msgTemplate_list')
    },
    // 获取新增数据
    handleAdd() {
      this.dialogFormVisible = true
      this.formType = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 获取编辑数据
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formType = false
      this.$nextTick(() => {
        // 请求参数
        const para = {
          id: row.id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.message.msgtemplateDetail, para, 'msgTemplateDetail_info')
      })
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.dialogFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.id ? this.$api.message.msgtemplateEdit : this.$api.message.msgtemplateAdd
      // 添加请求参数
      const para = {
        content: obj.content,
        prepare_node: obj.prepare_node,
        msg_type: obj.msg_type,
        msg_tag: obj.msg_tag,
        msg_title: obj.msg_title
      }
      // 编辑请求参数
      if (obj.id) {
        para.id = obj.id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 删除用户详情
    handleDel(index, row) {
      // 请求参数
      const para = {
        id: row.id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.message.msgtemplateDelete, para)
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    }
  }
}
</script>
<style lang="scss">
#form-base {
    .el-textarea {
        width: 320px;
    }
    .el-form-item__content {
        width: 320px;
    }
    .el-button--primary {
        margin: 0;
    }
}
</style>
