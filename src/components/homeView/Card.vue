<template>
  <div class="restaurant-card">
    <div class="router-link" v-if="restaurant.id">
      <img
        v-if="restaurant.pictures && restaurant.pictures.length > 0"
        :src="restaurant.pictures[0]"
        class="card-img-top"
        :alt="restaurant.name"
      />
      <div class="card-body">
        <router-link :to="`/restaurants/${restaurant.id}`">
          <h5 class="card-title">
            {{ formatRestaurantName(restaurant.name) }}
          </h5>
        </router-link>
        <p class="card-text">{{ formatGenres(restaurant.genres) }}</p>
        <p class="card-text">{{ "★ " + restaurant.rating.toFixed(2) }}</p>
        <p class="card-text">
          {{ "price: " + "$".repeat(restaurant.price_range) }}
        </p>
      </div>
      <div>
        <button
          class="btn btn-outline-success"
          @click="showFeedbackForm"
          :hidden="registerDisable"
        >
          Register a visit
        </button>
        <button
          class="btn btn-danger"
          @click="removeFromlist(restaurant.id)"
          :hidden="!activeRemoveBtn"
        >
          remove from list
        </button>
      </div>
    </div>
    <div v-else>
      <!-- Render a placeholder or loading indicator -->
      <span>Loading...</span>
    </div>

    <!-- Feedback form modal -->
    <RegisterVisitForm
      v-if="showForm"
      @close="hideFeedbackForm"
      :restaurant="restaurant"
      :showForm="showForm"
    />
  </div>
</template>

<script>
import { Restaurant } from "@/components/homeView/script/card.utility";
import { formatGenres } from "@/components/restaurantView/PageHeaderInfos.vue";
import { formatRestaurantName } from "@/components/homeView/script/home.utility";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import { removeRestaurantFromFavoriteList } from "@/api/favorites.lists";

export default {
  props: {
    restaurant: {
      type: Restaurant,
      required: true,
    },
    registerDisable: {
      type: Boolean,
      default: false,
    },
    removeRestaurant: {
      type: Function,
    },
    activeRemoveBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    formatGenres,
    formatRestaurantName,
    showFeedbackForm() {
      this.showForm = true;
    },
    hideFeedbackForm() {
      this.showForm = false;
    },
    removeFromlist(restaurant_id) {
      this.removeRestaurant(restaurant_id);
    },
  },
  components: {
    RegisterVisitForm,
  },
};
</script>

<style scoped>
.restaurant-card {
  position: relative;
  width: 250px;
  height: 320px;
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
  color: #000000;
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
