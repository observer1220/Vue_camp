<template>
  <div class="carts-container">
    <p>取貨方式：<input type="text" disabled v-model="selectedStore" /></p>
    <p>
      租賃日期：<input type="text" disabled v-model="selectedDate" style="width: 200px" />
    </p>
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
          <th scope="row">{{index+1}}</th> <!-- 序號 -->
          <td>{{item[0]}}</td> <!-- 商品名稱 -->
          <td>{{item[1]}}</td> <!-- 商品型號 -->
          <td>${{item[2]}}</td> <!-- 基本租金 -->
          <td>${{item[3]}}</td> <!-- 每日租金 -->
          <td></td>
          <td>{{item[4]}}</td> <!-- 商品數量 -->
          <td></td>
          <td><button class="btn btn-secondary" @click="delBtn(index)">刪除</button></td>
        </tr>
      </tbody>
    </table>
    <div class="coupon">
      <input type="text" placeholder="請輸入優惠券代碼" style="height:38px" />
      <input type="button" class="btn btn-primary" value="使用" />
    </div>
    <div class="sum">
      <span>總計(折扣前)：</span>
      <span></span>
    </div>
    <div class="discount">
      <span>總計(折扣後)：</span>
      <span></span>
    </div>
    <div class="confirm">
      <input type="button" class="btn btn-danger" value="繼續購物" @click="goShopping" />
      <input type="button" class="btn btn-primary" value="前往結帳" @click="goBilling" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedStore: localStorage.getItem('selectedStore'),
      selectedDate: localStorage.getItem('selectedDate'),
      selectedProduct: JSON.parse(localStorage.getItem('product')),
    }
  },
  methods: {
    goShopping() {
      this.$router.push('/Equip')
    },
    goBilling() {
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
  created() {
    // console.log(localStorage.getItem('selectedStore'))
    // localStorage.clear() 刪除所有儲存在localStorage的資料
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
  .coupon {
    display: flex;
    // justify-content: flex-end;
    align-items: center;
  }
  .sum {
    display: flex;
    // justify-content: space-around;
    margin-right: 80px;
  }
  .discount {
    display: flex;
    // justify-content: flex-end;
    margin-right: 80px;
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
