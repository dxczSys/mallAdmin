/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
    { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
    { path: '/register', component: _import('common/register'), name: 'register', meta: { title: '注册' } },
    { path: '/agreement', component: _import('common/agreement'), name: 'agreement', meta: { title: '入驻协议' } },
    { path: '/forget-password', component: _import('common/forget-password'), name: 'forget-password', meta: { title: '忘记密码' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: _import('main'),
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口整体布局' },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
        { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: false } },
        { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: false } },
        { path: '/user-apply-ad', component: _import('modules/user/applyAd'), name: 'user-apply-ad', meta: { title: '广告位申请', isTab: false } },
        { path: '/user-sendout-goods', component: _import('modules/user/sendout-goods'), name: 'user-sendout-goods', meta: { title: '发货', isTab: false } },
        { path: '/user-order-detail', component: _import('modules/user/order-detail'), name: 'user-order-detail', meta: { title: '订单详情', isTab: false } },
        { path: '/user-dealwith-sale', component: _import('modules/user/dealwith-sale'), name: 'user-dealwith-sale', meta: { title: '售后处理', isTab: false } },
        { path: '/setting-update-personInfo', component: _import('modules/setting/update-personInfo'), name: 'setting-update-personInfo', meta: { title: '基本信息修改', isTab: false } },
        { path: '/setting-update-password', component: _import('modules/setting/update-password'), name: 'setting-update-password', meta: { title: '修改密码', isTab: false } },
        { path: '/admin-add-mall', component: _import('modules/admin/add-mall'), name: 'admin-add-mall', meta: { title: '新增商城', isTab: false } }
    ],
    beforeEnter (to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
            clearLoginInfo()
            next({ name: 'login' })
        }
        next()
    }
}

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false,   // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})

const navDataList = [
    {
        'menuId': '1',
        'parentId': '0',
        'parentName': null,
        'name': '管理员',
        'url': null,
        'perms': null,
        'type': 0,
        'icon': 'shangpu',
        'orderNum': 0,
        'open': null,
        'list': [
            {
                'menuId': '1-1',
                'parentId': '1',
                'parentName': null,
                'name': '组织结构',
                'url': 'admin/organize-structure',
                'perms': null,
                'type': 1,
                'icon': 'zuzhi',
                'orderNum': 1,
                'open': null,
                'list': null
            },
            {
                'menuId': '1-2',
                'parentId': '1',
                'parentName': null,
                'name': '审批管理',
                'url': 'user/ad-manager',
                'perms': null,
                'type': 1,
                'icon': 'shenpi',
                'orderNum': 2,
                'open': null,
                'list': null
            },
            {
                'menuId': '1-3',
                'parentId': '1',
                'parentName': null,
                'name': '广告位管理',
                'url': 'user/goods-manager',
                'perms': null,
                'type': 1,
                'icon': 'guanggaowei',
                'orderNum': 3,
                'open': null,
                'list': null
            },
            {
                'menuId': '1-4',
                'parentId': '1',
                'parentName': null,
                'name': '售后管理',
                'url': 'user/release-goods',
                'perms': null,
                'type': 1,
                'icon': 'shouhou',
                'orderNum': 4,
                'open': null,
                'list': null
            },
            {
                'menuId': '1-5',
                'parentId': '1',
                'parentName': null,
                'name': '类目管理',
                'url': 'admin/kinds-admin',
                'perms': null,
                'type': 1,
                'icon': 'leimu',
                'orderNum': 5,
                'open': null,
                'list': null
            },
            {
                'menuId': '1-6',
                'parentId': '1',
                'parentName': null,
                'name': '数据报表',
                'url': 'user/sale-manage',
                'perms': null,
                'type': 1,
                'icon': 'baobiao',
                'orderNum': 6,
                'open': null,
                'list': null
            }
        ]
    },
    {
        'menuId': '2',
        'parentId': '0',
        'parentName': null,
        'name': '商户中心',
        'url': null,
        'perms': null,
        'type': 0,
        'icon': 'shangpu',
        'orderNum': 0,
        'open': null,
        'list': [
            {
                'menuId': '2-1',
                'parentId': '2',
                'parentName': null,
                'name': '商铺认证',
                'url': 'user/approve',
                'perms': null,
                'type': 1,
                'icon': 'renzheng',
                'orderNum': 1,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-2',
                'parentId': '2',
                'parentName': null,
                'name': '广告位管理',
                'url': 'user/ad-manager',
                'perms': null,
                'type': 1,
                'icon': 'guanggaowei',
                'orderNum': 2,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-3',
                'parentId': '2',
                'parentName': null,
                'name': '商品管理',
                'url': 'user/goods-manager',
                'perms': null,
                'type': 1,
                'icon': 'shangpin',
                'orderNum': 3,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-4',
                'parentId': '2',
                'parentName': null,
                'name': '发布商品',
                'url': 'user/release-goods',
                'perms': null,
                'type': 1,
                'icon': 'fabu',
                'orderNum': 4,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-5',
                'parentId': '2',
                'parentName': null,
                'name': '订单管理',
                'url': 'user/order-manage',
                'perms': null,
                'type': 1,
                'icon': 'dingdan',
                'orderNum': 5,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-6',
                'parentId': '2',
                'parentName': null,
                'name': '售后管理',
                'url': 'user/sale-manage',
                'perms': null,
                'type': 1,
                'icon': 'shouhou',
                'orderNum': 6,
                'open': null,
                'list': null
            },
            {
                'menuId': '2-7',
                'parentId': '2',
                'parentName': null,
                'name': '数据报表',
                'url': 'sys/user',
                'perms': null,
                'type': 1,
                'icon': 'baobiao',
                'orderNum': 7,
                'open': null,
                'list': null
            },
        ]
    }
    
]
const permissions = [
    'sys:schedule:info'
]

