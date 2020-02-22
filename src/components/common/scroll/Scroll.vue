<template>
<!-- 引入better-scroll实现移动端更顺滑的滚动效果 -->
<!-- 定义一个ref属性定位到特定的wrapper 防止出现其他wrapper类 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const options = {
      scrollY: true, 
      scrollX: false,
      mouseWheel: true,
      click: true, //监听点击 设置为true表示可以点击
      taps: true,
      probeType: this.probeType, //监听滚动
      pullUpLoad: this.pullUpLoad  //上拉加载
    }
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, options)

    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      //自定义事件传出position
      this.$emit('scroll', position)
    })

    //3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      
    })
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    },

    finishPullUp() {
      this.scroll.finishPullUp()
    },

    refresh() {
      // console.log('---');
      this.scroll.refresh()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
