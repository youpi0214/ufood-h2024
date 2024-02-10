<template>
  <div class="container">
    <nav class="navigation">
      <!-- Logo -->
      <router-link to="/" class="nav-link logo">
        <img
          :src="require('/src/images/UFoodLogo.png')"
          alt="Logo"
          class="logo-image"
        />
      </router-link>

      <!-- Search Bar -->
      <div class="search-bar">
        <!-- Search Input -->
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          class="search-input"
        />
        <!-- Search Button -->
        <button @click="search" class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Filter Button -->
      <button @click="toggleSidebar" class="filter-button">
        <i class="bi bi-filter-square-fill"></i>
      </button>
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
      <button v-else @click="showPopup = true" class="account-button">
        <i class="fas fa-user"></i>
      </button>
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
    <SideBar class="sidebar"
      :isSidebarOpen="isSidebarOpen"
      :selectedPrice="selectedPrice"
      :selectedCategory="selectedCategory"
      @apply-filters="applyFilters"
      @reset-filters="resetFilters"
    />
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import AccountPopUp from "./AccountPopUp.vue";
import SideBar from "@/components/HomeOrg/SideBar.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AccountPopUp,
    SideBar,
  },
  data() {
    return {
      // Your existing data properties
      selectedPrice: "All",
      selectedCategory: "All",
    };
  },
  setup() {
    const userName = ref(localStorage.getItem("userName") || "");
    const showPopup = ref(false);
    const showDropdown = ref(false);
    const showLogoutConfirmation = ref(false);
    const searchQuery = ref("");
    const router = useRouter();
    const isSidebarOpen = ref(false);
    const isMobile = ref(window.innerWidth <= 600);
    const isMobileLayout = ref(false);

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

    function toggleSidebar() {
      isSidebarOpen.value = !isSidebarOpen.value;
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
      showPopup,
      showDropdown,
      showLogoutConfirmation,
      searchQuery,
      isSidebarOpen,
      isMobile,
      isMobileLayout,
      handleUserUpdate,
      confirmLogout,
      logout,
      cancelLogout,
      search,
      toggleDropdown,
      toggleSidebar,
    };
  },
  computed: {
    ...mapState(["selectedFilters"]), // Map Vuex state to local computed properties
  },
  methods: {
    ...mapActions(['setSelectedFilters']),
    applyFilters(price, category) {
      this.setSelectedFilters({ price, category });
    },
    resetFilters() {
      this.setSelectedFilters({ price: 'All', category: 'All' });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 80px 20px 20px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    180deg,
    #006d5b,
    #005a4c
  ); /* Gradient background */
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px #666;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 15px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #a7ffeb;
  text-decoration: none;
}

.search-bar {
  display: flex;
  flex-grow: 1;
  margin: 0 20px;
}

.search-input {
  flex-grow: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  margin-right: -40px; /* To overlap the search button */
}

.search-button {
  background-color: #00897b;
  border: none;
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button i {
  color: #ffffff;
  font-size: 16px;
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
  color: #ffffff;
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
  color: #ffffff;
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

.user-info:hover .dropdown-menu {
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

.sidebar {
  width: 250px;
  transition: width 0.3s ease-in-out;
  z-index: 9999;
  height: 70%;
  margin-left: 0;
  margin-top: 230px;
}

@media (min-width: 601px) {
  .filter-button {
    display: none;
  }
}

/* Media query for smaller mobile devices */
@media (max-width: 600px) {
  .navigation {
    flex-direction: column;
  }

  .search-bar {
    margin-top: 10px;
  }
  .account-button {
    margin: 10px;
  }
  .filter-button {
    display: block;
    margin-top: 10px;
    background-color: #f8f9fa; /* Light gray */
    color: #212529; /* Dark gray */
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
}
.logo {
  padding: 0;
  display: flex;
  align-items: center;
}

.logo-image {
  height: 60px; /* Adjust the height as needed */
  width: auto; /* Automatically adjust the width to maintain aspect ratio */
}

@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    padding: 10px;
  }

  .nav-link,
  .account-button {
    width: 100%;
    text-align: center;
  }

  .search-bar {
    margin-top: 10px;
  }
  .account-button {
    margin: 10px;
  }
  .filter-button {
    display: block;
    margin-top: 10px;
    background-color: #f8f9fa; /* Light gray */
    color: #212529; /* Dark gray */
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    order: -1;
    margin-bottom: 10px;
  }

  .search-input,
  .search-button {
    width: 100%;
    margin: 0;
  }

  .user-name {
    display: block;
  }
}
</style>
