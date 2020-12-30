<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Orders</h2>
    <button
        type="button"
        class="btn"
        @click="showModal"
    >
      Open Modal!
    </button>

    <modal
        v-show="isModalVisible"
        @close="closeModal"
    />
  </b-container>
</template>

<script>
import Navbar from "@/components/navBar";
import modal from "@/components/modal";
export default {
  name: "orders",
  components: {
    Navbar,
    modal,
  },
  data () {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
}
</script>

<style scoped>

</style>