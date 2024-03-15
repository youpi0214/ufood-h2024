<template>
  <div class="visit-card">
    <Card :restaurant="restaurant" :registerDisable="true" />
    <div>
      {{ total }}
    </div>
  </div>
</template>

<script>
import Card from "@/components/homeView/Card.vue";
import { getRestaurantVisitsByUserAndRestaurant } from "@/api/restaurant.visits";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { getRestaurantById } from "@/api/restaurant";

export default {
  name: "VisitCard",
  components: { Card },
  props: {
    restaurantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      restaurant: {},
      visits: [],
      total: { type: Number },
    };
  },
  async created() {
    const [visits, total] = await getRestaurantVisitsByUserAndRestaurant(
      this.userId,
      this.restaurantId,
    );
    this.total = total;
    this.visits = visits;
    const result = await getRestaurantById(this.restaurantId);

    this.restaurant = new Restaurant(result);
  },
};
</script>

<style scoped>

</style>
