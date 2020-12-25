<template>
  <div class="user-container">
    <div class="account">
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
        @keyup.enter="LoginBtn"
      />
      <button @click="LoginBtn">登入</button>
    </div>
  </div>
</template>

<script>
const url = 'https://fathomless-brushlands-42339.herokuapp.com/todo4'
export default {
  data() {
    return {
      // 使用者輸入的資訊
      user: {
        name: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    LoginBtn() {
      const that = this
      // 登入前狀態
      const loginStatus = {
        loginCheck: false,
        loginEmail: null,
      }
      this.$http.get(url).then((res) => {
        const checkAccount = res.data.find(function (i) {
          return (
            i.email === that.user.email && i.password === that.user.password
          )
        })
        // 當確認使用者email與password後，將使用者登入狀態(loginCheck)與使用者名稱(loginName)儲存在localStorage
        if (checkAccount) {
          loginStatus.loginCheck = true
          loginStatus.loginEmail = that.user.email
          // 用localStorage將資料暫存在網頁，最好不要顯示帳號密碼，而是以後端給予的token作記號
          localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
          alert('您已登入成功')
          // 登入成功後，將畫面跳轉至設備租賃頁(未來將會是購物車頁面)
          // this.$router.push('/Equip_Lease')
          location.reload()
        } else {
          alert('查無此帳號')
        }
      })
    },
  },
  created() {},
}
</script>
