<template>
  <div class="user-container">
    <div class="account">
      <input
        type="name"
        class="form-control"
        v-model="user.name"
        placeholder="請輸入您的姓名"
      />
      <input
        type="email"
        class="form-control"
        v-model="user.email"
        placeholder="請輸入您的Email"
      />
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        placeholder="請輸入您的密碼"
      />
      <input
        type="phone"
        class="form-control"
        v-model="user.phone"
        placeholder="請輸入您的電話"
        @keyup.enter="RegisterBtn"
      />
      <button @click="RegisterBtn">註冊</button>
    </div>
  </div>
</template>

<script>
const url = 'https://fathomless-brushlands-42339.herokuapp.com/todo4'
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
        phone: null,
      },
    }
  },
  methods: {
    RegisterBtn() {
      const saveData = {
        id: null,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
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
      } else if (this.user.phone === null) {
        alert('電話欄位不得為空值')
      } else {
        this.$http.post(`${url}`, saveData).then(() => {
          alert('註冊成功')
          // 註冊成功後，將畫面跳轉至登入頁面
          this.$router.push('/Login')
        })
      }
    },
  },
}
</script>
