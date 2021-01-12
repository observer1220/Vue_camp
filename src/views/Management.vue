<template>
  <div class="manage-container">
    <!-- 產品列表-編輯鈕：data-toggle="modal"是編輯開關；按鈕上的data-target="#edit"與modal選單的id="edit"是一組 -->
    <input type="button" class="btn btn-primary mb-1" value="新增商品" data-toggle="modal" data-target="#addItem" />
    <!-- 產品列表-編輯頁對應內容 -->
    <div class="modal fade" id="addItem" tabindex="-1" aria-labelledby="addItem" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addItem">產品列表-新增商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li>產品圖片 <input type="text" class="col-md-8 mb-1" v-model="products.picture" /></li>
              <li>
                品牌名稱 <input type="text" class="col-md-3 mb-1" v-model="products.brand" />
                產品類別 <input type="text" class="col-md-3 mb-1" v-model="products.category" />
              </li>
              <li>
                商品名稱 <input type="text" class="col-md-3 mb-1" v-model="products.name" />
                產品型號 <input type="text" class="col-md-3 mb-1" v-model="products.model" />
              </li>
              <li>
                體積(CM) <input type="text" class="col-md-3 mb-1" v-model="products.size" />
                重量(KG) <input type="text" class="col-md-3 mb-1" v-model="products.weight" />
              </li>
              <li>
                基本租金 <input type="text" class="col-md-3 mb-1" v-model="products.base_price" />
                每日租金 <input type="text" class="col-md-3 mb-1" v-model="products.daily_price" />
              </li>
              <li>庫存數量 <input type="text" class="col-md-3 mb-1" v-model="products.inventory" /></li>
            </ul>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-secondary" data-dismiss="modal" value="關閉" />
            <input type="button" class="btn btn-primary" data-dismiss="modal" value="加入" @click.prevent="addBtn" />
          </div>
        </div>
      </div>
    </div>
    <!-- 產品列表：主表 -->
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
        <tr>
          <th scope="row">1</th>
          <td>Land Lock 別墅帳象牙白</td>
          <td>TP671IV</td>
          <td>$2600</td>
          <td>$400</td>
          <td>3</td>
          <td>1</td>
          <td>$3800</td>
          <td>
            <!-- 產品列表-刪除鈕：尚未定義 -->
            <input type="button" class="btn btn-secondary" value="刪除" @click="delBtn" />
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Amenity Dome Elfield 1990年復刻款</td>
          <td>AD-020</td>
          <td>$2700</td>
          <td>$500</td>
          <td>3</td>
          <td>1</td>
          <td>$4200</td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Amenity Dome 寢室帳 S</td>
          <td>SDE-002RH</td>
          <td>$500</td>
          <td>$200</td>
          <td>3</td>
          <td>1</td>
          <td>$1100</td>
          <td></td>
        </tr>
      </tbody>
    </table>
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
    addBtn() {
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
    delBtn() {
      console.log('刪除')
    },
  },
}
</script>

<style lang=scss>
.manage-container {
  max-width: 940px;
  margin: 0 auto;
  margin-top: 30px;
  .table {
    font-weight: 500;
    background: #42b983;
  }
  ul {
    li {
      margin-bottom: 3px;
      input {
        padding: 3px;
      }
    }
  }
}
</style>
