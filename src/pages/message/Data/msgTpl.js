const data = {
  // 表格列数据
  columns: [{
      value: 'id',
      label: 'ID',
      width: 80
    }, {
      value: 'msg_type',
      label: '信息类型',
      width: 130
    }, {
      value: 'msg_tag',
      label: '信息标签',
      width: 150
    }, {
      value: 'msg_title',
      label: '消息标题',
      width: 130
    }, {
      value: 'content',
      label: '消息内容',
      minw: 220
    }, {
      value: 'prepare_node',
      label: '预发节点',
      minw: 100
    }, {
      value: 'created_at',
      label: '消息发出时间',
      width: 130
    }, {
      value: 'updated_at',
      label: '消息更新时间',
      width: 130
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '搜索消息类型/消息标签/内容'
    }
  ],
  // 编辑表单元素
  editItem: [
    {
      eleType: 'input',
      label: '信息类型',
      value: 'msg_type',
      plh: '请输入信息类型'
    }, {
      eleType: 'input',
      label: '信息标签',
      value: 'msg_tag',
      plh: '请输入信息标签'
    }, {
      eleType: 'input',
      label: '消息标题',
      value: 'msg_title',
      plh: '请输入消息标题'
    }, {
      eleType: 'input',
      iptType: 'textarea',
      label: '消息内容',
      value: 'content',
      plh: '请输入消息内容'
    }, {
      eleType: 'input',
      label: '预发节点',
      value: 'prepare_node',
      plh: '请输入预发节点'
    }
  ],
  // 编辑表单验证
  editRule: {
    content: [{
      required: true,
      message: '参数必须以“${}”保函。例如{user_name}',
      trigger: 'blur'
    }],
    prepare_node: [{
      required: true,
      message: '请输入预发节点',
      trigger: 'blur'
    }],
    msg_type: [{
      required: true,
      message: '请输入信息类型',
      trigger: 'blur'
    }],
    msg_tag: [{
      required: true,
      message: '请输入信息标签',
      trigger: 'blur'
    }],
    msg_title: [{
      required: true,
      message: '请输入消息标题',
      trigger: 'blur'
    }]
  }
}

export default data
