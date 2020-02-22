<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">天喵商城</div></nav-bar>
    <!-- scroll绑定了ref="scroll" 因此其他地方可以通过this.$refs.scroll拿到scroll组件 -->
    <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick"
      ref="TabControl1" 
      class="tab-control"
      v-show="isTabFixed">
    </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick="tabClick"
        ref="TabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll> 
    <!-- 不可以直接监听back-top 因此需要外面包一层div或者添加修饰.native -->
    <!-- <back-top @click.native="backClick" v-show="isShowBackTop"></back-top> -->
    <div @click="backClick" v-show="isShowBackTop">
      <back-top ></back-top>
    </div>
    
  </div>
  <!-- <h2>首页</h2> -->
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backtop/BackTop'

import Swiper from 'components/common/swiper/Swiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'


//为什么要加{}导入 ： 因为并不是default导出 
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

// 用混入 minin 代替直接引入Backtop组件
import {backTopMixin} from "common/mixin"

export default {
  name: 'home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,

    Swiper,
    HomeRecommendView,
    FeatureView,
    
  },
  mixins: [backTopMixin],
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
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
  mounted () {
    // 1.监听item中图片加载完成  每次加载图片都要进行多次refresh操作 因此加入防抖函数 减轻服务器压力
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

    //2.获取tabcontrol的offsetTop
    //所有的组件都有一个属性$el：用于获取组件的元素
    // this.tabOffsetTop = this.$refs
  },
  destroyed () {
    //判断home是否被销毁
    console.log('homedes');
  },
  activated () {  
    this.$refs.scroll.scrollTo(0, this.saveY)
    // this.$refs.scroll.scrollTo(0, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1.保存y值
    // this.saveY = -18000
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消
  },

  methods: {
    //事件监听的相关方法
    tabClick(index){
      // console.log(index);
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break          
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },

    //监听backTop组件
    // backClick() {
    //   //通过scroll的ref拿到scroll这个组件对象
    //   //this.$refs.scroll得到组件对象 .scroll得到组件内部的data数据：scroll 并且调用scrollTo方法返回顶部 第三个参数为返回顶部的事件（ms）
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500)

    //   //封装改进：scroll组件内部定义scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0)
    // },

    contentScroll(position) {
      // 1.判断backTop即返回顶部按钮是否显示
      // this.isShowBackTop = (-position.y) > 1000
      this.listenIsShowBackTop(position)

      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      // console.log("loadmore");
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      // console.log(this.$refs.TabControl.$el.offsetTop );
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
    },

    //网络请求的相关方法
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
      //动态获取对应的page
      const page = this.goods[type].page + 1
      // 调用home.js中封装的getHomeGoods函数传入type和page
      getHomeGoods(type, 1).then(res => {
        // console.log(res);
        //将res即结果中的data.list传入对应type的list里面
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 

        //更新新数据后需要结束刷新
        this.$refs.scroll.finishPullUp()
      })
    }
  }
  
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 100单位的视口 相对于100%的屏幕高度 */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px */
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */

    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
