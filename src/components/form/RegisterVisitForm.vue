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
              :disabled="disabledInput"
            ></textarea>
            <span v-if="!commentValid" class="error"
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
              :disabled="disabledInput"
            />
            <span v-if="!ratingValid" class="error"
            >Please enter a valid rating (1.0-5.0).</span
            >
          </div>
          <div class="form-group">
            <label for="date">Date of Visit :</label><br />
            <input
              type="date"
              id="date"
              v-model="userDate"
              :max="maxDate"
              :disabled="disabledInput"
            />
            <span v-if="!dateValid" class="error"
            >Please select a valid date.</span
            >
          </div>
          <div class="button-group" style="display: flex">
            <button
              type="submit"
              class="btn btn-success"
              :hidden="disabledInput"
              style="width: 100%"
            >
              Submit
            </button>
          </div>
          <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";
import { Restaurant } from "@/components/homeView/script/card.utility";
import { createRestaurantVisit } from "@/api/restaurant.visits";

export default {
  name: "RegisterVisitForm",
  props: {
    userID: {
      type: String,
      default: "619a82f824b6ec0004c9f035"
    },
    restaurant: {
      type: Restaurant,
      default: null
    },
    showForm: {
      type: Boolean,
      required: true
    },
    visit: {
      type: Object,
      default: null
    }
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
      disabledInput: false
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
    }
  },
  methods: {
    async submitForm() {
      this.formSubmitted = true;
      if (this.formValid) {
        console.log("Form submitted!");
        const visitData = {
          restaurant_id: this.restaurant.id,
          comment: this.userComment,
          rating: this.userRating,
          date: this.formattedDate
        };
        if (await createRestaurantVisit(this.userID, visitData)) {
          console.log("Visit is created");
          this.triggerConfetti(); // Trigger confetti effect
        } else {
          console.error("Visit is not created");
        }
        this.formSubmitted = false;
        this.closeForm();
      } else {
        console.log(
          "Form not submitted. Please fill out all fields correctly."
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
    triggerConfetti() {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  },
  watch: {
    userComment(value) {
      if (this.formSubmitted) {
        this.commentValid = value.trim().length > 0;
      }
    },
    userRating(value) {
      if (this.formSubmitted) {
        this.ratingValid =
          typeof value === "number" && value >= 1 && value <= 5;
      }
    },
    userDate(value) {
      if (this.formSubmitted) {
        const selectedDate = new Date(value);
        const today = new Date();
        this.dateValid = value.trim().length > 0 && selectedDate <= today;
      }
    }
  },
  mounted() {
    if (this.visit) {
      this.userComment = this.visit.comment;
      this.userRating = this.visit.rating;
      this.userDate = this.visit.date.match(/\d{4}-\d{2}-\d{2}/)[0];
      this.disabledInput = true;
    }
  }
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

@media screen and (max-width: 768px) {
  .modal-content {
    width: 300px;
  }
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
  display: block;
  margin-top: 5px;
}

.form-group {
  margin-bottom: 10px;
}

.button-group button {
  margin-right: 10px;
}
</style>
