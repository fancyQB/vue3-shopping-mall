<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <DockerPage :currentIndex="1"/>
</template>

<script>
import StaticPart from './StaticPart'
import NearBy from './Nearby'
import DockerPage from '../../components/Docker.vue'
export default {
  name: 'HomePage',
  components: { StaticPart, NearBy, DockerPage }
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
