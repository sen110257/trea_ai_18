import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页', showTabBar: true }
  },
  {
    path: '/template',
    name: 'Template',
    component: () => import('@/views/template/index.vue'),
    meta: { title: '婚礼模板', showTabBar: true }
  },
  {
    path: '/template-detail/:id',
    name: 'TemplateDetail',
    component: () => import('@/views/template/detail.vue'),
    meta: { title: '模板详情', showTabBar: false }
  },
  {
    path: '/venue',
    name: 'Venue',
    component: () => import('@/views/venue/index.vue'),
    meta: { title: '场地预览', showTabBar: false }
  },
  {
    path: '/venue-detail/:id',
    name: 'VenueDetail',
    component: () => import('@/views/venue/detail.vue'),
    meta: { title: '场地详情', showTabBar: false }
  },
  {
    path: '/venue-panorama/:id',
    name: 'VenuePanorama',
    component: () => import('@/views/venue/panorama.vue'),
    meta: { title: '3D全景预览', showTabBar: false }
  },
  {
    path: '/package',
    name: 'Package',
    component: () => import('@/views/package/index.vue'),
    meta: { title: '婚礼套餐', showTabBar: false }
  },
  {
    path: '/package-detail/:id',
    name: 'PackageDetail',
    component: () => import('@/views/package/detail.vue'),
    meta: { title: '套餐详情', showTabBar: false }
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('@/views/staff/index.vue'),
    meta: { title: '专业人员', showTabBar: false }
  },
  {
    path: '/staff-detail/:id',
    name: 'StaffDetail',
    component: () => import('@/views/staff/detail.vue'),
    meta: { title: '人员详情', showTabBar: false }
  },
  {
    path: '/invitation',
    name: 'Invitation',
    component: () => import('@/views/invitation/index.vue'),
    meta: { title: '婚礼请柬', showTabBar: false }
  },
  {
    path: '/invitation-create',
    name: 'InvitationCreate',
    component: () => import('@/views/invitation/create.vue'),
    meta: { title: '请柬编辑', showTabBar: false }
  },
  {
    path: '/invitation-preview/:id',
    name: 'InvitationPreview',
    component: () => import('@/views/invitation/preview.vue'),
    meta: { title: '请柬预览', showTabBar: false }
  },
  {
    path: '/guest',
    name: 'Guest',
    component: () => import('@/views/guest/index.vue'),
    meta: { title: '宾客报名', showTabBar: false }
  },
  {
    path: '/guest-form',
    name: 'GuestForm',
    component: () => import('@/views/guest/form.vue'),
    meta: { title: '报名表单', showTabBar: false }
  },
  {
    path: '/guest-statistics',
    name: 'GuestStatistics',
    component: () => import('@/views/guest/statistics.vue'),
    meta: { title: '报名统计', showTabBar: false }
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/views/service/index.vue'),
    meta: { title: '服务预约', showTabBar: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: { title: '个人中心', showTabBar: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', showTabBar: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    meta: { title: '注册', showTabBar: false }
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: () => import('@/views/profile/edit.vue'),
    meta: { title: '编辑资料', showTabBar: false }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('@/views/profile/orders.vue'),
    meta: { title: '我的预约', showTabBar: false }
  },
  {
    path: '/my-favorites',
    name: 'MyFavorites',
    component: () => import('@/views/profile/favorites.vue'),
    meta: { title: '我的收藏', showTabBar: false }
  },
  {
    path: '/my-invitations',
    name: 'MyInvitations',
    component: () => import('@/views/profile/invitations.vue'),
    meta: { title: '我的请柬', showTabBar: false }
  },
  {
    path: '/customer-service',
    name: 'CustomerService',
    component: () => import('@/views/profile/customer-service.vue'),
    meta: { title: '在线客服', showTabBar: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title || '高端婚礼策划定制'
})

export default router
