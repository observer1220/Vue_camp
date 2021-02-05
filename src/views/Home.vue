<template>
  <div>
    <div class="home-container">
      <div class="equip-main">
        <h3 class="equip-main-title"><strong>【荒野探索】DISCOVER THE WILD WORLD</strong></h3>
        <swiper :autoplay="{autoplay: true, rewind:true}" class="equip-banner" :slides-per-view="2" :space-between="0" navigation :scrollbar="{ draggable: true }">
          <swiper-slide>
            <router-link to="/Equip"><img style="width:500px" src="@/assets/camp_swiper1.png" /></router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/Camp"><img style="width:500px" src="@/assets/camp_swiper2.png" /></router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/Equip"><img style="width:500px" src="@/assets/camp_swiper3.png" /></router-link>
          </swiper-slide>
        </swiper>
        <div class="coupon-banner text-center mt-1">
          <h3 style="color:#FFFF00;"><strong>慶開幕－全館商品九折優惠</strong></h3>
          <h3 style="color:snow;"><strong>輸入優惠代碼：JP2076</strong></h3>
        </div>
        <h3 class="equip-select-product mt-1"><strong>【精選商品】</strong></h3>
        <swiper :autoplay="{autoplay: true, rewind:true}" style="height:230px" :slides-per-view="4" :space-between="50" :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
          <swiper-slide v-for="(item,key) in items.slice(0,8)" :key="key">
            <img :src="item.picture" alt="" style="height:150px">
            <p class="text-center">{{item.name}}</p>
          </swiper-slide>
        </swiper>
        <h3 class="camp-select-product mt-2"><strong>【露營景點】</strong></h3>
        <swiper :autoplay="{autoplay: true, rewind:true}" style="height:220px" :slides-per-view="4" :space-between="5" navigation :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
          <swiper-slide v-for="(location,key) in locations.slice(0,8)" :key="key">
            <img :src="location.picture" alt="" style="width:250px">
            <p class="text-center">{{location.name}}</p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="home-footer">
      <h3>荒野探索股份有限公司(僅供火箭隊專題使用)</h3>
      <router-link to="">關於我們</router-link> |
      <router-link to="">隱私權政策</router-link> |
      <router-link to="">租賃契約書</router-link> |
      <router-link to="">聯絡我們</router-link> |
      <router-link to="/Management">後臺管理</router-link> |
    </div>
  </div>
</template>
<script>
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay])
export default {
  data() {
    return {
      items: [],
      locations: [],
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  created() {
    var config = {
      method: 'get',
      url: 'https://gocamping.rocket-coding.com/Products/List',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
      },
    }
    this.$http(config).then((res) => {
      this.items = res.data
      console.log(this.items)
    })
    var config2 = {
      method: 'get',
      url: 'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Camp_Info.json?alt=media&token=1bf7f582-8b8c-4ad7-b979-0b9f4997cc91',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
      },
    }
    this.$http(config2).then((res) => {
      this.locations = res.data.data
      console.log(this.locations)
    })
  },
}
</script>
<style lang="scss">
  .home-container{
    max-width: 1024px;
    margin: 0 auto;
    height: auto;
    padding: 5px;
    margin-top: 30px;
    .equip-main{
      display: flex;
      flex-wrap: wrap;
      .equip-main-title{
        background:#128B44;
        width: 1024px;
        color:white;
        border-radius: 10px;
        user-select: none;
        padding: 10px;
      }
      .coupon-banner{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background:#128B44;
        width: 1024px;
        border-radius: 10px;
        user-select: none;
        h3{
          text-shadow:
            0 0 5px rgba(66 185 131),
            0 0 10px rgba(66 185 131),
            0 0 20px rgba(66 185 131),
            0 0 40px rgba(66 185 131);
          animation:neon-shine 2s linear infinite
        }
        @keyframes neon-shine{
          0%{opacity:1;}
          50%{opacity:0;}
        }
      }
    }
  }
  .home-footer {
    background: #128B44;
    padding:15px;
    h3 {
      color: whitesmoke;
    }
    a {
      font-weight: 900;
      color: whitesmoke;
      text-decoration: none;
    }
  }
</style>
