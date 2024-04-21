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
        <!-- Home button logo -->
        <div
          v-if="!searchClicked"
          id="Logo"
          style="flex: 1; display: flex; justify-content: left"
        >
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

        <!-- Search Bar -->
        <div
          class="flex-lg-row justify-content-center position-relative w-50"
          v-if="isLoggedIn"
          :class="searchClicked ? 'w-100' : 'w-50'"
          id="searchBar"
        >
          <form
            class="justify-content-center position-relative"
            style="display: flex; flex-direction: row"
            role="search"
          >
            <button
              v-if="!searchClicked && isDisplayed"
              class="btn btn-danger filter-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i class="bi bi-filter-square-fill"></i>
            </button>

            <UserSearchBar
              ref="userSearchBarComponent"
              v-if="(searchClicked && isSmallScreen) || !isSmallScreen"
              :class="searchClicked && isSmallScreen ? 'w-100' : 'w-50'"
            ></UserSearchBar>
            <button
              v-if="isSmallScreen"
              style="outline: none; border: none"
              :style="!searchClicked ? '' : 'height: 100%; margin-top: 1rem;'"
              class="btn btn-outline-light search-btn"
              @click="changeSearchClickedSate"
            >
              <i v-if="!searchClicked" class="bi bi-search"></i>
              <i v-else class="bi bi-x-square"></i>
            </button>
          </form>
        </div>

        <!-- User name and Icon button -->
        <div
          v-if="!searchClicked"
          id="profile"
          style="flex: 1; display: flex; justify-content: right"
        >
          <!-- Your user info content here -->
          <div
            v-if="isLoggedIn"
            class="dropdown-center"
            :class="isSmallScreen ? 'ps-3' : ''"
          >
            <button
              class="dropdown-toggle profileButton"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="user-name pe-2">{{ displayedName }}</span>
              <i class="fas fa-user text-white"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <router-link
                  :to="`/user/${userId}`"
                  class="dropdown-item btn btn-light"
                >
                  Profile
                </router-link>
              </li>
              <li>
                <a class="dropdown-item btn btn-light" @click="logout"
                  >Log out</a
                >
              </li>
            </ul>
          </div>

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
import UserSearchBar from "@/components/topBar/UserSearchBar.vue";

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
      if (this.isSmallScreen)
        return this.name
          ? this.shortenName(this.name)
          : this.shortenName(this.userName);
      else return this.name ? this.name : this.userName;
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
    changeSearchClickedSate() {
      this.searchClicked = !this.searchClicked;
    },
    resetSearchSizeOnBigScreen() {
      this.isSmallScreen = window.innerWidth < 768;
      if (window.innerWidth >= 768) this.searchClicked = false;
    },
    async logout() {
      try {
        await apiLogout();
        this.userId = "";
        this.name = "";
        this.$emit("user-logout");
        await router.push({ name: "Authentication" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
    handleScroll() {
      const element = document.querySelector(".top-image");
      if (!element) {
        return; // Exit early if the element doesn't exist
      }

      const imageHeight = element.clientHeight;
      const scrollTop = window.scrollY;

      this.isTransparent = scrollTop < imageHeight;
    },
    shortenName(fullName) {
      const parts = fullName.split(" ");
      if (parts[0].length > 10) {
        return parts
          .map((part) => part.charAt(0) + ".")
          .join(" ")
          .trim();
      }
      if (parts.length > 2) {
        return (
          parts[0] + " " + parts[1].charAt(0) + ". " + parts[parts.length - 1]
        );
      }
      return fullName;
    },
  },
  data() {
    return {
      name: "",
      imageLarge: require("/src/assets/logo/ufood-white.png"),
      imageSmall: require("/src/assets/logo/ufood-white-mobile.png"),
      imageSrc: "",
      userId: Cookies.get("userId"),
      searchClicked: false,
      isSmallScreen: window.innerWidth < 768,
      isTransparent: true,
      isDisplayed: true,
    };
  },
  mounted() {
    // Set initial image source
    this.setImageSrc();

    // Event listeners
    window.addEventListener("resize", this.setImageSrc);
    window.addEventListener("resize", this.resetSearchSizeOnBigScreen);
    window.addEventListener("scroll", this.handleScroll);
    this.name = Cookies.get("userName");
  },
  beforeDestroy() {
    // Remove event listeners
    window.removeEventListener("resize", this.setImageSrc);
    window.removeEventListener("resize", this.resetSearchSizeOnBigScreen);
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    isLoggedIn() {
      // Update name if user is logged in
      if (this.isLoggedIn) {
        this.name = Cookies.get("userName");
        this.userId = Cookies.get("userId");
      }
    },
    $route(to, from) {
      if (to.name === "Home") {
        this.isDisplayed = true;
      } else {
        this.isTransparent = false;
        this.isDisplayed = false;
      }
    },
  },
};
</script>

<style scoped>
.resto-nav {
  transition: background-color 0.25s;
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

.dropdown-toggle::after {
  display: none;
}

.container-fluid {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  display: flex;
  flex-direction: row;
}

@media (min-width: 768px) {
  .filter-btn {
    display: none;
  }

  .search-btn {
    display: none;
  }
}

.profileButton {
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 2rem;
  color: white;
  transition: ease-in-out 0.25s;
}

.profileButton:active {
  background-color: #ab0404;
  transition: ease-in-out 0.25s;
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
</style>
