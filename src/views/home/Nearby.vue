<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>

  </div>
</template>

<script>
import { reactive } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyEffect = (params) => {
  const nearbyList = reactive([])
  const getNearbyList = async () => {
    try {
      const ret = await get('/shop/hot-list')
      if (ret.errno === 0 && ret.data.length) {
        for (const item of ret.data) {
          nearbyList.push(item)
        }
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  getNearbyList()
  return { nearbyList }
}

export default {
  name: 'NearBy',
  components: { ShopInfo },
  setup () {
    const { nearbyList } = useNearbyEffect()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.nearby {
  &__title {
    padding: 0.16rem 0 0.02rem 0;
    line-height: 0.25rem;
    font-size: 0.18rem;
    font-weight: 400;
    color: $font-color;
  }
  a {
    text-decoration: none;
  }

}
</style>
