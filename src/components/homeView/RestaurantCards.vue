<template>
  <div class="restaurant-cards">
    <Card
      v-for="restaurant in filteredRestaurants"
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
    filteredRestaurants: {
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
  justify-content: center;
  margin-top: 40px;
}
</style>
