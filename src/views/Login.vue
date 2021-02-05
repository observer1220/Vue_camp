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
          需包含1~3個英文字母及5~8個阿拉伯數字
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="LoginBtn">登入</button>
    </form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    LoginBtn() {
      const loginStatus = qs.stringify({
        email: this.user.email,
        password: this.user.password,
      })
      var config = {
        method: 'post',
        url: 'https://gocamping.rocket-coding.com/Guest/LoginSalt',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: loginStatus,
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          // 當確認使用者email與password後，將使用者登入狀態(loginCheck)與使用者名稱(loginName)儲存在localStorage
          if (res.data.Message === '會員驗證登入成功') {
            const loginStatus = {
              loginCheck: true,
              email: this.user.email,
            }
            // 用localStorage將資料暫存在網頁，最好不要顯示帳號密碼，而是以後端給予的token作記號
            localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
            alert('您已登入成功')
            location.replace('/Equip')
          } else {
            alert('查無此帳號')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
