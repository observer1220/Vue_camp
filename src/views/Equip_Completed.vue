<template>
  <div class="receipt-container">
    <div class="invoice-wrapper col-4">
      <ul class="intro">
        <li><strong>親愛的顧客您好</strong>,</li>
        <li>您本次的消費總額共計為<strong>$5840</strong>元</li>
      </ul>
      <hr>
      <ul class="payment-info">
        <li>訂單號碼：<strong>AEGF2046</strong></li>
        <li>訂單日期：<strong>2021-01-06</strong></li>
      </ul>
      <hr>
      <ul class="payment-details mb-5">
        <strong>訂單列表</strong>
        <ul v-for="(item, key) in items" :key="key">
          <li><span>{{item[0]}}</span></li>
        </ul>
      </ul>
      <div class="text-center">
        <button class="btn btn-primary">列印明細</button>
      </div>
    </div>
  </div>
</template>

<script>
const arr = JSON.parse(localStorage.getItem('product'))
export default {
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.items = arr
    console.log(this.items)
  },
}
</script>

<style lang="scss">
.receipt-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
