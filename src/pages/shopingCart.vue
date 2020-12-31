<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Shopping Cart</h2>
    <ProductList :product-list="shoppingCartList" showRemoveButton showNumberOfItemsInput
                @remove-product="removeProductFromCart" />
    <Userdata/>
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