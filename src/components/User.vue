<template>
  <div>
    <UserHeader v-model="userName" />
    <!-- START  TODO this will disappear when adding api handling -->
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        v-model="isSwitched"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
      >No visits</label
      >
      <!--      END-->
    </div>
    <div v-if="!isSwitched">
      <RecentlyVisited></RecentlyVisited>
    </div>
    <div
      v-else
      class="container-fluid d-flex justify-content-center align-items-center"
      style="height: 20rem"
    >
      <router-link to="/" class="nav-link">
        <button type="button" class="btn btn-outline-success">Return to Home</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import RecentlyVisited from "@/components/profileView/RecentlyVisited.vue";
import UserHeader from "@/components/profileView/UserHeader.vue";

const userName = ref(localStorage.getItem("userName") || "");
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
