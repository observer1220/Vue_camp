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
// const url = 'https://fathomless-brushlands-42339.herokuapp.com/todo4'
import qs from 'qs'
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
      // 登入前狀態
      const loginStatus = qs.stringify({
        loginCheck: false,
        loginEmail: null,
      })
      var config = {
        method: 'get',
        url: 'https://gocamping.rocket-coding.com/Guest/Login?Id=1',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: loginStatus,
      }
      this.$http(config).then((res) => {
        console.log(res)
        // 當確認使用者email與password後，將使用者登入狀態(loginCheck)與使用者名稱(loginName)儲存在localStorage
        if (res.data.Message === '會員登入成功') {
          const loginStatus = {
            loginCheck: true,
            loginEmail: this.user.email,
          }
          // 用localStorage將資料暫存在網頁，最好不要顯示帳號密碼，而是以後端給予的token作記號
          localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
          alert('您已登入成功')
          location.replace('/Equip')
        } else {
          alert('查無此帳號')
        }
      })
    },
  },
}
</script>
