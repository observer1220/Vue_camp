<template>
  <div class="camp-product-container">
    <ul>
      <li>
        <img :src="picture" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      picture: null,
    }
  },
  created() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/vuecamp.appspot.com/o/Camp_Info.json?alt=media&token=1bf7f582-8b8c-4ad7-b979-0b9f4997cc91'
    const that = this
    const num = this.$route.params.id
    this.$http.get(url).then((res) => {
      this.items = res.data.data
      this.items.forEach(function (item) {
        if (num === item.id) {
          that.picture = item.picture
        }
      })
    })
  },
}
</script>

<style lang="scss">
  .camp-product-container{

  }
</style>
