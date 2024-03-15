<template>
  <div>
    <!-- Feedback form (will be displayed as a modal when showForm is true) -->
    <div v-if="showForm" class="modal-background">
      <div class="modal-content">
        <button class="close-btn" @click="cancelForm">×</button>
        <span>Restaurant : </span>
        <span><input disabled :placeholder="restaurant.name" /></span>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="comment">Comment :</label><br />
            <textarea
              id="comment"
              v-model="userComment"
              rows="2"
              cols="30"
            ></textarea>
            <span v-if="!commentValid && formSubmitted" class="error"
              >Please enter a valid comment.</span
            >
          </div>
          <div class="form-group">
            <label for="rating">Rating (1.0-5.0) :</label><br />
            <input
              type="number"
              id="rating"
              v-model.number="userRating"
              min="1"
              max="5"
              step="0.1"
            />
            <span v-if="!ratingValid && formSubmitted" class="error"
              >Please enter a valid rating (1.0-5.0).</span
            >
          </div>
          <div class="form-group">
            <label for="date">Date of Visit :</label><br />
            <input type="date" id="date" v-model="userDate" :max="maxDate" />
            <span v-if="!dateValid && formSubmitted" class="error"
              >Please select a valid date (not in the future).</span
            >
          </div>
          <div
            class="button-group"
            style="display: flex; justify-content: center; align-items: center"
          >
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!formValid"
            >
              Submit
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">
              Cancel
            </button>
          </div>
          <span v-if="errorMessage">{{ errorMessage }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Restaurant } from "@/components/homeView/script/card.utility";
import { createRestaurantVisit } from "@/api/restaurant.visits";
export default {
  props: {
    userID: {
      type: String,
      default: "619a82f824b6ec0004c9f035",
    },
    restaurant: {
      type: Restaurant,
      default: null,
    },
    showForm: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      userComment: "",
      userRating: null,
      userDate: "",
      commentValid: true,
      ratingValid: true,
      dateValid: true,
      formSubmitted: false,
      errorMessage: "",
    };
  },
  computed: {
    formValid() {
      return (
        this.commentValid &&
        this.ratingValid &&
        this.dateValid &&
        this.userDate.trim() !== ""
      );
    },
    maxDate() {
      return new Date().toISOString().split("T")[0];
    },

    formattedDate() {
      return new Date(this.userDate).toISOString();
    },
  },
  methods: {
    async submitForm() {
      this.formSubmitted = true;
      if (this.formValid) {
        console.log("Form submitted!");
        // Form submission logic here
        const visitData = {
          restaurant_id: this.restaurant.id,
          comment: this.userComment,
          rating: this.userRating,
          date: this.formattedDate,
        };
        if (await createRestaurantVisit(this.userID, visitData)) {
          console.log("Visit is created");
        } else {
          alert("Visit is not created");
        }
        this.formSubmitted = false;
        this.closeForm();
      } else {
        console.log(
          "Form not submitted. Please fill out all fields correctly.",
        );
        this.errorMessage = "Please fill out all fields correctly.";
      }
    },
    cancelForm() {
      this.closeForm();
    },
    closeForm() {
      this.$emit("close");
      this.clearForm();
    },
    clearForm() {
      this.userComment = "";
      this.userRating = null;
      this.userDate = "";
      this.commentValid = true;
      this.ratingValid = true;
      this.dateValid = true;
      this.formSubmitted = false;
      this.errorMessage = "";
    },
  },
  watch: {
    userComment(value) {
      this.commentValid = value.trim().length > 0;
    },
    userRating(value) {
      this.ratingValid = typeof value === "number" && value >= 1 && value <= 5;
    },
    userDate(value) {
      const selectedDate = new Date(value);
      const today = new Date();
      this.dateValid = value.trim().length > 0 && selectedDate <= today;
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.error {
  color: red;
}

.form-group {
  margin-bottom: 10px;
}

.button-group button {
  margin-right: 10px;
}

.btn-primary {
  background-color: green;
  color: white;
}

.btn-secondary {
  background-color: red;
  color: white;
}
</style>
