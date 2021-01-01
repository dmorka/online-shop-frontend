<template>
  <div class="productdata">
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="name-input-group" label="Name" label-for="name-input">
        <b-form-input
          id="name-input"
          name="name-input"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          aria-describedby="name-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="name-feedback"
          >Product name cannot be shorter than 3 characters and longer than
          20.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="description-input-group"
        label="Description"
        label-for="description-input"
      >
        <b-form-textarea
          id="description-input"
          name="description-input"
          rows="3"
          max-rows="3"
          v-model="$v.form.description.$model"
          :state="validateState('description')"
          aria-describedby="description-feedback"
        ></b-form-textarea>

        <b-form-invalid-feedback id="description-feedback"
          >Product description cannot be longer than 300
          characters.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="price-input-group"
        label="Price"
        label-for="price-input"
      >
        <b-form-input
          id="price-input"
          name="price-input"
          v-model="$v.form.price.$model"
          :state="validateState('price')"
          aria-describedby="price-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="price-feedback"
          >Product price must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="weight-input-group"
        label="Weight"
        label-for="weight-input"
      >
        <b-form-input
          id="weight-input"
          name="weight-input"
          v-model="$v.form.weight.$model"
          :state="validateState('weight')"
          aria-describedby="weight-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="weight-feedback"
          >Product weight must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group
        id="category-select-group"
        label="Category"
        label-for="category-select"
      >
        <b-form-select
          id="category-select"
          name="category-input"
          v-model="form.category"
          :options="categories"
          aria-describedby="category-feedback"
        ></b-form-select>

        <b-form-invalid-feedback id="category-feedback"
          >Product weight must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>
      <b-button type="  " variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<style>
body {
  padding: 1rem;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import EventBus from "@/utils/event-bus";
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  decimal,
  minValue,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null,
        price: null,
        weight: null,
        category: null,
      },
      categories: [
        { value: 1, text: "Elektronika" },
        { value: 2, text: "Dom i ogród" },
        { value: 3, text: "Motoryzacja" },
        { value: 4, text: "Zdrowie" },
      ],
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },
      description: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(300),
      },
      price: {
        required,
        decimal,
        minValue: minValue(0.001),
      },
      weight: {
        required,
        decimal,
        minValue: minValue(0.001),
      },
      category: {
        required,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    updateProduct() {
      axios
        .put(
          "https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/products/" +
            this.form.id,
          this.form
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.message);
        })
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.updateProduct();
    },
  },
  mounted() {
    EventBus.$on("UpdateProduct", (product) => {
      console.log(product);
      this.form = product;
    });
  },
};
</script>