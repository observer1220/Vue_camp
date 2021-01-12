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
        <ul>
          <li><span>Land Lock 別墅帳象牙白</span></li>
          <li><span>Amenity Dome Elfield 1990年復刻款</span></li>
          <li><span>Amenity Dome 寢室帳 S</span></li>
        </ul>
      </ul>
      <div class="text-center">
        <button class="btn btn-primary">列印明細</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.receipt-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
