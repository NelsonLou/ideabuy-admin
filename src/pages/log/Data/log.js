const data = {
  // 表格列数据
  columns: [{
    value: 'log_id',
    label: '日志ID',
    width: 90
  }, {
    value: 'admin_id',
    label: '管理员ID',
    width: 95
  }, {
    value: 'admin_name',
    label: '管理员名称',
    width: 120
  }, {
    value: 'operate_target',
    label: '操作目标',
    minw: 190
  }, {
    value: 'operate_ip',
    label: '操作IP',
    width: 150
  }, {
    value: 'operate_result',
    label: '操作状态',
    width: 95
  }, {
    value: 'remark',
    label: '评论',
    minw: 150
  }, {
    value: 'operate_time',
    label: '操作时间',
    width: 180
  }],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入管理员名称'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '日志ID',
      value: 'log_id',
      disabled: true
    }, {
      eleType: 'input',
      label: '管理员名称',
      value: 'admin_name',
      disabled: true
    }, {
      eleType: 'input',
      label: '管理员ID',
      value: 'admin_id',
      disabled: true
    }, {
      eleType: 'input',
      label: '操作目标',
      value: 'operate_target',
      disabled: true
    }, {
      eleType: 'input',
      label: '操作IP',
      value: 'operate_ip',
      disabled: true
    }, {
      eleType: 'input',
      label: '操作状态',
      value: 'operate_result',
      disabled: true
    }, {
      eleType: 'input',
      label: '操作时间',
      value: 'operate_time',
      disabled: true
    }, {
      eleType: 'input',
      label: '评论',
      value: 'remark',
      disabled: true
    }
  ]
}

export default data
