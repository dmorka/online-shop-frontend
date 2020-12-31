<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Shopping Cart</h2>
    <ProductList :product-list="shoppingCartList" showRemoveButton showNumberOfItemsInput
                @remove-product="removeProductFromCart" />
    <p><b>TOTAL COST:</b> {{ totalCost}}</p>
    <Userdata />
  </b-container>
</template>

<script>
import Navbar from "@/components/navBar";
import Userdata from "@/components/userData";
import ProductList from "@/components/productList";
import {_} from "vue-underscore";
import EventBus from "@/utils/event-bus";
export default {
  name: "shopingCart",
  components: {Navbar, Userdata, ProductList},
  computed: {
    shoppingCartList() {
      return _.map(this.$store.state.shoppingCart, function (num) {
        return num;
      });
    },
    totalCost() {
      let totalCost = 0;
      _.each(this.shoppingCartList, function (product) {
        totalCost += _.get(product, 'quantity', 0) * _.get(product, 'price', 0);
      })
      return totalCost;
    }
  },
  methods: {
    removeProductFromCart: function (product) {
      this.$store.dispatch('removeItemFromCart', product);
      EventBus.$emit("UpdateProductList");
    }
  }
}
</script>

<style scoped>

</style>