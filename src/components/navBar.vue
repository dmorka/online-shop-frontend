<template>
  <b-navbar style="margin-bottom: 15px" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Online Shop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link class="router-link" to="/orders">Orders</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="router-link" to="/orders-by-status">Orders By Status</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="router-link" to="/stock">Stock</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="router-link" to="/">Shop</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="router-link" to="/cart">Cart</router-link>
        </b-nav-item>
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
  .router-link {
    color:white;
    text-decoration: none;
  }

  .router-link:hover {
    color: #e9e9e9;
  }
</style>