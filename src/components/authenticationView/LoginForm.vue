<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://buildit.ca/wp-content/uploads/2022/02/restaurant-dining-tables-bar.png"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem; height: 100%"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i
                        class="fas fa-cubes fa-2x me-3"
                        style="color: #ff6219"
                      ></i>
                      <span class="h1 fw-bold mb-0">Logo</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      {{ formTitle }}
                    </h5>

                    <div v-if="registering" class="form-floating mb-4">
                      <input
                        type="text"
                        id="floatingName"
                        class="form-control form-control-lg"
                        :class="{ 'is-invalid': invalidName }"
                        placeholder="name"
                        v-model="name"
                        @change="validateName"
                      />
                      <label class="form-label" for="floatingName">Name</label>
                    </div>

                    <div class="form-floating mb-4">
                      <input
                        type="email"
                        id="floatingEmail"
                        class="form-control form-control-lg"
                        :class="{ 'is-invalid': invalidEmail }"
                        placeholder="name@example.com"
                        v-model="email"
                        @change="validateEmail"
                      />
                      <label class="form-label" for="floatingEmail"
                        >Email address</label
                      >
                    </div>

                    <div class="form-floating mb-4">
                      <input
                        type="password"
                        id="floatingPassword"
                        class="form-control form-control-lg"
                        :class="{ 'is-invalid': invalidPassword }"
                        placeholder="Password"
                        v-model="password"
                        @change="validatePassword"
                      />
                      <label class="form-label" for="floatingPassword"
                        >Password</label
                      >
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        v-if="!registering"
                        class="btn btn-danger btn-lg btn-block login-signup-btn"
                        type="button"
                        @click="login"
                      >
                        Login
                      </button>
                      <button
                        v-else
                        class="btn btn-danger btn-lg btn-block login-signup-btn"
                        type="button"
                        @click="register"
                      >
                        Register
                      </button>
                    </div>

                    <p
                      v-if="!registering"
                      class="mb-2 pb-lg-2"
                      style="color: black"
                    >
                      Don't have an account?
                      <a
                        class="form-link"
                        style="color: #ff3434"
                        @click="register"
                        >Register here</a
                      >
                      <br /><br />
                      <a v-if="failedLogin" style="color: #ff3434"
                        >Email and password combination is invalid!</a
                      >
                    </p>
                    <p v-else class="mb-5 pb-lg-2" style="color: black">
                      Already have an account?
                      <a class="form-link" style="color: #ff3434" @click="login"
                        >Login here</a
                      >
                      <br /><br />
                      <a v-if="failedSignup" style="color: #ff3434"
                        >Sign up failed! Please verify the information
                        entered</a
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { router } from "@/router/router";
import { login as apiLogin, signup as apiSignup } from "@/api/auth.js";
import Cookies from "js-cookie";

export default {
  name: "LoginForm",
  props: {
    registerForm: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formTitle() {
      return this.registering
        ? "Create your account"
        : "Sign into your account";
    },
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      registering: this.registerForm,
      failedLogin: false,
      failedSignup: false,
      invalidEmail: false,
      invalidName: false,
      invalidPassword: false,
    };
  },
  methods: {
    setUserInfo(user, token) {
      Cookies.set("userName", user.name, {
        expires: 7,
      });
      Cookies.set("userId", user.id, {
        expires: 7,
      });
      Cookies.set("userEmail", user.email, {
        expires: 7,
      });
      Cookies.set("token", token, {
        expires: 7,
      });
    },
    async login() {
      if (!this.registering) {
        this.validateForm();
        if (this.invalidEmail || this.invalidPassword) {
          return;
        }
        try {
          const result = await apiLogin(this.email, this.password);
          const [token, user] = result;

          this.setUserInfo(user, token);
          this.$emit("user-login", user.name);

          await router.push({ name: "Home" });
        } catch (error) {
          this.failedLogin = true;
        }
      } else {
        this.registering = false;
        this.resetForm();
      }
    },
    async register() {
      if (this.registering) {
        this.validateForm();
        if (this.invalidEmail || this.invalidName || this.invalidPassword) {
          return;
        }
        try {
          const newUser = await apiSignup(this.name, this.email, this.password);
          this.registering = false;
          await router.push({ name: "Authentication" });
        } catch (error) {
          this.failedSignup = true;
        }
      } else {
        this.registering = true;
        this.resetForm();
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.invalidEmail = !emailRegex.test(this.email);
    },
    validateName() {
      this.invalidName = !this.name.trim().length > 0;
    },
    validatePassword() {
      this.invalidPassword = !this.password.trim().length > 0;
    },
    validateForm() {
      this.validateEmail();
      this.validateName();
      this.validatePassword();
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.failedLogin = false;
      this.failedSignup = false;
      this.invalidEmail = false;
      this.invalidName = false;
      this.invalidPassword = false;
    },
  },
};
</script>

<style scoped>
.login-signup-btn {
  background-color: #ff3434;
  border-color: #ff3434;
}

.form-link {
  cursor: pointer;
}
</style>
