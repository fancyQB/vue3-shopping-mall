<template>
  <div class="wrapper">
    <div>cartList--TODO</div>
  </div>
  <DockerPage :currentIndex="2"/>
</template>

<script>
import DockerPage from '@/components/Docker'
export default {
  components: { DockerPage },
  name: 'CartList'
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  // background-color: blue;
  padding: 0 0.18rem 0.01rem 0.18rem;
}
</style>
