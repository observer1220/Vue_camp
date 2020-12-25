import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import CampInfo from '../views/Camp_Info.vue'
import EquipLease from '../views/Equip_Lease.vue'
import Articles from '../views/Articles.vue'

import User from '../views/User.vue'
import Register from '../views/Register'
import Login from '../views/Login'

import Management from '../views/Management.vue'
import Carts from '../views/Carts.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '首頁',
    },
  },
  {
    path: '/Camp_Info',
    component: CampInfo,
    meta: {
      title: '營地資訊',
    },
  },
  {
    path: '/Equip_Lease',
    component: EquipLease,
    meta: {
      title: '設備租賃',
      // requiresAuth: true,
    },
  },
  {
    path: '/Articles',
    component: Articles,
    meta: {
      title: '精選文章',
    },
  },
  {
    path: '/Carts',
    component: Carts,
    meta: {
      title: '購物車',
    },
  },
  {
    path: '/Management',
    component: Management,
    meta: {
      title: '後臺管理',
      requiresAuth: true,
    },
  },
  {
    path: '/User',
    component: User,
    meta: {
      title: '會員中心',
    },
    children: [
      {
        path: '/Login',
        component: Login,
      },
      {
        path: '/Register',
        component: Register,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
