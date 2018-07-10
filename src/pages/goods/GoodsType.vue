<template>
<div id="goods-attribute">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-search" :form-item="searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="handleSearch" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
      </wk-form-base>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="280">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="showAttribute(scope.$index, scope.row)" size="small" icon="document" type="primary">商品属性</el-button>
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog @close="clearFormItem" :visible.sync="editFormVisible" :title="editTitle ? '编辑类型' : '添加类型'">
      <WknewFormBase :key="editFormKey" ref="wk-edit" :form-item="editItem" :form-rule="editRule" @submit="editSave" @query="getData" @patch="getInfo">
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <!-- <el-button @click="resetForm">重置</el-button> -->
        </el-form-item>
      </WknewFormBase>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
// import * as api from '@/api'
export default {
  name: 'goods-brand',
  data: () => ({
    // 筛选关键字
    filters: {},
    // 搜索项目
    searchItem: [
      {
        eleType: 'search',
        value: 'keyword',
        plh: '请输入类型名称'
      }
    ],
    tempformdata: '',
    columns: [
      {
        value: 'type_id',
        label: 'ID',
        width: '150'
      }, {
        value: 'type_name',
        label: '类型名称'
      }
    ],
    // 编辑对话框是否显示
    editFormVisible: false,
    editTitle: true,
    editFormKey: 0,
    // 编辑框元素
    editItem: [
      {
        eleType: 'input',
        label: '类型名称',
        value: 'type_name'
      }
    ],
    editRule: {
      type_name: [
        {
          type: 'string',
          required: true,
          message: '请输入类型名称',
          trigger: 'change'
        }
      ]
    }
  }),
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-list'].query(this.$api.goods.typeList, para, 'list')
    },
    // 品牌添加
    handleAdd() {
      this.dialogVisible()
      this.editTitle = false
      // this.$nextTick(() => {
      //   // 调用组件获取数据
      //   let formItem = this.$refs['wk-edit'].formItem
      //   console.log(formItem)
      //   for (let i in formItem) {
      //     if (formItem[i].eleType === 'upload') {
      //       this.$refs['wk-edit'].formItem[i].filelist = []
      //     }
      //   }
      // })
    },
    dialogVisible() {
      this.editFormVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    clearFormItem() {
      let formItem = this.$refs['wk-edit'].formItem
      for (let i in formItem) {
        if (formItem[i].eleType === 'upload') {
          this.$refs['wk-edit'].formItem[i].filelist = []
        }
      }
    },
    // 批量删除
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.type_id).toString()
      // 请求参数
      const para = {
        type_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.typeDelete, para, 'list')
    },
    // 单个字段编辑
    handleEdit(index, row) {
      this.dialogVisible()
      this.editTitle = true
      this.$nextTick(() => {
        // 请求参数
        const para = {
          type_id: row.type_id
        }
        this.tempformdata = row
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.goods.typeDetail, para, 'type_info', '', '')
      })
    },
    // 单个字段删除
    handleDel(index, row) {
      // 请求参数
      const para = {
        type_id: row.type_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.typeDelete, para)
    },
    // 获取补充数据
    getInfo(obj) {

    },
    // 跳转到属性详情
    showAttribute(index, row) {
      this.$router.push({path: 'goods-attribute', query: {id: row.type_id}})
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.editFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.type_id ? this.$api.goods.typeEdit : this.$api.goods.typeAdd
      // 添加请求参数
      const para = {
        type_name: obj.type_name
      }
      // 编辑请求参数
      if (obj.type_id) {
        para.type_id = obj.type_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    },
    // 品牌搜索
    handleSearch() {
      this.$refs['wk-search'].search()
    }
  }
}
</script>
<style lang="scss" scoped>
#goods-attribute {}
</style>
