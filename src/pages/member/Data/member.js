const data = {
  // 表格列数据
  columns: [
    {
      value: 'user_id',
      label: 'ID',
      width: 80
    }, {
      value: 'real_name',
      label: '真实姓名',
      width: 150
    }, {
      value: 'user_idcard',
      label: '身份证号码',
      minw: 200
    }, {
      value: 'user_mobile',
      label: '手机号码',
      width: 150
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
      plh: '搜索名称/身份证/手机号'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '真实姓名',
      value: 'real_name',
      plh: '请输入姓名'
    }, {
      eleType: 'input',
      label: '身份证号码',
      value: 'user_idcard',
      plh: '请输入身份证号码'
    }, {
      eleType: 'input',
      label: '手机号码',
      value: 'user_mobile',
      plh: '请输入手机号码'
    }
  ],
  // 编辑表单验证
  editRule: {
    real_name: [
      {
        required: true,
        message: '需要输入真实姓名',
        trigger: 'blur'
      }
    ],
    user_idcard: [
      {
        required: true,
        message: '需要输入身份证号码',
        trigger: 'blur'
      }
    ],
    user_mobile: [
      {
        required: true,
        message: '需要输入手机号码',
        trigger: 'blur'
      }
    ]
  }
}

export default data
