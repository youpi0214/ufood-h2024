<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="false"
        aria-controls="collapseTwo"
      >
        Recently Visited
      </button>
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
          <div v-else>
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

export default {
  name: "RecentlyVisitedRestaurants",
  components: { VisitCard },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      visits: [],
    };
  },
  async created() {
    const [visits, total] = await getUserRestaurantVisits(this.id);
    this.visits = visits.reduce((accumulator, currator) => {
      const existing = accumulator.find(
        (visitInAccumulator) =>
          visitInAccumulator.restaurant_id === currator.restaurant_id,
      );
      if (!existing) {
        accumulator.push(currator);
      }
      return accumulator;
    }, []);
  },
};
</script>

<style scoped>
#empty-recently-visited-restaurants {
  margin-top: 2rem;
  text-align: center;
}
</style>
