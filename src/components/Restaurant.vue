<template>
  <div id="header">
   <PageHeaderInfos></PageHeaderInfos>
    <div id="photoMapContainer">
      <div class="row">
        <div class="col-8">
          <ImageSlider></ImageSlider>
        </div>
        <div class="col-4">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
            "
          >
            <GMapMap
              :center="restaurantLocation"
              :zoom="18"
              map-type-id="terrain"
              style="height: 500px"
            >
              <GMapMarker :position="restaurantLocation" />
            </GMapMap>
            <button type="button" class="btn-primary">GET DIRECTIONS</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeaderInfos from "@/components/restaurant_view/PageHeaderInfos.vue";
import ImageSlider from "@/components/restaurant_view/ImageSlider.vue";
</script>

<style></style>
<script>
import MapView from "@/components/restaurant_view/MapView.vue";

const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
export default {
  name: "Restaurant",
  data() {
    return {
      restaurantLocation: { lat: 46.782878601986255, lng: -71.28690361946938 },
      name: "McDonald's",
      rate: "★ 4.8",
      location: "⚲ 2520 Chem. des Quatre-Bourgeois, QC, G1V 4R2",
    };
  },
};
</script>

<style>
#header {
  font-family: Arial, sans-serif;
  display: flex;
  margin-top: 15px;
  padding-left: 10px;
  justify-content: space-between;
  flex-direction: column;
}

.subtitle {
  font-size: 20px;
}

#rating {
  background-color: green;
}

.image-container {
  display: flex;
  flex-direction: column;
}

#photoMapContainer {
  display: flex;
  flex-direction: row;
}

#title {
  font-size: 60px;
  margin-top: 15px;
  font-weight: bold;
}

.button-container {
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  margin-top: 10px;
  background-color: #392992;
  color: whitesmoke;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.row {
  display: flex;
  flex: 1 0 100%;
  flex-wrap: wrap;
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
}

.col-4 {
  flex: 0 0 auto;
  width: 33.333333%;
}

.col-8 {
  flex: 0 0 auto;
  width: 66.666667%;
}
</style>
