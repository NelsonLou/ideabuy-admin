<template>
<div id="goods-type">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-search" :form-item="searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <!-- <el-form-item>
          <el-button @click="handleSearch" icon="search" type="primary">搜索</el-button>
        </el-form-item> -->
        <span style="padding:8px 15px;border:1px solid #c4c4c4;border-radius: 4px;font-size: 14px" class="header-left">所属商品类型： {{type_name}}</span>
        <el-button @click="handleGoBackToList" style="margin-left: 20px" icon="arrow-left" type="primary" class="header-right">返回类型列表</el-button>
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
      </wk-form-base>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog @close="clearFormItem" :visible.sync="editFormVisible" :title="editTitle ? '编辑属性' : '添加属性'">
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
export default {
  name: 'goods-brand',
  data: () => ({
    // 筛选关键字
    filters: {},
    searchItem: [],
    columns: [
      {
        value: 'attr_id',
        label: 'ID',
        width: '150'
      }, {
        value: 'attr_name',
        label: '属性名称'
      }
    ],
    tempformdata: {}, // 临时存放表单内容（用过提交时过滤）
    // 编辑对话框是否显示
    editFormVisible: false,
    editTitle: true,
    editFormKey: 0,
    type_name: '',
    // 编辑框元素
    editItem: [
      {
        eleType: 'select',
        label: '类型名称',
        value: 'type_id',
        options: []
      }, {
        eleType: 'input',
        label: '属性名称',
        value: 'attr_name'
      }
    ],
    editRule: {
      type_id: [
        {
          type: 'number',
          required: true,
          message: '请选择商品类型',
          trigger: 'change'
        }
      ],
      attr_name: [
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
      let id = this.$route.query.id
      if (!id) {
        return false
      }
      // 请求参数
      const para = {
        type_id: id
      }
      // 调用组件获取数据
      this.$refs['wk-list'].query(this.$api.goods.attributeTyleList, para, 'list')
      this.axios.get(this.$api.goods.typeDetail, {
        params: {
          type_id: id
        }
      })
      .then(res => {
        let code = res.data.code
        let data = res.data.data.type_info
        if (code === 1) {
          this.type_name = data.type_name
        } else {
          this.type_name = '无'
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 品牌添加
    handleAdd() {
      this.dialogVisible()
      this.editTitle = false
      this.handleGetTypeList()
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
    // 获取商品属性列表
    handleGetTypeList() {
      this.axios.get(this.$api.goods.typeList)
      .then(res => {
        let code = res.data.code
        let data = res.data.data.list
        if (code === 1) {
          for (let i in data) {
            data[i]['label'] = data[i]['type_name']
            data[i]['value'] = data[i]['type_id']
          }
          this.$refs['wk-edit'].formItem[0].options = data
        }
      }).catch(res => {

      })
    },
    // 批量删除
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.attr_id).toString()
      // 请求参数
      const para = {
        attr_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.attributeDelete, para, 'list')
    },
    // 单个字段编辑
    handleEdit(index, row) {
      this.dialogVisible()
      this.handleGetTypeList()
      this.editTitle = true
      this.$nextTick(() => {
        // 请求参数
        const para = {
          attr_id: row.attr_id
        }
        this.tempformdata = row
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.goods.attributeDetail, para, 'attr_info', '', '')
      })
    },
    // 单个字段删除
    handleDel(index, row) {
      // 请求参数
      const para = {
        attr_id: row.attr_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.attributeDelete, para)
    },
    // 获取补充数据
    getInfo(obj) {
      console.log(obj)
    },
    // 返回类型列表
    handleGoBackToList() {
      this.$router.go(-1)
    },
   // 编辑保存用户详情
    editSave(obj) {
      this.editFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.attr_id ? this.$api.goods.attributeEdit : this.$api.goods.attributeAdd
      // 添加请求参数
      const para = {
        attr_name: obj.attr_name,
        type_id: obj.type_id
      }
      // 编辑请求参数
      if (obj.attr_id) {
        para.attr_id = obj.attr_id
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
#goods-type {}
</style>
