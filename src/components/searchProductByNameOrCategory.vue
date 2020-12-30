<template>
  <b-form v-if="show">
    <b-form-row class="justify-content-md-center">
      <b-col md="auto">
        <b-form-input
            id="inputProductName"
            v-model="form.productName"
            type="text"
            placeholder="Nazwa produktu"
        ></b-form-input>
      </b-col>
      <b-col md="auto">
        <b-form-select v-model="form.category" :options="categories"></b-form-select>
      </b-col>
      <b-col md="auto">
        <b-button variant="info" type="button" v-on:click="searchProduct()">Szukaj</b-button>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "search-product-by-name-or-category",
  data() {
    return {
      form: {
        productName: "",
        category: null
      },
      categories: [{value: null, text: ""}],
      show: true
    }
  },
  methods: {
    searchProduct: function () {
      this.$root.$emit('searchProduct', this.form);
    }
  },
  mounted() {
    axios
        .get('https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/categories')
        .then(response => {
          response.data.categories.forEach(category => {
            this.categories.push({value: category.id, text: category.name})
          });
        })
        .catch(error => {
          console.log(error)
        });
  }
}
</script>

<style scoped>

</style>