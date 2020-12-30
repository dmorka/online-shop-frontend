<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Shop</h2>
    <SearchProductByNameOrCategory/>
    <ProductList/>
  </b-container>
</template>

<script>
import SearchProductByNameOrCategory from "@/components/searchProductByNameOrCategory";
import Navbar from "@/components/navBar";
import ProductList from "@/components/productList";

export default {
  name: "shop",
  components: {ProductList, Navbar, SearchProductByNameOrCategory},
}
</script>

<style scoped>

</style>