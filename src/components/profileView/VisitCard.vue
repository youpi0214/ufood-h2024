<template>
  <div class="visit-card">
    <Card v-for="resto in restaurant" :restaurant="resto" :key="resto.id" :registerDisable="true">

    </Card>
    <div >
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
import {toRaw} from "vue";

export default {
  name: "VisitCard",
  components: {Visit, Card},
  props: {
    restaurantId: {type: String, required: true},
    userId: {type: String, required: true},
  },
  data() {
    return {
      restaurant:[],
      visits: [],
      total: {type: Number},
    };
  },
  methods: {
    toRaw,
    async visitUpdate() {
      [this.visits, this.total] = await getAllAvailableDataWithQueryFunction(
        getRestaurantVisitsByUserAndRestaurant,
        [this.userId, this.restaurantId],
        10,
      );

      const result =[ await getRestaurantById(this.restaurantId)];
      this.restaurant = result.map(
        (restaurant) => new Restaurant(restaurant),
      );

    },
  },
  async created() {
    await this.visitUpdate();
  },
};
</script>

<style scoped></style>
