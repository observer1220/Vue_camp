<template>
  <div class="user-container">
    <div class="loginBar mb-3">
      <router-link to="/Register">帳號註冊</router-link> ／
      <router-link to="/Login">會員登入</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .loginBar {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .account {
    display: flex;
    flex-direction: column;
    .form-control {
      font-size: 18px;
      padding: 5px;
      margin-bottom: 5px;
    }
    button {
      font-size: 18px;
    }
  }
}
</style>
