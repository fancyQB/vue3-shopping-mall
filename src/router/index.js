import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/login/Register.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/',
    name: 'Home',
    // 异步加载路由
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    // 异步加载路由
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cart/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    // 异步加载路由
    component: () => import(/* webpackChunkName: "cartList" */ '../views/orderConfirmation/orderConfirmation.vue')
  },
  {
    path: '/order/',
    name: 'Order',
    // 异步加载路由
    component: () => import(/* webpackChunkName: "Order" */ '../views/order/Order.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLoginOrRegister || isLogin) ? next() : next({ name: 'Login' })
})

export default router
