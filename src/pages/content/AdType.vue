<template>
<div class="">
  <!-- 广告分类 -->
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
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
      <el-table-column label="操作" fixed="right" width="100" class="table_btn">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 编辑&添加的弹窗 -->
    <el-dialog :title="formType ? '添加信息':'编辑信息'" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <wk-form-base :key="editFormKey" ref="wk-form" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData" style="width: 400px;">
        <el-form-item>
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/ad'
export default {
  name: 'ad-list',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 编辑对话框是否显示
    dialogFormVisible: false,
    formType: true,
    editFormKey: 1
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
      this.$refs['wk-table'].query(this.$api.content.AdClass, para, 'adType_list')
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
          type_id: row.type_id
        }
        // 调用组件获取数据
        this.$refs['wk-form'].query(this.$api.content.deClass, para, 'type_detail')
      })
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.dialogFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.type_id ? this.$api.content.edClass : this.$api.content.tjClass
      // 添加请求参数
      const para = {
        type_name: obj.type_name,
        img_size: obj.img_size
      }
      // 编辑请求参数
      if (obj.type_id) {
        para.type_id = obj.type_id
      }
      // 调用组件提交数据
      this.$refs['wk-form'].save(edit, para)
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-form'].submit()
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
