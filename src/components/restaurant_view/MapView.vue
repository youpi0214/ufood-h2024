<template>
  <div>
    <div ref="mapElement" style="height: 400px"></div>
  </div>
</template>

<script>
import mapboxgl from "!mapbox-gl";

export default {
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
      mapboxgl.accessToken =
        "pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g";
      this.map = new mapboxgl.Map({
        container: this.$refs.mapElement,
        center: this.restaurantLocation,
        zoom: 15,
      });

      this.addRoute();
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
      //TODO The coordinates in the link should be dynamic using ${...positions}
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/-71.1755,46.8049;-71.286,46.782?steps=true&geometries=geojson&access_token=pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g`,
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
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    },
    addRoute() {
      const originLngLat = this.currentPosition;
      const destinationLngLat = this.restaurantLocation;
      const coordinates = [originLngLat, destinationLngLat];

      this.map.on("load", () => {
        this.getRoute();
        this.map.addLayer({
          id: "point",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: originLngLat
                  }
                }
              ]
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#d73636",
            "line-width": 8,
          },
        });
        // this.map.addControl(
        //   new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //       enableHighAccuracy: true,
        //     },
        //     trackUserLocation: true,
        //     showUserHeading: true,
        //   }),
        // );
      });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
