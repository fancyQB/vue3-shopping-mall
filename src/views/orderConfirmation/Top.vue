<template>
  <div class="top">
    <div class="top__header">
      <div
        class="top__header__back iconfont"
        @click="handleBack"
      >&#xe6db;</div>
      确认订单
    </div>
    <div class="top__reciver">
      <div class="top__reciver__title">收货地址</div>
      <div class="top__reciver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__reciver__info">
        <span class="top__reciver__info__name">瑶妹（先生）</span>
        <span class="top__reciver__info__tel">18911024266</span>
      </div>
      <div class="top__reciver__enter iconfont">&#xe6db;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'OrderTop',
  setup () {
    const router = useRouter()
    const handleBack = () => {
      router.go(-1)
    }
    return { handleBack }
  }

}
</script>

<style lang="scss" scoped>
.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: .26rem;

    line-height: .22rem;
    font-size: .16rem;
    color: #fff;
    text-align: center;
    &__back {
      position: absolute;
      font-size: .22rem;
      left: .18rem;
    }
  }
  &__reciver {
    position: relative;
    margin: .22rem .18rem 0 .18rem;
    height: 1.11rem;
    background: #FFFFFF;
    border-radius: 4px;
    &__title {
      padding: .16rem 0 .14rem .16rem;
      font-size: 16px;
      color: #333333;
      line-height: .22rem;
      font-weight: 600;
    }
    &__address {
      padding: 0 .4rem .06rem .16rem;
      color: #333333;
      font-size: .14rem;
      line-height: .2rem;
    }
    &__info {
      padding-left: .16rem;
      line-height: .17rem;
      font-size: .12rem;
      color: #666666;
      &__name {
        margin-right: .06rem;
      }
    }
    &__enter {
      position: absolute;
      transform: rotate(180deg);
      top: .48rem;
      right: .16rem;
      font-size: .16rem;
    }
  }
}
</style>
