<template>
  <div class="placement">
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "@/components/authenticationView/LoginForm.vue";

export default {
  name: "Authentication",
  components: { LoginForm },
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
