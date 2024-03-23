<template>
  <form class="w-50">
    <!-- Name input -->
    <div v-if="registering" class="form-outline mb-4">
      <input type="text" id="nameInput" class="form-control" v-model="name" />
      <label class="form-label" for="nameInput">Name</label>
    </div>

    <!-- Email input -->
    <div class="form-outline mb-4">
      <input
        type="email"
        id="emailInput"
        class="form-control"
        v-model="email"
      />
      <label class="form-label" for="emailInput">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input
        type="password"
        id="passwordInput"
        class="form-control"
        v-model="password"
      />
      <label class="form-label" for="passwordInput">Password</label>
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div v-if="!registering" class="row mb-4">
      <div class="col d-flex justify-content-center">
        <!-- Checkbox -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="rememberMeCheckBox"
            checked
          />
          <label class="form-check-label" for="rememberMeCheckBox">
            Remember me
          </label>
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <button type="button" class="btn btn-primary btn-block mb-4" @click="login">
      Sign in
    </button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>{{ customMessage }}</p>
    </div>
  </form>
</template>
<script>
// import { router } from "src/router/router.js";
//TODO (for Hiba) use this router to programmatically redirect the user to the home page after successful login

export default {
  name: "LoginForm",
  props: {
    registerForm: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    customMessage() {
      return this.registering
        ? "Already have an account? Login"
        : "Not a member? Register";
    },
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      registering: this.registerForm,
    };
  },
  methods: {
    login() {
      if (!this.registering) {
        console.log(
          "Logging in with email: " +
            this.email +
            " and password: " +
            this.password,
        );
        alert(
          "Logging in with email: " +
            this.email +
            " and password: " +
            this.password,
        );
      } else {
        this.registering = false;
      }
    },
    register() {
      if (this.registering) {
        console.log("Registering with name: " + this.name);
      } else {
        this.registering = true;
      }
    },
    logout() {},
  },
};
</script>

<style scoped></style>
