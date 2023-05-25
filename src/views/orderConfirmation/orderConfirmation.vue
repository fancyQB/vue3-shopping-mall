<template>
  <div class="wrapper">
    <OrderTop />
    <Content :shopId="shopId" />
    <OrderBottom :shopId="shopId" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

import OrderTop from './Top.vue'
import Content from './Content.vue'
import OrderBottom from './Bottom.vue'

export default {
  name: 'OrderConfirmation',
  components: { OrderTop, Content, OrderBottom },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    return { shopId }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
}

</style>
