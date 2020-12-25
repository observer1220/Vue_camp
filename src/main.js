import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/scss/all.scss'

// import Swal from 'sweetalert2'
// window.Swal = Swal

createApp(App).use(VueAxios, axios).use(router).mount('#app')

// localStorage.setItem寫在Login.vue頁面，localStorage.getItem寫在main.js頁面(全域)
// 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
const getloginStatus = localStorage.getItem('loginStatus')
// 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginCheck)
const parseloginStatus = JSON.parse(getloginStatus)
// 用console.log確認getItem提取的內容為何?
console.log(parseloginStatus)

router.beforeEach((to, from, next) => {
  // 動態變更網頁標籤
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 當router路徑requiresAuth為true時執行以下判斷式，若requiresAuth為false則執行else裡的next()跳轉頁面
  if (to.meta.requiresAuth) {
    // 在requiresAuth為true的前提下，當parseloginStatus.loginCheck為true時執行next()跳轉頁面
    if (parseloginStatus.loginCheck === true) {
      next()
      // 當parseloginStatus.loginCheck為false時，顯示alert('請登入帳號，以進入此頁面')
    } else {
      alert('請登入帳號，以進入此頁面')
    }
  } else {
    next()
  }
})
