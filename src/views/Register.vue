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
        <div id="passwordHelp" class="form-text">
          Must be 8-20 characters and not contain spaces, special characters or emoji.
        </div>
      </div>
      <div class="mb-3">
        <input type="tel" name="tel" class="form-control" v-model="user.tel" placeholder="行動電話" @keyup.enter="RegisterBtn" />
      </div>
      <button class="btn btn-primary" @click.prevent="RegisterBtn">註冊</button>
    </form>
  </div>
</template>

<script>
// const url = 'https://fathomless-brushlands-42339.herokuapp.com/todo4'
import qs from 'qs'
// /^ 開頭語法
// \w+((-\w+)|(\.\w+))* 所有英文大小寫、數字、_可出現1次以上，符號-及.符號後方也適用同樣規則
// @[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)* @符號後方可所有英文大小寫、數字可出現1次以上 並可使用符號-及.做連接詞，符號後方也適用同樣規則
// \.[A-Za-z]+ 最後一段符號.後方只能使用英文大小寫，不能使用數字及符號
// $/ 結尾語法
const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        tel: null,
      },
    }
  },
  methods: {
    RegisterBtn() {
      const saveData = qs.stringify({
        name: this.user.name,
        password: this.user.password,
        tel: this.user.tel,
        email: this.user.email,
      })
      var config = {
        method: 'post',
        url: 'https://gocamping.rocket-coding.com/Register/Guest',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: saveData,
      }
      // 步驟1：確認name欄位非空值
      if (this.user.name === null) {
        alert('姓名欄位不得為空值')
        // 步驟2：確認email欄位非空值
      } else if (this.user.email === null) {
        alert('請輸入您的email')
        // 步驟3：驗證email格式
      } else if (this.user.email.search(emailRule) === -1) {
        alert('請輸入正確的email格式')
        // 步驟4：確認密碼欄位非空值
      } else if (this.user.password === null) {
        alert('請輸入您的密碼')
      } else if (this.user.tel === null) {
        alert('電話欄位不得為空值')
      } else {
        this.$http(config)
          .then((res) => {
            alert('註冊成功')
            console.log(saveData)
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
    // console.log(qs)
  },
}
</script>
