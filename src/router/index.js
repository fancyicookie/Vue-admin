/*
 * @Date: 2023-02-03 11:16:41
 * @Author: Fancyicookie
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/employee',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Employee',
        component: () => import('@/views/employee/index'),
        meta: { title: '????????????', icon: 'user' }
      }
    ]
  },

  {
    path: '/employee/add',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AddEmployee',
        component: () => import('@/views/employee/add'),
        hidden: true,
        meta: {
          activeMenu: '/employee'
        }
      }
    ]
  },

  {
    path: '/employee/edit',
    component: Layout,
    children: [
      {
        path: '',
        name: 'EditEmployee',
        component: () => import('@/views/employee/edit'),
        hidden: true,
        meta: {
          activeMenu: '/employee'
        }
      }
    ]
  },

  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Category',
        component: () => import('@/views/category/index'),
        meta: { title: '????????????', icon: 'el-icon-menu' }
      }
    ]
  },

  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '????????????', icon: 'el-icon-dish-1' }
      }
    ]
  },

  {
    path: '/menu/add',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AddDish',
        component: () => import('@/views/menu/add'),
        hidden: true,
        meta: {
          activeMenu: '/menu'
        }
      }
    ]
  },

  {
    path: '/menu/edit',
    component: Layout,
    children: [
      {
        path: '',
        name: 'EditDish',
        component: () => import('@/views/menu/edit'),
        hidden: true,
        meta: {
          activeMenu: '/menu'
        }
      }
    ]
  },

  {
    path: '/setmeal',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Setmeal',
        component: () => import('@/views/setmeal/index'),
        meta: { title: '????????????', icon: 'el-icon-present' }
      }
    ]
  },

  {
    path: '/setmeal/add',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AddSetmeal',
        component: () => import('@/views/setmeal/add'),
        meta: { title: '????????????', icon: 'el-icon-present', activeMenu: '/setmeal' },
        hidden: true
      }
    ]
  },

  {
    path: '/setmeal/edit',
    component: Layout,
    children: [
      {
        path: '',
        name: 'EditSetmeal',
        component: () => import('@/views/setmeal/edit'),
        meta: { title: '????????????', icon: 'el-icon-present', activeMenu: '/setmeal' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '????????????', icon: 'form' }
      }
    ]
  },

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
