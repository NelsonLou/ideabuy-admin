<template>
<div class="">
  <!-- 操作日志 -->
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
  				<el-button @click="handleEdit(scope.row)" size="small" icon="document" type="primary">详情</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!-- 详情的弹窗 -->
    <el-dialog title="日志详情" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <wk-form-base ref="wk-form" label-width="120px" :form-item="data.editItem" @query="getData" style="width: 442px;">
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false" style="margin: 0;">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import data from './Data/log'
export default {
  name: 'operation-log',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 弹窗的显示和关闭
    dialogFormVisible: false
  }),
  mounted() {
    // 获取初始列表
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
      this.$refs['wk-table'].query(this.$api.log.logList, para, 'admin_list')
    },
    // 获取详情数据
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formType = false
      this.$nextTick(() => {
        // 请求参数
        const para = {
          log_id: row.log_id
        }
        // 调用组件获取数据
        this.$refs['wk-form'].query(this.$api.log.logDetail, para, 'log_detail')
      })
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    }
  }
}
</script>
