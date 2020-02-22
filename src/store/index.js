import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    AddCount(state, payload) {
      payload.count++
    },

    AddToCart(state, payload) {
      state.cartList.push(payload)
    }

    // mutation的唯一目的是为了修改state的数据状态
    // mutation中的每个方法完成的事件尽量单一
    // addCart(state, payload) {
    //   // 1.查找之前数组中是否存在该商品
    //   let product = state.cartList.find(function (item) {  
    //     return item.iid === payload.iid
    //   })
    //   //2.判断该商品是否存在
    //   if(product) {
    //     product.count += 1
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
  },
  actions: {
    addCart(context, payload) {
      // 1.查找之前数组中是否存在该商品
      let product = context.state.cartList.find(function (item) {  
        return item.iid === payload.iid
      })
      //2.判断该商品是否存在
      if(product) { // 2.1商品已存在购物车中 则只改变数量
        // product.count += 1
        context.commit('AddCount', product)
      } else { //2.2 商品不存在
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('AddToCart', payload)
      }
    }
  },
  modules: {
  },
  getters
})
