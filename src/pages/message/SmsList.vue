<template>
<!-- 短信列表 -->
<div id="sms-list">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-forms" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
    </wk-table-base>
  </el-card>
</div>
</template>
<script>
import data from './Data/SmsList'
export default {
  name: 'sms-list',
  data: () => ({
    data,
    // 筛选关键字
    filters: {}
  }),
  mounted() {
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
      this.$refs['wk-table'].query(this.$api.message.messageSmslist, para, 'list')
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    }
  }
}
</script>
<style lang="scss" scoped>
.adClass_serch {
    width: 239px;
    float: left;
}
.toolBtn {
    overflow: hidden;
    border-bottom: 1px solid #f8f8f8;
    padding: 16px 20px;
    background: #fff;
}
</style>
