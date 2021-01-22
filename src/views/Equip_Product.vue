<template>
  <div class="equip-product-container">
    <ul>
      <li class="equip-product-info">

        <v-zoomer>
          <div class="load">
            <img src="https://magossystems.com/MagosWordpress/wp-content/themes/Magos/images/loading_slider.gif" alt="">
          </div>
          <img class="equip-product-pic" :src="picture" alt="" />
        </v-zoomer>
        <div class="equip-product-des">
          <p>品牌：{{ brand }}</p>
          <p>商品：{{ title }}</p>
          <p>型號：{{ model }}</p>
          <p>基本租金：${{ base_price }}元</p>
          <p>每日租金：${{ daily_price }}元</p>
          <p>數量：
            <select name="" id="" v-model="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <div class="product-bar">
            <button class="btn btn-danger" @click="goShopping">繼續購物</button>
            <button class="btn btn-primary" @click="addBtn()">加入購物車</button>
            <button class="btn btn-danger" @click="BillBtn">前往結帳</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      picture: null,
      brand: null,
      title: null,
      model: null,
      base_price: null,
      daily_price: null,
      quantity: 1,
    }
  },
  methods: {
    goShopping() {
      this.$router.go(-1)
    },
    BillBtn() {
      this.$router.push('/Equip_Carts')
    },
    addBtn() {
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
      if (loginStatus.loginCheck === false) {
        alert('請登入帳號')
      } else {
        // 用JSON.parse撈product的內容，是為了將productHistory設定為陣列
        const productHistory = JSON.parse(localStorage.getItem('product')) || []
        // 將productHistory設定為陣列，是因為push方法只能把字串或數值推到陣列裡
        productHistory.push([
          this.title,
          this.model,
          this.base_price,
          this.daily_price,
          this.quantity,
        ])
        // 用JSON.stringify把值傳到localStorage，是因productHistory原本是一組陣列，而 localStorage只能接收字串
        localStorage.setItem('product', JSON.stringify(productHistory))
        alert('已加入購物車')
        location.reload()
      }
    },
  },
  created() {
    // const url = 'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Equip_Lease.json?alt=media&token=5eb3db57-78ea-40cf-b424-8ae10e296b36'
    const that = this
    const num = this.$route.params.id
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
      this.items.forEach(function (item) {
        if (num === `${item.product_id}`) {
          that.picture = item.picture
          that.brand = item.brand
          that.title = item.name
          that.model = item.model
          that.base_price = item.base_price
          that.daily_price = item.daily_price
        }
      })
    })
  },
}
</script>

<style lang="scss">
.equip-product-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .equip-product-info {
    display: flex;
    align-items: center;
    .equip-product-pic {
      width: 450px;
      height: 400px;
      object-fit: contain;
      margin-right: 50px;
    }
    .equip-product-des {
      p {
        font-size: 18px;
      }
      select {
        width: 35px;
        outline: none;
      }
    }
    .product-bar {
      button {
        margin-right: 5px;
      }
    }
  }
}
</style>
