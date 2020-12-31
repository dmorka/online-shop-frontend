<template>
  <div class="productdata">
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
        id="productname-input-group"
        label="Name"
        label-for="productname-input"
      >
        <b-form-input
          id="productname-input"
          name="productname-input"
          v-model="$v.form.productname.$model"
          :state="validateState('productname')"
          aria-describedby="productname-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="productname-feedback"
          >Product name cannot be shorter than 3 characters and longer than
          20.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="productdesc-input-group"
        label="Description"
        label-for="productdesc-input"
      >
        <b-form-textarea
          id="productdesc-input"
          name="productdesc-input"
          rows="3"
          max-rows="3"
          v-model="$v.form.productdesc.$model"
          :state="validateState('productdesc')"
          aria-describedby="productdesc-feedback"
        ></b-form-textarea>

        <b-form-invalid-feedback id="productdesc-feedback"
          >Product description cannot be longer than 300
          characters.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="productprice-input-group"
        label="Price"
        label-for="productprice-input"
      >
        <b-form-input
          id="productprice-input"
          name="productprice-input"
          v-model="$v.form.productprice.$model"
          :state="validateState('productprice')"
          aria-describedby="productprice-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="productprice-feedback"
          >Product price must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="productweight-input-group"
        label="Weight"
        label-for="productweight-input"
      >
        <b-form-input
          id="productweight-input"
          name="productweight-input"
          v-model="$v.form.productweight.$model"
          :state="validateState('productweight')"
          aria-describedby="productweight-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="productweight-feedback"
          >Product weight must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group
        id="productcategory-select-group"
        label="Category"
        label-for="productcategory-select"
      >
        <b-form-select
          id="productcategory-select"
          name="productcategory-input"
          v-model="form.productcategory"
          :options="categories"
          aria-describedby="productcategory-feedback"
        ></b-form-select>

        <b-form-invalid-feedback id="productcategory-feedback"
          >Product weight must be positive number.</b-form-invalid-feedback
        >
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button class="ml-2" @click="resetForm()">Reset</b-button>
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
      categories: [
        { value: 1, text: "Elektronika" },
        { value: 2, text: "Dom i ogród" },
        { value: 3, text: "Motoryzacja" },
        { value: 4, text: "Zdrowie" },
      ],
      form: {
        productname: null,
        productdesc: null,
        productprice: null,
        productweight: null,
        productcategory: null,
      },
    };
  },
  validations: {
    form: {
      productname: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },
      productdesc: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(300),
      },
      productprice: {
        required,
        decimal,
        minValue: minValue(0.001),
      },
      productweight: {
        required,
        decimal,
        minValue: minValue(0.001),
      },
      productcategory: {
        required,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        productname: null,
        productdesc: null,
        productprice: null,
        productweight: null,
        productcategory: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      alert("Form submitted!");
    },
  },
};
</script>