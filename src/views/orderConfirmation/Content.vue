<template>
    <div class="products">
      <h4 class="products__title">
        {{ShopName}}
      </h4>
      <div class="products__item__wrpper">

        <div class="products__item__list">
          <template
            v-for="item in productList"
            :key="item._id"
          >
            <div
              class="products__item"
              v-if="item.isChoose"
            >
              <img
                class="products__item__img"
                :src="item.imgUrl"
              />
              <div class="products__item__info">
                <div class="products__item__name">{{item.name}}</div>
                <div class="products__item__price">
                  <span>&yen;</span>{{item.price}} x {{item.count}}
                  <span class="products__item__totalprice">&yen;{{(item.price * item.count).toFixed(2)}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffects.js'
export default {
  name: 'Content',
  props: ['shopId'],
  setup (props) {
    const { calculations, productList, cartList, ShopName } = useCommonCartEffect(props.shopId)
    return { productList, calculations, cartList, ShopName }
  }
}
</script>
<style lang="scss" scoped>
.products {
  margin: 0 .18rem;
  &__title {
    background-color: #fff;
    padding: .16rem 0 .16rem .16rem;
    line-height: .22rem;
    font-size: 16px;
    color: #333333;
  }
  &__item__wrpper {
    overflow-y: scroll;
    // padding-bottom: .2rem;
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
    bottom: .52rem;
    margin: 0 .18rem;
  }
  &__item__list {
    background-color: #fff;
    padding-bottom: .2rem;
  }
  &__item {
    // background-color: #fff;
    display: flex;
    padding: 0 .16rem;
    margin-bottom: .16rem;
    &__img {
      margin-right: .16rem;
      width: 0.46rem;
      height: 0.46rem;
    }
    &__info {
      flex: 1;
    }
    &__name {
        line-height: .2rem;
        font-size: 14px;
        color: #333333;
        margin-bottom: .06rem;
      }
    &__price {
      position: relative;
      font-size: 14px;
      color: #E93B3B;
      line-height: 20px;
      .products__item__totalprice {
        position: absolute;
        right: .2rem;
        color: #000000;
      }
    }
  }
}
</style>
