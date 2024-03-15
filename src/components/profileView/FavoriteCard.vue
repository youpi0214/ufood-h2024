<template>
  <div class="favorite-card">
    <Card :restaurant="restaurant" />
    <button class="btn btn-danger">remove from list</button>
  </div>
</template>

<script>
import { getRestaurantById } from "@/api/restaurant";
import { Restaurant } from "@/components/homeView/script/card.utility";
import Card from "@/components/homeView/Card.vue";

export default {
  name: "FavoriteCard",
  components: { Card },
  props: {
    restaurantId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      restaurant: Restaurant,
    };
  },
  async created() {
    const restaurant = await getRestaurantById(this.restaurantId);
    this.restaurant = new Restaurant(restaurant);
  },
};
</script>

<style scoped></style>
