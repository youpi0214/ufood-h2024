<template>
  <div class="col d-flex justify-content-center">
    <div class="col d-flex justify-content-center">
      <form class="d-flex w-50 p-3" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search Restaurants..."
          aria-label="Search"
          v-model="search"
        />
      </form>
    </div>

    <!--  Search results  -->
    <ul
      v-if="restaurants.length > 0"
      class="search-result list-group mt-3 dropdown-menu"
    >
      <li
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="list-group-item"
      >

        <div>
          <router-link :to="`/restaurants/${restaurant.id}`" v-bind:class="{ disabled: isFavoriteSearchBar }">
            {{ restaurant.name }}
          </router-link>
          <div v-if=" isFavoriteSearchBar">
            <button class="btn btn-primary" @click="addFavorite(restaurant.id)">
              Add to favorites
            </button>
            <button
              class="btn btn-danger"
              @click="removeFavorite(restaurant.id)"
            >
              Remove from favorites
            </button>
          </div>
        </div>


      </li>
    </ul>
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
    }
  },
  data() {
    return {
      search: undefined,
      restaurants: []
    };
  },
  methods: {
    async searchRestaurants() {
      const queryOption = [
        [RestaurantQueryOptions.Q, this.search],
        [RestaurantQueryOptions.LIMIT, 12]
      ];
      let total = 0;
      [this.restaurants, total] = await getRestaurants(queryOption);
    },
    async addFavorite(restaurantId) {
      await addRestaurantToFavoriteList(this.favouriteListID, restaurantId).then(() => {
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
    }, clearSearch() {
      this.search = "";
      this.restaurants = [];
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
  }
};
</script>

<style scoped>
.search-result {
  max-height: 30rem;
  overflow-y: auto;
  width: 40rem;
}

.disabled {
  pointer-events: none;
}
</style>
