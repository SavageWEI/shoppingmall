<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">天喵商城</div></nav-bar>
    <swiper :banners="banners"></swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>
  <!-- <h2>首页</h2> -->
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import Swiper from 'components/common/swiper/Swiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'


//为什么要加{}导入 ： 因为并不是default导出 
import { getHomeMultidata, getHomeGoods } from 'network/home'



export default {
  name: 'home',
  components: {
    NavBar,
    TabControl,
    GoodsList,

    Swiper,
    HomeRecommendView,
    FeatureView,
    
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      }
    }
  },
  //生命周期函数 created 在组件创建完后进行网络请求
  created () {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;  
        //保留结果的banner和recommend数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, 1).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 
      })
    }
  }
  
}
</script>

<style scoped>
  #home {
    padding-top: 44px
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 10;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  }
</style>
