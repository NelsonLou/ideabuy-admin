// Vue Router 路由配置
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Dashboard from '@/pages/Dashboard'
// 系统设置
import Users from '@/pages/setting/Users'
import Role from '@/pages/setting/Role'
import Permission from '@/pages/setting/Permission'
import Version from '@/pages/setting/Version'
// 会员管理
import MemberList from '@/pages/member/MemberList'
import MemberVerify from '@/pages/member/MemberVerify'
// 商品管理
import GoodsBrand from '@/pages/goods/GoodsBrand'
import GoodsCategory from '@/pages/goods/GoodsCategory'
import GoodsList from '@/pages/goods/GoodsList'
import GoodsType from '@/pages/goods/GoodsType'
import GoodsAttribute from '@/pages/goods/GoodsAttribute'
// 订单管理
import OrderList from '@/pages/order/OrderList'
import AddOrder from '@/pages/order/AddOrder'
// 消息管理
import MsgTpl from '@/pages/message/MsgTpl'
import MsgTplKey from '@/pages/message/MsgTplKey'
import MsgList from '@/pages/message/MsgList'
import NoticeList from '@/pages/message/NoticeList'
import PushList from '@/pages/message/PushList'
import SmsList from '@/pages/message/SmsList'
import MassMsg from '@/pages/message/MassMsg'
// 内容管理
import AdType from '@/pages/content/AdType'
import AdList from '@/pages/content/AdList'
import ArticleType from '@/pages/content/ArticleType'
import ArticleList from '@/pages/content/ArticleList'
// 日志管理
import LoginLog from '@/pages/log/LoginLog'
import OperationLog from '@/pages/log/OperationLog'

const routes = [
  {
    path: '*',
    name: '404',
    component: NotFound
  }, {
    path: '/login',
    name: '登录',
    component: Login
  }, {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: '仪表盘',
        component: Dashboard
      }
    ]
  }, {
    path: '/member',
    redirect: '/member/member-list',
    name: '会员管理',
    component: Layout,
    children: [
      {
        path: '/member/member-list',
        name: '会员列表',
        component: MemberList
      }, {
        path: '/member/member-verify',
        name: '会员审核',
        component: MemberVerify
      }
    ]
  }, {
    path: '/goods',
    redirect: '/goods/goods-brand',
    name: '商品管理',
    component: Layout,
    children: [
      {
        path: '/goods/goods-brand',
        name: '商品品牌',
        component: GoodsBrand
      }, {
        path: '/goods/goods-category',
        name: '商品分类',
        component: GoodsCategory
      }, {
        path: '/goods/goods-list',
        name: '商品列表',
        component: GoodsList
      }, {
        path: '/goods/goods-type',
        name: '商品类型',
        component: GoodsType
      }, {
        path: '/goods/goods-attribute',
        name: '商品属性',
        component: GoodsAttribute
      }
    ]
  }, {
    path: '/order',
    redirect: '/order/order-list',
    name: '订单管理',
    component: Layout,
    children: [
      {
        path: '/order/order-list',
        name: '订单列表',
        component: OrderList
      }, {
        path: '/order/add-order',
        name: '添加订单',
        component: AddOrder
      }
    ]
  }, {
    path: '/content',
    redirect: '/content/ad-type',
    name: '内容管理',
    component: Layout,
    children: [
      {
        path: '/content/ad-type',
        name: '广告分类',
        component: AdType
      }, {
        path: '/content/ad-list',
        name: '广告列表',
        component: AdList
      }, {
        path: '/content/article-type',
        name: '文章分类',
        component: ArticleType
      }, {
        path: '/content/article-list',
        name: '文章列表',
        component: ArticleList
      }
    ]
  }, {
    path: '/message',
    redirect: '/message/msg-list',
    name: '消息管理',
    component: Layout,
    children: [
      {
        name: '消息模板列表',
        path: '/message/msg-tpl-list',
        component: MsgTpl
      }, {
        name: '消息模板关键字',
        path: '/message/msg-tpl-key',
        component: MsgTplKey
      }, {
        path: '/message/msg-list',
        name: '公告列表',
        component: MsgList
      }, {
        path: '/message/notice-list',
        name: '通知列表',
        component: NoticeList
      }, {
        path: '/message/push-list',
        name: '推送列表',
        component: PushList
      }, {
        path: '/message/sms-list',
        name: '短信列表',
        component: SmsList
      }, {
        path: '/message/mass-msg',
        name: '消息公告发布',
        component: MassMsg
      }
    ]
  }, {
    path: '/setting',
    redirect: '/setting/users',
    name: '系统设置',
    component: Layout,
    children: [
      {
        path: '/setting/users',
        name: '用户管理',
        component: Users
      }, {
        path: '/setting/role',
        name: '角色管理',
        component: Role
      }, {
        path: '/setting/permission',
        name: '权限管理',
        component: Permission
      }, {
        path: '/setting/version',
        name: '版本管理',
        component: Version
      }
    ]
  }, {
    path: '/log',
    redirect: '/log/login-log',
    name: '日志管理',
    component: Layout,
    children: [
      {
        path: '/log/login-log',
        name: '登录日志',
        component: LoginLog
      }, {
        path: '/log/operation-log',
        name: '操作日志',
        component: OperationLog
      }
    ]
  }
]

export default routes
