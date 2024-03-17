<template>
  <div class="visit-card">
    <Card :restaurant="restaurant" :registerDisable="true"/>
    <div>
      {{ total }}
    </div>
    <Visit v-for="visit in visits" :key="visit._id" :visit="visit"/>
  </div>
</template>

<script>
import Card from "@/components/homeView/Card.vue";
import {getRestaurantVisitsByUserAndRestaurant} from "@/api/restaurant.visits";
import {Restaurant} from "@/components/homeView/script/card.utility";
import {getRestaurantById} from "@/api/restaurant";
import Visit from "@/components/profileView/Visit.vue";
import {getAllAvailableDataWithQueryFunction} from "@/components/profileView/script/profile.utility";

export default {
  name: "VisitCard",
  components: {Visit, Card},
  props: {
    restaurantId: {type: String, required: true},
    userId: {type: String, required: true},
  },
  data() {
    return {
      restaurant: {},
      visits: [],
      total: {type: Number},
    };
  }, methods: {
    async visitUpdate() {
      [this.visits, this.total] = await getAllAvailableDataWithQueryFunction(getRestaurantVisitsByUserAndRestaurant, [this.userId, this.restaurantId], 10);
      const result = await getRestaurantById(this.restaurantId);
      this.restaurant = new Restaurant(result);
    }
    ,
  }
  ,
  async created() {
    await this.visitUpdate();
  },
};
</script>

<style scoped></style>
