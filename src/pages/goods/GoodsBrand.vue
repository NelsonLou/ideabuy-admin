<template>
<div id="goods-brand">
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
      <el-table-column label="品牌缩略图" width="138px">
         <template scope="scope">
           <div class="imgbox" style="width: 100%; height:100px;padding: 15px 0;">
           <div class="brand_img" :style="scope.row.brand_thumb ? 'background:url(' + scope.row.brand_thumb +') no-repeat center center/cover;width:100px;height:100%;margin: 0 auto;': ''"></div>
           </div>
         </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog @close="clearFormItem" :visible.sync="editFormVisible" :title="editTitle ? '编辑品牌' : '添加品牌'">
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
import * as api from '@/api'
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
        plh: '请输入品牌名称'
      }
    ],
    columns: [
      {
        value: 'brand_id',
        label: '品牌ID',
        width: '100'
      }, {
        value: 'brand_name',
        label: '品牌名称',
        width: '180'
      }, {
        value: 'brand_desc',
        label: '品牌描述'
      }, {
        value: 'is_show',
        label: '是否显示',
        width: '120',
        sortable: true,
        formatter: row => row.is_show === 1
          ? '显示'
          : '不显示'
      }, {
        value: 'created_at',
        label: '上传时间'
      }, {
        value: 'updated_at',
        label: '修改时间'
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
        label: '品牌名称',
        value: 'brand_name'
      }, {
        eleType: 'upload',
        label: '品牌缩略图',
        value: 'brand_thumb',
        filelist: [],
        action: api.config.url + api.picUpload.toBaseI64mage,
        headers: api.config.headers,
        tips: '300*300',
        pictype: 'jpg/png'
      }, {
        eleType: 'input',
        label: '品牌描述',
        value: 'brand_desc'
      }, {
        eleType: 'radio',
        label: '是否显示',
        value: 'is_show',
        options: [
          {
            value: 1,
            label: '是'
          }, {
            value: 0,
            label: '否'
          }
        ]
      }
    ],
    editRule: {
      brand_name: [
        {
          type: 'string',
          required: true,
          message: '请输入品牌名称',
          trigger: 'change'
        }
      ],
      brand_thumb: [
        {
          type: 'string',
          required: true,
          message: '请上传商品图片',
          trigger: 'change'
        }
      ],
      brand_desc: [
        {
          type: 'string',
          required: true,
          message: '请输入品牌描述',
          trigger: 'change'
        }
      ],
      is_show: [
        {
          type: 'number',
          required: true,
          message: '请输选择是否显示',
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
      this.$refs['wk-list'].query(this.$api.goods.brandList, para, 'list')
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
      const ids = obj.map(item => item.brand_id).toString()
      // 请求参数
      const para = {
        brand_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.brandDel, para, 'list')
    },
    // 单个字段编辑
    handleEdit(index, row) {
      this.dialogVisible()
      this.editTitle = true
      this.$nextTick(() => {
        // 请求参数
        const para = {
          brand_id: row.brand_id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.goods.brandDetail, para, 'Brand_Info', 'patch', 'brand_thumb')
      })
    },
    // 单个字段删除
    handleDel(index, row) {
      // 请求参数
      const para = {
        brand_id: row.brand_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.brandDel, para)
    },
    // 获取补充数据
    getInfo(obj) {

    },
    // 编辑保存用户详情
    editSave(obj) {
      this.editFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.brand_id ? this.$api.goods.brandEdit : this.$api.goods.brandAdd
      // 添加请求参数
      const para = {
        brand_name: obj.brand_name,
        brand_desc: obj.brand_desc,
        brand_thumb: obj.brand_thumb,
        is_show: obj.is_show
      }
      // 编辑请求参数
      if (obj.brand_id) {
        para.brand_id = obj.brand_id
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
#goods-brand {}
</style>
