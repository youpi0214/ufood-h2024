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
      </div>
      <div>

          <router-link to="/restaurant"><a class="btn btn-outline-success">Register a visit</a></router-link>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filteredRestaurants: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.restaurant-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
}

.restaurant-card {
  position: relative;
  width: 200px;
  height: 300px;
  margin: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.restaurant-card img {
  width: 100%;
  height: 150px;
  border-radius: 5px;
}

.card-body {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}

.card-title {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.card-text {
  font-size: 12px;
  color: #666;
  flex-grow: 1;
}

.btn {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  text-align: center;
}
</style>
