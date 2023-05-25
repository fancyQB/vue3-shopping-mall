import { createStore } from 'vuex'

// 购物车信息 持久化存储在 localStorage
const setLocalStorage = state => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

// 获取 localStorage 的存储信息
const getLoaclStorage = () => {
  return localStorage?.cartList ? JSON.parse(localStorage?.cartList) : {}
}

export default createStore({
  state: {
    // cartList: {
    // shopID: {
    //   shopName: '沃尔玛',
    //   productList : {
    //     productId: {
    //       name: '车厘子'
    //       price: xx,
    //       oldPrice: xxx,
    //       imgUrl:'xxxx.png'
    //     }
    //   }
    // }
    //
    cartList: getLoaclStorage()
  },
  getters: {
  },
  mutations: {
    // 添加商品到购物车  数据添加->store
    addGoodsToCart (state, payload) {
      const { shopId, productId, goodInfo } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let productInfo = shopInfo.productList[productId]
      if (!productInfo) {
        productInfo = goodInfo
        productInfo.count = 0
        productInfo.isChoose = false
      }
      productInfo.count += 1
      productInfo.isChoose = true
      shopInfo.productList[productId] = productInfo
      state.cartList[shopId] = shopInfo
      console.log(state.cartList)
      setLocalStorage(state)
    },
    // 删除购物车里的商品
    removeGoodsFromCart (state, payload) {
      const { shopId, productId } = payload
      const productInfo = state.cartList[shopId].productList[productId]
      productInfo.count--
      if (productInfo.count === 0) productInfo.isChoose = false
      if (productInfo.count < 0) productInfo.count = 0
      setLocalStorage(state)
    },

    // 修改商店名
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },

    // 选中 或 取消选中商品 flag 为全选时使用
    checkedGoods (state, payload) {
      const { shopId, productId, flag } = payload
      const productInfo = state.cartList[shopId]?.productList[productId]
      if (flag !== undefined) {
        if (productInfo.isChoose === flag) {
          productInfo.isChoose = !productInfo.isChoose
        }
      } else {
        productInfo.isChoose = !productInfo.isChoose
      }
      setLocalStorage(state)
    },

    // 清空 购物车 将store 下的 shopId 下的数据删除
    cleanCartGoods (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalStorage(state)
    },

    // 从购物车中删除已经结算的商品
    removeCheackedGoods (state, payload) {
      console.log('removeHadCheackedGoods')
      const { products, shopId } = payload
      console.log(products)
      const productList = state.cartList[shopId].productList
      for (const product of products) {
        // Object 对象上调用其方法，利用 call 改变其 this 指向到我们的目标对象上，即可安全使用 hasOwnProperty 方法了。
        // 直接调用 obj.hasOwnProperty('key') 报错 Do not access Object.prototype method 'hasOwnProperty' from target object. eslint(no-prototype-builtins)
        if (Object.prototype.hasOwnProperty.call(productList, product.id)) {
          delete productList[product.id]
        }
      }
      state.cartList[shopId].productList = productList
      setLocalStorage(state)
    }
  }
})
