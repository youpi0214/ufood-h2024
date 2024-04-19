<script>
import { getRestaurants } from "@/api/restaurant";
import Card from "@/components/homeView/Card.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { RestaurantQueryOptions } from "@/api/api.utility";
import { getCurrentPositionWithRetry } from "@/components/restaurantView/script/location.utility";

export default {
  name: "RecommendedRestaurants",
  components: { Card },
  data() {
    return {
      recommendedRestaurants: [],
      currentPosition: null,
    };
  },
  props: {
    currentRestaurant: {
      type: Object,
      required: true,
    },
    genres: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedRestaurants() {
      if (!this.currentPosition) return this.recommendedRestaurants;

      // Calculate distance for each restaurant
      const restaurantsWithDistance = this.recommendedRestaurants.map(
        (restaurant) => ({
          ...restaurant,
          distance: this.calculateDistance(restaurant.location.coordinates),
        }),
      );

      // Sort by distance
      const sortedByDistance = restaurantsWithDistance.sort(
        (a, b) => a.distance - b.distance,
      );

      // Sort by rating (descending) only for restaurants with very close distances
      const thresholdDistance = 10;
      const sortedByDistanceAndRating = sortedByDistance
        .filter((restaurant) => restaurant.distance <= thresholdDistance)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));

      // Merge sorted arrays with prioritized distance and rating
      const prioritizedRestaurants = sortedByDistanceAndRating.concat(
        sortedByDistance.filter(
          (restaurant) => !sortedByDistanceAndRating.includes(restaurant),
        ),
      );

      return prioritizedRestaurants;
    },
  },
  methods: {
    async getSameGenresRestaurants() {
      const options = [[RestaurantQueryOptions.GENRES, this.genres]];
      const [restaurants, _] = await getRestaurants(options);
      this.recommendedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== this.currentRestaurant.id,
      );
    },
    async getCurrentPositionInHomePage() {
      this.currentPosition = await getCurrentPositionWithRetry();
    },
    calculateDistance(restaurantCoordinates) {
      if (!this.currentPosition) return Infinity;

      // Calculate distance using the Haversine formula
      const [restaurantLng, restaurantLat] = restaurantCoordinates;
      const [userLng, userLat] = this.currentPosition;
      const earthRadius = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(userLat - restaurantLat);
      const dLng = this.deg2rad(userLng - restaurantLng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(restaurantLat)) *
          Math.cos(this.deg2rad(userLat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c; // Distance in km
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
  async created() {
    await this.getCurrentPositionInHomePage();
    console.log("my location:" + this.currentPosition);
    await this.getSameGenresRestaurants();
    console.log(this.recommendedRestaurants);
    console.log(this.sortedRestaurants);
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
          v-for="restaurant in sortedRestaurants"
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
