<template>
  <div class="row justify-content-center">
    <form class="col-4 p-5">
      <h3>取貨人資料：</h3>
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
        <input type="id" class="form-control" name="id" id="userid" v-model="form.user.userid" placeholder="身份證字號">
        <span class="text-danger">*字號欄位不得留白</span>
      </div>
      <hr>
      <h3>付款方式與發票：</h3>
      <div class="form-group mb-1">
        <strong>信用卡種類</strong>
        <select id="CreditCardType" name="CreditCardType" class="form-control">
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="American Express">American Express</option>
        </select>
      </div>
      <div class="creditCard">
        <div class="form-group mb-1 mr-3">
          <strong>信用卡號碼</strong>
          <input type="text" class="form-control" name="car_number" />
        </div>
        <div class="form-group mb-1">
          <strong>驗證碼</strong>
          <input type="password" class="form-control" name="car_code" value="" />
        </div>
      </div>
      <div class="form-group mb-1">
        <strong>有效日期</strong>
        <div class="expiryDate">
          <div class="mr-3">
            <select class="form-control" name="">
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
            <select class="form-control" name="">
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
        <button class="btn btn-danger" @click="confirmBilling">送出訂單</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          email: null,
          name: null,
        },
      },
    }
  },
  methods: {
    confirmBilling() {
      this.$router.push('/Equip_Completed')
    },
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
