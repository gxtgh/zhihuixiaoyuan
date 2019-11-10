import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/home',
    component: () => import('@/views/home/home'),
    hidden: true,
    meta: {
      title: '首页',
      icon: 'chart'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/transaction',
    component: () => import('@/views/transaction/index'),
    meta: {
      title: '事务管理',
      icon: 'chart'
    }
  },
  {
    path: '/student',
    component: Layout,
    meta: {
      title: '学生事务',
      icon: 'chart'
    },
    redirect: '/student/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/index'),
        name: 'student',
        meta: { title: '个人中心', icon: 'dashboard', affix: true }
      },
      {
        path: 'selectRoom',
        component: () => import('@/views/student/selectRoom'),
        name: 'selectRoom',
        meta: { title: '宿舍管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    meta: {
      title: '教师事务',
      icon: 'chart'
    },
    redirect: '/teacher/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/index'),
        name: 'teacher',
        meta: { title: '班级情况', icon: 'dashboard', affix: true }
      },
      {
        path: 'studentDetail',
        component: () => import('@/views/teacher/studentDetail'),
        name: 'studentDetail',
        meta: { title: '学生详情', icon: 'dashboard', affix: true }
      },
      {
        path: 'dormManagement',
        component: () => import('@/views/teacher/dormManagement'),
        name: 'dormManagement',
        meta: { title: '宿舍管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'adjustment',
        component: () => import('@/views/teacher/adjustment'),
        name: 'adjustment',
        meta: { title: '调整管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'dataAnalysis',
        component: () => import('@/views/teacher/dataAnalysis'),
        name: 'dataAnalysis',
        meta: { title: '数据填写分析', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/humanAffairs',
    component: Layout,
    meta: {
      title: '人事事务',
      icon: 'chart'
    },
    redirect: '/humanAffairs/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/human-affairs/index'),
        name: 'humanAffairs',
        meta: { title: '人事信息', icon: 'documentation', affix: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/human-affairs/detail'),
        name: 'humanDetail',
        meta: { title: '详情', icon: 'documentation', affix: true }
      },
      {
        path: 'permission',
        component: () => import('@/views/human-affairs/permission'),
        name: 'permission',
        meta: { title: '角色权限组', icon: 'documentation', affix: true }
      },
      {
        path: 'operating',
        component: () => import('@/views/human-affairs/operating'),
        name: 'operating',
        meta: { title: '运行数据', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/operating',
    component: Layout,
    redirect: '/operating/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/operating-data/index'),
        name: 'operatingIndex',
        meta: { title: '运行数据', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    // component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
