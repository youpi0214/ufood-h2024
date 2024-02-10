<template>
  <div id="header">
    <PageHeaderInfos></PageHeaderInfos>
    <div id="photoMapContainer">
      <div class="row">
        <div class="col-8">
          <ImageSlider></ImageSlider>
        </div>
        <div class="col-4">
          <MapView></MapView>
        </div>
      </div>
    </div>
    <OpenHours></OpenHours>
  </div>
</template>

<style></style>
<script>
import PageHeaderInfos from "@/components/restaurant_view/PageHeaderInfos.vue";
import ImageSlider from "@/components/restaurant_view/ImageSlider.vue";
import OpenHours from "@/components/restaurant_view/OpenHours.vue";
import MapView from "@/components/restaurant_view/MapView.vue";

const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
export default {
  name: "Restaurant",
  components: { PageHeaderInfos, ImageSlider, OpenHours, MapView },
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

#photoMapContainer {
  display: flex;
  flex-direction: row;
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
