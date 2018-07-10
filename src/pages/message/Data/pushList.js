const data = {
  // 表格列数据
  columns: [{
    value: 'id',
    label: 'ID',
    width: 80
  }, {
    value: 'user_id',
    label: '用户ID',
    width: 85
  }, {
    value: 'type',
    label: '主消息类型',
    width: 110
  }, {
    value: 'message_type',
    label: '子消息类型',
    width: 110
  }, {
    value: 'title',
    label: '标题',
    width: 100
  }, {
    value: 'content',
    label: '内容',
    minw: 200
  }, {
    value: 'send_type',
    label: '发送类型',
    width: 95
  }, {
    value: 'platform',
    label: '发送平台',
    width: 110
  }, {
    value: 'status',
    label: '发送状态',
    width: 95
  }, {
    value: 'send_time',
    label: '推送时间',
    width: 130
  }, {
    value: 'created_at',
    label: '信息添加时间',
    width: 130
  }],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入子消息类型或标题'
    }
  ]
}

export default data
