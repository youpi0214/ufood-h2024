<template>
  <div>
    <div v-if="restaurant" class="container">
      <div class="center-header">
        <PageHeaderInfos
          :name="restaurant.name"
          :address="restaurant.address"
          :rating="restaurantRating"
          :tel="restaurant.tel"
          :price_range="restaurant.price_range"
          :genres="restaurant.genres"
        ></PageHeaderInfos>
      </div>
      <div id="photoMapContainer" class="container">
        <div class="row">
          <div class="col-8">
            <ImageSlider :pictures="restaurant.pictures"></ImageSlider>
          </div>
          <div class="col-4">
            <MapView
              :restaurant-location="restaurant.location.coordinates"
            ></MapView>
          </div>
        </div>
      </div>
      <OpenHours :opening-hours="restaurant.opening_hours"></OpenHours>
    </div>
    <div v-else>
      <div
        class="center-header"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div class="spinner-border" role="status"></div>
        <div>Loading...</div>
      </div>
    </div>
  </div>
</template>

<style></style>
<script>
import PageHeaderInfos from "@/components/restaurantView/PageHeaderInfos.vue";
import ImageSlider from "@/components/restaurantView/ImageSlider.vue";
import OpenHours from "@/components/restaurantView/OpenHours.vue";
import MapView from "@/components/restaurantView/MapView.vue";
import { getRestaurantById } from "@/api/restaurant";

const key = "AIzaSyC-TIo4u7jtVVu0yLHFe5hIdh3xICwIMmk";
export default {
  name: "Restaurant",
  // eslint-disable-next-line vue/no-unused-components
  components: { PageHeaderInfos, ImageSlider, OpenHours, MapView },
  data() {
    return {
      restaurant: null,
    };
  },
  computed: {
    restaurantRating() {
      return Math.round(this.restaurant.rating * 100) / 100;
    },
  },
  async created() {
    try {
      this.restaurant = await getRestaurantById(
        this.$route.params.restaurantId,
      );
    } catch (error) {
      console.error("Error getting restaurant...");
    }
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  /* Media query for mobile screens */
  .container {
    flex-direction: column;
    align-items: center;
  }
  .center-header {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .row {
    flex-direction: column;
    align-items: center;
  }
  .col-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: block;
    width: 100%;
  }
}
</style>
