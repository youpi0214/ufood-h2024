<template>
  <div class="restaurant-cards">
    <div
      v-for="restaurant in filteredRestaurants"
      :key="restaurant.id"
      class="restaurant-card"
    >
      <img
        :src="restaurant.image"
        class="card-img-top"
        :alt="restaurant.name"
      />
      <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text">{{ restaurant.description }}</p>
        <a href="#" class="btn btn-primary">Order</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
}

.restaurant-card {
  width: 200px; /* Adjust width */
  height: 300px; /* Adjust height */
  margin: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.restaurant-card img {
  width: 100%;
  height: 150px; /* Adjust height */
  border-radius: 5px;
}
</style>
