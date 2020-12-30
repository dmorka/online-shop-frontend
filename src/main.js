import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router'
import Supply from './pages/stock'
import Shop from './pages/shop'
import ShoppingCart from './pages/shopingCart'
import Orders from './pages/orders'
// import App from "@/App";

Vue.use(VueRouter)

const routes = {
  '/': Shop,
  '/stock': Supply,
  '/cart': ShoppingCart,
  '/orders': Orders
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  render (h) { return h(this.ViewComponent) }
})

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
