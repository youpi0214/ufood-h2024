<template>
  <div class="visit">
    <div id="visitDate" @click="showFeedbackForm">
      {{ visit.date.slice(0, 10) }}
    </div>
    <div v-if="showForm">
      <RegisterVisitForm
        :show-form="showForm"
        :UserId="visit.user_id"
        :restaurant="restaurant"
        :visit="visit"
        @close="hideFeedbackForm"
      >
      </RegisterVisitForm>
    </div>
  </div>
</template>

<script>
import RegisterVisitForm from "@/components/form/RegisterVisitForm.vue";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { getRestaurantById } from "@/api/restaurant";

export default {
  name: "Visit",
  components: { RegisterVisitForm },
  props: {
    visit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      restaurant: Restaurant,
    };
  },
  methods: {
    showFeedbackForm() {
      this.showForm = true;
    },
    hideFeedbackForm() {
      this.showForm = false;
    },
  },
  async created() {
    this.restaurant = new Restaurant(
      await getRestaurantById(this.visit.restaurant_id),
    );
  },
};
</script>

<style scoped>
#visitDate {
  cursor: pointer;
}

#visitDate:hover {
  background-color: lightgrey;
}
</style>
