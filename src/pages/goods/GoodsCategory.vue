<template>
<div id="goods-category">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-search" :form-item="searchItem" @query="">
        <!-- 搜索按钮 -->
        <el-form-item>
          <!-- <el-button @click="handleSearch" icon="search" type="primary">搜索</el-button> -->
        </el-form-item>
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-left">添加</el-button>
      </wk-form-base>
    </div>

   <div class="treelist" v-loading.body ='loading' scoped="scoped">
     <el-tree :default-expand-all="true" :expand-on-click-node="false" :data="datalist" :props="defaultProps" :render-content="renderContent">
     </el-tree>
   </div>

   <el-dialog @close="clearFormItem" :visible.sync="editStatus" :title="editTitle">
     <WknewFormBase :key="editFormKey" ref="wk-edit" :form-item="editItem" :form-rule="editRule" @submit="editSave" @query="getDataList" @patch="">
       <!-- 表单按钮 -->
       <el-form-item>
         <el-button v-show="showSubmit" type="primary" @click="submitForm">确定</el-button>
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
  name: 'goods-category',
  data: () => ({
    // 筛选关键字
    filters: {},
    loading: true,
    editStatus: false,
    editTitle: '',
    showSubmit: true,
    // 所有分类
    categorylist: [],
    // 编辑对话框是否显示
    editFormVisible: false,
    editFormKey: 0,
    // 搜索项目
    searchItem: [
      // {
      //   eleType: 'search',
      //   value: 'keyword',
      //   plh: '请输入分类名称'
      // }
    ],
    datalist: [],
    defaultProps: {
      children: 'children',
      label: 'cat_name'
    },
    // 编辑框内容
    editItem: [
      {
        eleType: 'select',
        label: '父级栏目名称',
        value: 'pid',
        options: this.categorylist
      }, {
        eleType: 'input',
        contype: 'number',
        label: '默认排序',
        value: 'sort_order'
      }, {
        eleType: 'input',
        label: '分类名称',
        value: 'cat_name'
      }, {
        eleType: 'input',
        label: '分类描述',
        value: 'cat_desc'
      }, {
        eleType: 'upload',
        label: '分类缩略图',
        value: 'cat_thumb',
        filelist: [],
        action: api.config.url + api.picUpload.toBaseI64mage,
        headers: api.config.headers,
        tips: '300*300',
        pictype: 'jpg/png'
      }, {
        eleType: 'input',
        label: '分类关键字',
        value: 'keywords'
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
      }, {
        eleType: 'radio',
        label: '是否导航显示',
        value: 'is_show_nav',
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
    // 表单验证规则
    editRule: {
      // pid: [
      //   {
      //     type: 'number',
      //     required: 'true',
      //     message: '请选择父级分类',
      //     trigger: 'change'
      //   }
      // ],
      sort_order: [
        {
          type: 'number',
          required: true,
          message: '请输入分类排序',
          trigger: 'change'
        }
      ],
      cat_name: [
        {
          type: 'string',
          required: true,
          message: '请输入分类名称',
          trigger: 'change'
        }
      ],
      cat_desc: [
        {
          type: 'string',
          required: true,
          message: '请输入分类描述',
          trigger: 'change'
        }
      ],
      cat_thumb: [
        {
          type: 'string',
          required: true,
          message: '请上传分类缩略图',
          trigger: 'change'
        }
      ],
      keywords: [
        {
          type: 'string',
          required: true,
          message: '请输入分类关键词',
          trigger: 'change'
        }
      ],
      is_show: [
        {
          type: 'number',
          required: true,
          message: '请选择是否显示',
          trigger: 'change'
        }
      ],
      is_show_nav: [
        {
          type: 'number',
          required: true,
          message: '请选择是否导航显示',
          trigger: 'change'
        }
      ]
    }
  }),
  mounted() {
    this.getDataList()
    this.getPullDownCategory()
  },
  methods: {
    // 获取下拉分类列表
    getPullDownCategory() {
      this.axios.get(this.$api.goods.goodspullcatelist)
      .then(res => {
        let code = res.data.code
        let data = res.data.data.goodsCategory_list_level
        for (let i in data) {
          data[i]['label'] = data[i]['cat_name']
          data[i]['value'] = data[i]['cat_id']
        }
        if (code === 1) {
          let tempdata = this.editItem
          for (let i in tempdata) {
            let eleType = tempdata[i].eleType
            let tempexg = new RegExp('select')
            if (tempexg.test(eleType)) {
              this.editItem[i].options = data
            }
          }
        }
      })
    },
    // 获取分类列表``
    getDataList() {
      let that = this
      that.loading = true
      this.axios.get(this.$api.goods.goodscatelist)
      .then(res => {
        let code = res.data.code
        let data = res.data.data.goodsCategory_list_tree
        if (code === 1) {
          this.datalist = data
          that.loading = false
        }
      }).catch(res => {

      })
    },
    // 搜索
    handleSearch() {
      this.$refs['wk-search'].search()
    },
    handleAdd(id, level, name) {
      if (level >= 3) {
        this.$message.error('三级分类不允许添加下级分类')
        return false
      }
      this.dialogVisible()
      this.editTitle = '添加分类'
      this.showSubmit = true
      if (Number(id)) {
        this.$nextTick(() => {
          this.$refs['wk-edit'].formData.pid = id
        })
      }
    },
    // 查看详情
    handleinfo(data, store) {
      let that = this
      that.dialogVisible()
      this.editTitle = '查看详情'
      this.showSubmit = false
      this.$nextTick(() => {
        // 请求参数
        const para = {
          cat_id: data.cat_id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.goods.goodscateDetail, para, 'Category_Info', 'patch', 'cat_thumb')
      })
    },
    dialogVisible() {
      this.editStatus = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 单个分类编辑
    handleEdit(data, store) {
      let that = this
      that.dialogVisible()
      this.showSubmit = true
      this.editTitle = '编辑分类'
      this.$nextTick(() => {
        // 请求参数
        const para = {
          cat_id: data.cat_id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.goods.goodscateDetail, para, 'Category_Info', 'patch', 'cat_thumb')
      })
    },
    // 单个分类编辑
    handleDel(id, store) {
      const title = '确认删除记录吗?'
      const para = {
        cat_id: id
      }
      this.$confirm(title, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.axios.post(this.$api.goods.goodscateDel, para).then(res => {
          this.loading = false
          this.getDataList()
          this.$message.success(res.data.msg)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }).catch(() => {})
    },
    // 清除表单upload的图片
    clearFormItem() {
      let formItem = this.$refs['wk-edit'].formItem
      for (let i in formItem) {
        if (formItem[i].eleType === 'upload') {
          this.$refs['wk-edit'].formItem[i].filelist = []
        }
      }
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.editStatus = false
      // 判断编辑或添加接口
      const edit = obj.cat_id ? this.$api.goods.goodscateEdit : this.$api.goods.goodscateAdd
      // 添加请求参数
      const para = {
        pid: obj.pid === '' ? 0 : obj.pid,
        sort_order: obj.sort_order,
        cat_name: obj.cat_name,
        cat_desc: obj.cat_desc,
        cat_thumb: obj.cat_thumb,
        keywords: obj.keywords,
        is_show: obj.is_show,
        is_show_nav: obj.is_show_nav
      }
      // 编辑请求参数
      if (obj.cat_id) {
        para.cat_id = obj.cat_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    },
    // 动态添加功能按钮
    renderContent(createElement, {
      node,
      data,
      store
    }) {
      var that = this
      return createElement('span', [
        createElement('div', {
          attrs: {
            style: 'margin-right；10px;display: inline-block'
          }
        }, '(ID：' + data.cat_id + ')'),
        createElement('span', {
          attrs: {
            style: 'display:inline-block; margin-left: 10px'
          }
        }, node.label),
        createElement('div', {
          attrs: {
            style: 'display: inline-block; float: right'
          }
        }, [
          createElement('el-button', {
            attrs: {
              style: 'margin-left:20px;',
              size: 'small',
              type: 'primary',
              icon: 'edit'
            },
            on: {
              click() {
                that.handleEdit(data, store)
              }
            }
          }, '编辑'),
          createElement('el-button', {
            attrs: {
              style: 'display:none',
              type: 'primary',
              size: 'small'
            },
            on: {
              click() {
                that.handleinfo(data, store)
              }
            }
          }, '详情'),
          createElement('el-button', {
            attrs: {
              style: node.level === 3 ? 'margin-left: 10px;background-color: #eef1f6;color: #bfcbd9; border-color: #d1dbe5' : 'margin-left: 10px; ',
              type: 'primary',
              size: 'small',
              icon: 'plus'
            },
            on: {
              click() {
                that.handleAdd(data.cat_id, data.level, data.display_name)
              }
            }
          }, '添加'),
          createElement('el-button', {
            attrs: {
              style: node.level === 3 ? 'margin-left: 10px;' : 'margin-left: 10px;',
              type: 'danger',
              size: 'small',
              icon: 'delete'
            },
            on: {
              click() {
                that.handleDel(data.cat_id, data.level, data.display_name)
              }
            }
          }, '删除')
        ])
      ])
    }
  }
}
</script>
<style lang='scss'>
  .treelist{
    padding: 0 20px;
    .el-tree{
      border: none
    }
    .el-tree-node__content{
       height: auto;
       color: #555;
       padding: 5px 0 5px 20px;
       border-bottom: 1px solid #e5e5e5;
    }
  }
</style>
<style lang="scss" scoped>
#goods-category {}
</style>
