<template>
  <div class="userdata">
    <b-form ref="orderForm" @submit.stop.prevent="onSubmit">
      <b-form-group
        id="userName-input-group"
        label="Username"
        label-for="userName-input"
      >
        <b-form-input
          id="userName-input"
          name="userName-input"
          v-model="$v.form.userName.$model"
          :state="validateState('userName')"
          aria-describedby="userName-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="userName-feedback"
          >Username cannot be shorter than 3 characters and longer than
          30.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="email-input-group"
        label="Email"
        label-for="email-input"
      >
        <b-form-input
          id="email-input"
          name="email-input"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          aria-describedby="email-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="email-feedback"
          >Invalid email format.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="phoneNumber-input-group"
        label="Phone number"
        label-for="phoneNumber-input"
      >
        <b-form-input
          id="phoneNumber-input"
          name="phoneNumber-input"
          v-model="$v.form.phoneNumber.$model"
          :state="validateState('phoneNumber')"
          aria-describedby="phoneNumber-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="phoneNumber-feedback"
          >Invalid phone number format.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-button type="submit" variant="primary">Order</b-button>
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
import { _ } from "vue-underscore";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "vuelidate/lib/validators";

const phoneRegex = helpers.regex(
  "phoneRegex",
  /^[+]?[(]?[0-9]{2}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
);

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null,
        userName: null,
        phoneNumber: null,
        value: 0,
        products: null,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      userName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      phoneNumber: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
        phoneRegex,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    computeCost() {
      let total = 0;
      _.each(this.$store.getters.getShoppingCart, function (product) {
        total += _.get(product, "quantity", 0) * _.get(product, "price", 0);
      });
      return total.toFixed(2);
    },
    addOrder() {
      if (this.$store.getters.getShoppingCart.length === 0) {
        alert("You cannot place an order with an empty cart!")
        return;
      }

      this.form.products = _.map(
          this.$store.getters.getShoppingCart,
        function (prod) {
          return {
            productId: prod.id,
            quantity: prod.quantity,
          };
        }
      );
      this.form.value = this.computeCost();
      axios
        .post(
          "https://9nxyebc8af.execute-api.eu-central-1.amazonaws.com/dev/orders",
          this.form
        )
        .then((response) => {
          alert(response.data.message);
          this.$store.dispatch('clearShoppingCart');
          EventBus.$emit("UpdateProductList");
          this.$refs.orderForm.reset();
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addOrder();
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

