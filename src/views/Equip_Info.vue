<template>
  <div>
    <div class="equip-container">
      <div class="left-side">
        <h5>步驟1：選擇取貨地點</h5>
        <select class="selectedStore" @change="selectedStore($event)">
          <option value="請選擇取貨地點" disabled selected>請選擇取貨地點</option>
          <option value="北高雄_榮耀門市">北高雄_榮耀門市</option>
          <option value="南高雄_高軟門市">南高雄_高軟門市</option>
        </select>
        <h5>步驟2：選擇租用時間</h5>
        <flat-pickr v-model="date" :config="config" placeholder="請選擇租借日期" class="flat-pickr" @change="selectedDate"></flat-pickr>
        <h5>步驟3：選擇租用商品</h5>
        <select class="catalog" @change="selectedCatalog($event)" v-model="currentCatalog">
          <option value="" disabled selected>請選擇租賃項目</option>
          <option :value="location" v-for="location in locations" :key="location">{{ location }}</option>
        </select>
      </div>
      <div class="right-side">
        <div class="load">
          <img src="https://cliply.co/wp-content/uploads/2020/02/372002600_MOUNTAINS_400px.gif" alt="">
        </div>
        <ul class="products">
          <li v-for="(item,key) in filterData" :key="key">
            <router-link :to="{ path: '/Equip/' + item.product_id }">
              <img :src="item.picture" alt="">
              <p>{{ item.name }}</p>
              <p>型號：{{ item.model }}</p>
            </router-link>
          </li>
        </ul>
        <!-- <ul class="pagination justify-content-center">
          <li class="page-item" v-for="page in filterData.length" :key="page">
            <a class="page-link" href="#">{{ page }}</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="footer">
      <h3>荒野探索股份有限公司2020, All Rights Reserved</h3>
      <router-link to="/">關於我們</router-link> |
      <router-link to="/">隱私權政策</router-link> |
      <router-link to="/">租賃契約書</router-link> |
      <router-link to="/">聯絡我們</router-link> |
      <router-link to="/Management">後臺管理</router-link> |
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  data() {
    return {
      items: [], // this.items = res.data.features用來儲存口罩地圖的原始資料
      locations: [],
      currentStore: '請選擇門市',
      currentCatalog: '帳篷',
      date: null,
      config: {
        dateFormat: 'Y/m/d',
        mode: 'range',
        minDate: 'today',
        maxDate: new Date().fp_incr(60), // 預約限定60天
        locale: {
          firstDayOfWeek: 1, // 日曆從Monday開始跳
          rangeSeparator: '~',
        },
      },
    }
  },
  components: {
    flatPickr,
  },
  methods: {
    selectedStore() {
      this.currentStore = event.target.value
      console.log(this.currentStore)
      // 用localStorage將「取貨地點」暫存起來，並於購物車頁面提取該筆資料
      localStorage.setItem('selectedStore', this.currentStore)
    },
    selectedDate() {
      const daysInRange = document.getElementsByClassName('inRange') // 選取class名稱為inRange的項目
      const daysLengthTotal = daysInRange.length + 2 // +2是因為startRange跟endRange沒有被選到
      console.log(daysLengthTotal)
      localStorage.setItem('selectedDate', this.date)
      localStorage.setItem('useDays', daysLengthTotal)
    },
    selectedCatalog() {
      const locations = new Set()
      this.items.forEach((item) => {
        locations.add(item.category)
      })
      this.locations = Array.from(locations)
    },
  },
  computed: {
    filterData() {
      let filterData = []
      if (this.currentCatalog !== '') {
        filterData = this.items.filter((item) => {
          return item.category === this.currentCatalog
        })
      }
      return filterData
    },
  },
  created() {
    // const url = 'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Equip_Lease.json?alt=media&token=5eb3db57-78ea-40cf-b424-8ae10e296b36'
    var config = {
      method: 'get',
      url: 'https://gocamping.rocket-coding.com/Products/List',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
      },
    }
    this.$http(config).then((res) => {
      const load = document.querySelector('.load')
      load.innerHTML = ''
      this.items = res.data
      // console.log(res.data)
      this.selectedCatalog()
    })
  },
}
</script>

<style lang="scss">
.equip-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .left-side {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .selectedStore {
      font-size: 18px;
      padding: 2px;
      margin-bottom: 20px;
      outline: none;
    }
    .flat-pickr {
      font-size: 18px;
      padding: 2px;
      margin-bottom: 20px;
      width: 220px;
      outline: none;
    }
    .catalog {
      font-size: 18px;
      padding: 2px;
      outline: none;
    }
  }
  .right-side {
    padding: 10px;
    .products {
      display: flex;
      flex-wrap: wrap;
      height: 420px;
      overflow-y: auto;
      li {
        padding: 5px;
        a {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          color: black;
          img {
            width: 300px;
            object-fit: contain;
          }
        }
        &:hover {
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
          border-color: #eee;
          transition: all 0.5s ease-in-out;
        }
      }
    }
  }
}
.footer {
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
</style>
