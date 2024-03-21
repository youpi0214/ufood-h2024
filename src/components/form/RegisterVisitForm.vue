<template>
  <div>
    <!-- Feedback form (will be displayed as a modal when showForm is true) -->
    <div class="modal-background">
      <div class="modal-content">
        <div style="width: 100%; height: 0.5rem">
          <button class="close-btn" @click="cancelForm">×</button>
        </div>
        <div class="modal-contents">
          <span class="title">Restaurant : </span>
          <span>
            <strong> {{ restaurant.name }}</strong></span
          >
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="comment" class="title">Comment : *</label><br />
              <textarea
                id="comment"
                v-model="userComment"
                placeholder="Please leave a comment"
                :disabled="disabledInput"
              ></textarea>
              <span v-if="!commentValid && !initialValidation" class="error"
                >Please enter a valid comment.</span
              >
            </div>
            <div class="form-group" style="display: flex; flex-direction: row">
              <label style="justify-content: center" for="rating" class="title">
                Rating (1.0-5.0) : *
              </label>
              <input
                type="number"
                id="rating"
                v-model.number="userRating"
                min="1"
                max="5"
                step="0.1"
                :disabled="disabledInput"
              />
              <span v-if="!ratingValid && !initialValidation" class="error"
                >Please enter a valid rating (1.0-5.0).</span
              >
            </div>
            <div class="form-group" style="display: flex; flex-direction: row">
              <label style="justify-content: center" for="date" class="title">
                Date of Visit : *
              </label>
              <input
                type="date"
                id="date"
                v-model="userDate"
                :max="maxDate"
                :disabled="disabledInput"
              />
              <span v-if="!dateValid && !initialValidation" class="error"
                >Please select a valid date.</span
              >
            </div>
            <div style="font-size: 0.75rem; color: gray">* Required fields</div>
            <div class="button-group" style="display: flex">
              <button
                type="submit"
                class="btn btn-success"
                :disabled="!formValid"
                :hidden="disabledInput"
                style="width: 100%; background-color: #ff3434; border: none"
              >
                Submit
              </button>
            </div>
            <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { triggerConfetti } from "@/components/form/script/form.utility";
import { createRestaurantVisit } from "@/api/restaurant.visits";

export default {
  name: "RegisterVisitForm",
  props: {
    userID: {
      type: String,
      default: "619a82f824b6ec0004c9f035",
    },
    restaurant: {
      type: Object,
      default: null,
    },
    visit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      userComment: "",
      userRating: null,
      userDate: "",
      commentValid: false,
      ratingValid: false,
      dateValid: false,
      formSubmitted: false,
      errorMessage: "",
      disabledInput: false,
      initialValidation: true,
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
      if (this.formValid) {
        this.formSubmitted = true;
        const visitData = {
          restaurant_id: this.restaurant.id,
          comment: this.userComment,
          rating: this.userRating,
          date: this.formattedDate,
        };
        if (await createRestaurantVisit(this.userID, visitData)) {
          triggerConfetti();
        } else {
          alert("Visit is not registered");
        }
        this.formSubmitted = false;
        this.closeForm();
      } else {
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
  mounted() {
    if (this.visit) {
      this.userComment = this.visit.comment;
      this.userRating = this.visit.rating;
      this.userDate = this.visit.date.match(/\d{4}-\d{2}-\d{2}/)[0];
      this.disabledInput = true;
    }
  },
};
</script>

<style scoped>
#comment {
  width: 100%;
}

span {
  font-family: Calibri, sans-serif;
}

.title {
  color: #ff3434;
  font-weight: bold;
  font-family: "Calibri Light", sans-serif;
}

input {
  margin-left: 1rem;
}

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
  border-radius: 10px;
  width: 400px;
}

.modal-contents {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .modal-content {
    width: 300px;
  }
}

.close-btn {
  position: absolute;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.5rem;
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
