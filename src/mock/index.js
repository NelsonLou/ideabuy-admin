import Mock from 'mockjs'

// Mock 数据模拟
const bootstrap = () => {
  // 登录
  // Mock.mock(/\/login/, {
  //   'code': 1,
  //   'msg': '登录成功',
  //   'data': {
  //     'user_info': {
  //       'user_id': 1,
  //       'real_name': '火云邪神'
  //     }
  //   }
  // })

  // 获取菜单
  Mock.mock(/\/menu/, {
    'code': 1,
    'msg': '获取菜单成功',
    'data': {
      menu: [
        {
          name: '仪表盘',
          path: '/dashboard'
        }, {
          name: '会员管理',
          path: '/member',
          children: [
            {
              name: '会员列表',
              path: '/member/member-list'
            }, {
              name: '会员审核',
              path: '/member/member-verify'
            }
          ]
        }, {
          name: '订单管理',
          path: '/order',
          children: [
            {
              name: '订单列表',
              path: '/order/order-list'
            },
            {
              name: '添加订单',
              path: '/order/add-order'
            }
          ]
        }, {
          name: '内容管理',
          path: '/content',
          children: [
            {
              name: '广告分类',
              path: '/content/ad-type'
            }, {
              name: '广告列表',
              path: '/content/ad-list'
            }, {
              name: '文章分类',
              path: '/content/article-type'
            }, {
              name: '文章列表',
              path: '/content/article-list'
            }
          ]
        }, {
          name: '消息管理',
          path: '/message',
          children: [
            {
              name: '消息模板',
              path: '/message/msg-tpl-list'
            }, {
              name: '消息模板关键字',
              path: '/message/msg-tpl-key'
            }, {
              name: '公告列表',
              path: '/message/msg-list'
            }, {
              name: '通知列表',
              path: '/message/notice-list'
            }, {
              name: '推送列表',
              path: '/message/push-list'
            }, {
              name: '短信列表',
              path: '/message/sms-list'
            }, {
              name: '消息公告发布',
              path: '/message/mass-msg'
            }
          ]
        }, {
          name: '系统设置',
          path: '/setting',
          children: [
            {
              name: '用户管理',
              path: '/setting/users'
            }, {
              name: '角色管理',
              path: '/setting/role'
            }, {
              name: '权限管理',
              path: '/setting/permission'
            }
          ]
        }, {
          name: '日志管理',
          path: '/log',
          children: [
            {
              //   name: '登录日志',
              //   path: '/log/login-log'
              // }, {
              name: '操作日志',
              path: '/log/operation-log'
            }
          ]
        }
      ]
    }
  })

  // 修改密码
  Mock.mock(/\/modifyPwd/, {
    'code': 1,
    'msg': '密码修改成功'
  })

  // 退出
  // Mock.mock(/\/logout/, {
  //   'code': 1,
  //   'msg': '登出成功'
  // })
}

export default {
  bootstrap
}
