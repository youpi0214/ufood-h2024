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
import { RestaurantQueryOptions } from "@/api/api.utility";

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
      currentPage: 0,
      isLoading: false,
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
    async loadMoreRestaurants() {
      if (this.isLoading) return;

      this.isLoading = true;

      const options = [[RestaurantQueryOptions.PAGE, this.currentPage]];
      const [newRestaurants, _] = await getRestaurants(options);

      this.restaurants = [...this.restaurants, ...newRestaurants];
      this.currentPage++;

      this.$store.commit("updateRestaurant", this.restaurants);

      this.isLoading = false;
    },
    handleScroll() {
      const scrollOffset =
        document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      const bottomOfWindow = scrollOffset + windowHeight >= totalHeight;

      if (bottomOfWindow) {
        this.loadMoreRestaurants();
      }
    },
  },
  async created() {
    await this.loadMoreRestaurants();
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
