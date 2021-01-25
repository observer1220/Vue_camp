<template>
  <div class="receipt-container">
    <div class="invoice-wrapper col-7">
      <ul class="intro">
        <li><strong>【注意事項】</strong></li>
        <li>1. 請於租賃日期前一天完成匯款及現場取貨，逾期者將自動取消訂單。</li>
        <li>2. 現場取貨將由租/借雙方確認驗貨細節，如有損毀將依損壞程度進行賠償。</li>
        <li>3. 請攜帶「身份證正本」進行取貨</li>
        <li><strong>【詐騙猖獗】</strong></li>
        <li>本店決不會以簡訊通知消費者付款失敗或以任何理由要求您重新匯款。</li>
      </ul>
      <h3>訂單資訊</h3>
      <ul class="payment-info">
        <li>訂單編號：{{orderNum}}</li>
        <li>訂單日期：{{orderDate}}</li>
        <li>付款狀態：尚未付款</li>
        <li>出貨狀態：尚未取貨</li>
      </ul>
      <hr>
      <h3>商品清單</h3>
      <ul class="payment-details mb-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">項目</th>
              <th scope="col">商品</th>
              <th scope="col">型號</th>
              <th scope="col">天數</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index, key) in selectedProduct" :key="key">
              <th scope="row">{{index+1}}</th>
              <td>{{item.product_name}}</td>
              <td>{{item.model}}</td>
              <td>{{useDays}}</td>
              <td>{{item.quantity}}</td>
              <td>${{item.base_price * item.quantity + item.daily_price * useDays * item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <hr>
        <div class="sum text-right">
          <p>押金：${{total/2}}</p>
          <p>總計：${{total}} </p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
const arr = JSON.parse(localStorage.getItem('product'))
const useDays = localStorage.getItem('useDays')
const _date = new Date()
const orderDate = _date.getFullYear() + '-' + (_date.getUTCMonth() + 1) + '-' + (_date.getUTCDate())
export default {
  data() {
    return {
      selectedProduct: JSON.parse(localStorage.getItem('product')),
      subtotal: null,
      useDays: useDays,
      orderDate: null,
      orderNum: null,
    }
  },
  computed: {
    total() {
      let sum = null
      arr.forEach((item) => {
        sum += item.base_price * item.quantity + item.daily_price * useDays * item.quantity
      })
      localStorage.setItem('total', sum) // 將總金額紀錄在localStorage
      return sum
    },
  },
  created() {
    this.items = arr
    this.orderDate = orderDate
    this.orderNum = _date.getTime()
    // console.log(_date)
    // console.log(orderDate)
  },
}
</script>

<style lang="scss">
.receipt-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .intro{
    border:1px solid red;
    padding: 10px;
    background:snow;
  }
  .sum {
      margin-top: 10px;
      padding-left: 8px;
      font-size: 20px;
      font-weight: 900;
    }
}
</style>
