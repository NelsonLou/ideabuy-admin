<template>
<div id="add-order">
  <el-card class="box-card">
    <div slot="header" class="card-header">
      添加订单
    </div>
    <div class="form">
      <el-form :model="editForm" ref="editForm" :rules="formRules" label-width="130px" style="margin-bottom: 50px;">
        <el-form-item label="商品名称">
          <span>{{editForm.goods_name}}</span>
        </el-form-item>
        <el-form-item label="商品图片">
          <img :src="editForm.goods_thumb">
        </el-form-item>
        <el-form-item label="商品数量">
          <span>{{editForm.goods_number}}</span>
        </el-form-item>
        <el-form-item label="商品平台价" prop="product_price">
          <el-input v-model="editForm.product_price" placeholder="清输入商品单价" style="width: 190px"></el-input>
        </el-form-item>
        <el-form-item label="金融产品类型" prop="loan_product_id">
          <el-select v-model="editForm.loan_product_id" placeholder="请选择">
            <el-option v-for="opt in select.selectLPID" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分期期数" prop="month" v-if="editForm.loan_product_id !== 2">
          <el-select v-model="editForm.month" placeholder="请选择">
            <el-option v-for="opt in select.selectMonth" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="date">
          <el-date-picker v-model="editForm.date" placeholder="请选择" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户ID" prop="user_id">
          <el-input v-model="editForm.user_id" placeholder="清输入用户ID" style="width: 190px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editSubmit" :loading="submitLoading" type="primary">提 交</el-button>
          <el-button @click="cleanData" :loading="cleanLoading" type="primary">清除数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form">
      <el-form :model="scriptForm" ref="scriptForm" :rules="scriptRules" label-width="130px" style="margin-bottom: 50px;">
        <el-form-item label="脚本时间" prop="date">
          <el-date-picker v-model="scriptForm.date" placeholder="请选择" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="sendPost" :loading="postLoading" type="primary">运行脚本</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</div>
</template>
<script>
import axios from 'axios'
const domain = process.env.NODE_ENV === 'production' ? 'r.weknet.cn' : process.env.NODE_ENV === 'release' ? 'r.t.weknet.cn' : 'r.d.weknet.cn'
export default {
  name: 'add-order',
  data: () => ({
    submitLoading: false,
    postLoading: false,
    cleanLoading: false,
    editForm: {
      user_id: '',
      order_from: 2,
      pay_id: 1,
      order_status: 5,
      order_remark: '尽快发货',
      consignee: '光光',
      mobile: '15111111111',
      province: '33',
      city: '3302',
      district: '330283',
      address: '南部商务区',
      loan_product_id: null, // (1分期，2不分期）
      loan_product_name: '',
      freight_amount: '0.00',
      goods_number: 1,
      goods_name: '测试手机',
      goods_thumb: 'http://www.gehonghua.com/upload/img/1.png', // 图片地址
      attr_name: '颜色|配置',
      attr_value: '黑色|64G',
      product_price: '',
      market_price: '0.00',
      goods_unit: '件',
      trade_no: '001001001',
      month: null, // 下拉 3 6 12 24
      date: null // 日期
    },
    scriptForm: {
      date: ''
    },
    // 下拉选择
    select: {
      selectLPID: [{
          value: 1,
          label: '分期'
        },
        {
          value: 2,
          label: '不分期'
        }
      ],
      selectMonth: [{
          value: 3,
          label: '3期'
        },
        {
          value: 6,
          label: '6期'
        },
        {
          value: 12,
          label: '12期'
        },
        {
          value: 24,
          label: '24期'
        }
      ]
    },
    formRules: {
      product_price: [{
        required: true,
        message: '请输入商品单价',
        trigger: 'blur'
      }],
      user_id: [{
        required: true,
        message: '请输入用户ID',
        trigger: 'blur'
      }],
      loan_product_id: [{
        required: true,
        message: '请选择金融产品类型',
        type: 'integer',
        trigger: 'change'
      }],
      month: [{
        required: true,
        message: '请选择分期期数',
        type: 'integer',
        trigger: 'change'
      }],
      date: [{
        required: true,
        message: '请选择下单时间',
        trigger: 'blur',
        type: 'date'
      }]
    },
    scriptRules: {
      date: [{
        required: true,
        message: '请选择脚本时间',
        trigger: 'blur',
        type: 'date'
      }]
    }
  }),
  methods: {
    editSubmit() {
      this.formRules.product_price[0].required = true
      this.formRules.loan_product_id[0].required = true
      this.formRules.month[0].required = true
      this.formRules.date[0].required = true
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          const reqUrl = 'order-add'
          let para = Object.assign({}, this.editForm)
          para.date = this.$moment(para.date).format('YYYY-MM-DD')
          para.loan_product_name = this.editForm.loan_product_id === 1 ? '分期产品' : '不分期产品'
          this.axios.post(reqUrl, para).then(res => {
            this.submitLoading = false
            this.$message.success(res.data.msg)
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    sendPost() {
      this.$refs.scriptForm.validate(valid => {
        if (valid) {
          this.postLoading = true
          var that = this
          let para = Object.assign({}, this.scriptForm)
          para.date = this.$moment(para.date).format('YYYY-MM-DD') + ' 11:11:11'
          axios.post('http://' + domain + '/cron/test', para)
            .then(function(res) {
              that.postLoading = false
              that.$message.success(res.data.msg)
            })
            .catch(function(err) {
              console.log(err)
            })
        }
      })
    },
    cleanData() {
      this.formRules.product_price[0].required = false
      this.formRules.loan_product_id[0].required = false
      this.formRules.month[0].required = false
      this.formRules.date[0].required = false
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.cleanLoading = true
          var that = this
          var para = {
            user_id: this.editForm.user_id
          }
          axios.post('http://' + domain + '/cron/clear', para)
            .then(function(res) {
              that.cleanLoading = false
              that.$message.success(res.data.msg)
            })
            .catch(function(err) {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
#add-order {
    .box-card {
        overflow: hidden;
        .form {
            width: 40%;
            float: left;
        }
    }
}
</style>
