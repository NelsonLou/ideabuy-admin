const data = {
  // 表格列数据
  columns: [
  {
    value: 'sms_id',
    label: '短信ID',
    width: 110
  }, {
    value: 'phone',
    label: '接收人手机号码',
    width: 150
  }, {
    value: 'content',
    label: '接收内容',
    minw: 180
  }, {
    value: 'send_template',
    label: '短信模板',
    minw: 150
  }, {
    value: 'status',
    label: '发送状态',
    width: 100
  }],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入手机号码或内容'
    }
  ]
}

export default data
