<template>
  <div class="map-view w-100">
    <div v-if="homePage && this.map" style="width: 100%">
      <SearchBar :map-mode="true" :map-center="mapCenter" />
    </div>
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
      rel="stylesheet"
    />
    <div ref="mapElement" :style="{ height: homePage ? heightmap : '400px' }">
    </div>
    <div v-if="!homePage">
      <button
        class="btn btn-danger btn-lg btn-block"
        v-if="!getDirectionsIsClicked"
        @click="showRoute"
      >
        Get Directions
      </button>
      <button
        id="hideButton"
        class="btn btn-primary btn-lg btn-block"
        v-if="getDirectionsIsClicked"
        @click="hideRoute"
      >
        Hide Directions
      </button>
    </div>
  </div>
</template>

<script>
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getRoute, removeRoute, MAPBOX_API_KEY } from "./map.utility.js";
import { getAllRestaurantsByUserLocation } from "./map.utility.js";
import { getLocation } from "@/components/restaurantView/script/location.utility";
import SearchBar from "@/components/homeView/SearchBar.vue";

export default {
  components: { SearchBar },
  props: {
    heightmap: {
      type: String,
    },
    centeredPosition: {
      type: Array,
    },
    homePage: {
      type: Boolean,
      required: true,
    },
    selectedPrice: {
      type: String,
      default: "",
    },
    selectedCategory: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mapCenter: null,
      map: null,
      currentPosition: null,
      getDirectionsIsClicked: false,
      restaurantMarkers: [],
      restaurants: [],
      filteredRestaurants: [],
    };
  },
  watch: {
    selectedPrice: {
      handler(newValue, oldValue) {
        this.filterRestaurants();
      },
      immediate: true,
    },
    selectedCategory: {
      handler(newValue, oldValue) {
        this.filterRestaurants();
      },
      immediate: true,
    },
  },
  methods: {
    async initMap() {
      await this.getCurrentPositionInHomePage();
      mapboxgl.accessToken = MAPBOX_API_KEY;
      this.map = new mapboxgl.Map({
        attributionControl: false,
        container: this.$refs.mapElement,
        center: this.homePage ? this.currentPosition : this.centeredPosition,
        style: "mapbox://styles/mapbox/outdoors-v11?optimize=true",
        zoom: this.homePage ? 12 : 15,
      });
      this.mapCenter = this.map.getCenter().toArray();
      if (this.homePage) {
        this.map.on("idle", async () => {
          this.map.resize();
          this.mapCenter = this.map.getCenter().toArray();
          const [restaurants, _] = await getAllRestaurantsByUserLocation(
            this.mapCenter,
          );
          this.restaurants = restaurants;
          this.filterRestaurants();
        });
        this.map
          .addControl(
            new mapboxgl.ScaleControl({
              maxWidth: 80,
              unit: "metric",
            }),
          )
          .addControl(new mapboxgl.NavigationControl(), "bottom-right");
      } else {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(this.centeredPosition)
          .addTo(this.map);
      }
    },
    async showRoute() {
      if (this.currentPosition) {
        this.getDirectionsIsClicked = true;
        await getRoute(this.currentPosition, this.centeredPosition, this.map);
        const bounds = new mapboxgl.LngLatBounds(
          this.currentPosition,
          this.centeredPosition,
        );
        const markers = [this.centeredPosition, this.currentPosition];
        markers.forEach((marker) => bounds.extend(marker.coordinates));
        this.map.fitBounds(bounds, { padding: 40, duration: 2000 });
      } else {
        alert("You must allow browser to use location");
      }
    },
    async hideRoute() {
      this.getDirectionsIsClicked = false;
      await removeRoute(this.centeredPosition, this.map);
    },
    async getCurrentPositionInHomePage() {
      while (!this.currentPosition) {
        this.currentPosition = await getLocation();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      if (this.currentPosition) {
        return this.currentPosition;
      }
    },
    displayRestaurantsMarkers(restaurants) {
      if (this.restaurantMarkers.length > 0) {
        this.restaurantMarkers.forEach((marker) => marker.remove());
        this.restaurantMarkers = [];
      }
      for (const restaurant of restaurants) {
        const marker = new mapboxgl.Marker({ color: "red" })
          .setLngLat(restaurant.location.coordinates)
          .addTo(this.map);
        this.restaurantMarkers.push(marker);
      }
    },
    filterRestaurants() {
      // Filter restaurants based on selectedPrice and selectedCategory
      const priceMapping = {
        $: 1,
        $$: 2,
        $$$: 3,
        $$$$: 4,
        $$$$$: 5,
      };

      const selectedPrices = this.selectedPrice
        ? this.selectedPrice.split(",").map((price) => priceMapping[price])
        : [];
      const selectedCategories = this.selectedCategory
        ? this.selectedCategory.split(",")
        : [];
      const filteredRestaurants = this.restaurants.filter((restaurant) => {
        // Check if the restaurant's price range matches any of the selected prices
        if (selectedPrices.length > 0 && restaurant.price_range) {
          if (!selectedPrices.includes(restaurant.price_range)) {
            return false;
          }
        }

        // Check if the restaurant's genres include any of the selected categories
        if (selectedCategories.length > 0 && restaurant.genres) {
          const restaurantGenres = restaurant.genres.map((genre) =>
            genre.trim(),
          );
          if (
            !selectedCategories.some((category) =>
              restaurantGenres.includes(category),
            )
          ) {
            return false;
          }
        }

        return true;
      });
      this.filteredRestaurants = filteredRestaurants;
      this.displayRestaurantsMarkers(this.filteredRestaurants);
    },
  },

  created() {
    getLocation();
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.btn {
  background-color: #ff3434;
}

#hideButton {
  background-color: white;
  color: #ff3434;
  border-color: #ff3434;
}
</style>
