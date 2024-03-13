<template>
  <div class="favorite-card">
    <Card :restaurant="restaurant" />
    <button class="btn btn-primary">add to List</button>
    <button class="btn btn-danger">remove from list</button>
  </div>
</template>

<script>
import restaurant from "@/components/Restaurant.vue";

export default {
  name: "FavoriteCard",
  props: {
    restaurant: {
      type: restaurant,
      required: true,
    },
  },
};
</script>

<style scoped></style>
