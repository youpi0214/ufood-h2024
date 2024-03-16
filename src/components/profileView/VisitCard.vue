<template>
  <div class="visit-card">
    <Card :restaurant="restaurant" :registerDisable="true" />
    <div>
      {{ total }}
    </div>
    <Visit v-for="visit in visits" :key="visit._id" :visit="visit" />
  </div>
</template>

<script>
import Card from "@/components/homeView/Card.vue";
import { getRestaurantVisitsByUserAndRestaurant } from "@/api/restaurant.visits";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { getRestaurantById } from "@/api/restaurant";
import Visit from "@/components/profileView/Visit.vue";

export default {
  name: "VisitCard",
  components: {Visit, Card },
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

<style scoped></style>
