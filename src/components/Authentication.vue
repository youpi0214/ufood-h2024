<template>
  <div class="placement">
    <LoginForm @userLogin="handleLogin" />
  </div>
</template>
<script>
import LoginForm from "@/components/authenticationView/LoginForm.vue";

export default {
  name: "Authentication",
  components: { LoginForm },
  methods: {
    handleLogin(userName, isLoggedIn) {
      this.$emit("user-login", userName, isLoggedIn);
    },
  },
};
</script>
<style scoped>
.placement {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
