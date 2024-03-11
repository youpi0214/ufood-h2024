<template>
  <div class="container-lg">
    <div class="row">
      <!--Content begin-->
      <div class="main-content col-auto">
        <!--FilterBtn and SearchBar begin-->
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
            <SearchBar />
          </div>
        </div>
        <!--FilterBtn and SearchBar end-->
        <RestaurantCards :filteredRestaurants="filteredRestaurants" />
      </div>
      <!--Content end-->

      <!--SideBar begin-->
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
      <!--SideBar end-->
    </div>
  </div>
</template>

<script>
import RestaurantCards from "@/components/homeView/RestaurantCardsContainer.vue";
import SideBar from "@/components/homeView/SideBar.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { getRestaurants } from "@/api/restaurant";
import SearchBar from "@/components/homeView/SearchBar.vue";

export default {
  components: {
    SearchBar,
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
.main-content {
  margin-top: 10rem;
  position: relative;
}

.row {
  display: flow;
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }
}
</style>
