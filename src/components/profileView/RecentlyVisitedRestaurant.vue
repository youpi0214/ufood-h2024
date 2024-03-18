<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <div
        id="visitsMenu"
        style="
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        "
        class="accordion-button collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="false"
        aria-controls="collapseTwo"
        @click="toggleArrowRotation"
      >
        <div type="button" style="background: transparent; border: none">
          Recently Visited
        </div>
        <div :class="{ rotateF: isArrowRotated, rotateB: !isArrowRotated }">
          <i class="bi bi-caret-right-fill"></i>
        </div>
      </div>
    </h2>
    <div
      id="collapseTwo"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <div class="recently-visited-restaurants">
          <div
            v-if="visits.length === 0"
            id="empty-recently-visited-restaurants"
          >
            <router-link to="/">
              <button class="btn btn-outline-success">Return Home</button>
            </router-link>
          </div>
          <div class="recently-visited-restaurants-container" v-else>
            <VisitCard
              v-for="visit in visits"
              :restaurantId="visit.restaurant_id"
              :userId="visit.user_id"
              :key="visit.restaurant_id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VisitCard from "@/components/profileView/VisitCard.vue";
import { getUserRestaurantVisits } from "@/api/restaurant.visits";
import {
  extractUniqueAttributeListFromExistingList,
  getAllAvailableDataWithQueryFunction,
} from "@/components/profileView/script/profile.utility";

export default {
  name: "RecentlyVisitedRestaurants",
  components: { VisitCard },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      isArrowRotated: false,
      visits: [],
    };
  },
  methods: {
    toggleArrowRotation() {
      this.isArrowRotated = !this.isArrowRotated;
    },
  },
  async created() {
    const [result, _] = await getAllAvailableDataWithQueryFunction(
      getUserRestaurantVisits,
      [this.id],
      10,
    );
    this.visits = extractUniqueAttributeListFromExistingList(
      result,
      "restaurant_id",
    );
  },
};
</script>

<style scoped>
#empty-recently-visited-restaurants {
  margin-top: 2rem;
  text-align: center;
}

#visitsMenu:hover {
  background-color: #e8e8e8;
  cursor: pointer;
}

.recently-visited-restaurants-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
