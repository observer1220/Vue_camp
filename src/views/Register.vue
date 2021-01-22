<template>
  <div class="user-container">
    <form class="account">
      <div class="mb-3">
        <input type="name" name="name" class="form-control" v-model="user.name" placeholder="中文姓名(取貨用)" />
      </div>
      <div class="mb-3">
        <input type="email" name="email" class="form-control" v-model="user.email" placeholder="電子郵件" />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="user.password" placeholder="密碼" />
        <div id="passwordHelp" class="form-text">需包含1~3個英文字母及5~8個阿拉伯數</div>
      </div>
      <div class="mb-3">
        <input type="tel" class="form-control" name="tel" v-model="user.tel" placeholder="行動電話" @keyup.enter="RegisterBtn" />
      </div>
      <button class="btn btn-primary" @click.prevent="RegisterBtn">註冊</button>
    </form>
  </div>
</template>

<script>
import qs from 'qs'
// import Cleave from 'vue-cleave-component'
// import 'cleave.js/dist/addons/cleave-phone.i18n'

// /^ 開頭、結尾語法 $/
// [\u4E00-\u9FFF]{2,8} 限定輸入2~8個字，且符合中文字的Unicode範圍
const nameRule = /^[\u4E00-\u9FFF]{2,8}$/
// \w+((-\w+)|(\.\w+))* 所有英文大小寫、數字、_可出現1次以上，符號-及.符號後方也適用同樣規則
// @[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)* @符號後方可所有英文大小寫、數字可出現1次以上 並可使用符號-及.做連接詞，符號後方也適用同樣規則
// \.[A-Za-z]+ 最後一段符號.後方只能使用英文大小寫，不能使用數字及符號
const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
// (?=.*?[a-z]).{1,3} 需輸入1~3個小寫字母
// (?=.*?[0-9]).{5,8} 需輸入5~8個阿拉伯數字
const passwordRule = /^(?=.*?[a-z]).{1,3}(?=.*?[0-9]).{5,8}$/
// [0-9]{10,} 需輸入10位數的阿拉伯數字
const telRule = /^[0-9]{10,}$/
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        tel: null,
      },
      // tel_options: {
      //   phone: true,
      //   phoneRegionCode: '{TW}',
      // },
    }
  },
  // components: {
  //   Cleave,
  // },
  methods: {
    RegisterBtn() {
      // CryptoJS加密專區
      // const CryptoJS = require('crypto-js')
      // const privateKey = 'QweR7890tyu565RTY'
      // const encryptText = CryptoJS.AES.encrypt(this.user.password, privateKey).toString() // Encrypt(加密)
      // console.log(`加密後 => ${encryptText}`)
      // const DecryptText = CryptoJS.AES.decrypt(encryptText, privateKey).toString(CryptoJS.enc.Utf8) // Decrypt(解密)
      // console.log(`解密後 => ${DecryptText}`)
      // 傳送給後端的資料庫
      const saveData = qs.stringify({
        name: this.user.name,
        password: this.user.password,
        tel: this.user.tel,
        email: this.user.email,
      })
      var config = {
        method: 'post',
        // url: 'https://fathomless-brushlands-42339.herokuapp.com/todo4',
        url: 'https://gocamping.rocket-coding.com/Guest/Register',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: saveData,
      }
      // 步驟1：確認姓名欄位非空值，並符合nameRule格式
      if (this.user.name === null || this.user.name.search(nameRule) === -1) {
        alert('請輸入正確的姓名格式')
        // 步驟2：確認email欄位非空值，並符合emailRule格式
      } else if (this.user.email === null || this.user.email.search(emailRule) === -1) {
        alert('請輸入正確的email格式')
        // 步驟3：確認密碼欄位非空值，並符合passwordRule格式
      } else if (this.user.password === null || this.user.password.search(passwordRule) === -1) {
        alert('請輸入正確的密碼格式')
        // 步驟4：確認電話欄位非空值，並符合telRule格式
      } else if (this.user.tel === null || this.user.tel.search(telRule) === -1) {
        alert('請輸入正確的行動電話格式')
      } else {
        this.$http(config)
          .then((res) => {
            alert('註冊成功')
            console.log(res)
            // 註冊成功後，將畫面跳轉至登入頁面
            this.$router.push('/Login')
          })
          .catch(() => {
            alert('註冊失敗')
          })
      }
    },
  },
  created() {

  },
}
</script>
