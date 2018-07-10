const data = {
  // 表格列数据
  columns: [{
    value: 'id',
    label: '公告ID',
    width: 90
  }, {
    value: 'message_type',
    label: '子消息类型',
    width: 130
  }, {
    value: 'title',
    label: '标题',
    width: 130
  }, {
    value: 'content',
    label: '内容',
    minw: 200
  }, {
    value: 'top',
    label: '顶置等级',
    width: 100
  }, {
    value: 'status',
    label: '发送状态',
    width: 95
  }, {
    value: 'send_time',
    label: '推送时间',
    width: 180
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
