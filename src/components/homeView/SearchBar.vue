<template>
  <div
    class="d-flex"
    @click="handleClickOutside"
  >
    <div class="d-flex" style="width: 100%">
      <form class="d-flex w-100" style="padding-bottom: 1rem" role="search">
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
        :style="{
          width: $refs.searchInput.offsetWidth + 'px',
          left: $refs.searchInput.offsetLeft + 'px',
          top: $refs.searchInput.offsetHeight + 'px',
        }"
        @click="handleClickInside"
      >
        <li
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          style="display: flex; justify-content: space-between"
          class="list-group-item"
        >
          <div>
            <router-link
              style="text-decoration-line: none; color: black"
              onmouseover="this.style.textDecoration='underline';"
              onmouseout="this.style.textDecoration='none';"
              :to="`/restaurants/${restaurant.id}`"
              v-bind:class="{ disabled: isFavoriteSearchBar }"
            >
              {{ restaurant.name }}
            </router-link>
          </div>
          <div v-if="isFavoriteSearchBar" style="cursor: pointer">
            <i
              class="bi bi-plus-circle-fill"
              style="color: dodgerblue"
              :hidden="isPresentInFavouriteList(restaurant.id)"
              @click="addFavorite(restaurant.id)"
            >
            </i>
            <i
              class="bi bi-trash3-fill"
              style="color: red"
              :hidden="!isPresentInFavouriteList(restaurant.id)"
              @click="removeFavorite(restaurant.id)"
            >
            </i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RestaurantQueryOptions } from "@/api/api.utility";
import { getRestaurants, getRestaurantsByUserLocation } from "@/api/restaurant";
import {
  addRestaurantToFavoriteList,
  removeRestaurantFromFavoriteList,
} from "@/api/favorites.lists";

export default {
  name: "SearchBar",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    isFavoriteSearchBar: {
      type: Boolean,
      default: false,
    },
    favouriteListID: {
      type: String,
      default: "",
    },
    update: {
      type: Function,
    },
    restaurantsInFavouriteList: {
      type: Array,
      default: () => [],
    },
    mapMode: {
      type: Boolean,
      required: true,
    },
    mapCenter: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      search: undefined,
      restaurants: [],
    };
  },
  methods: {
    isPresentInFavouriteList(restaurantId) {
      return this.restaurantsInFavouriteList.some(
        (favoriteRestaurantID) => favoriteRestaurantID.id === restaurantId,
      );
    },
    async searchRestaurants() {
      const queryOption = [
        [RestaurantQueryOptions.Q, this.search],
        [RestaurantQueryOptions.LIMIT, 12],
      ];
      let total = 0;
      if (this.mapMode) {
        queryOption.push([RestaurantQueryOptions.LON, this.mapCenter[0]]);
        queryOption.push([RestaurantQueryOptions.LAT, this.mapCenter[1]]);
        [this.restaurants, total] =
          await getRestaurantsByUserLocation(queryOption);
      } else {
        [this.restaurants, total] = await getRestaurants(queryOption);
      }
    },
    async addFavorite(restaurantId) {
      await addRestaurantToFavoriteList(
        this.favouriteListID,
        restaurantId,
      ).then(() => {
        this.update();
        this.clearSearch();
      });
    },
    async removeFavorite(restaurantId) {
      await removeRestaurantFromFavoriteList(
        this.favouriteListID,
        restaurantId,
      ).then(() => {
        this.update();
        this.clearSearch();
      });
    },
    clearSearch() {
      this.search = "";
      this.restaurants = [];
    },
    handleClickOutside(event) {
      if (!this.$refs.searchInput.contains(event.target)) {
        this.clearSearch();
      }
    },
    handleClickInside(event) {
      event.stopPropagation();
    },
  },
  watch: {
    search() {
      const searchFormatted = this.search.trim().toLowerCase();
      if (searchFormatted !== undefined && searchFormatted !== "") {
        this.searchRestaurants();
      } else {
        this.restaurants = [];
      }
    },
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
