<template>
  <splide :options="options" class="swiper">
    <splide-slide>
      <a href="#"><img src="@/assets/camp_swiper1.jpg" /></a>
    </splide-slide>
    <splide-slide>
      <a href="#"><img src="@/assets/camp_swiper2.jpg" /></a>
    </splide-slide>
    <splide-slide>
      <a href="#"><img src="@/assets/camp_swiper3.jpg" /></a>
    </splide-slide>
  </splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css'

export default {
  data() {
    return {
      options: {
        rewind: true,
        autoWidth: true,
        autoplay: true,
        perPage: 1,
        gap: 1,
      },
    }
  },
  components: {
    Splide,
    SplideSlide,
  },
}
</script>
