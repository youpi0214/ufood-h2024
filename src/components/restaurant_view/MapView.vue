<template>
  <div class="container-fluid h-100 bg-light">
    <div class="row h-100">
      <GMapMap
        :center="restaurantLocation"
        :zoom="zoom"
        :map-type-id="mapTypeId"
      >
        <GMapMarker :position="restaurantLocation" />
      </GMapMap>
    </div>

    <button type="button" class="btn-primary">{{ buttonText }}</button>
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
  data() {
    return {
      restaurantLocation: { lat: 46.782878601986255, lng: -71.28690361946938 },
    };
  },
};
</script>

<style scoped></style>
