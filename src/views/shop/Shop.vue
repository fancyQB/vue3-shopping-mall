<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe6db;</div>
      <div class="search__content">
        <div
          class="search__content__icon iconfont"
        >&#xe65c;</div>
        <input
          class="search__content__input"
          type="text"
          placeholder="请输入商品名称搜索"
        >
      </div>
    </div>
    <ShopInfo
      :item="item"
      :isHiden="1"
      v-show="item.imgUrl"
    />
  </div>
  <Content :shopName="item.name"/>
  <Cart />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { get } from '../../utils/request'

const useDataEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getData = async () => {
    try {
      const ret = await get(`/shop/${route.params.id}`)
      if (ret?.errno === 0 && ret?.data) {
        data.item = ret.data
        if (route.params.id === '2') {
          data.item.name = '山姆超市'
        }
      }
    } catch (e) {
      // todo
    }
  }
  getData()
  const { item } = toRefs(data)
  return item
}

const useBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const item = useDataEffect()
    const handleBack = useBackEffect()

    return { item, handleBack }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 .18rem;
}
.search {
  margin-top: .16rem;
  margin-bottom: .04rem;
  display: flex;
  color: #B6B6B6;
  &__back {
    height: .32rem;
    width: .28rem;
    line-height: .32rem;
    font-size: .22rem;
  }
  &__content {
    flex: 1;
    display: flex;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon {
      padding: .07rem .12rem .09rem .16rem;
      width: .16rem;
      height: .16rem;
    }
    &__input {
      flex: 1;
      padding-right: .2rem;
      background: none;
      border: none;
      outline: none;
      line-height: .32rem;
      color: #333333;
      &::placeholder {
        font-size: .14rem;
        color: #333333;
      }
    }
  }

}
</style>
