<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Orders</h2>
        <Orders status-id="1"/>
  </b-container>
</template>

<script>
import Navbar from "@/components/navBar";
import Orders from '@/components/orderList'
import axios from 'axios';
export default {
  name: "orders",
  components: {Navbar, Orders},
  data() {
    return {
      orderList: null,
      loading: false,
    }
  },
  mounted() {
    axios
        .get('https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/orders/status/1')
        .then(response => {
          this.orderList = response.data.orders;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  }
}
</script>

<style scoped>

</style>