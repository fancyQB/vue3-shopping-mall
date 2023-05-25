import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  // 添加商品至购物车
  const addGoodsToCart = (shopId, productId, goodInfo) => {
    store.commit('addGoodsToCart', { shopId, productId, goodInfo })
  }
  // 从购物车删除商品
  const removeGoodsFromCart = (shopId, productId) => {
    store.commit('removeGoodsFromCart', { shopId, productId })
  }
  // 商品列表信息
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  // 商店名
  const ShopName = computed(() => {
    return cartList[shopId]?.shopName
  })
  // 购物车常用计算属性totalCount, totalPrice
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { totalPrice: 0, totalCount: 0 }
    if (productList) {
      for (const i in productList) {
        if (productList[i].isChoose) {
          result.totalPrice += productList[i].price * productList[i].count
        }
        result.totalCount += productList[i].count
      }
      result.totalPrice = parseFloat(result.totalPrice).toFixed(2)
    }
    return result
  })
  return { cartList, addGoodsToCart, removeGoodsFromCart, productList, calculations, ShopName }
}
