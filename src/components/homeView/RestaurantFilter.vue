<template>
  <div
    class="offcanvas-lg offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
    </div>
    <div class="offcanvas-body">
      <div>
        <h6>Price:</h6>
        <ul class="list-unstyled">
          <li v-for="price in prices" :key="price.value">
            <input
              type="radio"
              :id="`price-${price.value}`"
              :value="price.value"
              :checked="selectedPrice === price.value"
              @change="updateSelectedPrice(price.value)"
            />
            <label :for="`price-${price.value}`">{{ price.label }}</label>
          </li>
        </ul>
      </div>
      <div>
        <h6>Category:</h6>
        <ul class="list-unstyled">
          <li v-for="genre in filterGenres" :key="genre">
            <input
              type="checkbox"
              :id="`category-${genre}`"
              :value="genre"
              :checked="selectedCategories.includes(genre)"
              @change="updateSelectedCategory($event.target.value)"
            />
            <label :for="`category-${genre}`">{{ genre }}</label>
          </li>
        </ul>
      </div>
      <div class="button-reset">
        <button class="btn btn-secondary mt-3" @click="resetFilters">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterGenres: Array,
    selectedPrice: String,
    selectedCategory: String,
  },
  data() {
    return {
      prices: [
        { value: "All", label: "All" },
        { value: "$", label: "$" },
        { value: "$$", label: "$$" },
        { value: "$$$", label: "$$$" },
      ],
    };
  },
  computed: {
    selectedCategories() {
      return this.selectedCategory.split(','); // Convert selectedCategory string to an array
    }
  },
  methods: {
    updateSelectedPrice(value) {
      this.$emit("apply-filters", value, this.selectedCategory);
    },
    updateSelectedCategory(value) {
      let selectedCategories = this.selectedCategories; // Get the current selected categories array
      if (selectedCategories.includes(value)) {
        selectedCategories = selectedCategories.filter(cat => cat !== value); // Remove the category if already selected
      } else {
        selectedCategories.push(value);
      }
      this.$emit("apply-filters", this.selectedPrice, selectedCategories.join(','));
    },
    resetFilters() {
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
.list-unstyled {
  margin-left: 2rem;
}
</style>
