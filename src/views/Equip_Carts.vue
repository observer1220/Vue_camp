<template>
  <div class="carts-container">
    <p>取貨方式：<input type="text" disabled v-model="selectedStore" /></p>
    <p>租賃日期：<input type="text" disabled v-model="selectedDate" /></p>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">項目</th>
          <th scope="col">商品</th>
          <th scope="col">型號</th>
          <th scope="col">基本租金</th>
          <th scope="col">每日租金</th>
          <th scope="col">天數</th>
          <th scope="col">數量</th>
          <th scope="col">小計</th>
          <th scope="col">狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index, key) in selectedProduct" :key="key">
          <th scope="row">{{index+1}}</th>
          <td>{{item.product_name}}</td>
          <td>{{item.model}}</td>
          <td>${{item.base_price}}</td>
          <td>${{item.daily_price}}</td>
          <td>{{useDays}}</td>
          <td>{{item.quantity}}</td>
          <td>${{item.base_price * item.quantity + item.daily_price * useDays * item.quantity}}</td>
          <td><button class="btn btn-secondary" @click="delBtn(index)">刪除</button></td>
        </tr>
      </tbody>
    </table>
    <div class="valuation">
      <div class="coupon">
        <input type="button" class="btn btn-primary" value="使用" />
        <input type="text" class="input-group-text" placeholder="請輸入優惠券代碼" />
      </div>
      <div class="sum">
        <span>總計：${{ total }} </span>
      </div>
    </div>
    <div class="confirm">
      <input type="button" class="btn btn-danger" value="繼續購物" @click="ShopBtn" />
      <input type="button" class="btn btn-primary" value="前往結帳" @click="BillBtn" />
    </div>
  </div>
</template>

<script>
const arr = JSON.parse(localStorage.getItem('product'))
const useDays = localStorage.getItem('useDays')
export default {
  data() {
    return {
      selectedStore: localStorage.getItem('selectedStore'),
      selectedDate: localStorage.getItem('selectedDate'),
      selectedProduct: JSON.parse(localStorage.getItem('product')),
      useDays: useDays,
      subtotal: [],
    }
  },
  methods: {
    ShopBtn() {
      this.$router.push('/Equip')
    },
    BillBtn() {
      this.$router.push('/Equip_Payment')
    },
    delBtn(index) {
      // console.log(index)
      const arr = JSON.parse(localStorage.getItem('product')) // 擷取localStorage中稱為product的key值，並將其儲存在變數arr
      arr.splice(index, 1) // 以索引值(index)為目標，刪除該筆資料
      localStorage.setItem('product', JSON.stringify(arr)) // 將處理過的變數arr塞回localStorage中的product
      location.reload() // 重新整理頁面
    },

  },
  computed: {
    total() {
      let sum = null
      arr.forEach((item) => {
        this.subtotal.push(item.base_price * item.quantity + item.daily_price * useDays * item.quantity)
        localStorage.setItem('subtotal', JSON.stringify(this.subtotal))
        sum += item.base_price * item.quantity + item.daily_price * useDays * item.quantity
      })
      localStorage.setItem('total', sum) // 將總金額紀錄在localStorage
      return sum
    },
  },
  created() {
    // localStorage.clear() 刪除所有儲存在localStorage的資料
    console.log()
    if (arr.length === 0) {
      alert('您尚未添加任何物品至購物車')
      this.$router.push('/Equip')
    }
  },
}
</script>

<style lang="scss">
.carts-container {
  max-width: 940px;
  margin: 0 auto;
  margin-top: 30px;
  .table {
    font-weight: 500;
    tbody {
      tr {
        &:hover {
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
          border-color: #eee;
          transition: all 0.2s ease-in-out;
          background: snow;
        }
      }
    }
  }
  .valuation {
    .coupon {
      display: flex;
      align-items: center;
      outline: none;
    }
    .sum {
      margin-top: 10px;
      padding-left: 8px;
      font-size: 20px;
      font-weight: 900;
    }
  }
  .confirm {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    input {
      margin-right: 10px;
      font-size: 18px;
    }
  }
}
</style>
