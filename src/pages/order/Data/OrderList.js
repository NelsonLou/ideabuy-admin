const data = {
  // 表格列数据
  columns: [
    {
      value: 'order_id',
      label: '订单ID',
      minw: 120,
      sortable: true
    }, {
      value: 'order_sn',
      label: '订单编号',
      minw: 120
    }, {
      value: 'user_id',
      label: '用户ID',
      minw: 120,
      sortable: true
    }, {
      value: 'order_status',
      label: '订单状态',
      minw: 120,
      sortable: true,
      formatter: row => row.order_status === 0
        ? '未付款'
        : row.order_status === 1
          ? '已付款待发货'
          : row.order_status === 2
            ? '已付款待收货'
            : row.order_status === 3
              ? '确认收货'
              : row.order_status === 4
                ? '已取消'
                : row.order_status === 5
                  ? '已完成'
                  : '未知'
    }, {
      value: 'mobile',
      label: '用户手机',
      minw: 120
    }
  ],
  // 搜索表单元素
  searchItem: [
    {
      eleType: 'search',
      value: 'keyword',
      plh: '订单号/名称/电话/身份证'
    }
  ]
}

export default data
