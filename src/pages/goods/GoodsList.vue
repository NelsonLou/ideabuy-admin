<template>
<div id="goods-list">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <WknewFormBase inline ref="wk-search" :form-item="searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="handleSearch" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
      </WknewFormBase>
    </div>


    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="250" fixed='right'>
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button v-show="scope.row.is_on_sale === 1" @click="handleIsOnSale(scope.$index, scope.row)" size="small" icon="close" type="success">下架</el-button>
  				<el-button v-show="scope.row.is_on_sale === 0" @click="handleIsOnSale(scope.$index, scope.row)" size="small" icon="plus" type="warning">上架</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog :close-on-click-modal= 'false' @close="restartFormIfem" :visible.sync="editFormVisible" :title="editTitle ? '编辑商品' : '添加商品'">
      <WknewFormBase :key="editFormKey" ref="wk-edit" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData" @patch="" :isPatch="isPatch">
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
import data from './data/goodlist'
export default {
  name: 'goods-list',
  data: () => ({
    // 编辑对话框是否显示
    editFormVisible: false,
    editTitle: true,
    editFormKey: 0,
    filters: {},
    isadd: false,
    // 搜索项目
    searchItem: [
      {
        eleType: 'search',
        value: 'keywords',
        plh: '请输入商品编号或名称'
      }
    ],
    isPatch: false
  }),
  computed: {
    data() {
      return data
    }
  },
  mounted() {
    // 获取商品列表
    this.getData()
    // this.handleAllInfo()
  },
  methods: {
    // 商品列表
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-list'].query(this.$api.goods.goodsList, para, 'goods', '', '')
    },
    // 商品搜索
    handleSearch() {
      this.$refs['wk-search'].search()
    },
    // 商品添加
    handleAdd() {
      // let that = this
      // this.$refs['wk-list'].loading = true
      // let p1 = new Promise(function(resolve, reject) {
      //   resolve(that.handlGetGoodsBrand())
      // })
      // p1.then(that.handleGetGoodsCategory)
      //   // .then(function () {
      // // })
      this.isadd = true
      this.dialogVisible()
      this.handleAllInfo()
      this.editTitle = false
      this.isPatch = true
    },
    // 一些小动作
    restartFormIfem() {
      let formItemCon = this.$refs['wk-edit'].formItem
      for (let i in formItemCon) {
        if (formItemCon[i].eleType === 'upload') {
          formItemCon[i].filelist = []
        }
      }
      this.$refs['wk-edit'].formItem = formItemCon
      this.$refs['wk-edit'].clearstatus = 1
    },
    // 商品上下架
    handleIsOnSale(index, row) {
      const title = row.is_on_sale === 0 ? '确认上架该商品吗?' : '确认下架改商品吗?'
      this.$confirm(title, '提示', {
        type: 'warning'
      }).then(() => {
        let isonsale = row.is_on_sale === 0 ? 1 : 0
        const para = {
          goods_id: row.goods_id,
          is_on_sale: isonsale
        }
        this.axios.post(this.$api.goods.goodsStatusChange, para)
        .then(res => {
          this.$refs['wk-list'].loading = true
          let code = res.data.code
          let msg = res.data.msg
          if (code === 1) {
            this.$message.success(msg)
            this.getData()
          }
        }).catch(res => {
          console.log(res)
        })
      }).catch(() => {})
    },
    // 编辑商品
    handleEdit(index, row) {
      this.dialogVisible()
      this.handleAllInfo()
      this.editTitle = true
      this.$nextTick(() => {
        // // 请求参数
        // const para = {
        //   goods_id: row.goods_id
        // }
        // this.$refs['wk-edit'].query(this.$api.goods.goodsDetail, para, 'goods_detail', '', 'goods_thumb')
        // 调用组件获取数据
        this.axios.get(this.$api.goods.goodsDetail, {
          params: {
            goods_id: row.goods_id
          }
        }).then(res => {
          let code = res.data.code
          let data = res.data.data
          let goods = data.goods_detail.goods_info
          let productInfo = data.goods_detail.goods_products
          let attrTitle = productInfo[0].attr
          // 获取已经设置的货品属性
          let IsaddAttrs = []
          for (let i in attrTitle) {
            attrTitle[i]['name'] = attrTitle[i]['attr_name']
            IsaddAttrs.push(attrTitle[i])
          }
          // 重组货品列表
          let attrs = []
          let prolist = []
          let skuIndex = 0
          for (let i in productInfo) {
            let tempobject = {}
            tempobject['market_price' + i] = productInfo[i]['market_price']
            tempobject['product_price' + i] = productInfo[i]['product_price']
            tempobject['product_number' + i] = productInfo[i]['product_number']
            tempobject['product_id' + i] = productInfo[i]['product_id']
            for (let k in attrTitle) {
              tempobject[attrTitle[k]['name'] + i] = productInfo[i]['attr'][k]['attr_value']
              // tempobject[attrTitle[k]['name'] + i] = attrTitle[k]['attr_value']
            }
            attrs.push(tempobject)
            skuIndex += 1
            // let templist = {}
            let templist = [
              {
                value: 'market_price' + i
              }, {
                value: 'product_price' + i
              }, {
                value: 'product_number' + i
              }
            ]

            for (let j in attrTitle) {
              let a = {}
              a['value'] = attrTitle[j]['name'] + i
              a['name'] = attrTitle[j]['name']
              templist.unshift(a)
            }
            prolist.push(templist)
          }
          // 详情图片显示
          let formItemCon = this.$refs['wk-edit'].formItem
          for (let i in formItemCon) {
            let reg = new RegExp('thumb')
            let regs = new RegExp('img')
            let tempfile = {}
              if (formItemCon[i].eleType === 'upload') {
                formItemCon[i].filelist = []
                if (reg.test(formItemCon[i].value)) {
                  if (goods['goods_thumb']) {
                    tempfile = {name: '1', url: goods['goods_thumb']}
                    formItemCon[i].filelist.push(tempfile)
                  }
                }
                if (regs.test(formItemCon[i].value)) {
                  if (goods['goods_img']) {
                    tempfile = {name: '1', url: goods['goods_img']}
                    formItemCon[i].filelist.push(tempfile)
                  }
                }
              }
          }
          this.$refs['wk-edit'].formItem = formItemCon
          if (code === 1) {
            this.$refs['wk-edit'].clearstatus = 0
            this.$refs['wk-edit'].formData.type_id = goods['type_id']
            this.$refs['wk-edit'].formData = goods
            this.$refs['wk-edit'].isChildrenAttrsSeleced = 1
            this.$refs['wk-edit'].IsaddAttrs = []
            this.$refs['wk-edit'].attrs = []
            this.$refs['wk-edit'].productAttrs = []
            this.$refs['wk-edit'].IsaddAttrs = IsaddAttrs
            this.$refs['wk-edit'].attrs = attrs
            this.$refs['wk-edit'].productAttrs = prolist
            this.$refs['wk-edit'].skuIndex = skuIndex
            this.$refs['wk-edit'].skuProIndex = skuIndex
          }
        }).catch(res => {
          console.log(res)
        })
      })
    },
    // 删除单个商品
    handleDel(index, row) {
      // 请求参数
      const para = {
        goods_id: row.goods_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.goodsDelete, para)
    },
    // 批量删除
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.goods_id).toString()
      // 请求参数
      const para = {
        goods_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.goods.goodsDelete, para, 'batch')
    },
    dialogVisible() {
      this.editFormVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 获取配送范围
    handleAllInfo() {
      let that = this
      let formItem = this.data.editItem
      let cateIndex = 0
      let cateexp = new RegExp('商品分类')
      for (let i in formItem) {
        if (cateexp.test(formItem[i].label)) {
          cateIndex = i
        }
      }

      let brandIndex = 0
      let brandexp = new RegExp('商品品牌')
      for (let i in formItem) {
        if (brandexp.test(formItem[i].label)) {
          brandIndex = i
        }
      }

      let addressIndex = 0
      let addressexp = new RegExp('配送范围')
      for (let i in formItem) {
        if (addressexp.test(formItem[i].label)) {
         addressIndex = i
        }
      }

      let attrsIndex = 0
      let attrsexp = new RegExp('商品类型')
      for (let i in formItem) {
        if (attrsexp.test(formItem[i].label)) {
         attrsIndex = i
        }
      }

      this.axios.get(this.$api.goods.goodsAllInfo)
      .then(res => {
        let code = res.data.code
        let data = res.data.data
        let brandlist = data.brant_list
        let categorylist = data.category_list
        let addresslist = data.region_list
        let attrlist = data.type_list
        if (code === 1) {
          that.addresslist = addresslist

          for (let i in brandlist) {
            brandlist[i]['label'] = brandlist[i]['brand_name']
            brandlist[i]['value'] = brandlist[i]['brand_id']
          }
          this.data.editItem[brandIndex].options = brandlist

          for (let i in categorylist) {
            categorylist[i]['label'] = categorylist[i]['cat_name']
            categorylist[i]['value'] = categorylist[i]['cat_id']
          }
          this.data.editItem[cateIndex].options = categorylist

          for (let i in addresslist) {
            addresslist[i]['label'] = addresslist[i]['region_name']
            addresslist[i]['value'] = addresslist[i]['region_code']
          }
          this.data.editItem[addressIndex].options = addresslist
          for (let i in attrlist) {
            attrlist[i]['label'] = attrlist[i]['type_name']
            attrlist[i]['value'] = attrlist[i]['type_id']
          }
          this.data.editItem[attrsIndex].options = attrlist
          this.$refs['wk-edit'].attrType.options = attrlist
          that.$refs['wk-list'].loading = false
          if (this.isadd) {
            let editform = this.$refs['wk-edit'].formData
            editform['is_real'] = 1
            editform['is_index'] = 0
            editform['is_shipping'] = 0
          }
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 编辑保存用户详情
    editSave(obj, pro) {
      let goodsinfo = {
        'sort': obj.sort === '' ? 0 : obj.sort,
        'goods_name': obj.goods_name,
        'goods_desc': obj.goods_desc,
        'cat_id': obj.cat_id,
        'brand_id': obj.brand_id,
        'type_id': obj.type_id,
        'goods_thumb': obj.goods_thumb,
        'goods_img': obj.goods_img,
        'keywords': obj.keywords,
        'is_real': obj.is_real,
        'is_shipping': obj.is_shipping,
        'is_index': obj.is_index,
        'shipping_range': obj.shipping_range
      }
      if (obj.goods_id) {
        goodsinfo['goods_id'] = obj.goods_id
      }
      // 处理填写的货品属性为服务器所需格式
      let objecta
      let attr = []
      let tempattr
      let chineseReg = new RegExp(/[\u4e00-\u9fa5]/)
      for (let i in pro) {
        tempattr = {}
        tempattr['attr'] = []
        for (let j in pro[i]) {
          if (chineseReg.test(j)) {
            objecta = {}
            let a = j.replace(/[0-9]|[a-z]/ig, '')
            objecta['attr_name'] = a
            objecta['attr_value'] = pro[i][j]
            tempattr['attr'].push(objecta)
          } else {
            if (pro[i][j] === '') {
              pro[i][j] = 0
            }
            let b = j.replace(/[0-9]/ig, '')
            tempattr[b] = pro[i][j]
          }
        }
        attr.push(tempattr)
      }
      for (let i in attr) {
        if (attr[i]['product_id'] === undefined) {
          attr[i]['product_id'] = 0
        }
      }
      let postdata = {
        goods_info: goodsinfo,
        product_info: attr
      }
      this.editFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.goods_id ? this.$api.goods.goodsEdit : this.$api.goods.goodsAdd
      // 添加请求参数
      const para = {
        goods: JSON.stringify(postdata)
      }
      // 编辑请求参数
      if (obj.goods_id) {
        para.goods_id = obj.goods_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    }
  }
}
</script>
<style lang="scss" scoped>
#goods-list {}
</style>
