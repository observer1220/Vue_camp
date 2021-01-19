<template>
  <div class="camp-info-container">
    <div class="camp-info">
      <select class="catalog" @change="selectedCatalog($event)" v-model="currentCatalog">
        <option value="" disabled selected>請選擇區域</option>
        <option :value="location" v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <div>
        <ul v-for="(item, key) in filterData" :key="key">
          <li>
            <router-link to="">
              <img :src="item.picture" alt="">
              <p>{{ item.name }}</p>
              <p>{{ item.county }} {{ item.address }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="map">
      <div style="height: 75vh; width: 50vw;">
        <l-map v-for="(item, key) in filterData" :key="key" :zoom="zoom" :center="[item.lat , item.lng]">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker v-for="(item, key) in filterData" :key="key" :lat-lng="[item.lat , item.lng]"></l-marker>
        </l-map>
      </div>
    </div>
  </div>

</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 7,
      items: [],
      locations: [],
      currentCatalog: '高雄市',
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
    const url =
      'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Camp_Info.json?alt=media&token=1bf7f582-8b8c-4ad7-b979-0b9f4997cc91'
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
  margin-top: 30px;
  width: 100%;
  .map {
    width: 50%;
    margin-right: 10px;
  }
  .camp-info {
    display: flex;
    flex-direction: column;
    width:50%;
    div{
      display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    ul {
      padding: 0;
      li {
        margin-right: 10px;
        a {
          text-decoration: none;
          color: black;
          font-weight: 900;
          img {
            width: 300px;
            object-fit: cover;
            object-position: bottom;
          }
          p {
            margin: 0;
          }
        }
        &:hover {
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
          border-color: #eee;
          transition: all 0.2s ease-in-out;
          background: yellow;
        }
      }
    }
    }

  }
}
</style>
