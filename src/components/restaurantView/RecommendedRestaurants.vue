<script>
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
import { getRestaurants } from "@/api/restaurant";
import Card from "@/components/homeView/Card.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";

export default {
  name: "RecommendedRestaurants",
  components: { Card },
  data() {
    return {
      recommendedRestaurants: null,
    }
  },
  props: {
    currentRestaurant: {
      type: Restaurant,
      required: true
    },
  },
  methods: {
    async getAllRestaurants() {
      const [allRestaurants, _] = await getAllAvailableDataWithQueryFunction(
        getRestaurants,
        [],
        130,
      );
      this.recommendedRestaurants = allRestaurants;
    },
  },
  created() {
    this.getAllRestaurants();
  }
};
</script>

<template>
<div>
  <h2>You may also like </h2>
  <div id="recommendedContainer">
    <div style="display: flex">
      <div style="display: flex; flex-direction: column" v-for="restaurant in recommendedRestaurants" :key="restaurant">
        <Card :restaurant="restaurant" />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
#recommendedContainer {
  background-color: #fafafa;
  margin-bottom: 1rem;
  padding: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>
