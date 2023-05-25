<template>
  <div class="docker">
    <div
      class="docker__item"
      v-for="item in dockerList"
      :key="item.id"
    >
    <router-link :to="item.to">
      <div
        v-html="item.icons"
        :class="{ 'docker__item--active': item.id === currentIndex, 'iconfont': true }"
      ></div>
      <div class="docker__title">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DockerPage',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      {
        id: 1,
        icons: '&#xe759;',
        title: '首页',
        to: { name: 'Home' }
      },
      {
        id: 2,
        icons: '&#xe600;',
        title: '购物车',
        to: { name: 'CartList' }
      },
      {
        id: 3,
        icons: '&#xe605;',
        title: '订单',
        to: { name: 'Order' }
      },
      {
        id: 4,
        icons: '&#xe78b;',
        title: '我的',
        to: { name: 'Home' }
      }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  // background-color: pink;
  border-top: 0.01rem solid #f1f1f1;

  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: #333;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }

  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: top center;
  }
}
</style>
