<template>
  <div>
    <!-- Background image covering the whole page -->
    <div class="background-image" :style="{ backgroundImage: backgroundStyle }">
      <div class="container d-flex justify-content-center align-items-center">
        <div class="search-form-container">
          <form class="d-flex w-50 p-3" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="container-lg">
      <div class="row">
        <div class="main-content col-auto">
          <div class="d-flex justify-content-center">
            <div class="col">
              <div class="row d-flex justify-content-center">
                <button
                  class="btn btn-success"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                  @click="toggleSidebar"
                >
                  <i class="bi bi-filter-square-fill"></i>
                  Filters
                </button>
              </div>
              <div class="row d-flex justify-content-center"></div>
            </div>
          </div>
          <RestaurantCards :filteredRestaurants="filteredRestaurants" />
        </div>
        <div
          class="sidebar"
          :class="{ 'sidebar-open': isSidebarOpen }"
          @click="closeSidebar"
        >
          <SideBar
            :isSidebarOpen="isSidebarOpen"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantCards from "@/components/homeView/RestaurantCardsContainer.vue";
import SideBar from "@/components/homeView/SideBar.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { ref } from "vue";
import { getRestaurants } from "@/api/restaurant";

export default {
  components: {
    RestaurantCards,
    SideBar,
  },
  data() {
    return {
      isSidebarOpen: false,
      isBackgroundVisible: true,
      restaurants: [],
    };
  },
  computed: {
    ...mapState(["selectedPrice", "selectedCategory"]),
    ...mapGetters(["filteredRestaurants"]),
    backgroundStyle() {
      return `url('https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`;
    },
  },
  methods: {
    ...mapActions(["setSelectedFilters"]),
    toggleSidebar() {
      this.$store.dispatch("changeSideBarState");
    },
    closeSidebar() {
      this.$store.dispatch("closeSidebar");
    },
    applyFilters(price, category) {
      this.setSelectedFilters({ price, category });
    },
    resetFilters() {
      this.setSelectedFilters({ price: "All", category: "All" });
    },
    handleScroll() {
      if (window.scrollY > 0) {
        this.isBackgroundVisible = true;
        window.removeEventListener("scroll", this.handleScroll);
      }
    },
  },
  async created() {
    const [restaurants, _] = await getRestaurants([]);
    this.restaurants = restaurants;
    this.$store.commit("updateRestaurant", this.restaurants);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    "$store.state.isSidebarOpen"(newValue) {
      this.isSidebarOpen = newValue;
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
}

.main-content {
  margin-top: 20px;
  position: relative;
}

.search-form-container {
  width: 100%; /* Adjust the width as needed */
  max-width: 1000px; /* Max width to limit the size of the search form */
  text-align: right; /* Align the search form to the right */
}

.filter-button-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.row {
  display: flow;
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }

  .background-image {
    height: auto;
    width: auto;
  }
}

.background-image {
  display: flex;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  align-items: center;
}
</style>
