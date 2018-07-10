const data = {
  // 表格列数据
  columns: [
    {
      value: 'type_id',
      label: 'ID',
      width: 80
    }, {
      value: 'type_name',
      label: '名称',
      minw: 170
    }, {
      value: 'img_size',
      label: '尺寸',
      width: 130
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
      plh: '请输入要搜索的名称'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '名称',
      value: 'type_name',
      plh: '请输入名称'
    }, {
      eleType: 'input',
      label: '尺寸',
      value: 'img_size',
      plh: '请输入尺寸'
    }
  ],
  // 编辑表单验证
  editRule: {
    type_name: [
      {
        required: true,
        message: '需要输入名称',
        trigger: 'blur'
      }
    ],
    img_size: [
      {
        required: true,
        message: '需要输入尺寸',
        trigger: 'blur'
      }
    ]
  }
}

export default data
