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
          <li v-for="category in categories" :key="category.value">
            <input
              type="radio"
              :id="`category-${category.value}`"
              :value="category.value"
              :checked="selectedCategory === category.value"
              @change="updateSelectedCategory(category.value)"
            />
            <label :for="`category-${category.value}`">{{
              category.label
            }}</label>
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
      categories: [
        { value: "All", label: "All" },
        { value: "Asian Cuisine", label: "Asian Cuisine" },
        { value: "Italian", label: "Italian Cuisine" },
        { value: "Fine Dinning", label: "Fine Dinning" },
        { value: "Dessert", label: "Dessert" },
        { value: "Mediterranean Cuisine", label: "Mediterranean Cuisine" },
        { value: "Breakfast", label: "Breakfast" },
      ],
    };
  },
  methods: {
    updateSelectedPrice(value) {
      this.$emit("apply-filters", value, this.selectedCategory);
    },
    updateSelectedCategory(value) {
      this.$emit("apply-filters", this.selectedPrice, value);
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
