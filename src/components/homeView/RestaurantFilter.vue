<template>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
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
              type="checkbox"
              :id="`price-${price.value}`"
              :value="price.value"
              :checked="selectedPrices.includes(price.value)"
              @change="updateSelectedPrice($event.target.value)"
            />
            <label :for="`price-${price.value}`">{{ price.label }}</label>
          </li>
        </ul>
      </div>
      <div>
        <h6>Category:</h6>
        <ul class="list-unstyled" id="category">
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
        <button class="btn btn-success" @click="resetFilters">Reset</button>
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
        { value: "$", label: "$" },
        { value: "$$", label: "$$" },
        { value: "$$$", label: "$$$" },
        { value: "$$$$", label: "$$$$" },
        { value: "$$$$$", label: "$$$$$" },
      ],
    };
  },
  computed: {
    selectedCategories() {
      return this.selectedCategory.split(",");
    },
    selectedPrices() {
      return this.selectedPrice.split(",");
    },
  },
  methods: {
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
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
.list-unstyled {
  margin-left: 2rem;
}

#category {
  overflow: auto;
  max-height: 200px;
}

.button-reset{
  margin-top: 1rem;
}
</style>
