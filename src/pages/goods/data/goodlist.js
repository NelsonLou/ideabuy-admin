import * as api from '@/api'
const data = {
    columns: [
      {
        value: 'goods_id',
        label: '商品ID',
        width: '100'
      }, {
        value: 'goods_sn',
        label: '商品编号'
      }, {
        value: 'goods_name',
        label: '商品名称'
      }, {
        value: 'market_price',
        label: '市场价',
        width: '100'
      }, {
        value: 'goods_price',
        label: '原价',
        width: '100'
      }, {
        value: 'created_at',
        label: '上传时间',
        sortable: true
      }, {
        value: 'updated_at',
        label: '修改时间',
        sortable: true
      }
   ],
   editItem: [
     {
       eleType: 'input',
       label: '商品排序',
       value: 'sort',
       plh: '请输入商品排序'
     }, {
       eleType: 'input',
       label: '商品名称',
       value: 'goods_name',
       plh: '请输入商品名称'
     }, {
       eleType: 'select',
       label: '商品分类',
       value: 'cat_id',
       plh: '请选择商品分类',
       options: []
     }, {
       eleType: 'select',
       label: '商品品牌',
       value: 'brand_id',
       plh: '请选择商品品牌',
       optiodns: []
     },
    // {
    //    eleType: 'input',
    //    label: '商品库存',
    //    value: 'goods_number',
    //    plh: '请输入商品库存'
    //  }, {
    //    eleType: 'input',
    //    label: '市场价',
    //    value: 'market_price',
    //    plh: '请输入市场价'
    //  }, {
    //    eleType: 'input',
    //    label: '门店价',
    //    value: 'goods_price',
    //    plh: '请输入门店价'
    //  },
     {
       eleType: 'hidden',
       label: '货品参数',
       value: 'product_attr'
     }, {
       eleType: 'product',
       label: '请选择商品类型',
       value: 'type_id',
       options: [],
       attrs: {}
     }, {
       eleType: 'upload',
       label: '商品缩略图(小)',
       value: 'goods_thumb',
       filelist: [],
       action: api.config.url + api.picUpload.toBaseI64mage,
       headers: api.config.headers,
       tips: '300*300',
       pictype: 'jpg/png'
     }, {
       eleType: 'upload',
       label: '商品缩略图(大)',
       value: 'goods_img',
       filelist: [],
       action: api.config.url + api.picUpload.toBaseI64mage,
       headers: api.config.headers,
       tips: '1264*652',
       pictype: 'jpg/png'
     }, {
       eleType: 'input',
       label: '关键词',
       value: 'keywords'
     }, {
       eleType: 'select',
       label: '配送范围',
       value: 'shipping_range',
       options: []
     }, {
      eleType: 'content',
      label: '商品详情',
      value: 'goods_desc',
      plh: '商品描述',
      iptType: 'content'
    }, {
       eleType: 'radio',
       label: '是否首页显示',
       value: 'is_index',
       options: [
         {
           label: '是',
           'value': 1
         }, {
           label: '否',
           'value': 0
         }
       ]
     }, {
       eleType: 'radio',
       label: '是否是实物',
       value: 'is_real',
       options: [
         {
           label: '是',
           'value': 1
         }, {
           label: '否',
           'value': 0
         }
       ]
     }, {
       eleType: 'radio',
       label: '是否包邮',
       value: 'is_shipping',
       options: [
         {
           label: '是',
           'value': 1
         }, {
           label: '否',
           'value': 0
         }
       ]
     }
   ],
   editRule: {
     goods_name: [
       {
         type: 'string',
         required: true,
         message: '请输入商品名称',
         trigger: 'change'
       }
     ],
     cat_id: [
       {
         type: 'number',
         required: true,
         message: '请选择商品分类',
         trigger: 'change'
       }
     ],
     brand_id: [
       {
         type: 'number',
         required: true,
         message: '请选择品牌分类',
         trigger: 'change'
       }
     ],
     type_id: [
       {
         type: 'number',
         required: true,
         message: '请选择商品属性',
         trigger: 'change'
       }
     ]
    //  market_price: [
    //    {
    //      type: 'string',
    //      required: true,
    //      message: '请输入商品市场价',
    //      trigger: 'change'
    //    }
    //  ],
    //  goods_price: [
    //    {
    //      type: 'string',
    //      required: true,
    //      message: '请输入商品门店价',
    //      trigger: 'change'
    //    }
    //  ],
    //  product_attr: [
    //    {validator: (rule, value, callback) => {
    //       if (value === '') {
    //         callback(new Error('货品信息不能为空'))
    //       } else {
    //         callback()
    //       }
    //    },
    //    trigger: 'danger'}
    //  ]
   },
   formData: {
     goods_name: ''
   }
}

export default data
