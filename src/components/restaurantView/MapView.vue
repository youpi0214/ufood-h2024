<template>
  <div class="map-view w-100">
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
      rel="stylesheet"
    />
    <div
      ref="mapElement"
      :style="{ height: homePage ? '600px' : '400px' }"
    ></div>
    <div v-if="!homePage">
      <button
        class="btn btn-primary btn-lg btn-block"
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
import { getRoute, removeRoute, MAPBOX_API_KEY } from "./script/map.utility.js";

export default {
  props: {
    centeredPosition: {
      type: Array,
    },
    homePage: {
      type: Boolean,
      required: true,
    },
    restaurants: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      map: null,
      currentPosition: null,
      getDirectionsIsClicked: false,
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = MAPBOX_API_KEY;
      this.map = new mapboxgl.Map({
        container: this.$refs.mapElement,
        center: this.centeredPosition,
        style: "mapbox://styles/mapbox/outdoors-v11?optimize=true",
        zoom: this.homePage ? 8 : 15,
      });
      if (this.restaurants) {
        this.restaurants.forEach((restaurant) =>
          new mapboxgl.Marker({ color: "red" })
            .setLngLat(restaurant.location.coordinates)
            .addTo(this.map),
        );
        this.map.addControl(new mapboxgl.NavigationControl());
      } else {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(this.centeredPosition)
          .addTo(this.map);
      }
    },
    async getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = [
              position.coords.longitude,
              position.coords.latitude,
            ];
          },
          (error) => {
            console.error("Error getting current location:", error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        );
      } else {
        alert("Geolocation is not supported by this browser.");
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
  },
  created() {
    this.getLocation();
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#hideButton {
  background-color: white;
  color: dodgerblue;
}
</style>
