<template>
  <div>
    <div class="home-container">
      <splide :options="options" class="swiper">
        <splide-slide>
          <router-link to="/Equip"><img src="@/assets/camp_swiper1.png" /></router-link>
        </splide-slide>
        <splide-slide>
          <router-link to="/Equip"><img src="@/assets/camp_swiper2.png" /></router-link>
        </splide-slide>
        <splide-slide>
          <router-link to="/Equip"><img src="@/assets/camp_swiper3.png" /></router-link>
        </splide-slide>
      </splide>
      <div class="footer">
        <h3>荒野探索股份有限公司2020, All Rights Reserved</h3>
        <router-link to="">關於我們</router-link> |
        <router-link to="">隱私權政策</router-link> |
        <router-link to="">租賃契約書</router-link> |
        <router-link to="">聯絡我們</router-link> |
        <router-link to="/Management">後臺管理</router-link> |
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export default {
  data() {
    return {
      options: {
        rewind: true,
        autoWidth: true,
        autoplay: true,
        perPage: 2,
        gap: 5,
      },
    }
  },
  components: {
    Splide,
    SplideSlide,
  },
}
</script>
<style lang="scss">
  .home-container{
    max-width: 1280px;
    margin: auto;
    padding: 5px;
    margin-top: 30px;
    .footer {
      margin-top: 56px;
      background: #2c3e50;
      padding-left: 30px;
      padding-bottom: 3px;
      h3 {
        color: whitesmoke;
      }
      a {
        font-weight: 900;
        color: whitesmoke;
        text-decoration: none;
        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }
</style>
