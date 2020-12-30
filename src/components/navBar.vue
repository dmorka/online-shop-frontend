<template>
  <b-navbar toggleable="lg" type="dark" variant="info" style="margin-bottom: 15px">
    <b-navbar-brand href="#">Online Shop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>


      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item href="orders">Orders</b-nav-item>
          <b-nav-item href="stock">Stock</b-nav-item>
          <b-nav-item href="/">Shop</b-nav-item>
          <b-nav-item href="cart" >Cart</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>

</style>