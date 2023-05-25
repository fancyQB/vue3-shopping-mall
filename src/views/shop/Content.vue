<template>
  <div class="content">
    <!-- 左边category边栏 -->
    <div class="category">
      <div
        v-for="item in categoryData"
        :class="{'category__item': true, 'category__item--active':item.tab === currentTab }"
        :key="item.id"
        @click="() => handleTabClick(item.tab)"
      >
        {{item.name}}
      </div>
    </div>
    <!-- 右边商品 -->
    <div class="product">
      <div
        class="product__item"
        v-for="item in contentItem"
        :key="item._id"
      >
        <img
          class="product__item__img"
          :src="item.imgUrl"
        />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__orign">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__nums">
          <div
            class="product__nums__minus"
            @click="() => removeGoodsFromCart(shopId, item._id, shopName)"
            v-show="cartList?.[shopId]?.productList?.[item._id]?.count"
          >－</div>
          {{cartList?.[shopId]?.productList?.[item._id]?.count || '' }}
          <div
            class="product__nums__plus"
            @click="() => addCartItem(shopId, item._id, item, shopName)"
          >＋</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'

import { get } from '../../utils/request'
import { useRoute } from 'vue-router'

import { useCommonCartEffect } from '../../effects/cartEffects.js'
import { useStore } from 'vuex'
const categoryData = [
  {
    id: 1,
    name: '全部商品',
    tab: 'all'
  },
  {
    id: 2,
    name: '秒杀',
    tab: 'seckill'
  },
  {
    id: 3,
    name: '新鲜水果',
    tab: 'fruit'
  }
]
// tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categoryData[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurretnListEffect = (currentTab, shopId) => {
  const data = reactive({ contentItem: [] })
  const getData = async () => {
    try {
      const ret = await get(`/shop/${shopId}/products`, { tab: currentTab.value })
      if (ret?.errno === 0 && ret?.data.length) {
        if (currentTab.value === 'seckill') {
          ret.data.pop()
        }
        if (currentTab.value === 'fruit') {
          ret.data.pop()
          ret.data.splice(0, 1)
        }
        data.contentItem = ret.data
      }
    } catch (e) {
      // todo
    }
  }

  watchEffect(() => {
    getData()
  })
  const { contentItem } = toRefs(data)
  return { contentItem }
}

// 购物车相关逻辑
// const useCartEffect = () => {
//   const store = useStore()
//   const { cartList } = toRefs(store.state)
//   const addGoodsToCart = (shopId, productId, goodInfo) => {
//     store.commit('addGoodsToCart', { shopId, productId, goodInfo })
//   }
//   const removeGoodsFromCart = (shopId, productId) => {
//     store.commit('removeGoodsFromCart', { shopId, productId })
//   }
//   return { cartList, addGoodsToCart, removeGoodsFromCart }
// }

export default {
  name: 'Conten',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const store = useStore()
    const { currentTab, handleTabClick } = useTabEffect()
    const { contentItem } = useCurretnListEffect(currentTab, shopId)
    const { cartList, addGoodsToCart, removeGoodsFromCart } = useCommonCartEffect(shopId)
    const changeShopName = (shopId, shopName) => {
      store.commit('changeShopName', { shopId, shopName })
    }
    const addCartItem = (shopId, productId, product, shopName) => {
      addGoodsToCart(shopId, productId, product)
      changeShopName(shopId, shopName)
    }
    return { contentItem, currentTab, handleTabClick, categoryData, cartList, shopId, addGoodsToCart, removeGoodsFromCart, addCartItem }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  bottom: .5rem;
  left: 0;
  right: 0;
}
.category {
  overflow-y: scroll;
  width: .76rem;
  background: #F5F5F5;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: .14rem;
    color: $font-color;
    &--active {
      background: #fff;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    height: 0.68rem;
    margin: .08rem .18rem 0 .16rem;
    padding-bottom: .12rem;
    border-bottom: .01rem solid #F1F1F1;
    &__img {
      width: 0.68rem;
    }
    &__detail {
      margin-left: .16rem;
      overflow: hidden;
    }
    &__title {
      line-height: .2rem;
      font-size: .14rem;
      color: $font-color;
      margin-bottom: .06rem;
      @include single-ellipsis
    }
    &__sales {
      line-height: .16rem;
      font-size: .12rem;
      color: $font-color;
      margin-bottom: .06rem;
    }
    &__price {
      line-height: .2rem;
      font-size: .14rem;
      color: #E93B3B;
    }
    &__yen {
      font-size: .12rem;
    }
    &__orign {
      margin-left: .06rem;
      font-size: .1rem;
      color: #999;
      text-decoration: line-through;
    }
    .product__nums {
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus, &__plus {
        // box-sizing: border-box;
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        text-align: center;
        line-height: .16rem;
        border-radius: 50%;
        font-size: .2rem;
      }
      &__minus {
        margin-right: .05rem;
        border: 1px solid #666;
        color: #666;
      }
      &__plus {
        margin-left: .05rem;
        background: #0091FF;
        color: #fff;
      }
    }
  }

}
</style>
