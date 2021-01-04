<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Orders By Status</h2>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <h3>Unfulfilled Orders</h3>
        <Orders status-id='1' hide-action-buttons/>
        <h3>Approved Orders</h3>
        <Orders status-id='2' hide-action-buttons/>
        <h3>Canceled Orders</h3>
        <Orders status-id='3' hide-action-buttons/>
        <h3>Completed Orders</h3>
        <Orders status-id='4' hide-action-buttons/>
      </div>
    </section>
  </b-container>
</template>

<script>
import Navbar from "@/components/navBar";
import Orders from '@/components/orderList'
export default {
  name: "orders",
  components: {Navbar, Orders},
  data() {
    return {
      orderList: null,
      loading: false,
      errored: false,
      unfulfilledOrders: null,
      approvedOrders: null,
      canceledOrders: null,
      completedOrders: null
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>