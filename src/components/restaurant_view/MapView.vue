<template>
  <div>
    <div ref="map" style="height: 400px;"></div>
  </div>
</template>

<script>
import mapboxgl from '!mapbox-gl';

export default {
  data() {
    return {
      map: null,
      currentPosition: null,
      restaurantLocation: [ 46.782878601986255, -71.28690361946938 ],
    };
  },
  mounted() {
    this.getLocation();
    this.initMap();
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g';
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11', // You can choose a different map style
        center: this.restaurantLocation,
        zoom: 8,
      });

      this.addRoute();
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = [position.coords.longitude, position.coords.latitude]; // [lng, lat
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
    addRoute() {
      const originLngLat = this.currentPosition;
      const destinationLngLat = this.restaurantLocation;

      const coordinates = [originLngLat, destinationLngLat];

      this.map.on('load', () => {
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coordinates,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 8,
          },
        });
        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }))
      });

    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
