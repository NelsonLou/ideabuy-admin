const data = {
  // 表格列数据
  columns: [{
      value: 'apply_id',
      label: '审核ID',
      width: 85
    },
    {
      value: 'real_name',
      label: '真实姓名',
      minw: 110
    }, {
      value: 'user_idcard',
      label: '身份证号码',
      minw: 200
    }, {
      value: 'status',
      label: '审核状态',
      width: 100,
      formatter: row => row.status === 1 ? '未审核' : row.status === 2 ? '审核成功' : '审核失败'
    }, {
      value: 'reason',
      label: '审核理由',
      minw: 150
    }, {
      value: 'created_at',
      label: '添加时间',
      width: 180
    }, {
      value: 'updated_at',
      label: '最后更新时间',
      width: 180
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '搜索名称/身份证/状态'
    }
  ]
}

export default data
