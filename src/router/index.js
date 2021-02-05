// import { createWebHistory, createRouter } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'

// 荒野探索-網站前台
import Home from '../views/Home.vue' // 荒野探索網站首頁

// 設備租賃
import Equip from '../views/Equip.vue'
import EquipInfo from '../views/Equip_Info.vue' // 設備租賃-首頁
import EquipProduct from '../views/Equip_Product.vue' // 設備租賃-產品頁
import EquipCarts from '../views/Equip_Carts.vue' // 設備租賃-購物車頁(需驗證)
import EquipCompleted from '../views/Equip_Completed.vue'// 訂單完成頁(需驗證)

// 營地資訊
import Camp from '../views/Camp.vue'
import CampInfo from '../views/Camp_Info.vue' // 營地資訊-首頁
import CampProduct from '../views/Camp_Product.vue' // 營地資訊-產品頁

// 會員中心
import User from '../views/User.vue' // 會員中心-首頁
import Register from '../views/Register' // 會員中心-註冊頁
import Login from '../views/Login' // 會員中心-登入頁

// 荒野探索-網站後台
import Management from '../views/Management.vue' // 顧客後臺頁

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '【荒野探索】',
    },
  },
  {
    path: '/Equip',
    component: Equip,
    children: [
      {
        path: '',
        component: EquipInfo,
        meta: {
          title: '設備租賃',
        },
      },
      {
        path: ':id',
        component: EquipProduct,
      },
    ],
  },
  {
    path: '/Equip_Carts',
    component: EquipCarts,
    meta: {
      title: '購物車',
      requiresAuth: true,
    },
  },
  {
    path: '/Equip_Completed',
    component: EquipCompleted,
    meta: {
      title: '訂單明細',
      requiresAuth: true,
    },
  },
  {
    path: '/Camp',
    component: Camp,
    children: [
      {
        path: '',
        component: CampInfo,
        meta: {
          title: '營地資訊',
        },
      },
      {
        path: ':id',
        component: CampProduct,
      },
    ],
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
        path: '/Register',
        component: Register,
      },
      {
        path: '/Login',
        component: Login,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
