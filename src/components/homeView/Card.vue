<template>
  <div class="restaurant-card">
    <router-link :to="`/restaurants/${restaurant.id}`" class="router-link">
      <img
        :src="restaurant.pictures[0]"
        class="card-img-top"
        :alt="restaurant.name"
      />
      <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text">{{ formatGenres(restaurant.genres) }}</p>
        <p class="card-text">{{ "rating: " + restaurant.rating.toFixed(2) }}</p>
        <p class="card-text">
          {{ "price: " + formatPriceRange(restaurant.price_range) }}
        </p>
      </div>
      <div>
        <router-link to="/restaurant">
          <button class="btn btn-outline-success">Register a visit</button>
        </router-link>
      </div>
    </router-link>
    <div>
      <button class="btn btn-outline-success" @click="print">
        Register a visit
      </button>
    </div>
  </div>
</template>

<script>
import { Restaurant } from "@/components/homeView/script/card.utility";

export default {
  props: {
    restaurant: {
      type: Restaurant,
      required: true,
    },
  },
  methods: {
    formatGenres(genres) {
      return genres.join(", ").replace(/["[\]]/g, ""); // Retire les guillemets et crochets
    },
    formatPriceRange(priceRange) {
      switch (priceRange) {
        case 1:
          return "$";
        case 2:
          return "$$";
        case 3:
          return "$$$";
        default:
          return ""; // Handle unexpected values
      }
    },
  },
};
</script>

<style scoped>
.restaurant-card {
  position: relative;
  width: 250px;
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
  position: relative;
  padding: 15px;
  margin: 0rem;
  display: flow;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}

.card-title {
  margin: 0;
  font-size: 13px;
  font-weight: bold;
}

.card-title:hover {
  text-decoration: underline;
}

.card-text {
  font-size: 11px;
  color: #666;
  flex-grow: 1;
  margin-bottom: 0rem;
}

.btn {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  text-align: center;
}

.router-link {
  text-decoration: none;
  color: inherit;
}

</style>
