<template>
  <div class="camp-info-container">
    <div class="map">
      <l-map :zoom="zoom" :center="[23, 120.4]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="[22.6, 120.4]"></l-marker>
      </l-map>
    </div>
    <div class="camp-info">
      <ul>
        <li>
          <router-link to="">
            <img src="@/assets/camp_info/1.尤巴士露營區.jpg" alt="">
            <p>{{ data[0].name }}</p>
            <p>{{ data[0].county }} {{ data[0].address }}</p>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="">
            <img src="@/assets/camp_info/2.營墅風晴露營區.png" alt="">
            <p>{{ data[1].name }}</p>
            <p>{{ data[1].county }} {{ data[1].address }}</p>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="">
            <img src="@/assets/camp_info/3.白蘭時光.png" alt="">
            <p>{{ data[2].name }}</p>
            <p>{{ data[2].county }} {{ data[2].address }}</p>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="">
            <img src="@/assets/camp_info/4.庫巴露營區.jpg" alt="">
            <p>{{ data[3].name }}</p>
            <p>{{ data[3].county }} {{ data[3].address }}</p>
          </router-link>
        </li>
      </ul>
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
      zoom: 8,
      data: [
        {
          id: 1,
          name: '尤巴士露營區',
          county: '新竹縣',
          address: '五峰鄉白蘭部落桃山村',
          altitude: '1050',
          tel: '04-2422-1798',
          lng: 121.08754,
          lat: 24.58141,
        },
        {
          id: 2,
          name: '營墅風晴露營區',
          county: '新竹縣',
          address: '關西鎮錦山里9鄰96號',
          altitude: '240',
          tel: '04-2422-1798',
          lng: 121.24913148957812,
          lat: 24.77845506488546,
        },
        {
          id: 3,
          name: '白蘭時光',
          county: '新竹縣',
          address: '五峰鄉白蘭部落',
          altitude: '1050',
          tel: '04-2422-1798',
          lng: 121.08653274031833,
          lat: 24.579732873462497,
        },
        {
          id: 4,
          name: '庫巴露營區',
          county: '桃園縣',
          address: '復興鄉霞雲里庫志31之3號',
          altitude: '520',
          tel: '04-2422-1798',
          lng: 121.39864315219475,
          lat: 24.807914419279225,
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="scss">
.camp-info-container {
  display: flex;
  margin-top: 30px;
  width: 100%;
  .map {
    height: 450px;
    width: 50%;
    margin-right: 10px;
  }
  .camp-info {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 50%;
    ul {
      padding: 0;
      li {
        margin-right: 5px;
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
</style>
