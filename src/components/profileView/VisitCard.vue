<template>
  <div class="visit-card">
    <div v-for="(resto, index) in this.restaurants" :key="index" @click="openModal">
      <strong>{{ resto.name }}</strong>
      <div> Visits: {{ total }}</div>
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
          <div
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            style="position: absolute; right: 5%; top: 5%"
            @click="closeModal"
            aria-label="Close"
          ></div>
          <div v-if="dateClicked" style="position:absolute; left: 5%; top: 5%" @click="dateClicked=false"> Back </div>
          <div class="modal-body" style="padding-top: 2rem">
            <div v-if="dateClicked">
              <!--                <div>Name : {{ this.restaurants[0].name }}</div>-->
<!--                <div>Date : {{ visits[0].date }}</div>-->
                <div>Comment : {{ visit.comment }}</div>
                <div>Rating : {{ visit.rating }}</div>
            </div>
            <div v-if="dateClicked === false">
              <div id="visit" v-for="visit in visits" :key="visit.id">
                <div
                  @click="dateClicked = true"
                  id="visit"
                  style="height: 2.5rem; padding: 0.5rem"
                >{{ visit.date.slice(0, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
        v-for="resto in restaurants"
        :key="resto.id"
        :show-form="showForm"
        :restaurant="resto"
        :visit="visit"
        @close="hideFeedbackForm"
      >
      </RegisterVisitForm>
    </div>
  </div>
</template>

<script>
import { getRestaurantVisitsByUserAndRestaurant } from "@/api/restaurant.visits";
import { getRestaurantById } from "@/api/restaurant";
import { getAllAvailableDataWithQueryFunction } from "@/components/profileView/script/profile.utility";
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import { Modal } from "bootstrap";

export default {
  name: "VisitCard",
  components: { RegisterVisitForm },
  props: {
    restaurantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      restaurants: [],
      visits: [],
      total: { type: Number },
      showForm: false,
      visit: { default: null },
      dateClicked: false,
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
      const res = [await getRestaurantById(this.restaurantId)];
      for (const restaurant of res) {
        if (restaurant) {
          this.restaurants.push(restaurant);
        }
      }
    },
    openModal() {
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

#visit:hover {
  background-color: #f1f1f1;
}
</style>
