<template>
  <div
    class="mask"
    v-if="isShowCart && calculations.totalCount"
    @click="showCartGoodsInfo"
  ></div>
  <div class="cart">
    <div
      class="product"
      v-if="isShowCart && calculations.totalCount"
    >
      <div
        class="product__tab"
        v-if="calculations.totalCount"
      >
        <div class="product__tab__allchecked">
          <i
            :class="{'product__tab__icon': true, 'product__tab__icon--active': isAllChoose }"
            @click="() => checkedAllGoods(shopId)"
          >✔</i>
          <span class="product__tab__font">全选</span>
        </div>
        <div class="product__tab__clearcart">
          <span @click="() => cleanCartGoods(shopId)">清空购物车</span>
        </div>
      </div>
      <template
        v-for="item in productList"
        :key="item._id"
      >
        <div
          class="product__item"
          v-if="item.count > 0"
        >
          <div
            :class="{'product__item__icon': true, 'product__item__icon--active': item.isChoose }"
            @click="() => checkedGoods(shopId, item._id)"
          >✔</div>
          <img
            class="product__item__img"
            :src="item.imgUrl"
          />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__orign">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__nums">
            <div
              class="product__nums__minus"
              @click="() => removeGoodsFromCart(shopId, item._id)"
              v-show="item.count"
            >－</div>
            {{item.count || '' }}
            <div
              class="product__nums__plus"
              @click="() => addGoodsToCart(shopId, item._id, item)"
            >＋</div>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div
        class="check__icon"
        @click="showCartGoodsInfo"
      >
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
        >
        <div class="check__icon__tag">{{calculations.totalCount}}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen;{{calculations.totalPrice}}</span>
      </div>
      <div :class="{'check__btn': true, 'check__btn--active': calculations.totalCount > 0 }" >
        <router-link :to="{path: `/orderConfirmation/${shopId}`}" v-if="calculations.totalCount > 0">去结算</router-link>
        <span v-else>去结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'

import { useCommonCartEffect } from '../../effects/cartEffects.js'

const toggleCartEffect = (shopId, calculations) => {
  const cartList = store.state.cartList

  // 标识是否选中, 用作显示隐藏购物车
  const isShowCart = ref(false)

  // 是否全部选中
  const isAllChoose = computed(() => {
    const productList = cartList[shopId].productList || []
    if (productList) {
      for (const i in productList) {
        if (!productList[i].isChoose) { return false }
      }
      return true
    }
    return false
  })

  // 选中或取消单个商品 flag 使用checkedAllGoods用作全选时使用 传入 isAllChoose.value  单选时可不传
  const checkedGoods = (shopId, productId, flag) => {
    store.commit('checkedGoods', { shopId, productId, flag })
  }

  // 选中或取消所有商品
  // isAllChoose 作为标识符 如果isAllChoose 为false  遍历product--> isChoose(false--> true)  为true的不变
  const checkedAllGoods = (shopId) => {
    const flag = isAllChoose.value
    for (const productId in cartList[shopId]?.productList) {
      checkedGoods(shopId, productId, flag)
    }
  }

  // 显示or隐藏购物车信息
  const showCartGoodsInfo = () => {
    isShowCart.value = !calculations.value.totalCount ? isShowCart.value : !isShowCart.value
  }

  // 商品数量 totalGoodsNum 和 isShowCart 同时控制购物车的显示与隐藏  当未选中商品时 点击购物车图标无效
  // 监听 totalGoodsNum 当值为0 时 将isShowCart 的值变为false 这样就不会出现点击+后 直接显示购物车
  watch(calculations, newcalculations => {
    if (newcalculations.totalCount === 0) { isShowCart.value = false }
  })

  // 清空购物车
  const cleanCartGoods = (shopId) => {
    store.commit('cleanCartGoods', { shopId })
  }

  return { isShowCart, isAllChoose, checkedGoods, checkedAllGoods, showCartGoodsInfo, cleanCartGoods }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    // productList, calculations
    const { productList, calculations, addGoodsToCart, removeGoodsFromCart } = useCommonCartEffect(shopId)
    const { isShowCart, checkedGoods, checkedAllGoods, showCartGoodsInfo, cleanCartGoods, isAllChoose } = toggleCartEffect(shopId, calculations)
    return { productList, calculations, shopId, addGoodsToCart, removeGoodsFromCart, isShowCart, checkedGoods, checkedAllGoods, showCartGoodsInfo, cleanCartGoods, isAllChoose }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.cart {
  z-index: 999;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: .35);
  z-index: 3;
}
.product {
  overflow-y: scroll;
  // flex: 1;
  background: #fff;
  &__tab {
    display: flex;
    box-sizing: border-box;
    height: .52rem;
    padding-bottom: .16rem;
    border-bottom: 1px solid #f1f1f1;
    &__allchecked {
      font-size: .14rem;
      color: #333;
    }
    &__icon {
      display: inline-block;
      margin: .16rem .15rem 0 .26rem;
      width: .19rem;
      height: .19rem;
      border-radius: 50%;
      border: 1px solid #ccc;
      color: #ccc;
      text-align: center;
      line-height: .19rem;
      font-size: .13rem;
      box-sizing: border-box;
      &--active {
        border: none;
        background: #0091FF;
        color: #fff
      }
    }
    &__font {
      display: inline-block;
      margin-top: .18rem;
    }
    &__clearcart {
      flex: 1;
      text-align: right;
      font-size: .14rem;
      color: #333;
      margin: .18rem .18rem 0 0;

    }
  }
  &__item {
    position: relative;
    display: flex;
    // height: 0.68rem;
    margin: .08rem .18rem 0 .16rem;
    padding-bottom: .12rem;
    border-bottom: .01rem solid #F1F1F1;
    &__icon {
      margin: .12rem .16rem .1rem .1rem;
      width: .19rem;
      height: .19rem;
      border-radius: 50%;
      border: 1px solid #ccc;
      color: #ccc;
      text-align: center;
      line-height: .19rem;
      font-size: .13rem;
      box-sizing: border-box;
      &--active {
        border: none;
        background: #0091FF;
        color: #fff
      }
    }
    &__img {
      width: .46rem;
      height: .46rem;
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
.check {
  position: relative;
  box-sizing: border-box;
  display: flex;
  // box-shadow: 0 -1px 1px 0 #F1F1F1;
  border-top: .01rem solid #f1f1f1;
  height: .49rem;
  &__icon {
    position: relative;
    &__img {
      padding: .11rem .32rem .12rem .24rem;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      padding: 0 .02rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      border-radius: .1rem;
      transform: scale(50%);
      transform-origin: left center;
      background-color: #E93B3B ;
      top: .03rem;
      left: .4rem;
      color: #fff;
      text-align: center;
    }
  }
  &__info {
    flex: 1;
    height: 0.49rem;
    line-height: .49rem;
    font-size: .12rem;
    color: $font-color;
    &__price {
      font-weight: 600;
      font-size: .16rem;
      color: #E93B3B;
    }
  }
  a {
      text-decoration: none;
    }
  &__btn {
    color: #fff;
    width: 0.98rem;
    height: 0.49rem;
    line-height: 0.49rem;
    background: #ccc;
    text-align: center;
    &--active {
      background: #4FB0F9;
    }
    a {
      color: #fff;
    }
  }
}
</style>
