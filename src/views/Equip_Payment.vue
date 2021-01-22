<template>
  <div class="row justify-content-center">
    <form class="col-5">
      <h4>取貨人資料</h4>
      <div class="form-group mb-1">
        <label for="username"></label>
        <span style="color:red">*</span><strong>姓名</strong>
        <input type="text" class="form-control" name="name" id="username" v-model="form.user.name" placeholder="中文姓名(取貨用)">
      </div>
      <div class="form-group mb-1">
        <label for="useremail"></label>
        <span style="color:red">*</span><strong>電子郵件</strong>
        <input type="email" class="form-control" name="email" id="useremail" v-model="form.user.email" placeholder="電子郵件" required>
      </div>
      <div class="form-group mb-1">
        <label for="usertel"></label>
        <span style="color:red">*</span><strong>行動電話</strong>
        <input type="tel" class="form-control" name="tel" id="usertel" v-model="form.user.tel" placeholder="行動電話">
      </div>
      <div class="form-group mb-1">
        <label for="userid"></label>
        <span style="color:red">*</span><strong>身分證字號</strong>
        <input type="id" class="form-control" name="id" id="userid" v-model="form.user.ID_Card" placeholder="身份證字號">
        <span class="text-danger">*字號欄位不得留白</span>
      </div>
      <hr>
      <h4>付款方式與發票</h4>
      <div class="form-group mb-1">
        <strong>信用卡種類</strong>
        <select id="CreditCardType" name="CreditCardType" class="form-control" v-model="form.CreditCard.type">
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="American Express">American Express</option>
        </select>
      </div>
      <div class="creditCard">
        <div class="form-group mb-1 mr-3">
          <strong>信用卡號碼</strong>
          <cleave type="text" class="form-control" id="CreditCardNum" name="card" :options="num_options" v-model="form.CreditCard.num" />
        </div>
        <div class="form-group mb-1">
          <strong>驗證碼</strong>
          <input type="password" class="form-control" name="car_code" v-model="form.CreditCard.Vnum" />
        </div>
      </div>
      <div class="form-group mb-1">
        <strong>有效日期</strong>
        <div class="expiryDate">
          <div class="mr-3">
            <select class="form-control" name="" v-model="form.CreditCard.month">
              <option value="" disabled selected>月份</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <select class="form-control" name="" v-model="form.CreditCard.year">
              <option value="" disabled selected>年份</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2024">2026</option>
              <option value="2025">2027</option>
              <option value="2024">2028</option>
              <option value="2025">2029</option>
              <option value="2025">2030</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text-right">
        <button class="btn btn-danger" @click.prevent="BillBtn">送出訂單</button>
      </div>
    </form>
  </div>
</template>

<script>
import qs from 'qs'
import Cleave from 'vue-cleave-component'
// import emailjs from 'emailjs-com'
// /^ 開頭、結尾語法 $/
// [\u4E00-\u9FFF]{2,8} 限定輸入2~8個字，且符合中文字的Unicode範圍
const nameRule = /^[\u4E00-\u9FFF]{2,8}$/
// \w+((-\w+)|(\.\w+))* 所有英文大小寫、數字、_可出現1次以上，符號-及.符號後方也適用同樣規則
// @[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)* @符號後方可所有英文大小寫、數字可出現1次以上 並可使用符號-及.做連接詞，符號後方也適用同樣規則
// \.[A-Za-z]+ 最後一段符號.後方只能使用英文大小寫，不能使用數字及符號
const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
// [0-9]{10,} 需輸入10位數的阿拉伯數字
const mobileRule = /^[0-9]{10,}$/
// 身份證字號：第1字需為A-Z大寫字母，第2~9字需為阿拉伯數字0-9
const IDCardRule = /^[A-Z]{1,}[0-9]{9,}$/
const arr = JSON.parse(localStorage.getItem('product'))
export default {
  data() {
    return {
      form: {
        user: {
          id: null,
          name: null,
          email: null,
          tel: null,
          ID_Card: null,
        },
        CreditCard: {
          type: null,
          num: null,
          Vnum: null,
          month: null,
          year: null,
        },
      },
      num_options: {
        creditCard: true,
        delimiter: '-',
      },
      product_name: [],
      product_model: [],
      product_base_price: [],
      product_daily_price: [],
      useDays: null,
      product_subtotal: null,
      product_total: null,
    }
  },
  components: {
    Cleave,
  },
  methods: {
    BillBtn() {
      const saveData = qs.stringify({
        // 取貨人資料
        name: this.form.user.name,
        email: this.form.user.email,
        tel: this.form.user.tel,
        ID_Card: this.form.user.ID_Card,
        // 付款方式與發票(是否要紀錄??)
        Credit_Card_type: this.form.CreditCard.type,
        Credit_Card_num: this.form.CreditCard.num,
        Credit_Card_Validate_num: this.form.CreditCard.Vnum,
        Expired_month: this.form.CreditCard.month,
        Expired_year: this.form.CreditCard.year,
        // 租賃商品
        product_name: this.product_name,
        product_model: this.product_model,
        product_base_price: this.product_base_price,
        product_daily_price: this.product_daily_price,
        useDays: this.useDays,
        product_subtotal: this.product_subtotal,
        product_total: this.product_total,
      })
      var config = {
        method: 'post',
        url: 'https://fathomless-brushlands-42339.herokuapp.com/todo4',
        // url: 'https://gocamping.rocket-coding.com/Order/Add',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: '__cfduid=db444a026ebafd355fb3138f06f54e2701610528085',
        },
        data: saveData,
      }
      // 步驟1：確認姓名欄位非空值，並符合nameRule格式
      if (this.form.user.name === null || this.form.user.name.search(nameRule) === -1) {
        alert('請輸入正確的姓名格式')
        // 步驟2：確認email欄位非空值，並符合emailRule格式
      } else if (this.form.user.email === null || this.form.user.email.search(emailRule) === -1) {
        alert('請輸入正確的email格式')
        // 步驟3：確認電話欄位非空值，並符合telRule格式
      } else if (this.form.user.tel === null || this.form.user.tel.search(mobileRule) === -1) {
        alert('請輸入正確的行動電話格式')
      } else if (this.form.user.ID_Card === null || this.form.user.ID_Card.search(IDCardRule) === -1) {
        alert('請輸入正確的身分證字號')
      } else {
        this.$http(config)
          .then((res) => {
            console.log(res)
            // Email功能
          //   const emailTemplate = {
          //     name: res.data.name,
          //     product_order_num: new Date().getTime(),
          //   }
          //   emailjs.send('service_oylafrq', 'template_bymdjpc', emailTemplate, 'user_cb46q3flILaW5AzIRhh2Z').then((result) => {
          //     console.log('寄送成功')
          //   }, (error) => {
          //     console.log('寄送失敗', error)
          //   })
          // }).catch((error) => {
          //   console.log(error)
          })
      }

      // this.$router.push('/Equip_Completed')
    },
  },
  created() {
    arr.forEach(item => {
      this.product_name.push(item[0])
      this.product_model.push(item[1])
      this.product_base_price.push(item[2])
      this.product_daily_price.push(item[3])
      this.useDays = localStorage.getItem('useDays')
      this.product_subtotal = JSON.parse(localStorage.getItem('subtotal'))
      this.product_total = localStorage.getItem('total')
    })
    // console.log(this.product_name)
  },
}
</script>

<style lang="scss">
.expiryDate {
  display: flex;
}
.creditCard {
  display: flex;
}
</style>
