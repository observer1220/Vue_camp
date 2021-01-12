<template>
  <div class="user-container">
    <form class="account">
      <div class="mb-3">
        <input type="email" class="form-control" v-model="user.email" placeholder="請輸入您的Email" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="user.password" placeholder="請輸入您的密碼" @keyup.enter="LoginBtn" id="exampleInputPassword1" aria-describedby="passwordHelp">
        <div id="passwordHelp" class="form-text">
          Must be 8-20 characters and not contain spaces, special characters or emoji.
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">記住帳號</label>
      </div>
      <button class="btn btn-primary" @click.prevent="LoginBtn">登入</button>
    </form>
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
          // 跳轉頁面並更新畫面 2021/1/8完成
          location.replace('/Equip')
        } else {
          alert('查無此帳號')
        }
      })
    },
  },
  created() {},
}
</script>
