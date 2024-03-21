<template>
  <div class="container-lg">
    <div class="row">
      <!--Content begin-->
      <div class="main-content col-auto">
        <!--FilterBtn and SearchBar begin-->
        <div class="d-flex justify-content-center">
          <div class="col">
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
              "
            >
              <button
                class="filter btn btn-danger"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                @click="toggleSidebar"
              >
                <i class="bi bi-filter-square-fill"></i>
                Filters
              </button>
              <div style="display: flex; flex-direction: row">
                <button
                  class="btn btn-primary"
                  :style="{
                    backgroundColor: showMap ? '#ff3434ff' : '#ffffff',
                  }"
                  style="border: none"
                  type="button"
                  @click="showMap = !showMap"
                >
                  <i
                    class="bi bi-map-fill"
                    :style="{ color: showMap ? '#ffffff' : '#ff3434ff' }"
                  ></i>
                </button>
                <button
                  class="btn btn-primary"
                  type="button"
                  style="border: none"
                  :style="{
                    backgroundColor: showMap ? '#ffffff' : '#ff3434ff',
                  }"
                  @click="showMap = !showMap"
                >
                  <i
                    class="bi bi-grid"
                    :style="{ color: showMap ? '#ff3434ff' : '#ffffff' }"
                  ></i>
                </button>
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
        <MapView
          id="mapHomePage"
          v-if="showMap"
          :home-page="true"
          :restaurants="allRestaurants"
          :centered-position="allRestaurants[0].location.coordinates"
        ></MapView>
        <!--FilterBtn and SearchBar end-->
        <RestaurantCards
          id="restaurantCards"
          v-if="!showMap"
          :restaurants="restaurants"
        />
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
import MapView from "@/components/restaurantView/MapView.vue";
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
export default {
  components: {
    MapView,
    SearchBar,
    RestaurantCards,
    SideBar,
  },
  data() {
    return {
      showMap: false,
      isSidebarOpen: false,
      isBackgroundVisible: true,
      restaurants: [],
      allRestaurants: [],
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
    getRestaurants,
    getAllAvailableDataWithQueryFunction,
    ...mapActions(["setSelectedFilters"]),
    async getAllRestaurants() {
      const [allRestaurants, _] = await getAllAvailableDataWithQueryFunction(
        getRestaurants,
        [],
        130,
      );
      this.allRestaurants = allRestaurants;
    },
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
        this.allRestaurants = this.restaurants;
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
    await this.setSelectedFilters({ price: "", category: "" });
    await this.loadMoreRestaurants();
    console.log(this.getAllRestaurants());
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
        document.body.classList.add("allow-scrolling");
      } else {
        document.body.classList.remove("allow-scrolling");
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

.allow-scrolling {
  overflow: auto;
}

button:focus {
  outline: 0;
}

@media (max-width: 600px) {
  .filter {
    display: none;
  }
}
</style>
<!--TODO (OPTIONAL) Animation Style-->
<!--#mapHomePage {-->
<!--overflow: hidden;-->
<!--animation: slideDown 0.5s ease forwards;-->
<!--}-->

<!--@keyframes slideDown {-->
<!--from {-->
<!--transform: translateY(100%); /* Start from top */-->
<!--opacity: 0;-->
<!--}-->
<!--to {-->
<!--transform: translateY(0); /* Move to original position */-->
<!--opacity: 1;-->
<!--}-->
<!--}-->

<!--#restaurantCards {-->
<!--overflow: hidden;-->
<!--animation: slideDown 0.5s ease forwards;-->
<!--}-->
