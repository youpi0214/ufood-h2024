<template>
  <div class="visit-card">
    <div
      v-for="(resto, index) in this.restaurants"
      :key="index"
      @click="openModal"
    >
      <strong>{{ resto.name }}</strong>
      <div>Visits: {{ total }}</div>
    </div>
    <div
      class="modal fade"
      :id="this.restaurantId"
      tabindex="-1"
      :aria-labelledby="`visit/${this.restaurantId}`"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div
              v-if="dateClicked"
              class="modal-title fs-5"
              :id="`follow/${this.restaurantId}`"
              @click="dateClicked = false"
            >
              <i style="color: #ff3434" class="bi bi-arrow-left">Back</i>
            </div>
            <div
              v-else
              class="modal-title fs-5"
              :id="`follow/${this.restaurantId}`"
            >
              Visit Dates
            </div>
            <div
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="closeModal"
              aria-label="Close"
            ></div>
          </div>
          <div class="modal-body" style="padding: 0">
            <div v-if="dateClicked" style="padding: 0.5rem">
              <div>Comment : {{ this.visitComment }}</div>
              <div>Rating : {{ "★" }} {{ this.visitRating.toFixed(2) }}</div>
            </div>
            <div v-if="!dateClicked">
              <div
                id="visit"
                v-for="visit in visits"
                :key="visit.id"
                style="padding: 0.5rem"
              >
                <div
                  @click="showVisitDetails(visit)"
                  id="visit"
                  style="height: 2.5rem; padding: 0.5rem"
                >
                  {{ visit.date.slice(0, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurantVisitsByUserAndRestaurant } from "@/api/restaurant.visits";
import { getRestaurantById } from "@/api/restaurant";
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
import { Modal } from "bootstrap";

export default {
  name: "VisitCard",
  props: {
    restaurantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      visitComment: "",
      visitRating: "",
      restaurants: [],
      visits: [],
      total: { type: Number },
      visit: { default: null },
      dateClicked: false,
    };
  },
  methods: {
    async visitUpdate() {
      [this.visits, this.total] = await getAllAvailableDataWithQueryFunction(
        getRestaurantVisitsByUserAndRestaurant,
        [this.userId, this.restaurantId],
        10,
      );
      const res = [await getRestaurantById(this.restaurantId)];
      for (const restaurant of res) {
        if (restaurant) {
          this.restaurants.push(restaurant);
        }
      }
    },
    showVisitDetails(visit) {
      this.dateClicked = true;
      this.visitComment = visit.comment;
      this.visitRating = visit.rating;
    },
    openModal() {
      this.dateClicked = false;
      this.followModal.show();
    },
    closeModal() {
      this.followModal.hide();
    },
  },
  mounted() {
    this.followModal = new Modal(
      document.getElementById(this.restaurantId),
      {},
    );
  },
  beforeUnmount() {
    if (this.followModal._isShown) {
      this.closeModal();
      this.dateClicked = false;
    }
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

.visit-card {
  transition: ease-in-out 0.25s;
  padding: 0.5rem;
}

.visit-card:hover {
  background-color: #f1f1f1;
  transition: ease-in-out 0.25s;
  cursor: pointer;
}

#visit {
  transition: ease-in-out 0.25s;
}

#visit:hover {
  background-color: #f1f1f1;
  transition: ease-in-out 0.25s;
  cursor: pointer;
}
</style>
