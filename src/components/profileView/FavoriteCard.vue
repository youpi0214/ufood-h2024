<template>
  <div class="favorite-card">
    <Card :restaurant="restaurant" :registerDisable="true" :removeRestaurant="removeFromList" :activeRemoveBtn="true" />
  </div>
</template>

<script>
import { getRestaurantById } from "@/api/restaurant";
import { Restaurant } from "@/components/homeView/script/card.utility";
import Card from "@/components/homeView/Card.vue";
import { removeRestaurantFromFavoriteList } from "@/api/favorites.lists";

export default {
  name: "FavoriteCard",
  components: { Card },
  props: {
    restaurantId: {
      type: String,
      required: true
    },
    update: {
      type: Function
    },
    removeFromList: {
      type: Function
    },
  },
  data() {
    return {
      restaurant: Restaurant
    };
  },
  async created() {
    const restaurant = await getRestaurantById(this.restaurantId);
    this.restaurant = new Restaurant(restaurant);
  }
};
</script>

<style scoped>
.favorite-card {
  display: flex;
  flex-direction: column;
  margin: 0.2rem;
  align-items: center;
  background-color: #f8f9fa;
}
</style>
