<template>
  <div class="shop">
    <img
      class="shop__img"
      :src="item.imgUrl"
    />
    <div :class="{ 'shop__content': true, 'shop__content--active': !isHiden }">
      <div class="shop__content__title">{{item.name}}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales}}+</span>
        <span class="shop__content__tag">起送¥{{ item.expressLimit}}</span>
        <span class="shop__content__tag">基础运费¥{{ item.expressPrice}}</span>
      </div>
      <div class="shop__content__highlight">
        {{ item.slogan }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'isHiden']
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
.shop {
  display: flex;
  padding-top: 0.12rem;
    // border-bottom: 1px solid  #F1F1F1;
  &__img {
    margin-right: 0.16rem;
    height: 0.56rem;
    width: 0.56rem;
  }
  &__content {
    width: 100%;
    padding-bottom: 0.12rem;
    &--active {
      border-bottom: 1px solid #f1f1f1;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $font-color;
    }
    &__tags {
      margin: 0.08rem 0;
      font-size: 0.13rem;
      color: $font-color;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>
