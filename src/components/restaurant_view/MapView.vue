<template>
  <div class="container-fluid h-100 bg-light">
    <div class="row h-100">
      <GMapMap
        ref="map-view"
        :center="restaurantLocation"
        :zoom="zoom"
        :map-type-id="mapTypeId"
      >
        <GMapMarker :position="restaurantLocation" />
        <GMapMarker
          :position="currentPosition"
          icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      </GMapMap>
    </div>
    <button type="button" class="btn-primary" @click="getRoute">
      {{ buttonText }}
    </button>
  </div>
</template>
<script>
export default {
  name: "App",
  props: {
    zoom: {
      type: Number,
      default: 15,
    },
    mapTypeId: {
      type: String,
      default: "terrain",
    },
    buttonText: {
      type: String,
      default: "GET DIRECTIONS",
    },
  },
  setup() {
    return { mapView: null };
  },
  data() {
    return {
      restaurantLocation: { lat: 46.782878601986255, lng: -71.28690361946938 },
      currentPosition: null,
      routeCoordinates: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.mapView = this.$refs["map-view"];
    });
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
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
    getRoute() {
      console.log("Getting route...");
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: this.origin,
          destination: this.destination,
          travelMode: "DRIVING", // You can also use 'WALKING', 'BICYCLING', or 'TRANSIT'
        },
        (response, status) => {
          if (status === "OK") {
            this.path = response.routes[0].overview_path.map((point) => {
              return { lat: point.lat(), lng: point.lng() };
            });
            this.center = this.origin; // Set map center to origin
          } else {
            console.error("Directions request failed due to " + status);
          }
        },
      );
      // Create a polyline to draw the route
      const route = new google.maps.Polyline({
        path: this.routeCoordinates,
        geodesic: true,
        strokeColor: "blue",
        strokeOpacity: 0.6,
        strokeWeight: 5,
      });

      console.log(route);

      this.mapView.$mapPromise.then(() => {
        route.setMap(this.mapView.$map);
      });
    },
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
