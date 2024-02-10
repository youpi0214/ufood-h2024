<template>
  <div class="container">
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <SideBar
        :isSidebarOpen="isSidebarOpen"
        @close="isSidebarOpen = false"
        @apply-filters="applyFilters"
        @reset-filters="resetFilters"
      />
    </div>
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
      <RestaurantCards :filteredRestaurants="filteredRestaurants" /> <!-- Utilisation de filteredRestaurants -->
    </div>
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
    ...mapState(['selectedPrice', 'selectedCategory']), // Utiliser les états sélectionnés directement depuis le store
    ...mapGetters(['filteredRestaurants']), // Utiliser les restaurants filtrés depuis le store
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    ...mapActions(['setSelectedFilters']),
    applyFilters(price, category) {
      this.setSelectedFilters({ price, category });
    },
    resetFilters() {
      this.setSelectedFilters({ price: 'All', category: 'All' });
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
}

.sidebar {
  width: 250px;
  transition: width 0.3s ease-in-out;
  z-index: 9999; /* Set a high z-index value to bring the popup to the front */
  height: 100%;
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  position: relative;
}

.filter-button-container {
  position: relative;
  transform: translateX(-50%);
  z-index: 1;
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }
}
</style>
