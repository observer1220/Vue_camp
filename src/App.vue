<template>
  <div>
    <div id="nav">
      <router-link to="/"
        ><img class="logo" src="@/assets/logo.jpg" alt=""
      /></router-link>
      <router-link to="/Equip_Lease">設備租賃</router-link>
      <router-link to="/Camp_Info">營地資訊</router-link>
      <router-link to="/Articles">精選文章</router-link>
      <router-link to="/Carts">購物車</router-link>
      <router-link class="login" to="/User">會員中心</router-link>
      <input class="logout" type="button" value="登出" @click="logOut" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      const loginStatus = {
        loginCheck: false,
      }
      localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
      alert('您已成功登出')
      // 重新展裡頁面
      location.reload()
    },
  },
}
</script>
