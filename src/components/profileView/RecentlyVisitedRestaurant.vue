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
      >
        <div type="button" style="background: transparent; border: none">
          Recently Visited
        </div>
      </div>
    </h2>
    <div
      id="collapseTwo"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body" style="padding: 0">
        <div class="recently-visited-restaurants">
          <div
            v-if="visits.length === 0"
            id="empty-recently-visited-restaurants"
          >
            <div>No Visits</div>
            <router-link to="/" v-if="isUserOwner">
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
import Cookies from "js-cookie";

export default {
  name: "RecentlyVisitedRestaurants",
  components: { VisitCard },
  props: {
    id: { type: String, required: true },
  },
  computed: {
    isUserOwner() {
      return this.id === this.userId;
    },
  },
  methods: {
    async fetchUserVisits() {
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
  },
  data() {
    return {
      visits: [],
      userId: Cookies.get("userId"),
    };
  },
  mounted() {
    this.fetchUserVisits();
  },
};
</script>

<style scoped>
#empty-recently-visited-restaurants {
  padding: 1rem;
  text-align: center;
}

#visitsMenu:hover {
  background-color: #e8e8e8;
  cursor: pointer;
}

.recently-visited-restaurants-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
