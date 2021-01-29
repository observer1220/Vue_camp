import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueZoomer from 'vue-zoomer'
import '@/assets/scss/all.scss'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// import * as firebase from 'firebase'

// var firebaseConfig = {
//   apiKey: 'AIzaSyAxWx7BXrXqFgxCzW7Txm34AwqxOHEoisk',
//   authDomain: 'vuecamp.firebaseapp.com',
//   databaseURL: 'https://vuecamp-default-rtdb.firebaseio.com/',
//   projectId: 'vuecamp',
//   storageBucket: 'vuecamp.appspot.com',
//   messagingSenderId: '346918529760',
// }
// firebase.initializeApp(firebaseConfig)

createApp(App).use(VueAxios, axios).use(router).use(VueZoomer).use(VueSweetalert2).mount('#app')

// localStorage.setItem寫在Login.vue頁面，localStorage.getItem寫在main.js頁面(全域)
// 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
const getloginStatus = localStorage.getItem('loginStatus')
// 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginCheck)
const parseloginStatus = JSON.parse(getloginStatus)
// 登入時將會員中心隱藏，登出顯示；登出時反之
if (parseloginStatus.loginCheck === true) {
  document.querySelector('.login').style.display = 'none'
} else {
  document.querySelector('.logout').style.display = 'none'
}

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
      this.$router.push('/Login')
    }
  } else {
    next()
  }
})
