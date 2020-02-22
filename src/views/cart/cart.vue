<template>
  <div>
    <!-- 导肮 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <!-- 商品列表 -->
    
    <!-- 底部汇总 -->
  </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList' 

import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    NavBar,
    CartList
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
    // cartLength() {
    //   return this.$store.state.cartList.length
    // }
  }
}
</script>

<style scoped>
 .nav-bar {
   background-color: var(--color-tint);
   color: white;
   font-weight: 700
 }
</style>
