const data = {
  // 表格列数据
  columns: [{
      value: 'keyword_id',
      label: '关键字ID',
      width: 95
    },
    {
      value: 'keyword_name',
      label: '关键字',
      minw: 160
    }, {
      value: 'keyword_zh',
      label: '注释',
      minw: 130
    }, {
      value: 'created_at',
      label: '创建时间',
      width: 180
    }, {
      value: 'updated_at',
      label: '更新时间',
      width: 180
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入关键字搜索'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '关键字',
      value: 'keyword_name',
      plh: '请输入关键字'
    }, {
      eleType: 'input',
      label: '注释',
      value: 'keyword_zh',
      plh: '请输入关键字注释'
    }
  ],
  // 编辑表单验证
  editRule: {
    keyword_name: [{
      required: true,
      message: '参数必须以“${}”保函。例如{user_name}',
      trigger: 'blur'
    }],
    keyword_zh: [{
      required: true,
      message: '请输入关键字解释',
      trigger: 'blur'
    }]
  }
}

export default data
