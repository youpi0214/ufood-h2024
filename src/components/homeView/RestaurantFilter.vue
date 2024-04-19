<template>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="true"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
    ref="sidebar"
  >
    <div class="offcanvas-header" style="width: 100%; padding-bottom: 0">
      <h3 class="offcanvas-title" id="offcanvasExampleLabel">Filter by:</h3>
    </div>
    <button
      style="position: absolute; top: 1px; right: 5px"
      class="btn btn-close filter-btn m-4"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    ></button>
    <div
      class="offcanvas-header"
      style="
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        justify-content: center;
        align-items: start;
      "
    >
      <div
        style="
          border-bottom: 1px solid darkgrey;
          width: 100%;
          margin-bottom: auto;
        "
      ></div>
    </div>
    <div class="offcanvas-body">
      <div>
        <h4>Price</h4>
        <ul class="list-unstyled">
          <li v-for="price in prices" :key="price.value">
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <input
                type="checkbox"
                :id="`price-${price.value}`"
                class="checkbox"
                :value="price.value"
                :checked="selectedPrices.includes(price.value)"
                @change="updateSelectedPrice($event.target.value)"
              />
              <label :for="`price-${price.value}`">{{ price.label }}</label>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h4>Category</h4>
        <ul class="list-unstyled" id="category">
          <li v-for="genre in filterGenres" :key="genre">
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <input
                type="checkbox"
                :id="`category-${genre}`"
                class="checkbox"
                :value="genre"
                :checked="selectedCategories.includes(genre)"
                @change="updateSelectedCategory($event.target.value)"
              />
              <label :for="`category-${genre}`">{{
                formatString(genre)
              }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-buttons" style="margin-bottom: 1rem">
      <button class="btn btn-danger btn-block" @click="resetFilters">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatString } from "../restaurantView/script/restaurant.utility";

export default {
  props: {
    filterGenres: Array,
    selectedPrice: String,
    selectedCategory: String,
  },
  data() {
    return {
      prices: [
        { value: "$", label: "$" },
        { value: "$$", label: "$$" },
        { value: "$$$", label: "$$$" },
        { value: "$$$$", label: "$$$$" },
        { value: "$$$$$", label: "$$$$$" },
      ],
    };
  },
  computed: {
    ...mapGetters(["selectedFilters"]),
    selectedCategories() {
      return this.selectedCategory.split(",");
    },
    selectedPrices() {
      return this.selectedPrice.split(",");
    },
  },
  methods: {
    formatString,
    updateSelectedPrice(value) {
      let selectedPrices = this.selectedPrices;
      const index = selectedPrices.indexOf(value);

      if (index !== -1) {
        selectedPrices.splice(index, 1);
      } else {
        selectedPrices.push(value);
      }

      this.$emit(
        "apply-filters",
        selectedPrices.join(","),
        this.selectedCategory,
      );
    },
    updateSelectedCategory(value) {
      let selectedCategories = this.selectedCategories;
      if (selectedCategories.includes(value)) {
        selectedCategories = selectedCategories.filter((cat) => cat !== value);
      } else {
        selectedCategories.push(value);
      }
      this.$emit(
        "apply-filters",
        this.selectedPrice,
        selectedCategories.join(","),
      );
    },
    resetFilters() {
      this.$emit("apply-filters", "", "");
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .offcanvas {
    width: 70% !important;
  }
}
input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  border: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  accent-color: #ff3434;
}

#category {
  max-height: 200px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
}

label {
  margin: 0;
}
li {
  font-size: 1.25rem;
}
</style>
