<script>
import { getRestaurants } from "@/api/restaurant";
import Card from "@/components/homeView/Card.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { RestaurantQueryOptions } from "@/api/api.utility";

export default {
  name: "RecommendedRestaurants",
  components: { Card },
  data() {
    return {
      recommendedRestaurants: null,
    };
  },
  props: {
    currentRestaurant: {
      type: Restaurant,
      required: true,
    },
    genres: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async getSameGenresRestaurants() {
      const options = [[RestaurantQueryOptions.GENRES, this.genres]];
      const [restaurants, _] = await getRestaurants(options);
      this.recommendedRestaurants = restaurants;
      //remove the current restaurant from the recommended restaurants
      this.recommendedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== this.currentRestaurant.id,
      );
    },
  },
  created() {
    this.getSameGenresRestaurants();
  },
};
</script>

<template>
  <div>
    <h2>You may also like</h2>
    <div id="recommendedContainer">
      <div style="display: flex">
        <div
          style="display: flex; flex-direction: column"
          v-for="restaurant in recommendedRestaurants"
          :key="restaurant"
        >
          <Card :restaurant="restaurant" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#recommendedContainer {
  background-color: #fafafa;
  margin-bottom: 1rem;
  padding: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>
