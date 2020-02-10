<template>
  <el-carousel indicator-position="outside" class="swiper">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link"><img :src="item.image" alt=""></a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
  /* .swiper el-carousel el-carousel--horizontal {
    height: 100px
  } */

  

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>

<style>
  .el-carousel__container{
    height: 200px;
  }
  
  .el-carousel__container img{
    height: 100%;
    width: 100%;
  }
</style>