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
    <hr>
    <div class="valuation">
      <div class="coupon">
        <input type="button" class="btn btn-primary" value="使用" @click.once="ApplyBtn" />
        <input type="text" class="input-group-text couponText" placeholder="請輸入優惠券代碼" v-model="userCoupon" @keyup.enter="ApplyBtn" />
      </div>
      <div class="sum">
        <span>總計：${{ total }} </span>
      </div>
    </div>
    <div class="confirm">
      <input type="button" class="btn btn-danger" value="繼續購物" @click="ShopBtn" />
      <!-- action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post" -->
      <form class="text-right">
        <!-- <input style="display:none" type="text" id="MerchantID" name="MerchantID" :value="MerchantID">
        <input style="display:none" type="text" id="TradeInfo" name="TradeInfo" :value="TradeInfo">
        <input style="display:none" type="text" id="TradeSha" name="TradeSha" :value="TradeSha">
        <input style="display:none" type="text" id="Version" name="Version" :value="Version"> -->
        <!-- <input style="display:none" type="text" id="Amt" name="Amt" :value="sum"> -->
        <input class="btn btn-primary" type="submit" value="前往結帳" @click="BillBtn">
      </form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
// import emailjs from 'emailjs-com'
const arr = JSON.parse(localStorage.getItem('product'))
export default {
  data() {
    return {
      selectedStore: localStorage.getItem('selectedStore'),
      selectedDate: localStorage.getItem('selectedDate'),
      selectedProduct: JSON.parse(localStorage.getItem('product')),
      useDays: localStorage.getItem('useDays'),
      subtotal: [],
      userCoupon: null,
      sum: 0,
      MerchantID: null,
      TradeInfo: null,
      TradeSha: null,
      Version: null,
    }
  },
  methods: {
    ShopBtn() {
      this.$router.push('/Equip')
    },
    BillBtn() {
      const saveData = qs.stringify({
        OrderLists: arr, // 使用者選取的商品
        useDays: localStorage.getItem('useDays'), // 使用天數
        subtotal: JSON.parse(localStorage.getItem('subtotal')), // 小計
        total: localStorage.getItem('total'), // 總計,
        // OrderNo: null,
      })
      var config = {
        method: 'post',
        url: 'https://287e157c5642.ngrok.io/Cart/Add',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: saveData,
      }
      this.$http(config)
        .then((res) => {
          localStorage.setItem('order_num', res.data.order_num)
        })
      console.log(saveData)
      // this.$router.push('/Equip_Completed')
    },
    delBtn(index) {
      const arr = JSON.parse(localStorage.getItem('product')) // 擷取localStorage中稱為product的key值，並將其儲存在變數arr
      arr.splice(index, 1) // 以索引值(index)為目標，刪除該筆資料
      localStorage.setItem('product', JSON.stringify(arr)) // 將處理過的變數arr塞回localStorage中的product
      location.reload() // 重新整理頁面
    },
    ApplyBtn() {
      var config = {
        method: 'get',
        url: 'https://gocamping.rocket-coding.com/Tickets/List',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
      }
      // 優惠券代碼：JP2076
      this.$http(config).then((res) => {
        console.log(res)
        res.data.forEach(item => {
          if (this.userCoupon === item.coupon_num) {
            this.sum = (this.total * item.discount_rate) - this.total
            localStorage.setItem('total', this.sum)
          }
        })
      })
    },
  },
  computed: {
    total() {
      arr.forEach((item) => {
        this.subtotal.push(item.base_price * item.quantity + item.daily_price * this.useDays * item.quantity)
        localStorage.setItem('subtotal', JSON.stringify(this.subtotal))
        this.sum += item.base_price * item.quantity + item.daily_price * this.useDays * item.quantity
      })
      localStorage.setItem('total', this.sum) // 將總金額紀錄在localStorage
      return this.sum
    },
  },
  created() {
    // 阻擋
    if (this.selectedStore == null) {
      this.$swal({
        icon: 'warning',
        title: '請選擇取貨地點',
        confirmButtonText: '確認',
        willClose: () => {
          this.$router.push('/Equip')
        },
      })
    } else if (this.selectedDate == null) {
      this.$swal({
        icon: 'warning',
        title: '請選擇使用日期',
        confirmButtonText: '確認',
        willClose: () => {
          this.$router.push('/Equip')
        },
      })
    } else if (arr.length === 0 | null) {
      this.$swal({
        icon: 'warning',
        title: '您尚未添加任何物品至購物車',
        confirmButtonText: '確認',
        willClose: () => {
          this.$router.push('/Equip')
        },
      })
    }
    // 查閱訂單明細
    // console.log(arr)
    // 藍新金流：尚未完成
    var config = {
      method: 'post',
      url: 'https://287e157c5642.ngrok.io/Cart/Add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
      },
    }
    this.$http(config)
      .then((res) => {
        this.MerchantID = res.data.MerchantID
        this.TradeInfo = res.data.TradeInfo
        this.TradeSha = res.data.TradeSha
        this.Version = res.data.Version
        console.log(res)
      })
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .coupon {
      display: flex;
      outline: none;
      .couponText{
        width: 180px;
        outline: none;
      }
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
