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
        <RestaurantCards :restaurants="restaurants" />
      </div>
      <!--Content end-->

      <!--SideBar begin-->
      <div
        class="sidebar"
        :class="{ 'sidebar-open': isSidebarOpen }"
        @click="closeSidebar($event)"
        ref="sidebar"
      >
        <SideBar
          :isSidebarOpen="isSidebarOpen"
          :filterGenres="filterGenres"
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
import { mapState, mapActions } from "vuex";
import { getRestaurants } from "@/api/restaurant";
import SearchBar from "@/components/homeView/SearchBar.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { generateRestaurantFetchOptions } from "@/components/homeView/script/home.utility";
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
      filterGenres: [],
      currentPage: 0,
      isLoading: false,
      filtersApplied: false,
    };
  },
  computed: {
    ...mapState(["selectedPrice", "selectedCategory"]),
  },
  methods: {
    ...mapActions(["setSelectedFilters"]),
    toggleSidebar() {
      this.$store.dispatch("changeSideBarState");
    },
    closeSidebar() {
      if (!event.target.closest(".sidebar")) {
        this.$store.dispatch("changeSideBarState");
      }
    },
    applyFilters(price, category) {
      // Remove any trailing commas
      const selectedPrice = price.endsWith(",") ? price.slice(0, -1) : price;
      const selectedCategory = category.endsWith(",")
        ? category.slice(0, -1)
        : category;

      this.setSelectedFilters({
        price: selectedPrice,
        category: selectedCategory,
      });
      this.filtersApplied = true;
      this.fetchRestaurants();
      this.currentPage = 0;
    },
    resetFilters() {
      this.setSelectedFilters({ price: "", category: "" });
      this.filtersApplied = false;
    },
    async fetchRestaurants() {
      let options = generateRestaurantFetchOptions(
        this.selectedCategory,
        this.selectedPrice,
      );

      try {
        const [restaurants, _] = await getRestaurants(options);
        this.restaurants = restaurants.map(
          (restaurant) => new Restaurant(restaurant),
        );
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    },
    async loadMoreRestaurants() {
      if (this.isLoading) return;

      this.isLoading = true;

      const options = generateRestaurantFetchOptions(
        this.selectedCategory,
        this.selectedPrice,
        this.currentPage,
      );

      try {
        const [newRestaurants, _] = await getRestaurants(options);

        const newGenres = newRestaurants.flatMap(
          (restaurant) => restaurant.genres,
        );
        newGenres.forEach((genre) => {
          if (!this.filterGenres.includes(genre)) {
            this.filterGenres.push(genre);
          }
        });

        this.restaurants = [
          ...this.restaurants,
          ...newRestaurants.map((restaurant) => new Restaurant(restaurant)),
        ];
        this.currentPage++;

        this.$store.commit("updateRestaurant", this.restaurants);
      } catch (error) {
        console.error("Error loading more restaurants:", error);
      }

      this.isLoading = false;
    },
    handleScroll() {
      const scrollOffset =
        window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      let bottomOfWindow = false;

      // Check if the user is close to the bottom of the page
      if (totalHeight - (scrollOffset + windowHeight) < 100) {
        bottomOfWindow = true;
      }

      if (bottomOfWindow) {
        if (!this.filtersApplied || this.restaurants.length % 10 === 0) {
          this.loadMoreRestaurants();
        }
      }
    },
  },
  async created() {
    this.setSelectedFilters({ price: "", category: "" });
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
