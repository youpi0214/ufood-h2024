<template>
  <nav class="resto-nav navbar bg-body-tertiary sticky-top">
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
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "TopBar",
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
      showDropdown,
      searchQuery,
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
</style>
