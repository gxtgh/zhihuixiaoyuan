// Just a mock data

export const constantRoutes = [
  {
    path: '/home',
    component: '/views/home/home',
    hidden: true,
    meta: {
      title: '首页',
      icon: 'chart'
    }
  },
  {
    path: '/login',
    component: '/views/login/index',
    hidden: true
  },
  {
    path: '/transaction',
    component: '/views/transaction/index',
    meta: {
      title: '事务管理',
      icon: 'chart'
    }
  },
  {
    path: '/student',
    meta: {
      title: '学生事务',
      icon: 'chart'
    },
    children: [
      {
        path: 'index',
        component:  '/views/student/index',
        name: 'student',
        meta: { title: '个人中心', icon: 'dashboard', affix: true }
      },
      {
        path: 'selectRoom',
        component: '/views/student/selectRoom',
        name: 'selectRoom',
        meta: { title: '宿舍管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/teacher',
    meta: {
      title: '教师事务',
      icon: 'chart'
    },
    children: [
      {
        path: 'index',
        component:'/views/teacher/index',
        name: 'teacher',
        meta: { title: '班级情况', icon: 'dashboard', affix: true }
      },
      {
        path: 'studentDetail',
        component: '/views/teacher/studentDetail',
        name: 'studentDetail',
        meta: { title: '学生详情', icon: 'dashboard', affix: true }
      },
      {
        path: 'dormManagement',
        component: '/views/teacher/dormManagement',
        name: 'dormManagement',
        meta: { title: '宿舍管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'adjustment',
        component: '/views/teacher/adjustment',
        name: 'adjustment',
        meta: { title: '调整管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'dataAnalysis',
        component:'/views/teacher/dataAnalysis',
        name: 'dataAnalysis',
        meta: { title: '数据填写分析', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/humanAffairs',
    meta: {
      title: '人事事务',
      icon: 'chart'
    },
    redirect: '/humanAffairs/index',
    children: [
      {
        path: 'index',
        component: '/views/human-affairs/index',
        name: 'humanAffairs',
        meta: { title: '人事信息', icon: 'documentation', affix: true }
      },
      {
        path: 'detail',
        component: '/views/human-affairs/detail',
        name: 'humanDetail',
        meta: { title: '详情', icon: 'documentation', affix: true }
      },
      {
        path: 'permission',
        component: '/views/human-affairs/permission',
        name: 'permission',
        meta: { title: '角色权限组', icon: 'documentation', affix: true }
      },
      {
        path: 'operating',
        component: '/views/human-affairs/operating',
        name: 'operating',
        meta: { title: '运行数据', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/operating',
    children: [
      {
        path: 'index',
        component: '/views/operating-data/index',
        name: 'operatingIndex',
        meta: { title: '运行数据', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/auth-redirect',
    component:'/views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: '/views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: '/views/error-page/401',
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: '/views/home/home',
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
];

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
];
