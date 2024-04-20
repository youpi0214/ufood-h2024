<template>
  <div>
    <!-- Top Image Section -->
    <div class="top-image">
      <img src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1%27)" alt="Top Image" />
    </div>

    <!-- Content Section -->
    <div class="container-lg">
      <div class="row">
        <!-- Content begin -->
        <div class="main-content col-auto">
          <!-- FilterBtn and SearchBar begin -->
          <div ref="aboveMap" class="d-flex justify-content-center">
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
                >
                  <i class="bi bi-filter-square-fill"></i>
                  Filters
                </button>

                <!-- Map/List mode switch buttons -->
                <div style="display: flex; flex-direction: row">
                  <button
                    class="btn btn-danger"
                    type="button"
                    style="border: none"
                    :style="{ backgroundColor: showMap ? '#ffffff' : '#ff3434' }"
                    @click="showMap = !showMap"
                  >
                    <i
                      class="bi bi-grid"
                      :style="{ color: showMap ? '#ff3434' : '#ffffff' }"
                    ></i>
                  </button>
                  <button
                    class="btn btn-danger"
                    :style="{ backgroundColor: showMap ? '#ff3434' : '#ffffff' }"
                    style="border: none"
                    type="button"
                    @click="showMap = !showMap"
                  >
                    <i
                      class="bi bi-map-fill"
                      :style="{ color: showMap ? '#ffffff' : '#ff3434' }"
                    ></i>
                  </button>
                </div>
              </div>
              <SearchBar
                :map-mode="false"
                :style="{ visibility: showMap ? 'hidden' : 'visible', display: 'block' }"
              />
            </div>
          </div>
          <!-- FilterBtn and SearchBar end -->

          <MapView
            id="mapHomePage"
            v-if="showMap"
            :home-page="true"
            :heightmap="mapHeight"
            :selectedPrice="selectedPrice"
            :selectedCategory="selectedCategory"
          ></MapView>
          <RestaurantCards
            id="restaurantCards"
            v-if="!showMap"
            :restaurants="restaurants"
          />
        </div>
        <!-- Content end -->

        <!-- SideBar begin -->
        <RestaurantFilter
          class="sidebar"
          ref="sidebar"
          :selectedPrice="selectedPrice"
          :selectedCategory="selectedCategory"
          :filterGenres="filterGenres"
          @apply-filters="applyFilters"
          @reset-filters="resetFilters"
        />
        <!-- SideBar end -->
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantCards from "@/components/homeView/RestaurantCardsContainer.vue";
import { mapActions, mapState } from "vuex";
import { getRestaurants } from "@/api/restaurant";
import SearchBar from "@/components/homeView/SearchBar.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { generateRestaurantFetchOptions } from "@/components/homeView/script/home.utility";
import MapView from "@/components/restaurantView/map/MapView.vue";
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
import RestaurantFilter from "@/components/homeView/RestaurantFilter.vue";

export default {
  components: {
    RestaurantFilter,
    MapView,
    SearchBar,
    RestaurantCards,
  },
  data() {
    return {
      showMap: false,
      restaurants: [],
      allRestaurants: [],
      filterGenres: [],
      currentPage: 0,
      isLoading: false,
      filtersApplied: false,
      mapHeight: "",
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
    applyFilters(price, category) {
      // Remove any trailing commas
      let selectedPrice = price.endsWith(",") ? price.slice(0, -1) : price;
      let selectedCategory = category.endsWith(",")
        ? category.slice(0, -1)
        : category;

      if (selectedPrice.startsWith(",")) {
        selectedPrice = selectedPrice.slice(1);
      }
      if (selectedCategory.startsWith(",")) {
        selectedCategory = selectedCategory.slice(1);
      }
      this.setSelectedFilters({
        price: selectedPrice,
        category: selectedCategory,
      });
      this.filtersApplied = true;
      this.fetchRestaurants();
    },
    resetFilters() {
      this.setSelectedFilters({ price: "", category: "" });
      this.filtersApplied = false;
      this.restaurants = [];
      this.applyFilters("", "");
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
    handleResize() {
      const windowInnerHeight = window.innerHeight;
      const element = this.$refs.aboveMap.getBoundingClientRect();
      this.setMapHeight(windowInnerHeight, element.y, element.height);
    },
    setMapHeight(windowInnerHeight, elementY, elementHeight) {
      this.mapHeight = windowInnerHeight - (elementY + elementHeight) + "px";
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
    this.$store.commit("updateRestaurant", this.restaurants);
  },
  mounted() {
    this.handleResize();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.top-image {
  width: 100%;
  height: 100vh; /* Adjust height according to your image */
  overflow: hidden;
}

.top-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire container */
}

.main-content {
  margin-top: 10rem;
  position: relative;
}

.row {
  display: flow;
}

button:focus {
  outline: 0;
}
.container-lg {
  min-height: 100vh; /* Set a minimum height of 100% of the viewport height */
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
