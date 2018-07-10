  <template>
<div id='order-list'>
  <el-card v-show='!isInfo' class='box-card' v-loading.body='loading'>
    <!-- 工具条 -->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-form" :form-item="data.searchItem" @query="getOrderList">
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
      </wk-form-base>
    </div>
    <!-- 列表 更新 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getOrderList">
      <el-table-column label="操作" width="180">
        <template scope="scope">
  				<el-button @click="getInfo(scope.$index, scope.row)" size="small" icon="edit" type="primary">详情</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
  </el-card>
  <el-card v-show='isInfo'>
    <div slot='header'>
      <el-button icon='arrow-left' type="primary" @click='handleBack'>返回</el-button><br>
    </div>
    <span class="titleA">订单详情</span>
    <el-row>
      <span v-for="item in orderInfoList">
        <el-col :span="5" class="label">{{item.label}}</el-col>
        <el-col :span="5">
          <el-input :value="item.value" :disabled="true"></el-input>
        </el-col>
      </span>
    </el-row>
    <hr></hr>
    <span class="titleA">商品详情</span>
    <div class="clearfloat" v-for='(items,index) in goodsInfoList'>
      <div class="left">
        <img :src="info.goods_info[index].goods_thumb" alt="">
      </div>
      <div class="right">
        <el-row>
          <span v-for="item in items">
            <el-col :span="5" class="label">{{item.label}}</el-col>
            <el-col :span="5">
              <el-input :value="item.value" :disabled="true"></el-input>
            </el-col>
          </span>
        </el-row>
      </div>
      <br>
      <br>
    </div>
  </el-card>
</div>
</template>
<script>
import data from './Data/OrderList'
export default {
  name: 'order-list',
  data: () => ({
    data,
    loading: false,
    keyword: '',
    isInfo: false,
    orderList: [],
    info: [],
    goodsInfoList: [],
    orderInfoList: [],
    total: 10
  }),
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList(obj) { // 获取列表
      if (obj) {
        this.keyword = obj
      }
      const para = Object.assign({}, this.keyword)
      this.$refs['wk-table'].query(this.$api.order.orderList, para, 'list')
    },
    searchForm() { // 搜索
      this.$refs['wk-form'].search()
    },
    getInfo(index, row) { // 获取详细
      this.loading = true
      let para = {
        order_id: row.order_id
      }
      this.axios.get(this.$api.order.orderDetail, {
        params: para
      }).then(res => {
        const list = res.data
        this.info = list.data
        this.isInfo = true
        this.handleInfo()
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.loading = false
      })
    },
    handleInfo() {
      this.orderInfoList = [{
        value: this.info.order_id,
        label: '订单ID'
      }, {
        value: this.info.user_id,
        label: '用户ID'
      }, {
        value: this.info.order_sn,
        label: '订单编号'
      }, {
        label: '支付方式',
        value: this.info.pay_id === 1 ? '白条' : this.info.pay_id === 2 ? '支付宝' : this.info.pay_id === 3 ? '微信' : this.info.pay_id === 4 ? '银行卡' : this.info.pay_id === 5 ? '余额' : '未知'
      }, {
        value: this.info.order_status,
        label: '订单状态'
      }, {
        value: this.info.goods_amount,
        label: '商品总价'
      }, {
        value: this.info.freight_amount,
        label: '运费'
      }, {
        value: this.info.order_amount,
        label: '订单总价'
      }, {
        value: this.info.consignee,
        label: '收货人'
      }, {
        value: this.info.province,
        label: '收货省'
      }, {
        value: this.info.city,
        label: '收货市'
      }, {
        value: this.info.district,
        label: '收货区'
      }, {
        value: this.info.address,
        label: '收货地址'
      }, {
        value: this.info.mobile,
        label: '收货人手机'
      }, {
        label: '订单来源',
        value: this.info.order_from === 1 ? '线上商城' : this.info.order_from === 2 ? '线下门店' : '未知'
      }, {
        value: this.info.loan_product_id,
        label: '贷款商品ID'
      }, {
        value: this.info.month,
        label: '白条分期数'
      }, {
        value: this.info.order_remark,
        label: '订单备注'
      }, {
        label: '白条（不分期）是否偿还',
        value: this.info.white_is_pay_off === 1 ? '是' : this.info.white_is_pay_off === 0 ? '否' : '未知'
      }]
      if (this.info.goods_info.length !== 0) {
        for (let i = 0; i < this.info.goods_info.length; i++) {
          let arr = this.info.goods_info[i]
          this.goodsInfoList[i] = [{
            value: arr.id,
            label: 'ID'
          }, {
            value: arr.goods_id,
            label: '商品ID'
          }, {
            value: arr.product_id,
            label: '货品ID'
          }, {
            value: arr.goods_name,
            label: '商品名'
          }, {
            value: arr.goods_sn,
            label: '商品编号'
          }, {
            value: arr.product_price,
            label: '货品价'
          }, {
            value: arr.market_price,
            label: '市场价格'
          }, {
            value: arr.goods_number,
            label: '下单数量'
          }, {
            value: arr.goods_unit,
            label: '商品单位'
          }, {
            value: arr.str_attr,
            label: '商品属性'
          }]
        }
      }
      this.isInfo = true
    },
    handleBack() {
      this.info = {}
      this.orderInfoList = []
      this.goodsInfoList = []
      this.isInfo = false
    }
  }
}
</script>
<style lang='scss' scoped>
#order-list {}
.xx {
    width: 500px;
}
.xx input {
    width: 320px;
}
.label {
    line-height: 36px;
    text-align: right;
    padding-right: 10px;
}
.el-col {
    margin-bottom: 6px;
}
.titleA {
    font-weight: 700;
    margin-left: 40px;
    margin-top: 40px;
}
.left {
    width: 15%;
    float: left;
}
.right {
    width: 84%;
    float: right;
}
.clearfloat {
    margin-top: 20px;
}
.clearfloat:after {
    display: block;
    clear: both;
    content: "";
}
hr {
    height: 1px;
    border: none;
    border-top: 1px solid #f7f7f7;
}
</style>
