<template>
  <div>
    <h1>User Profile</h1>
    <div>GLO-3102 User Profile page</div>
    <p>Username: {{ userName }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const userName = ref(localStorage.getItem('userName') || '');
function updateUserNameFromStorage(event) {
  if (event.key === 'userName') {
    userName.value = event.newValue;
  }
}

onMounted(() => {
  window.addEventListener('storage', updateUserNameFromStorage);
});

onUnmounted(() => {
  window.removeEventListener('storage', updateUserNameFromStorage);
});
</script>

<style></style>
