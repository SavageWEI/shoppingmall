<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
}
</script>

<style scoped>
  .back-top {
    /* fixed和absolute区别：有滚动条时 absolute会随着滚动 fixed不会 */
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
