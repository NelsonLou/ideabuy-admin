<template>
<div id="newform-base">
  <el-form v-loading.body="loading" :model="formData" :rules="formRule" ref="formData" :inline="inline" :label-width="labelWidth || '150px'" class="form">
    <el-form-item v-for="(item, index) in formItem" :style="item.eleType === 'hidden' ? 'position:absolute;top:0;opacity:0;filter:alpha(opacity = 0)':''" :key="index" :label="item.label" :prop="item.value">
      <!-- 搜索框 -->
      <el-input v-if="item.eleType === 'search'" v-model="formData[item.value]" :placeholder="item.plh" :icon="close ? 'close' : ''" :on-icon-click="handleClose" @keyup.enter.native="search"></el-input>
      <!-- 输入框, 文本域 -->
      <el-input v-if="(item.eleType === 'input' && item.contype === undefined)" :type="item.iptType" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled"></el-input>
      <!-- 输入框, 文本域 -->
      <el-input v-if="(item.eleType === 'textarea' && item.contype === undefined)" :type="item.iptType" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled"></el-input>
      <!-- 隐藏输入框, 文本域 -->
      <el-input v-if="item.eleType === 'hidden'" type="hidden" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled"></el-input>
      <!-- 隐藏输入框, 文本域 -->
      <div v-if="item.eleType === 'product'" class="product" scoped="scoped">
        <div>
          <el-select v-model="formData[attrType.value]" placeholder="请选择商品类型">
            <el-option v-for="(item, index) in attrType.options"  :value="item.value" :label="item.label" :key="index"></el-option>
          </el-select>
          <el-button v-show="formData[attrType.value] !== ''" size="small" type="primary" @click="handleSelectedAttr">添加属性</el-button>
        </div>
        <div>
          <el-button v-for="(item, index) in IsaddAttrs" :key="index" size="small" type="primary" icon="close" @click="handleAttrsDelete(item.id, item.name)">{{item.name}}</el-button>
        </div>
        <div class="childrenAttrs" v-show="IsSelectType" style="">
            <el-select v-loading.body="childattrloading" v-model="childrenAttrs.value" placeholder="请选择商品属性">
              <el-option v-for="(item, index) in childrenAttrs.options" :value="item.value" :label="item.label" :key="index"></el-option>
            </el-select>
            <el-button style="margin-left: 10px" size="small" type="primary" @click="handleAddSku()">确认</el-button>
            <el-button size="small" type="" @click="handleHiddenSku()">取消</el-button>
        </div>

        <div class="product_attrs_line" v-show="isChildrenAttrsSeleced">
          <div class="title">
            <span class="attrTipsTitle" style="cursor:pointer" @click="handleAddAttrline"><i class="el-icon-plus"></i></span>
            <span class="attrTipsTitle" v-for="(item, index) in IsaddAttrs" :key="index">{{item.name}}</span>
            <span class="attrTipsTitle">市场价(元)</span>
            <span class="attrTipsTitle">平台价(元)</span>
            <span class="attrTipsTitle">库存</span>
          </div>

          <div class="productDetail">
            <div class="line" v-for="(item, index) in productAttrs">
              <span class="attrTipsTitle" style="cursor:pointer" @click="handleDeletcAttrline(index)"><i class="el-icon-close"></i></span>
              <el-input class="attrTipsTitle" v-for="(opt, idx) in item" :key="idx" v-model="attrs[index][opt.value]" :placeholder="opt.plh"></el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- 数字类型的input-->
      <el-input v-if="(item.eleType === 'input' && item.contype === 'number')" :type="item.iptType" v-model.number="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled"></el-input>
      <!-- 下拉框 -->
      <el-select v-if="item.eleType === 'select'" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled" :filterable="item.filter">
        <el-option v-for="(opt, index) in item.options" :key="index" :label="opt.label" :value="opt.value" :disabled="opt.disabled"></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker v-if="item.eleType === 'date'" :type="item.dateType" :placeholder="item.plh" v-model="formData[item.value]" :disabled="item.disabled"></el-date-picker>
      <!-- 时间 -->
      <el-time-picker v-if="item.eleType === 'time'" :placeholder="item.plh" v-model="formData[item.value]" :disabled="item.disabled"></el-time-picker>
      <el-switch v-if="item.eleType === 'switch'" on-text="" off-text="" v-model="formData[item.value]"></el-switch>
      <!-- 多选框 -->
      <el-checkbox-group v-if="item.eleType === 'checkbox'" v-model="formData[item.value]">
        <el-checkbox v-for="(opt, index) in item.options" :key="index" :label="opt.value" :disabled="item.disabled">{{opt.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 单选框 -->
      <el-radio-group v-if="item.eleType === 'radio'" v-model="formData[item.value]">
        <el-radio v-for="(opt, index) in item.options" :key="index" :label="opt.value" :disabled="item.disabled">{{opt.label}}</el-radio>
      </el-radio-group>
      <!-- 图片上传 -->
      <div class="picuploadbox" v-if="item.eleType === 'upload'">
        <div><span>( 建议尺寸：{{item.tips}} 建议格式：{{item.pictype}} )</span></div>
        <el-upload :headers='item.headers' :action="item.action" name="pic" list-type="picture-card" :fileList="item.filelist" :on-success="handleUploadSuccess" :before-upload="beforeUpload" :on-change="onchange" :multiple="false" :on-remove="fileRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>

        <quill-editor ref="myEditor" v-if="item.eleType === 'content'" class="editor-content" v-model="formData[item.value]" ></quill-editor>
        <input v-if="item.eleType === 'content'" type="file" id="editupload" style="display:none">
      <!-- <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog> -->
    </el-form-item>
    <slot> </slot>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'newform-base',
  props: {
    inline: Boolean, // 行内表单模式
    labelWidth: String, // 表单域标签的宽度
    formItem: Array, // 表单元素
    formRule: Object, // 表单规则,
    isPatch: Boolean // 调用组件是否需要加载其它数据
  },
  data: () => ({
    fileList: [],
    attrType: {
      plh: '',
      value: 'type_id',
      options: []
    },
    // 添加子类型状态
    IsSelectType: false,
    parentsAttrsId: -1,
    // 加载子属性列表状态
    childattrloading: true,
    // 子属性列表
    childrenAttrs: {
      value: '',
      name: '',
      options: []
    },
    // 子属性选择状态
    isChildrenAttrsSeleced: false,
    // 已经添加的子属性列表
    IsaddAttrs: [],
    // 货品属性列表(包含价格等)
    productAttrs: [],
    // 提交的属性字段
    attrs: [],
    skuIndex: 0,
    skuProIndex: 0,
    clearstatus: 1,
    close: false,
    loading: false,
    formData: {},
    editupload: 'editupload',
    editor: {}
  }),
  created() {
    this.dataType()
    this.$nextTick(() => {
      this.$refs['myEditor'][0].quill.getModule('toolbar').addHandler('image', this.transformUrl)
      this.editor = this.$refs['myEditor'][0]
    })
  },
  mounted() {
    let isPatch = this.isPatch
    if (isPatch) {
      this.handleGetProductAttr()
    }
  },
  watch: {
    // 搜索
    formData: {
      handler: function(val) {
        this.formItem.map(item => {
          if (item.eleType === 'search') {
            this.close = val[item.value] ? 'true' : false
          }
        })
      },
      deep: true
    },
    'formData.type_id': 'clearProductAttrs'
  },
  methods: {
    fileOnChange(e) {
      let that = this
      let target = e.target
      let reader = new FileReader()
      if (target.files.length === 0) {
        return false
      }
      if (target.files[0].size > 1024 * 1024 * 1000) {
        this.$message.error('图片不能大于1Mb')
      }
      reader.readAsDataURL(target.files[0])
      setTimeout(() => {
        let base64 = reader.result
        this.axios.post(this.$api.picUpload.uploadImg, {
          article_img: base64
        }).then(res => {
          let code = res.data.code
          let url = res.data.data.img_path
          if (code === 1) {
            let addImgRange = that.editor.quill.getSelection()
            that.editor.quill.insertEmbed(addImgRange.index, 'image', url, '')
          }
        }).catch(res => {

        })
      }, 200)
    },
    transformUrl() {
      let fileInput = document.getElementById('editupload')
      fileInput.onchange = this.fileOnChange
      fileInput.click()
    },
    // 初始数据类型
    dataType() {
      this.formItem.map(item => {
        this.$set(this.formData, item.value, item.eleType === 'checkbox' ? [] : item.eleType === 'switch' ? false : '')
      })
    },
    // 搜索
    handleClose() {
      this.formItem.map(item => {
        if (item.eleType === 'search') {
          this.formData[item.value] = ''
          this.$emit('query', this.formData)
        }
      })
    },
    // 初始详情数据
    query(url, para, info, patch, targetData) {
      this.loading = true
      // 直接从 scope 中获取数据
      if (!url && !para) {
        this.loading = false
        this.formData = Object.assign({}, info)
        return
      }
      // 通过接口获取数据
      this.axios.get(url, {
        params: para
      }).then(res => {
        this.loading = false
        const {
          data
        } = res.data
        let tempfile = {name: '1', url: data[info][targetData]}
        let tempfileimg = {}
        if (data.goods) {
          tempfileimg = {name: '1', url: data['goods_detail']['goods_info']['goods_img']}
        } else {
          tempfileimg = {}
        }
        this.fileList.push(tempfile)
        let reg = new RegExp('thumb')
        let regs = new RegExp('img')
        // let tempfile = {}
        for (let i in this.formItem) {
          if (this.formItem[i].eleType === 'upload') {
            this.formItem[i].filelist = []
            if (reg.test(this.formItem[i].value)) {
              // tempfile = {name: '1', url: goods['goods_thumb']}
              this.formItem[i].filelist.push(tempfile)
            }
            if (regs.test(this.formItem[i].value)) {
              // tempfile = {name: '1', url: goods['goods_img']}
              this.formItem[i].filelist.push(tempfileimg)
            }
          }
        }
        this.formData = Object.assign({}, data[info])
        // 是否重组数据结构
        if (patch === 'patch') {
          this.$emit('patch', this.formData)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 补充详情数据
    patch(url) {
      this.loading = true
      this.axios.get(url).then(res => {
        this.loading = false
        const {
          data
        } = res.data
        this.formData = {
          ...this.formData,
          ...Object.assign({}, data)
        }
        this.$emit('patch', this.formData)
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 合并详情数据
    merge(data) {
      this.formData = Object.assign({}, data)
    },
    // 保存表单数据
    save(url, para) {
      // this.loading = true
      this.axios.post(url, para).then(res => {
        // this.loading = false
        this.$emit('query')
        this.$message.success(res.data.msg)
      }).catch(error => {
        console.log(error)
      })
    },
    // 提交表单
    submit() {
      this.$refs['formData'].validate(valid => {
        let editItem = this.formItem
        for (let i in editItem) {
          if (editItem[i].eleType === 'product') {
            let attrs = this.attrs
            if (attrs.length === 0) {
              this.$message.error('请设置商品规格属性')
              return false
            } else {
              for (let j in attrs) {
                for (let k in attrs[j]) {
                  if (attrs[j][k] === '') {
                    this.$message.error('请请货品属性填写完整')
                    return false
                  }
                }
              }
            }
          }
        }
        if (valid) {
          this.$emit('submit', this.formData, this.attrs)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    reset() {
      this.$refs['formData'].resetFields()
    },
    // 搜索表单
    search() {
      this.$emit('query', this.formData)
    },
    onchange(file, fileList) {
      let reg = new RegExp(/(jpg|png|jpeg)/)
      let pictype = file.raw.type
      if (!(reg.test(pictype))) {
        this.$message.error('您上传的图片格式不符合要求,请重新上传!')
        fileList.pop()
        return false
      }
      if (fileList.length > 1) {
        this.$message.error('只允许上传一张图片哦')
        fileList.pop()
        return false
      }
    },
    // 图片删除相关操作
    fileRemove(file, fileList) {
      let that = this
      let subData = that.formData
      let reg = new RegExp('thumb')
      let regs = new RegExp('img')
      for (let i in subData) {
        if (reg.test(i)) {
          if (file.url === subData[i]) {
            that.formData[i] = ''
          }
        }
        if (regs.test(i)) {
          if (file.url === subData[i]) {
            that.formData[i] = ''
          }
        }
      }
    },
    // 图片上传前相关处理
    beforeUpload(file) {
    },
    // 图片上传成功
    handleUploadSuccess(response, file, fileList) {
      let that = this
      let subData = that.formData
      let reg = new RegExp('thumb')
      let regs = new RegExp('img')
      if (response.data.pic) {
        this.axios.post(this.$api.picUpload.uploadImg, {
          article_img: response.data.pic
        }).then(res => {
          for (let i in subData) {
            if (reg.test(i)) {
              if (that.formData[i] === '') {
                that.formData[i] = res.data.data.img_path
                return false
              }
            }
          }
          for (let i in subData) {
            if (regs.test(i)) {
              if (that.formData[i] === '') {
                that.formData[i] = res.data.data.img_path
                return false
              }
            }
          }
        }).catch(res => {
          console.log(res)
        })
      }
    },
    // 清除已设置的货品属性
    clearProductAttrs() {
      let that = this
      if (that.clearstatus >= 1) {
        that.attrs = []
        that.productAttrs = []
        that.IsaddAttrs = []
        that.isChildrenAttrsSeleced = false
      } else {

      }
      that.clearstatus += 1
    },
    // 获取商品类型
    handleGetProductAttr() {
      let that = this
      this.axios.get(this.$api.goods.goodsAllTypeList)
      .then(res => {
        let code = res.data.code
        let data = res.data.data
        if (code === 1 && data !== '') {
          for (let i in data) {
            data[i]['label'] = data[i]['type_name']
            data[i]['value'] = data[i]['type_id']
          }
          that.attrType.options = data
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 添加货品子属性
    handleSelectedAttr() {
      let that = this
      // console.log(that.formData.type_id)
      let id = that.formData.type_id
      // this.formData.type_id = id
      this.axios.get(this.$api.goods.goodsSingleTypeList, {
        params: {
          type_id: id
        }
      })
      .then(res => {
        let code = res.data.code
        let data = res.data.data.list
        if (code === 1 && data !== '') {
          for (let i in data) {
            data[i]['label'] = data[i]['attr_name']
            data[i]['value'] = data[i]['attr_id']
          }
          this.childrenAttrs.options = data
          that.IsSelectType = true
        }
      }).catch(res => {

      })
    },
    // 添加子属性栏目
    handleAddSku() {
      let that = this
      let skuindex = that.skuIndex
      let id = that.childrenAttrs.value
      let childrenAttrs = that.childrenAttrs.options
      let IsaddAttrs = that.IsaddAttrs
      if (id === '') {
        this.$message.error('请先添加属性')
        return false
      }
      let j = 0
      if (IsaddAttrs.length >= 2) {
        this.$message.error('只能添加2个商品属性哦')
        that.IsSelectType = false
        return false
      }
      let name = ''
      for (let i in childrenAttrs) {
        if (id === childrenAttrs[i]['attr_id']) {
          name = childrenAttrs[i]['attr_name']
        }
      }
      let temp = {
        id: id,
        name: name
      }

      let options = [
        {
          value: 'market_price' + skuindex,
          plh: '市场价',
          name: 'market_price'
        }, {
          value: 'product_price' + skuindex,
          plh: '平台价',
          name: 'product_price'
        }, {
          value: 'product_number' + skuindex,
          plh: '库存量',
          name: 'product_number'
        }
      ]

      // let editItem = {
      //   market_price: '',
      //   product_price: '',
      //   goods_number: ''
      // }
      let names = ''
      for (let i in childrenAttrs) {
        if (id === childrenAttrs[i]['attr_id']) {
        names = childrenAttrs[i]['attr_name']
        }
      }
      let editItem = {}
      for (let i in IsaddAttrs) {
        if (id === IsaddAttrs[i]['id']) {
          j += 1
        }
        if (names === IsaddAttrs[i]['attr_name']) {
          j += 1
        }
      }
      if (j === 0) {
        this.IsaddAttrs.unshift(temp)
        let attrs = {
          value: name + skuindex,
          plh: name,
          name: name
        }
        options.unshift(attrs)
        for (let i in that.IsaddAttrs) {
          editItem[that.IsaddAttrs[i]['name'] + skuindex] = ''
        }
        editItem['product_number' + skuindex] = ''
        editItem['market_price' + skuindex] = ''
        editItem['product_price' + skuindex] = ''

        let productAttrs = that.productAttrs
        if (productAttrs.length === 0) {
          that.attrs.push(editItem)
          that.productAttrs.unshift(options)
          // that.attrs.push(editItem)
        } else {
          for (let i in productAttrs) {
            attrs = {
              value: name + i,
              plh: name,
              name: name
            }
            that.attrs[i][name + i] = ''
            productAttrs[i].unshift(attrs)
          }
        }
        editItem = {}
      }
      that.skuIndex += 1
      that.isChildrenAttrsSeleced = true
      that.IsSelectType = false
      let tempStirng = JSON.stringify(this.attrs)
      this.formData['product_attr'] = tempStirng
    },
    // 删除商品sku属性
    handleAttrsDelete(id, name) {
      let that = this
      const title = '确认删除该属性吗?'
      this.$confirm(title, '提示', {
        type: 'warning'
      }).then(() => {
        // this.loading = true
        // let productAttrs = that.productAttrs
        // let attrs = that.attrs
        // 已选货品属性删除
        let IsaddAttrs = that.IsaddAttrs
        let newIsaddAttrs = IsaddAttrs.filter(p => {
          if (p.name === name) {
            return false
          } else {
            return p
          }
        })
        that.IsaddAttrs = newIsaddAttrs
        // 已经形成的attrs数据删除（过滤
        let attrs = that.attrs
        let chineseReg = new RegExp(/[\u4e00-\u9fa5]/)
        for (let i in attrs) {
          for (let j in attrs[i]) {
            if (chineseReg.test(j)) {
              let a = j.replace(/[0-9]/ig, '')
              if (a === name) {
                delete attrs[i][j]
              }
            }
          }
        }
        that.attrs = attrs
        // 已增加的货品对应属性输入框的删除
        let productAttrs = that.productAttrs
        for (let i in productAttrs) {
          let temppro = productAttrs[i].filter(p => {
            if (p.name === name) {
              return false
            } else {
              return true
            }
          })
          productAttrs[i] = temppro
        }
        that.productAttrs = productAttrs
      }).catch(() => {})
    },
    // 隐藏sku选择框
    handleHiddenSku() {
      let that = this
      that.IsSelectType = false
    },
      // 增加子属性填写列表
    handleAddAttrline() {
      let that = this
      let tempeditItem = {}
      // let tempeoptions = {}
      let skuindex = that.skuProIndex + 1
      if (that.IsaddAttrs.length === 0) {
        this.$message.error('请先添加属性')
        return false
      }
      let productAttrs = that.productAttrs
      if (productAttrs.length === 0) {
        this.$message.error('请先添加属性')
        return false
      }
      let editItem = that.attrs
      let attrs = editItem[editItem.length - 1]
      for (let i in attrs) {
        let tempI = i.replace(/[0-9]/ig, '')
        tempeditItem[tempI + skuindex] = ''
        let temprexg = new RegExp('id')
        let aa = tempI + skuindex
        if (temprexg.test(aa)) {
          tempeditItem[tempI + skuindex] = 0
        }
      }
      that.attrs.push(tempeditItem)
      // 数组深度拷贝------
      let optionsarray = []
      var options = productAttrs[productAttrs.length - 1].slice(0)
      for (var i in options) {
        let a = {}
        for (let j in options[i]) {
          a[j] = options[i][j]
        }
        optionsarray.push(a)
      }
      for (let i in optionsarray) {
        let optionsI = optionsarray[i]['value'].replace(/[0-9]/ig, '')
        optionsarray[i]['value'] = optionsI + skuindex
      }
      // end-----
      that.productAttrs.push(optionsarray)
      that.skuProIndex += 1
    },
    // 删除当前行
    handleDeletcAttrline(index) {
      let that = this
      let temp = that.productAttrs
      let attrs = that.attrs
      attrs.splice(index, 1)
      temp.splice(index, 1)
      if (temp.length === 0) {
        this.IsaddAttrs = []
      }
    }
  }
}
</script>
<style lang="scss">
#newform-base {
  .el-form-item{
    .product{
      div{

      }
    }
  }
  .childrenAttrs{
    position:absolute;
    top:40px;
    width:70%;
    height: auto;
    padding: 20px 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px #eee;
    z-index: 11;
    padding-left: 20px
  }
  .secondAttrs:last-child .attrTipsTitle{
    border-bottom: none
  }
  .productline{
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
  }
  .product_attrs_line{
    .attrTipsTitle{
      display: table-cell;
      width: 1%;
      border-bottom: 1px solid #d8d8d8;
      text-align: center;
      padding: 5px 10px;
      padding-bottom: 5px;
    }
    .attrTipsTitle:last-child{
      border-right: none
    }
  }
}
</style>
