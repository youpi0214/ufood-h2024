<template>
  <div class="col d-flex justify-content-center position-relative" @click="handleClickOutside">
    <div class="col d-flex justify-content-center position-relative">
      <form class="d-flex w-75 p-3" role="search">
        <input
          ref="searchInput"
          class="form-control me-2"
          type="search"
          placeholder="Search Restaurants..."
          aria-label="Search"
          v-model="search"
        />
      </form>
      <!-- Search results dropdown -->
      <ul
        v-if="restaurants.length > 0"
        class="search-result list-group mt-3 dropdown-menu position-absolute"
        :style="{ width: $refs.searchInput.offsetWidth + 'px', left: $refs.searchInput.offsetLeft + 'px', top: $refs.searchInput.offsetHeight + 'px' }"
        @click="handleClickInside"
      >
        <li
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="list-group-item"
        >
          <div>
            <router-link
              :to="`/restaurants/${restaurant.id}`"
              v-bind:class="{ disabled: isFavoriteSearchBar }"
            >
              {{ restaurant.name }}
            </router-link>
            <div v-if="isFavoriteSearchBar">
              <button class="btn btn-primary" :hidden="isPresentInFavouriteList(restaurant.id)"
                      @click="addFavorite(restaurant.id)">
                Add to favorites
              </button>
              <button class="btn btn-danger" :hidden="!isPresentInFavouriteList(restaurant.id)"
                      @click="removeFavorite(restaurant.id)">
                Remove from favorites
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RestaurantQueryOptions } from "@/api/api.utility";
import { getRestaurants } from "@/api/restaurant";
import {
  addRestaurantToFavoriteList,
  removeRestaurantFromFavoriteList
} from "@/api/favorites.lists";

export default {
  name: "SearchBar",
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    isFavoriteSearchBar: {
      type: Boolean,
      default: false
    },
    favouriteListID: {
      type: String,
      default: ""
    },
    update: {
      type: Function
    },
    restaurantsInFavouriteList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: undefined,
      restaurants: []
    };
  },
  methods: {
    isPresentInFavouriteList(restaurantId) {
      return this.restaurantsInFavouriteList.some(
        (favoriteRestaurantID) => favoriteRestaurantID.id === restaurantId
      );
    },
    async searchRestaurants() {
      const queryOption = [
        [RestaurantQueryOptions.Q, this.search],
        [RestaurantQueryOptions.LIMIT, 12]
      ];
      let total = 0;
      [this.restaurants, total] = await getRestaurants(queryOption);
    },
    async addFavorite(restaurantId) {
      await addRestaurantToFavoriteList(
        this.favouriteListID,
        restaurantId
      ).then(() => {
        this.update();
        this.clearSearch();
      });
    },
    async removeFavorite(restaurantId) {
      await removeRestaurantFromFavoriteList(
        this.favouriteListID,
        restaurantId
      ).then(() => {
        this.update();
        this.clearSearch();
      });
    },
    clearSearch() {
      console.log("clearing search");
      this.search = "";
      this.restaurants = [];
    }, handleClickOutside(event) {
      if (!this.$refs.searchInput.contains(event.target)) {
        this.clearSearch();
      }
    },
    handleClickInside(event) {
      event.stopPropagation();
    }
  },
  watch: {
    search() {
      const searchFormatted = this.search.trim().toLowerCase();
      if (searchFormatted !== undefined && searchFormatted !== "") {
        this.searchRestaurants();
      } else {
        this.restaurants = [];
      }
    }
  },
};
</script>

<style scoped>
.search-result {
  max-height: 30rem;
  overflow-y: auto;
}

.disabled {
  pointer-events: none;
}
</style>
