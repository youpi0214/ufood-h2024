<template>
  <div class="sticky-top">
    <nav
      :class="{
        'resto-nav-transparent': isTransparent,
        'resto-nav-solid': !isTransparent,
      }"
      class="resto-nav navbar bg-body-tertiary"
    >
      <div class="container-fluid">
        <router-link to="/" class="nav-link logo">
          <a class="navbar-brand">
            <img
              :src="require('/src/assets/logo/UFoodLogo.png')"
              alt="Bootstrap"
              width="60rem"
              height="60rem"
            />
          </a>
        </router-link>

        <form class="d-flex w-50 p-3" role="search" @submit.prevent="search">
          <button
            @click="toggleSidebar"
            class="filter-btn btn btn-outline-success"
          >
            <i class="bi bi-filter-square-fill"></i>
          </button>
          <input
            ref="searchInput"
            class="form-control me-2 search-input"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button
            style="outline: none; border: none"
            class="btn btn-outline-success search-btn"
            @click="toggleSearchInput"
          >
            <i class="bi bi-search"></i>
          </button>
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
import AccountPopUp from "@/components/loginView/AccountPopUp.vue";

export default {
  name: "TopBar",
  components: { AccountPopUp },
  data() {
    return {
      toggledShownInput: true
    };
  },
  methods: {
    toggleSearchInput() {
      this.toggledShownInput = !this.toggledShownInput;
      this.$refs.searchInput.style.display = this.toggledShownInput ? "" : "none";
    }
  },
  setup() {
    const userName = ref(localStorage.getItem("userName") || "");
    const showPopup = ref(false);
    const showDropdown = ref(false);
    const showLogoutConfirmation = ref(false);
    const router = useRouter();
    const store = useStore();

    // New data property to track scroll position
    const isTransparent = ref(true);

    const isSidebarOpen = computed(() => store.state.isSidebarOpen);

    const toggleSidebar = () => {
      store.dispatch("changeSideBarState");
    };

    const handleUserUpdate = (newUserName) => {
      userName.value = newUserName;
      localStorage.setItem("userName", newUserName || "");
      showPopup.value = false;
    };

    const confirmLogout = () => {
      showLogoutConfirmation.value = true;
    };

    const logout = () => {
      userName.value = "";
      localStorage.removeItem("userName");
      showLogoutConfirmation.value = false;
      router.push("/");
    };

    const cancelLogout = () => {
      showLogoutConfirmation.value = false;
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const handleResize = () => {
      // Handle window resize
    };

    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    // Event listener for scroll
    const handleScroll = () => {
      isTransparent.value = window.scrollY === 0;
    };

    window.addEventListener("scroll", handleScroll);

    return {
      userName,
      showDropdown,
      showPopup,
      showLogoutConfirmation,
      isSidebarOpen,
      handleUserUpdate,
      confirmLogout,
      logout,
      cancelLogout,
      toggleDropdown,
      toggleSidebar,
      // Expose the isTransparent variable
      isTransparent
    };
  }
};
</script>

<style scoped>
.resto-nav {
  transition: background-color 0.3s;
}

.resto-nav-transparent {
  background-color: transparent !important;
}

.resto-nav-solid {
  background-color: #f8f9fa !important;
}

.resto-nav {
  transition: background-color 0.3s;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.container-fluid {
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

@media (min-width: 600px) {
  .filter-btn {
    display: none;
  }

  .search-btn {
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
  background-color: green;
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
  color: green;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
