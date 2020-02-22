<template>
<div class="wrapper" ref="aaa">
  <ul class="content">
    <li>20</li>
    <li>10</li>
    <li>5430</li>
    <li>2045</li>
    <li>2450</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>10000</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
      <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
      <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
      <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
    <li>20</li>
  </ul>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'category',
  data () {
    return {
      scroll: null  
    }
  },
  mounted () {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      // probeType: 3
    })

    // this.scroll.on('scroll', (position) => {
    //   console.log(position);
      
    // })
  }
}
</script>

<style scoped>
  .content {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>
