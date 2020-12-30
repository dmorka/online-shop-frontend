<template>
  <b-form class="m-4">
    <b-form-row class="justify-content-center">
      <b-col md="auto">
        <b-form-group
            id="input-group-1"
            label="Product name:"
            label-for="inputProductName"
        >
        <b-form-input
            id="inputProductName"
            v-model="form.productName"
            type="text"
            placeholder="Name"
        ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="auto">
        <b-form-group
            id="input-group-2"
            label="Category: "
            label-for="selectCategory"
        >
        <b-form-select id="selectCategory" v-model="form.category" :options="categories"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="auto" style="padding-top: 30px">
          <b-button id="searchBtn" variant="info" type="button" v-on:click="searchProduct()">Search</b-button>
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