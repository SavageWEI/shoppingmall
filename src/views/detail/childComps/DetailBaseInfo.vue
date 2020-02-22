<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="good-title">{{goods.title}}</div>
    <div class="goodsPrice">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    forId(index) {
			return "forid_" + index 
		},
  }
  
}
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .good-title {
    margin: 10px 10px 0 10px;
    font-size: 15px;
    font-weight: bolder;
    color: #4d4b4a
  }

  .goodsPrice {
    margin: 10px;
    padding: 0px
  }

  .newPrice {
    color: #ff5000;
    font-size: 25px;
  }

  .oldPrice {
    margin-left: 5px;
    font-size: 13px;
    color: #979492;
    text-decoration: line-through;
  }

  .discount {
    border-radius: 5px;
    background-color:red;
    margin-bottom: 10px;
    font-size: 13px;
    color: white;
    position: relative;
    bottom: 10px;
    left: 3px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
  

</style>
