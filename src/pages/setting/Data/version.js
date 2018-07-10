const data = {
  // 表格列数据
  columns: [
    {
      value: 'id',
      label: 'ID',
      width: 60
    }, {
      value: 'version',
      label: '版本',
      width: 139
    }, {
      value: 'device',
      label: '设备',
      width: 100
    }, {
      value: 'update_mode',
      label: '更新模式',
      width: 100
    }, {
      value: 'update_type',
      label: '更新类型',
      width: 100
    }, {
      value: 'version_url',
      label: '版本地址',
      minw: 180
    }, {
      value: 'module',
      label: '模块',
      width: 100
    }, {
      value: 'version_content',
      label: '版本内容',
      minw: 180
    }, {
      value: 'md5',
      label: 'md5',
      width: 150
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '请输入版本号或设备'
    }
  ]
}

export default data
