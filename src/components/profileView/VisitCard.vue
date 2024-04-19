<template>
  <div class="visit-card">
    <Card
      v-for="resto in restaurant"
      :restaurant="resto"
      :key="resto.id"
      :registerDisable="true"
    >
    </Card>
    <div></div>

    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <strong> Number of visits : </strong>{{ total }}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li
          class="dropdown-item"
          v-for="visit in visits"
          :key="visit.id"
          @click="showFeedbackForm(visit)"
        >
          {{ visit.date.slice(0, 10) }}
        </li>
      </div>
    </div>

    <div v-if="showForm">
      <RegisterVisitForm
        v-for="resto in restaurant"
        :key="resto.id"
        :show-form="showForm"
        :UserId="visit.user_id"
        :restaurant="resto"
        :visit="visit"
        @close="hideFeedbackForm"
      >
      </RegisterVisitForm>
    </div>
  </div>
</template>

<script>
import Card from "@/components/homeView/Card.vue";
import { getRestaurantVisitsByUserAndRestaurant } from "@/api/restaurant.visits";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { getRestaurantById } from "@/api/restaurant";
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";

export default {
  name: "VisitCard",
  components: { RegisterVisitForm, Card },
  props: {
    restaurantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      restaurant: [],
      visits: [],
      total: { type: Number },
      showForm: false,
      visit: { default: null },
    };
  },
  methods: {
    async showFeedbackForm(visit) {
      this.visit = visit;
      this.showForm = true;
    },
    hideFeedbackForm() {
      this.showForm = false;
    },
    async visitUpdate() {
      [this.visits, this.total] = await getAllAvailableDataWithQueryFunction(
        getRestaurantVisitsByUserAndRestaurant,
        [this.userId, this.restaurantId],
        10,
      );

      const result = [await getRestaurantById(this.restaurantId)];
      this.restaurant = result.map((restaurant) => new Restaurant(restaurant));
    },
  },
  async created() {
    await this.visitUpdate();
  },
};
</script>

<style scoped>
.dropdown-item:hover {
  cursor: pointer;
}

.dropdown {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.dropdown-menu {
  overflow-y: auto;
  max-height: 10rem;
}
</style>
