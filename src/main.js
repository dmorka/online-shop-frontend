import Vue from 'vue'
import './plugins/bootstrap-vue'
// import App from './App.vue'
import VueRouter from 'vue-router'
import Supply from './pages/stock'
import Shop from './pages/shop'
import ShoppingCart from './pages/shopingCart'
import Orders from './pages/orders'

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
//   router,
//   template: `
//     <div id="app">
//       <h1>Route Alias</h1>
//       <ul>
//         <li><router-link to="/shop">
//           /root-alias (renders /root)
//         </router-link></li>
//         <li><router-link to="/shopping-cart">
//           /foo (renders /home/foo)
//         </router-link></li>
//       <router-view class="view"></router-view>
//     </div>
//   `
// }).$mount('#app')
