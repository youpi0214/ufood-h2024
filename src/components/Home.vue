<template>
  <div class="container-lg">
    <div class="container">
      <div class="row">
        <div class="main-content">
          <div class="filter-button-container">
            <button
              class="btn btn-success"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
              @click="toggleSidebar"
            >
              <i class="bi bi-filter-square-fill"></i>
              Filter
            </button>
          </div>
          <RestaurantCards :filteredRestaurants="filteredRestaurants" />
        </div>
        <div class="col">
          <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
            <SideBar
              :isSidebarOpen="isSidebarOpen"
              @close="isSidebarOpen = false"
              @apply-filters="applyFilters"
              @reset-filters="resetFilters"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Utilisation de filteredRestaurants -->
  </div>
</template>

<script>
import RestaurantCards from "./HomeOrg/RestaurantCards.vue";
import SideBar from "./HomeOrg/SideBar.vue";
import { mapState, mapGetters, mapActions } from "vuex"; // Importer mapGetters et mapActions

export default {
  components: {
    RestaurantCards,
    SideBar,
  },
  computed: {
    ...mapState(["selectedPrice", "selectedCategory"]),
    ...mapGetters(["filteredRestaurants"]),
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    ...mapActions(["setSelectedFilters"]),
    applyFilters(price, category) {
      this.setSelectedFilters({ price, category });
    },
    resetFilters() {
      this.setSelectedFilters({ price: "All", category: "All" });
    },
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  margin-top: 20px;
  position: relative;
}

.filter-button-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }
}
</style>
