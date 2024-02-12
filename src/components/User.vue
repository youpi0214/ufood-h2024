<template>
  <div>
    <h1>{{ userName }}</h1>
    <div>Rating: 4.5 &star; </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox"
             role="switch" id="flexSwitchCheckDefault"  v-model="isSwitched" >
      <label class="form-check-label" for="flexSwitchCheckDefault">No visits</label>
    </div>
    <div v-if="!isSwitched">
      <RecentlyVisited >
      </RecentlyVisited>
    </div>
    <div v-else   class="container-fluid d-flex justify-content-center align-items-center" style="height: 20rem;">
      <button type="button" class="btn btn-primary">
        <router-link to="/" class="nav-link">Return to Home</router-link>
      </button>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RecentlyVisited from "@/components/RecentlyVisited.vue";


const userName = ref(localStorage.getItem('userName') || '');
const isSwitched = ref(false);

function updateUserNameFromStorage(event) {
  if (event.key === "userName") {
    userName.value = event.newValue;
  }
}

onMounted(() => {
  window.addEventListener("storage", updateUserNameFromStorage);
});

onUnmounted(() => {
  window.removeEventListener("storage", updateUserNameFromStorage);
});
</script>

<style></style>
