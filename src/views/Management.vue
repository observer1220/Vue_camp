<template>
  <div class="manage-container">
    <ul>
      <li>品牌名稱 <input type="text" v-model="products.brand" /></li>
      <li>商品類別 <input type="text" v-model="products.category" /></li>
      <li>商品名稱 <input type="text" v-model="products.name" /></li>
      <li>商品型號 <input type="text" v-model="products.model" /></li>
      <li>體積(cm) <input type="text" v-model="products.size" /></li>
      <li>重量(kg) <input type="text" v-model="products.weight" /></li>
      <li>基本租金 <input type="text" v-model="products.base_price" /></li>
      <li>每日租金 <input type="text" v-model="products.daily_price" /></li>
      <li>產品圖片 <input type="text" v-model="products.picture" /></li>
      <li>庫存數量 <input type="text" v-model="products.inventory" /></li>
      <li><input type="button" value="新增商品" @click="submitBtn" /></li>
    </ul>
  </div>
</template>

<script>
const url = 'https://fathomless-brushlands-42339.herokuapp.com/todo5'
export default {
  data() {
    return {
      products: {
        brand: null,
        category: null,
        name: null,
        model: null,
        size: null,
        weight: null,
        base_price: null,
        daily_price: null,
        picture: null,
        inventory: null,
      },
    }
  },
  methods: {
    submitBtn() {
      const saveData = {
        id: null,
        brand: this.products.brand,
        category: this.products.category,
        name: this.products.name,
        model: this.products.model,
        size: this.products.size,
        weight: this.products.weight,
        base_price: this.products.base_price,
        daily_price: this.products.daily_price,
        picture: this.products.picture,
        inventory: this.products.inventory,
      }
      this.$http.post(url, saveData).then((res) => {
        console.log(res)
      })
    },
  },
}
</script>

<style lang=scss>
.manage-container {
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      margin-bottom: 3px;
      input {
        padding: 3px;
      }
    }
  }
}
</style>
