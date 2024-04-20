<template>
  <div class="sticky-top">
    <nav
      :class="{ 'resto-nav-transparent': isTransparent, 'resto-nav-solid': !isTransparent }"
      class="resto-nav navbar bg-body-tertiary"
    >
      <div class="container-fluid">
        <!--  Home button logo      -->
        <div id="Logo" style="flex: 1; display: flex; justify-content: left">
          <router-link to="/" class="nav-link logo">
            <a class="navbar-brand">
              <img
                :src="imageSrc"
                alt="Bootstrap"
                width="100%"
                style="object-fit: contain"
                height="60rem"
                @contextmenu.prevent
              />
            </a>
          </router-link>
        </div>

        <!--  Search Bar      -->
        <div v-if="isLoggedIn" id="searchBar" style="flex: 3">
          <form style="display: flex; flex-direction: row" role="search">
            <button
              class="btn btn-danger filter-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i class="bi bi-filter-square-fill"></i>
            </button>

            <UserSearchBar></UserSearchBar>
            <button
              style="outline: none; border: none"
              class="btn btn-outline-light search-btn"
            >
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        <!--  User name and Icon button     -->
        <div
          id="profile"
          style="flex: 1; display: flex; justify-content: right"
        >
          <!--    TODO V-if connected (token exist)      -->
          <div v-if="isLoggedIn" class="user-info">
            <!-- TODO  display User name     -->
            <span class="user-name">{{ displayedName }}</span>
            <button @click="toggleDropdown" class="icon-button">
              <i class="fas fa-user text-white"></i>
            </button>
            <div
              v-show="showDropdown"
              class="dropdown-menu"
              @click="showDropdown = false"
            >
              <router-link :to="`/user/${userId}`" class="dropdown-item"
              >Profile
              </router-link>
              <a class="dropdown-item" @click="logout">Log out</a>
            </div>
          </div>

          <!--    TODO V-else not connected (token does not exist)      -->
          <router-link v-else to="/auth">
            <button class="icon-button">
              <i class="fas fa-user text-white"></i>
            </button>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { router } from "@/router/router";
import { logout as apiLogout } from "@/api/auth.js";
import Cookies from "js-cookie";
import UserSearchBar from "@/components/topBarView/UserSearchBar.vue";

export default {
  name: "TopBar",
  components: { UserSearchBar },
  props: {
    userName: {
      type: String,
      default: Cookies.get("userName"),
    },
    isLoggedIn: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    displayedName() {
      return this.name ? this.name : this.userName;
    },
  },
  methods: {
    setImageSrc() {
      if (window.innerWidth < 768) {
        this.imageSrc = this.imageSmall;
      } else {
        this.imageSrc = this.imageLarge;
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async logout() {
      try {
        await apiLogout();
        this.$emit("user-logout");
        await router.push({ name: "Authentication" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
    handleScroll() {
      const scrollTop = window.scrollY;
      const imageHeight = document.querySelector('.top-image').clientHeight;

      if (scrollTop < imageHeight) {
        this.isTransparent = true;
      } else {
        this.isTransparent = false;
      }
    },
  },
  data() {
    return {
      showDropdown: false,
      name: "",
      imageLarge: require("/src/assets/logo/ufood-white.png"),
      imageSmall: require("/src/assets/logo/ufood-white-mobile.png"),
      imageSrc: '',
      userId: Cookies.get("userId"),
      isTransparent: true,

    };
  },
  mounted() {
    // this helps restore the username when the page is refreshed
    this.setImageSrc();
    window.addEventListener('resize', this.setImageSrc);
    window.addEventListener('scroll', this.handleScroll);
    this.name = Cookies.get("userName");
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setImageSrc);
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    userId() {
      if (this.userId) this.name = Cookies.get("userName");
    },
  },
};
</script>

<style scoped>
.resto-nav {
  transition: background-color 0.3s;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.resto-nav-transparent {
  background-color: transparent !important;
}

.resto-nav-solid {
  background-color: #ff3434 !important; /* Change to your desired solid color */
}

.container-fluid {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  display: flex;
  flex-direction: row;
}

@media (min-width: 601px) {
  .filter-btn {
    display: none;
  }

  .search-btn {
    display: none;
  }
}

@media (max-width: 600px) {
  .search-input {
    display: none;
  }
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
