const data = {
  // 表格列数据
  columns: [{ // 自定义表格标签用
      value: 'type_id',
      label: 'ID',
      minw: 120,
      sortable: true
    },
    {
      value: 'type_name',
      label: '分类名称',
      minw: 120
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入分类名称'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '分类名称',
      value: 'type_name',
      plh: '请输入分类名称'
    }, {
      eleType: 'select',
      addOption: true,
      label: '父栏目',
      value: 'parent_id',
      plh: '请选择父类'
    }
  ],
  // 编辑表单验证
  editRule: {
    type_name: [
      {
        required: true,
        message: '请输入分类名称',
        trigger: 'change'
      }, {
        min: 2,
        max: 20,
        message: '长度在 2 到 20 个字符',
        trigger: 'blur'
      }
    ],
    parent_id: [
      {
        type: 'integer',
        required: true,
        message: '选择所属父类',
        trigger: 'blur'
      }
    ]
  }
}

export default data