router.beforeEach((to, from, next) => {
    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
        next()
    }else {
        fnAddDynamicMenuRoutes(navDataList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(navDataList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(permissions || '[]'))
        next({ ...to, replace: true })
      // http({
      //   url: http.adornUrl('/sys/menu/nav'),
      //   method: 'get',
      //   params: http.adornParams()
      // }).then(({data}) => {
      //   if (data && data.code === 0) {
      //     fnAddDynamicMenuRoutes(data.menuList)
      //     router.options.isAddDynamicMenuRoutes = true
      //     sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
      //     sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
      //     next({ ...to, replace: true })
      //   } else {
      //     sessionStorage.setItem('menuList', '[]')
      //     sessionStorage.setItem('permissions', '[]')
      //     next()
      //   }
      // }).catch((e) => {
      //   console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      //   router.push({ name: 'login' })
      // })
    }
})
  
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
    var temp = []
    for (var i = 0; i < globalRoutes.length; i++) {
        if (route.path === globalRoutes[i].path) {
            return 'global'
        }else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}
  
/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
    var temp = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].list && menuList[i].list.length >= 1) {
            temp = temp.concat(menuList[i].list)
        }else if (menuList[i].url && /\S/.test(menuList[i].url)) {
            menuList[i].url = menuList[i].url.replace(/^\//, '')
            var route = {
                path: menuList[i].url.replace('/', '-'),
                component: null,
                name: menuList[i].url.replace('/', '-'),
                meta: {
                    menuId: menuList[i].menuId,
                    title: menuList[i].name,
                    isDynamic: true,
                    isTab: false,
                    iframeUrl: ''
                }
            }
            // url以http[s]://开头, 通过iframe展示
            if (isURL(menuList[i].url)) {
                route['path'] = `i-${menuList[i].menuId}`
                route['name'] = `i-${menuList[i].menuId}`
                route['meta']['iframeUrl'] = menuList[i].url
            }else {
                try {
                    route['component'] = _import(`modules/${menuList[i].url}`) || null
                } catch (e) {}
            }
            routes.push(route)
        }
    }

    if (temp.length >= 1) {
        fnAddDynamicMenuRoutes(temp, routes)
    }else {
        mainRoutes.name = 'main-dynamic'
        mainRoutes.children = routes
        router.addRoutes([
            mainRoutes,
            { path: '*', redirect: { name: '404' } }
        ])
        sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    }
}
  
export default router