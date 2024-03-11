<template>
  <div class="account-popup">
    <div class="popup-content">
      <div v-if="!isLoggedIn">
        <input type="text" placeholder="Username or Email" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="login">Login</button>
        <p>
          Don't have an account?
          <router-link to="/signup">Sign up</router-link>
        </p>
      </div>
      <div v-else>
        <p>Welcome, {{ username }}!</p>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <span class="close-popup" @click="close">✖</span>
  </div>
</template>

<script>
export default {
  props: ["isLoggedIn"],
  emits: ["update:user", "close"],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$emit("update:user", this.username);
      this.close();
    },
    logout() {
      this.$emit("update:user", null);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.account-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: green;
  color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 350px;
  box-sizing: border-box;
  z-index: 9999; /* Set a high z-index value to bring the popup to the front */
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input[type="text"],
input[type="password"],
button {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
}

input[type="text"],
input[type="password"] {
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
}

button {
  background-color: green;
  color: white;
  font-weight: bold;
  margin-bottom: 0;
}

button:hover {
  background-color: #00332a;
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  background-color: green;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  color: lawngreen;
  text-decoration: none;
}

a:hover {
  color: white;
}

@media (max-width: 600px) {
  .account-popup {
    width: 80%;
    padding: 20px;
    padding-top: 40px;
  }
}
</style>
