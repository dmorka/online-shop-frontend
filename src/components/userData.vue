<template>
  <div class="userdata">
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
          id="username-input-group"
          label="Username"
          label-for="username-input"
      >
        <b-form-input
            id="username-input"
            name="username-input"
            v-model="$v.form.username.$model"
            :state="validateState('username')"
            aria-describedby="username-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="username-feedback"
        >Username cannot be shorter than 3 characters and longer than 30.</b-form-invalid-feedback
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
import EventBus from "@/utils/event-bus";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "vuelidate/lib/validators";

const phoneRegex = helpers.regex("phoneRegex", /^[+]?[(]?[0-9]{2}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im);

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null,
        username: null,
        phoneNumber: null,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      username: {
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
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      alert("Form submitted!");
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

