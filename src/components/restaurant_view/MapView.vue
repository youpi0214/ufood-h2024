<template>
  <div>
    <div ref="mapElement" style="height: 400px"></div>
    <button class="btn btn-outline-success" @click="getRoute">
      Get Directions
    </button>
  </div>
</template>

<script>
import mapboxgl from "!mapbox-gl";

export default {
  props: {
    mapBoxApiKey: {
      type: String,
      default: () =>
        "pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g",
    },
  },
  data() {
    return {
      map: null,
      currentPosition: [-71.1755, 46.8049],
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
      mapboxgl.accessToken = this.mapBoxApiKey;
      this.map = new mapboxgl.Map({
        container: this.$refs.mapElement,
        center: this.restaurantLocation,
        zoom: 15,
      });
    },
    addDestinationMarker() {
      const name = "McDonald's";
      new mapboxgl.Marker()
        .setLngLat(this.restaurantLocation)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`))
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
    async getRoute() {
      const [originLong, originLat] = this.currentPosition;
      const [destinationLong, destinationLat] = this.restaurantLocation;
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originLong},${originLat};
        ${destinationLong},${destinationLat}?steps=true&geometries=geojson&access_token=${this.mapBoxApiKey}`,
        { method: "GET" },
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: `LineString`,
          coordinates: route,
        },
      };
      if (this.map.getSource(`route`)) {
        this.map.getSource(`route`).setData(geojson);
      } else {
        this.map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#d73636",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
