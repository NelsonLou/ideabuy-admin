<template>
<div id="msg-list">
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
      <el-table-column label="操作" fixed="right" width="100" class="table_btn">
        <template scope="scope">
          <!-- 操作按钮 -->
          <el-button @click="handleMsgTop(scope.row)" size="small" icon="caret-top" type="primary">顶置</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
  </el-card>
</div>
</template>

<script>
import data from './Data/msgList'
export default {
  name: 'msg-list',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 弹窗的显示和关闭
    dialogFormVisible: false
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
      this.$refs['wk-table'].query(this.$api.message.messageAnnounceList, para, 'list')
    },
    // 发送信息方法
    handleMsgTop(row) {
      this.listLoading = true
      // console.log('row', row.id)
      var para = {
        id: row.id
      }
      this.axios.post(this.$api.message.messageAnnouncetop, para).then(res => {
        // console.log(res)
        this.getData(null)
        this.listLoading = false
      }).catch(error => {
        console.log(error)
      })
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
