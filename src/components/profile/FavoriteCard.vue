<template>
  <div class="favorite-card card border-0">
    <Card
      v-for="resto in restaurant"
      :key="resto.id"
      :restaurant="resto"
      :registerDisable="true"
      :removeRestaurant="removeFromList"
      :activeRemoveBtn="isUserOwner"
      :isInFavouriteList="true"
    />
  </div>
</template>

<script>
import { getRestaurantById } from "@/api/restaurant";
import { Restaurant } from "@/components/home/script/card.utility";
import Card from "@/components/home/Card.vue";

export default {
  name: "FavoriteCard",
  components: { Card },
  props: {
    restaurantId: {
      type: String,
      required: true,
    },
    update: {
      type: Function,
    },
    removeFromList: {
      type: Function,
    },
    isUserOwner: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      restaurant: [],
    };
  },
  async created() {
    const result = [await getRestaurantById(this.restaurantId)];
    this.restaurant = result.map((restaurant) => new Restaurant(restaurant));
  },
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
