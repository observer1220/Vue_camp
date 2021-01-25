<template>
  <div class="camp-info-container">
    <div class="camp-info">
      <select class="catalog" @change="selectedCatalog($event)" v-model="currentCatalog">
        <option value="" disabled selected>請選擇區域</option>
        <option :value="location" v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <div class="map">
        <l-map :zoom="zoom" :center="[23.58, 120.80]">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker v-for="(item, key) in filterData" :key="key" :lat-lng="[item.lat , item.lng]">
            <l-popup>
              <router-link :to="{ path: '/Camp/' + item.id }">
                <p><img :src="item.picture" alt="" style="height:200px"></p>
                <h5>營地名稱：{{item.name}}</h5>
                <p>地址：{{item.address}}</p>
              </router-link>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

import 'leaflet/dist/leaflet.css'
const url = 'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Camp_Info.json?alt=media&token=1bf7f582-8b8c-4ad7-b979-0b9f4997cc91'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 7,
      items: [],
      locations: [],
      currentCatalog: '南投縣',
    }
  },
  methods: {
    selectedCatalog() {
      const locations = new Set()
      this.items.forEach((item) => {
        locations.add(item.county)
      })
      this.locations = Array.from(locations)
    },
  },
  computed: {
    filterData() {
      let filterData = []
      if (this.currentCatalog !== '') {
        filterData = this.items.filter((item) => {
          return item.county === this.currentCatalog
        })
      }
      return filterData
    },
  },
  created() {
    this.$http.get(url).then((res) => {
      this.items = res.data.data
      this.selectedCatalog()
    })
  },
}
</script>
<style lang="scss">
.camp-info-container {
  display: flex;
  justify-content: center;
  // margin-top: 30px;
  width: 100%;
  .map{
    width: 1200px;
    height: 465px;
      a{
        text-decoration: none;
        color: black;
      }
  }
}
</style>
