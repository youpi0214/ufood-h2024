<template>
  <div>
    <UserHeader :user-name="userName" />
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
        <button type="button" class="btn btn-outline-success">
          Return to Home
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/profileView/UserHeader.vue";
import RecentlyVisited from "@/components/profileView/RecentlyVisited.vue";

export default {
  components: {
    RecentlyVisited,
    UserHeader
  },
  data() {
    return {
      userName: localStorage.getItem("userName") || "",
      isSwitched: false
    };
  },
  mounted() {
    window.addEventListener("storage", this.updateUserNameFromStorage);
  },
  unmounted() {
    window.removeEventListener("storage", this.updateUserNameFromStorage);
  },
  methods: {
    updateUserNameFromStorage(event) {
      if (event.key === "userName") {
        this.userName = event.newValue;
      }
    }
  }
};
</script>

<style></style>
