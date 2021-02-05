<template>
  <div class="receipt-container">
    <div class="invoice-wrapper col-7">
      <ul class="intro">
        <li><strong>【注意事項】</strong></li>
        <li>1. 最晚於租賃日前1天，完成匯款及現場取貨，逾期者將取消訂單。</li>
        <li>2. 取貨時「<span style="color:red;font-weight:900">支付押金</span>」並由租賃雙方進行驗貨，如有損毀或零件遺失之情形，將依損壞程度進行賠償。</li>
        <li>3. 請攜帶「<span style="color:red;font-weight:900">身份證正本</span>」進行取貨。</li>
        <li>4. 押金為總價之50%，歸還時若無損壞之情形將全數退還。</li>
        <li><strong>【詐騙猖獗】</strong></li>
        <li>1. 本店不會以簡訊通知消費者付款失敗或以任何理由要求您重新匯款。</li>
      </ul>
      <h3>訂單資訊</h3>
      <ul class="payment-info">
        <li>訂單編號：{{orderNum}}</li>
        <li>訂單日期：{{orderDate}}</li>
        <li>付款狀態：付款完成</li>
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
          <p>總價：${{newTotal}}</p>
          <p>押金<span style="font-size:14px">(總價50%)</span>：${{Math.round(newTotal/2)}}</p>
        </div>
      </ul>
      <div class="text-center">
        <button class="btn btn-danger" @click.prevent="confirmBtn">回到商城</button>
      </div>
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
      newTotal: null,
    }
  },
  methods: {
    confirmBtn() {
      // 將localStorage裡的所有資料刪除
      localStorage.setItem('product', '[]')
      localStorage.removeItem('total')
      localStorage.removeItem('order_num')
      localStorage.removeItem('useDays')
      localStorage.removeItem('subtotal')
      localStorage.removeItem('selectedStore')
      localStorage.removeItem('selectedDate')
      this.$router.push('/')
    },
  },
  created() {
    this.items = arr
    this.orderDate = orderDate
    this.orderNum = localStorage.getItem('order_num')
    this.newTotal = localStorage.getItem('total')
    console.log(this.newTotal)
    // this.$swal({
    //   icon: 'success',
    //   title: '訂單完成',
    //   html: '<strong style="color:orange">請紀錄「訂單明細」以便日後查詢</strong>',
    //   confirmButtonText: '確認',
    // })
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
