<template>
  <div class="placement">
    <LoginForm @user-login="handleLogin" />
  </div>
</template>
<script>
import LoginForm from "@/components/form/LoginForm.vue";

export default {
  name: "Authentication",
  components: { LoginForm },
  methods: {
    handleLogin(userName) {
      this.$emit("user-login", userName);
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
