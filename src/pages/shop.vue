<template>
  <b-container>
    <Navbar/>
    <h2 class="display-4 text-center">Shop</h2>
    <SearchProductByNameOrCategory/>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ProductList :product-list="filteredProductList" show-add-to-cart-button />
      </div>
    </section>
  </b-container>
</template>

<script>
import SearchProductByNameOrCategory from "@/components/searchProductByNameOrCategory";
import Navbar from "@/components/navBar";
import ProductList from "@/components/productList";
import axios from "axios";
import EventBus from "@/utils/event-bus";
import {_} from "vue-underscore";

export default {
  name: "shop",
  components: {ProductList, Navbar, SearchProductByNameOrCategory},
  data() {
    return {
      productList: null,
      loading: true,
      errored: false,
      filteredProductList: null,
    }
  },
  methods: {
    normalizeString: function (text) {
      return (_.isString(text)) ? text.toLowerCase().replace(/\s+/g, '') : text
    },
    filterProducts: function (form) {
      if (form) {
        let self = this;
        return _.filter(this.productList, function (product) {
          if (form.productName !== "" && !(self.normalizeString(product.name)).includes(self.normalizeString(form.productName))) {
            return false;
          }
          return !(form.category !== null && form.category !== product.category);
        });
      } else {
        return [];
      }
    },
    emitUpdateProductList: () => {
      EventBus.$emit("UpdateProductList");
    }
  },
  mounted() {
    axios
        .get(process.env.VUE_APP_API_URL+'/products',
            {headers: {'x-api-key': process.env.VUE_APP_API_KEY}})
        .then(response => {
          this.productList = response.data.products;
          this.filteredProductList = this.productList;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    EventBus.$on("FilterProduct", (form) => {
      this.filteredProductList = this.filterProducts(form);
      this.emitUpdateProductList();
    });
  }
}
</script>

<style scoped>

</style>