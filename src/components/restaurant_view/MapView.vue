<template>
  <div class="map-view">
    <GMapMap :center="restaurantLocation" :zoom="zoom" :map-type-id="mapTypeId">
      <GMapMarker :position="restaurantLocation" />
    </GMapMap>
    <button type="button" class="btn-primary">{{ buttonText }}</button>
  </div>
</template>

<script>
const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
export default {
  name: "MapView",
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

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
