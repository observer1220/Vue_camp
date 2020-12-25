<template>
  <div>
    <div class="equip-container">
      <div class="left-side">
        <!-- 不同門市其實是不同的頁面，每一間店的存貨量都是不同的 -->
        <h3>步驟1：選擇取貨地點</h3>
        <select class="pickupPlace" @change="pickupPlace">
          <option value="請選擇地點">請選擇地點</option>
          <option value="北高雄-榮耀門市">北高雄-榮耀門市</option>
          <option value="南高雄-高軟門市">南高雄-高軟門市</option>
        </select>
        <!-- 尋找Vue專用的日期套件，最好可以使用range功能 -->
        <h3>步驟2：選擇租用時間</h3>
        <input class="usageDate" type="date" />
        <!-- 這裡可以用v-for把分類項目渲染上去 -->
        <h3>步驟3：選擇租用商品</h3>
        <select class="catalog">
          <option value="帳篷">帳篷</option>
          <option value="天幕">天幕</option>
          <option value="客廳帳">客廳帳</option>
          <option value="睡袋/充氣睡墊">睡袋</option>
          <option value="餐廚用具">餐廚用具</option>
          <option value="燈具">燈具</option>
        </select>
      </div>
      <div class="right-side">
        <!-- <ul class="products" v-for="product in products" :key="product">
        <li>
          <p>{{ product.name }}</p>
          <img src="{{ products.picture }}" alt="" />
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
const equipAPI = 'https://fathomless-brushlands-42339.herokuapp.com/todo5'
export default {
  data() {
    return {
      // products: {
      //   id: 1,
      //   brand: 'Snow Peak',
      //   category: '帳篷',
      //   name: 'Land Lock 別墅帳象牙白',
      //   model: 'TP671IV',
      //   size: 'W625cm*D405cm*H205cm',
      //   weight: '24.5kg',
      //   userNum: 6,
      //   origin_price: 51900,
      //   base_price: 2600,
      //   daily_price: 400,
      //   picture: 'https://pic.pimg.tw/cherry811wei/1564581807-2318299916_l.jpg',
      //   inventory: 5,
      // },
      // products: {
      //   id: null,
      //   brand: null,
      //   category: null,
      //   name: null,
      //   model: null,
      //   size: null,
      //   weight: null,
      //   userNum: null,
      //   origin_price: null,
      //   base_price: null,
      //   daily_price: null,
      //   picture: null,
      //   inventory: null,
      // },
      products: [],
    }
  },
  methods: {
    pickupPlace() {
      console.log('確認地點')
    },
  },
  created() {
    this.$http.get(equipAPI).then((res) => {
      const product = res.data
      console.log(product)
    })
  },
}
</script>

<style lang="scss">
.equip-container {
  display: flex;
  justify-content: space-between;
  .left-side {
    width: 15%;
    // border: 1px solid black;
    padding: 10px;
    .pickupPlace {
      font-size: 18px;
      padding: 5px;
    }
    .usageDate {
      font-size: 18px;
      padding: 5px;
    }
    .catalog {
      font-size: 18px;
      padding: 5px;
    }
  }
  .right-side {
    width: 85%;
    // border: 1px solid black;
    padding: 10px;
    img {
      width: 150px;
      height: 150px;
    }
    .products {
      display: flex;
      // flex-wrap: wrap;

      li {
        display: flex;
        background: green;
        padding: 5px;
      }
    }
  }
}
.footer {
  margin-top: 80px;
  background: #2c3e50;
  padding-left: 10px;
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
