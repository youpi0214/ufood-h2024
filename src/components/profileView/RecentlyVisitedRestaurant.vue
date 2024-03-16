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
import { RestaurantQueryOptions } from "@/api/api.utility";
import { getAllFavoriteLists } from "@/api/favorites.lists";
import { filterUniqueRestaurantIds } from "@/components/profileView/script/profile.utility";

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
  methods: {
    async updateVisits() {
      this.visits = [];
      let queryQuantity = 10;
      let totalQueries = (await this.getTotal()) / queryQuantity;
      let recentlyVisited = [];

      for (let i = 0; i < totalQueries; i++) {
        const options = [
          [RestaurantQueryOptions.LIMIT, queryQuantity],
          [RestaurantQueryOptions.PAGE, i],
        ];
        const [visits, _] = await getUserRestaurantVisits(this.id, options);
        for (let visit of visits) {
          recentlyVisited.push(visit);
        }
      }
      this.visits = filterUniqueRestaurantIds(recentlyVisited);
    },
    async getTotal() {
      const [_, total] = await getUserRestaurantVisits(this.id);
      return total;
    },
  },
  async created() {
    await this.updateVisits();
  },
};
</script>

<style scoped>
#empty-recently-visited-restaurants {
  margin-top: 2rem;
  text-align: center;
}

.recently-visited-restaurants-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
