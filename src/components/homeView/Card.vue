<template>
  <div class="restaurant-card">
    <div v-if="restaurant.id">
      <router-link
        style="text-decoration-line: none"
        :to="`/restaurants/${restaurant.id}`"
      >
        <img
          v-if="restaurant.pictures && restaurant.pictures.length > 0"
          :src="restaurant.pictures[0]"
          :alt="restaurant.name"
        />
        <div class="card-body">
          <div class="single-line card-title">
            {{ formatRestaurantName(restaurant.name) }}
          </div>
          <div class="card-text">
            <span
              :style="{
                color: ratingColor(restaurant.rating).color,
                fontWeight: 'bold',
              }"
              >{{ "★ " + restaurant.rating.toFixed(2) }}
              {{ ratingColor(restaurant.rating).grade }}</span
            >
            {{ "•" }} {{ "$".repeat(restaurant.price_range) }}
          </div>
          <div class="card-text">{{ formatGenres(restaurant.genres) }}</div>
        </div>
      </router-link>

      <div>
        <div
          class="positioned"
          style="display: flex; flex-direction: row"
          @click="showFeedbackForm"
          :hidden="registerDisable"
        >
          <i class="bi bi-plus-lg"> </i>
          <strong> Register Visit</strong>
        </div>
        <div
          :hidden="!activeRemoveBtn"
          class="positioned removeButton"
          @click="removeFromList(restaurant.id)"
        >
          <i class="bi bi-trash3-fill"> </i>
          Remove from list
        </div>
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
import { formatRestaurantName } from "@/components/homeView/script/home.utility";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import {
  formatGenres,
  ratingColor,
} from "@/components/restaurantView/script/restaurant.utility";

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
    ratingColor,
    formatGenres,
    formatRestaurantName,
    showFeedbackForm() {
      this.showForm = true;
    },
    hideFeedbackForm() {
      this.showForm = false;
    },
    removeFromList(restaurant_id) {
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
  width: 23rem;
  height: 20rem;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.restaurant-card img {
  width: 100%;
  height: 13rem;
  object-fit: fill;
}

.card-body {
  position: relative;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #000000;
}

.card-text {
  font-size: 1rem;
  color: #666;
  flex-grow: 1;
}

.removeButton {
  cursor: pointer;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.removeButton:hover {
  text-decoration-line: underline;
}

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.positioned {
  transition: ease-in-out 0.25s;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 8px;
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translate(-50%, 0);
}
.positioned:hover {
  background-color: #ff3434;
  transition: ease-in-out 0.25s;
  color: white;
  cursor: pointer;
}
.positioned.removeButton:hover {
  background-color: red;
}
div {
  font-family: "Calibri Light", serif;
}
</style>
