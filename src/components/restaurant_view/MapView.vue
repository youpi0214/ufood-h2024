<template>
  <div class="">
    <div class="">
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
    <button type="button" class="btn btn-primary" @click="getRoute">
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
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      } else alert("Geolocation is not supported by this browser.");
    },
    getRoute() {
      console.log("Getting route...");
    },
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
