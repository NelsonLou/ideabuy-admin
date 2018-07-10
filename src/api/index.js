// 系统配置参数
const version = 'v1'
const domain = process.env.NODE_ENV === 'production' ? 'i.weknet.cn' : process.env.NODE_ENV === 'release' ? 'i.t.weknet.cn' : 'i.d.weknet.cn'
export const config = {
  headers: {
    Accept: `application/vnd.ideabuy.${version}+json`
  },
  url: `http://${domain}/backend/`, // 接口地址
  limit: 10 // 每页显示条目个数
}
// 系统基础接口映射
export const system = {
  login: 'admin-login', // 登录
  // logout: 'logout', // 退出
  modifyPwd: 'modifyPwd', // 修改密码
  menu: 'permission-left' // 菜单列表
}
export const order = {
  orderList: 'order-list', // 订单列表
  orderDetail: 'order-detail'
}
// 系统设置
export const setting = {
  // 用户管理
  users: 'admin-list', // 用户列表
  userAdd: 'admin-add', // 添加用户
  userDel: 'admin-delete', // 删除用户
  userBatchRemove: 'admin-delete', // 批量删除用户
  userEdit: 'admin-edit', // 编辑用户
  userInfo: 'admin-detail', // 用户详情
  roleListAll: 'role-list-all', // 所有角色列表
  // 角色管理
  roleList: 'role-list', // 角色列表
  roleAdd: 'role-add', // 添加角色
  roleDelete: 'role-delete', // 删除角色
  roleEdit: 'role-edit', // 编辑角色
  roleDetail: 'role-detail', // 角色详情
  permissionRoleAdd: 'permission-role-add', // 编辑权限
  permissionRoleDetail: 'permission-role-detail', // 权限详细
  // 权限管理
  PList: 'permission-list', // 权限列表
  PType: 'permission-type', // 权限分类
  PAdd: 'permission-add', // 权限添加
  PEdit: 'permission-edit', // 权限编辑
  PDetail: 'permission-detail', // 权限详细
  // 版本管理
  versionList: 'version-list', // 版本管理列表
  versionAdd: 'version-add', // 版本管理添加
  versionDelete: 'version-delete', // 版本管理删除
  versionAllDelete: 'version-delete', // 版本管理批量删除
  versionDispaly: 'version-dispaly', // 版本管理下拉
  fileUpload: 'file-upload' // 版本管理文件上传
}
// 会员管理
export const user = {
  // 会员列表
  userList: 'user-list', // 会员列表
  userAdd: 'user-add', // 会员添加
  userDetail: 'user-detail', // 会员详情
  // 会员审核
  applyList: 'userapply-list', // 审核列表
  applyEdit: 'userapply-edit', // 审核操作
  applyDetail: 'userapply-detail' // 审核详情
}
// 内容管理
export const content = {
  // 广告分类
  AdClass: 'adtype-list', // 广告分类列表
  tjClass: 'adtype-add', // 广告分类添加
  delClass: 'adtype-delete', // 广告分类删除
  edClass: 'adtype-edit', // 广告分类修改
  deClass: 'adtype-detail', // 广告分类详情
  // 广告管理
  AdManage: 'ad-list', // 广告管理列表
  tjManage: 'ad-add', // 广告管理添加
  delManage: 'ad-delete', // 广告管理删除
  delManageAll: 'ad-delete', // 广告管理批量删除
  edManage: 'ad-edit', // 广告管理修改
  deManage: 'ad-detail', // 广告管理详情
  spiManage: 'adtype-spinner', // 广告管理下拉框
  baseImage: 'base64Image', // 广告管理图片上传
  // delImage: 'deleteImage', // 广告管理图片删除
  // 文章分类
  ATList: 'articletype-list', // 文章分类列表
  ATAdd: 'articletype-add', // 添加文章分类
  ATDelete: 'articletype-delete', // 删除文章分类
  ATEdit: 'articletype-edit', // 修改文章分类
  ATDetail: 'articletype-detail', // 文章分类单个查询
  ATSelect: 'articletype-select', // 文章分类ID查询(所有)
  // 文章管理
  getArticleList: 'article-list', // 文章列表
  getDetail: 'article-detail', // 文章详情
  getSelectOption: 'articletype-select', // 类型下拉选项
  uploadImg: 'imgupload', // 上传图片
  addArticle: 'article-add', // 添加文章
  deleteArticle: 'article-delete', // 删除文章
  editArticle: 'article-edit', // 修改文章
  search: 'search', // 搜索文章
  pageChange: 'pageChange' // 切换页码
}
// 消息管理
export const message = {
  messageList: 'message-list', // 短信列表
  pushList: 'push-list', // 推送信息列表
  messagePush: 'message-push', // 消息推送接口(消息群发)
  messagePushSel: 'message-push-select', // 消息推送接口(消息群发)下拉框
  messageNoticelist: 'message-noticelist', // 消息列表-通知
  messageAnnounceList: 'message-announcelist', // 消息列表-公告
  messageAnnouncetop: 'message-announcetop', // 公告顶置
  messageSmslist: 'message-smslist', // 短信列表
  // 信息模板接口
  msgtemplateList: 'msgtemplate-list', // 消息模板列表
  msgtemplateDetail: 'msgtemplate-detail', // 消息模板详情
  msgtemplateAdd: 'msgtemplate-add', // 信息模板添加
  msgtemplateEdit: 'msgtemplate-edit', // 信息模板编辑
  msgtemplateDelete: 'msgtemplate-delete', // 信息模板删除
  // 信息模板关键字接口
  msgtemplatekeywordList: 'msgtemplatekeyword-list', // 信息模板关键字列表
  msgtemplatekeywordDetail: 'msgtemplatekeyword-detail', // 信息模板关键字详情
  msgtemplatekeywordAdd: 'msgtemplatekeyword-add', // 信息模板关键字添加
  msgtemplatekeywordEdit: 'msgtemplatekeyword-edit' // 信息模板关键字修改
}
// 日志管理
export const log = {
  logList: 'log-list', // 操作日志列表
  logDetail: 'log-detail'   // 操作日志详情
}
// 图片上传/删除接口
export const picUpload = {
  uploadImg: 'imgupload',
  toBaseI64mage: 'base64Image',
  deleteImg: 'deleteimage'
}
// 商品管理
export const goods = {
  // 品牌管理
  brandList: 'goodsbrand-list',
  brandDel: 'goodsbrand-delete',
  brandAdd: 'goodsbrand-add',
  brandEdit: 'goodsbrand-edit',
  brandDetail: 'goodsbrand-detail',
  // 分类管理
  goodscatelist: 'goodscategory-list-tree', // 获取所有分类
  goodspullcatelist: 'goodscategory-list-level', // 下拉加载相应分类
  goodscateEdit: 'goodscategory-edit', // 编辑分类
  goodscateAdd: 'goodscategory-add', // 增加分类
  goodscateDetail: 'goodscategory-detail', // 获取分类详情
  goodscateDel: 'goodscategory-delete', // 删除分类
  // 商品列表
  goodsList: 'goods-list', // 删除列表
  goodsDelete: 'goods-delete', // 删除商品（支持批量）
  goodsDetail: 'goods-detail', // 删除商品（支持批量）
  goodsAllTypeList: 'type-all-list', // 获取商品所有类型
  goodsSingleTypeList: 'type-attr-list', // 获取商品单个类型
  goodsAllInfo: 'goods-select', // 获取商品添加时所需要所有信息
  goodsAdd: 'goods-add', // 商品添加
  goodsEdit: 'goods-edit', // 商品编辑
  goodsStatusChange: 'goods-status-change', // 商品编辑
  // 商品类型
  typeList: 'type-list', // 商品类型列表
  typeAdd: 'type-add', // 商品类型增加
  typeEdit: 'type-edit', // 商品类型编辑
  typeDelete: 'type-del', // 商品类型删除
  typeDetail: 'type-detail', // 商品类型详情
  // 商品属性
  attributeList: 'attribute-list', // 商品属性列表
  attributeTyleList: 'type-attr-list', // 商品属性对应属性列表
  attributeAdd: 'attribute-add', // 商品属性增加
  attributeEdit: 'attribute-edit', // 商品属性编辑
  attributeDelete: 'attribute-del', // 商品属性删除
  attributeDetail: 'attribute-detail' // 商品属性详情
}
