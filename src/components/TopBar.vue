<template>
  <div class="sticky-top">
    <nav
      class="resto-nav-transparent resto-nav-solid resto-nav navbar bg-body-tertiary"
    >
      <div class="container-fluid">
        <!--  Home button logo      -->
        <div id="Logo" style="flex: 1; display: flex; justify-content: left">
          <router-link to="/" class="nav-link logo">
            <a class="navbar-brand">
              <img
                :src="getImage()"
                alt="Bootstrap"
                width="100%"
                style="object-fit: contain"
                height="60rem"
              />
            </a>
          </router-link>
        </div>

        <!--  Search Bar      -->
        <div id="searchBar" style="flex: 3">
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

            <input
              ref="searchInput"
              class="form-control me-2 search-input"
              style="border-radius: 1rem; outline-color: white"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
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
          <div class="user-info">
            <!-- TODO  display User name     -->
            <span class="user-name"></span>
            <button @click="toggleDropdown" class="icon-button">
              <i class="fas fa-user text-white"></i>
            </button>
            <div
              v-show="showDropdown"
              class="dropdown-menu"
              @click="showDropdown = false"
            >
              <router-link to="/user" class="dropdown-item"
              >Profile
              </router-link>
              <a class="dropdown-item" @click="logout">Log out</a>
            </div>
          </div>

          <!--    TODO V-else not connected (token does not exist)      -->
          <router-link to="/auth">
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
import { store } from "./store.js";
import { router } from "@/router/router";

export default {
  name: "TopBar",
  computed: {
    isSidebarOpen() {
      return store.state.isSidebarOpen;
    }
  },
  data() {
    return {
      imageSource: "/src/assets/logo/ufood-white-mobile.png",
      showDropdown: false
    };
  },
  methods: {
    getImage() {
      //  TODO call this method in a `watch` everytime the screen size changes, this way it will actively update the logo button
      if (window.innerWidth < 800) {
        return require("/src/assets/logo/ufood-white-mobile.png");
      } else {
        return require("/src/assets/logo/ufood-white.png");
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      //TODO (for Hiba) add the logout logic here
      router.push("/auth");
    }
  }
};
</script>

<style scoped>
.resto-nav {
  transition: background-color 0.3s;
}

.resto-nav-transparent {
  background-color: #ff3434 !important;
}

.resto-nav-solid {
  background-color: #ff3434 !important;
}

.resto-nav {
  transition: background-color 0.3s;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
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
