<template>
  <b-container>
    <Navbar />
    <h2 class="display-4 text-center">Stock</h2>
    <b-row>
      <b-col class="text-center">
        <b-button @click="showAddNewProductDialog" variant="info" class="mt-3">Add new Product</b-button>
      </b-col>
    </b-row>
    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ProductList :product-list="productList" showEditButton />
      </div>
    </section>
    <b-modal ref="bv-modal-example" title="Add new product" hide-footer>
      <ProductData :clicked="addNewProduct"/>
    </b-modal>
  </b-container>
</template>

<script>
import Navbar from "@/components/navBar";
import ProductList from "@/components/productList";
import ProductData from "@/components/productData";
import axios from "axios";

export default {
  name: "shop",
  components: { ProductList, Navbar, ProductData },
  data() {
    return {
      productList: null,
      loading: true,
      errored: false
    };
  },
  methods: {
    showAddNewProductDialog: function () {
      this.$refs["bv-modal-example"].show();
    },
    addNewProduct: function (form) {
      axios
          .post(
              process.env.VUE_APP_API_URL+"/products",
              form,
              {headers: {'x-api-key': process.env.VUE_APP_API_KEY}}
          )
          .then((response) => {
            alert(response.data.message);
            this.productList.push(form);
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
    }
  },
  mounted() {
    console.log("apikey");
    console.log(process.env.VUE_APP_API_KEY);
    axios
      .get(
        process.env.VUE_APP_API_URL+"/products",
          {headers: {'x-api-key': process.env.VUE_APP_API_KEY}}
      )
      .then((response) => {
        this.productList = response.data.products;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style scoped>
</style>