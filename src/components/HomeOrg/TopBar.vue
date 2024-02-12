<template>
  <div class="sticky-top">
    <nav class="resto-nav navbar bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="nav-link logo">
          <a class="navbar-brand">
            <img
              :src="require('/src/images/UFoodLogo.png')"
              alt="Bootstrap"
              width="60rem"
              height="60rem"
            />
          </a>
        </router-link>

        <form class="d-flex w-50 p-3" role="search">
          <button
            @click="toggleSidebar"
            class="filter-btn btn btn-outline-success"
          >
            <i class="bi bi-filter-square-fill"></i>
          </button>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div v-if="userName" class="user-info">
          <span class="user-name">{{ userName }}</span>
          <button @click="toggleDropdown" class="icon-button">
            <i class="fas fa-user"></i>
          </button>
          <div
            v-show="showDropdown"
            class="dropdown-menu"
            @click="showDropdown = false"
          >
            <router-link to="/user" class="dropdown-item">Profile</router-link>
            <a @click.prevent="confirmLogout" class="dropdown-item">Log out</a>
          </div>
        </div>
        <button v-else @click="showPopup = true" class="icon-button">
          <i class="fas fa-user"></i>
        </button>
      </div>
    </nav>
    <AccountPopUp
      v-if="showPopup"
      @update:user="handleUserUpdate"
      @close="showPopup = false"
    />
    <div v-if="showLogoutConfirmation" class="logout-confirmation">
      <p>Are you sure you want to log out?</p>
      <button @click="logout">Yes</button>
      <button @click="cancelLogout">No</button>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AccountPopUp from "@/components/NavigationOrg/AccountPopUp.vue";
export default {
  name: "TopBar",
  components: { AccountPopUp },
  data() {
    return {
      // Your existing data properties
      selectedPrice: "All",
      selectedCategory: "All",
      isFilterOpen: false,
    };
  },
  setup() {
    const userName = ref(localStorage.getItem("userName") || "");
    const showPopup = ref(false);
    const showDropdown = ref(false);
    const showLogoutConfirmation = ref(false);
    const searchQuery = ref("");
    const router = useRouter();
    const isMobile = ref(window.innerWidth <= 600);
    const isMobileLayout = ref(false);
    const store = useStore();

    // Create a computed property to observe changes to the boolean value
    const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    // Method to toggle the boolean value
    const toggleSidebar = () => {
      store.dispatch("changeSideBarState");
    };

    function handleUserUpdate(newUserName) {
      userName.value = newUserName;
      localStorage.setItem("userName", newUserName || "");
      showPopup.value = false;
    }

    function confirmLogout() {
      showLogoutConfirmation.value = true;
    }

    function logout() {
      userName.value = "";
      localStorage.removeItem("userName");
      showLogoutConfirmation.value = false;
      router.push("/");
    }

    function cancelLogout() {
      showLogoutConfirmation.value = false;
    }

    function search() {
      console.log(`Searching for: ${searchQuery.value}`);
    }

    function toggleDropdown() {
      showDropdown.value = !showDropdown.value;
    }

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 600;
      isMobileLayout.value = window.innerWidth <= 768;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    onUnmounted(() => cleanup());

    return {
      userName,
      showDropdown,
      showPopup,
      searchQuery,
      showLogoutConfirmation,
      isSidebarOpen,
      handleUserUpdate,
      confirmLogout,
      logout,
      cancelLogout,
      search,
      toggleDropdown,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
.resto-nav {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
}

@media (min-width: 600px) {
  .filter-btn {
    display: none;
  }
}

.logout-confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logout-confirmation button {
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.logout-confirmation button:first-child {
  background-color: #00897b;
  color: white;
}

.logout-confirmation button:last-child {
  background-color: #ccc;
  color: #333;
}
.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button i {
  color: #28a644;
  font-size: 24px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.user-name {
  color: #28a644;
  font-weight: bold;
  margin-right: 10px;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 10px;
  color: #005a4c;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
