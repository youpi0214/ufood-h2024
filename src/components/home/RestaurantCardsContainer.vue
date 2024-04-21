<template>
  <div class="restaurant-cards justify-content-center">
    <Card
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  props: {
    restaurants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.restaurant-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
}
</style>
