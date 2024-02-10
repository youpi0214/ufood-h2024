<template>
  <div class="container">
    <PageHeaderInfos></PageHeaderInfos>
    <div id="photoMapContainer" class="container">
      <div class="row">
        <div class="col-8">
          <ImageSlider></ImageSlider>
        </div>
        <div class="col-4">
          <MapView></MapView>
        </div>
      </div>
    </div>
    <!--    <OpenHours></OpenHours>-->
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
  // eslint-disable-next-line vue/no-unused-components
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

<style scoped>
@media (max-width: 767px) {
  /* Media query for mobile screens */
  .container {
    /* Styles for vertical alignment */
    flex-direction: column;
  }
}
</style>
