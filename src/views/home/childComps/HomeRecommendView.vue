<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 0px 0 10px;
    border-bottom: 8px solid #eee; 
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    max-width: 100%;
    margin-bottom: 5px;
    transform:scale(0.8);
  }
</style>
