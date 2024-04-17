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
              >
                <i class="bi bi-filter-square-fill"></i>
                Filters
              </button>

              <!--    Map/List mode switch buttons-->
              <div style="display: flex; flex-direction: row">
                <button
                  class="btn btn-danger"
                  type="button"
                  style="border: none"
                  :style="{
                    backgroundColor: showMap ? '#ffffff' : '#ff3434',
                  }"
                  @click="showMap = !showMap"
                >
                  <i
                    class="bi bi-grid"
                    :style="{ color: showMap ? '#ff3434' : '#ffffff' }"
                  ></i>
                </button>
                <button
                  class="btn btn-danger"
                  :style="{
                    backgroundColor: showMap ? '#ff3434' : '#ffffff',
                  }"
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
            <SearchBar />
          </div>
        </div>
        <!--FilterBtn and SearchBar end-->

        <MapView id="mapHomePage" v-if="showMap" :home-page="true"></MapView>
        <RestaurantCards
          id="restaurantCards"
          v-if="!showMap"
          :restaurants="restaurants"
        />
      </div>
      <!--Content end-->

      <!--SideBar begin-->
      <RestaurantFilter
        class="sidebar"
        ref="sidebar"
        :selectedPrice="selectedPrice"
        :selectedCategory="selectedCategory"
        :filterGenres="filterGenres"
        @apply-filters="applyFilters"
        @reset-filters="resetFilters"
      />
      <!--SideBar end-->
    </div>
  </div>
</template>

<script>
import RestaurantCards from "@/components/homeView/RestaurantCardsContainer.vue";
import { mapState, mapActions } from "vuex";
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
