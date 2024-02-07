<template>
  <div class="map-view">
    <GMapMap :center="restaurantLocation" :zoom="zoom" :map-type-id="mapTypeId">
      <GMapMarker :position="restaurantLocation" />
    </GMapMap>
    <button type="button" class="btn-primary">GET DIRECTIONS</button>
  </div>
</template>

<script setup>
const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
const props = defineProps({
  restaurantLocation: {
    type: Object,
    required: true,
    // TODO this default will be removed once we'll dynamically get the location from the restaurant
    default: () => {
      return { lat: 46.782878601986255, lng: -71.28690361946938 };
    },
  },
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
});

function getDirections() {
  navigator.geolocation.getCurrentPosition();
}
</script>

<script>
const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
export default {
  name: "MapView",
  props: {
    restaurantLocation: {
      type: Object,
      required: true,
      // TODO this default will be removed once we'll dynamically get the location from the restaurant
      default: () => {
        return { lat: 46.782878601986255, lng: -71.28690361946938 };
      },
    },
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
