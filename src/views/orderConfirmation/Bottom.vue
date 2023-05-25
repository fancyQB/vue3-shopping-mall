<template>
  <div class="order">
    <div class="order__price">实付金额 <span>&yen;{{calculations.totalPrice}}</span>
    </div>
    <div class="order__submit" @click="handleSubmitOrder">提交订单</div>
  </div>
  <div class="mask" v-if="isShowMask" @click="cancleMaskShow">
    <div class="confirmorder" @click.stop>
      <h4 class="confirmorder__title">确认要离开收银台?</h4>
      <div class="confirmorder__tips">请尽快完成支付，否则将被取消</div>
      <div class="confirmorder__btn">
        <div class="confirmorder__btn__common" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="confirmorder__btn__common confirmorder__btn__confirm" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useCommonCartEffect } from '../../effects/cartEffects.js'
import { post } from '../../utils/request'

export default {
  name: 'OrderBottom',
  props: ['shopId'],
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const isShowMask = ref(false)
    console.log(props)
    const { calculations, productList, ShopName } = useCommonCartEffect(props.shopId)
    const handleSubmitOrder = () => {
      isShowMask.value = true
    }
    const handleConfirmOrder = async (isCancel) => {
      const orderList = {}
      orderList.address = '北京理工大学国防科技园2号楼10层'
      orderList.ShopName = ShopName.value
      orderList.isCancel = isCancel
      orderList.products = []
      for (const key in productList.value) {
        console.log(productList.value[key])
        if (productList.value[key].isChoose && (productList.value[key].count)) {
          orderList.products.push({ id: productList.value[key]._id, num: productList.value[key].count })
        }
      }
      console.log(orderList)
      try {
        const response = await post('/order', orderList)
        if (response.errno === 0) {
          // 删除结算的商品
          if (!orderList.isCancel) {
            store.commit('removeCheackedGoods', { products: orderList.products, shopId: props.shopId })
          }
          router.push({ name: 'Order' })
        }
      } catch {
        // todo
      }
    }
    const cancleMaskShow = () => {
      isShowMask.value = false
    }
    return { calculations, isShowMask, handleSubmitOrder, cancleMaskShow, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  background: #fff;
  &__price {
    flex: 1;
    margin: .14rem 0 .15rem .24rem;
    font-size: 14px;
    color: #333333;
    line-height: .2rem;
    span {
      font-size: .16rem;
      line-height: 22px;
    }
  }
  &__submit {
    width: .96rem;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    line-height: .5rem;
    background: #4FB0F9;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .35);
  .confirmorder {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.01rem;
    height: 1.57rem;
    background-color: #fff;
    &__title {
      padding: .24rem .69rem .08rem .7rem;
      line-height: .25rem;
      font-size: 18px;
      color: #333;

      text-align: center;
    }
    &__tips {
      font-size: 14px;
      color: #666666;
      text-align: center;
    }
    &__btn {
      margin: .24rem .58rem 0 .59rem;
      display: flex;
      justify-content: space-between;
      &__common {
        box-sizing: border-box;
        width: 0.8rem;
        height: 0.32rem;
        border: .01rem solid #4FB0F9;
        border-radius: 16px;
        text-align: center;
        font-size: 14px;
        color: #0091FF;
        line-height: .3rem;
      }
      &__confirm {
        color: #fff;
        background: #4FB0F9;
      }
    }
  }
}
</style>
