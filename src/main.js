import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router'
import Supply from './pages/stock'
import Shop from './pages/shop'
import ShoppingCart from './pages/shopingCart'
import Orders from './pages/orders'
import OrdersByStatus from './pages/ordersByStatus'
import store from './utils/store'
import App from "@/App";

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Shop },
  { path: '/stock', component: Supply },
  { path: '/cart', component: ShoppingCart },
  { path: '/orders', component: Orders },
  { path: '/orders-by-status', component: OrdersByStatus },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

