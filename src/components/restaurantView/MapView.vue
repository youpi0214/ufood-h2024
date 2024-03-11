<template>
  <div class="map-view w-100">
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
      rel="stylesheet"
    />
    <div ref="mapElement" style="height: 400px"></div>
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
</template>

<script>
import mapboxgl from "!mapbox-gl";
import { getRoute, removeRoute, MAPBOX_API_KEY } from "./script/mapUtils.js";

export default {
  data() {
    return {
      map: null,
      currentPosition: [-71.17, 46.782878601986255],
      getDirectionsIsClicked: false,
      restaurantLocation: [-71.28690361946938, 46.782878601986255],
    };
  },
  created() {
    this.getLocation();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = MAPBOX_API_KEY;
      this.map = new mapboxgl.Map({
        container: this.$refs.mapElement,
        center: this.restaurantLocation,
        zoom: 15,
      });
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(this.restaurantLocation)
        .setPopup(new mapboxgl.Popup().setHTML(`<h5>McDonald's</h5>`))
        .addTo(this.map);
    },
    getLocation() {
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
      this.getDirectionsIsClicked = true;
      await getRoute(this.currentPosition, this.restaurantLocation, this.map);
      const bounds = new mapboxgl.LngLatBounds(
        this.currentPosition,
        this.restaurantLocation,
      );
      const markers = [this.restaurantLocation, this.currentPosition];
      markers.forEach((marker) => bounds.extend(marker.coordinates));
      this.map.fitBounds(bounds, { padding: 40, duration: 2000 });
    },
    async hideRoute() {
      this.getDirectionsIsClicked = false;
      await removeRoute(this.restaurantLocation, this.map);
    },
  },
};
</script>

<style scoped>
#hideButton {
  background-color: white;
  color: dodgerblue;
}
</style>
