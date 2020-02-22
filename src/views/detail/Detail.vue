<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info ref="base" :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-param-info ref="param" :param-info="itemParams"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <div @click="backClick" v-show="isShowBackTop">
      <back-top ></back-top>
    </div>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailImageInfo from 'views/detail/childComps/DetailImageInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, GoodsInfo, Shop, Params, getRecommend } from 'network/detail'

import {backTopMixin} from "common/mixin"

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    }
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求对应内容数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 0.获取数据 
      const data = res.result

      // 1.获取res的顶部轮播图图片数据
      this.topImages = data.itemInfo.topImages;
      
      // 2.获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.取出详情信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.itemParams = new Params(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }) 

    // 3.请求推荐数据
    getRecommend().then((res, error) => {
      // console.log(res);
      if (error) return
        this.recommends = res.data.list
    })
  },
  
  methods: {
    detailImageLoad() {
      // console.log("sad");
      // 后期可以用防抖函数优化
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      // this.themeTopYs.push(0)
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y
      let length = this.themeTopYs.length

      for(let i = 0; i < length-1; i++) {
        // if(this.currentIndex !== i && ((i < (length-1) && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === (length-1) && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        // 引入一个最大值Number.MAX_VALUE以简化判断过程
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.listenIsShowBackTop(position)
    },
    addToCart() {
      // 1.获取购物车需要的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      console.log(product);
      
      // 2.将商品加入购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 21;
    background-color: #fff;
    height: 100vh;
  }
  
  .detail-nav {
    position: relative;
    z-index: 21;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
