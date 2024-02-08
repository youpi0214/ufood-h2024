<template>
  <div>
    <div v-if="showFilterBar">
      <div class="search-bar">
        <div class="filter-group">
          <label>Price:</label>
          <select v-model="localSelectedPrice" @change="updateSelectedPrice">
            <option value="All">All</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Category:</label>
          <select
            v-model="localSelectedCategory"
            @change="updateSelectedCategory"
          >
            <option value="All">All</option>
            <option value="Asian Cuisine">Asian Cuisine</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Desert">Desert</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
            <option value="Mediterranean Cuisine">Mediterranean Cuisine</option>
            <option value="fine dinning">fine dinning</option>
          </select>
        </div>
        <button @click="filteringRestaurants">Apply</button>
        <button @click="resetFilter">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showFilterBar: Boolean,
    selectedPrice: String,
    selectedCategory: String,
    filterRestaurants: Function,
    reset: Function,
  },
  data() {
    return {
      localSelectedPrice: this.selectedPrice,
      localSelectedCategory: this.selectedCategory,
    };
  },
  methods: {
    updateSelectedPrice() {
      this.$emit("update-selected-price", this.localSelectedPrice);
    },
    updateSelectedCategory() {
      this.$emit("update-selected-category", this.localSelectedCategory);
    },
    filteringRestaurants() {
      this.$emit(
        "filter-restaurants",
        this.localSelectedPrice,
        this.localSelectedCategory,
      );
    },
    resetFilter() {
      // Reset local selections to their initial values
      this.localSelectedPrice = "All";
      this.localSelectedCategory = "All";
      // Emit the reset event
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input[type="text"],
.search-bar button,
.search-bar select {
  margin-right: 10px;
}

.search-bar {
  margin-left: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.search-bar label {
  margin-right: 10px;
}

.filter-group {
  margin-right: 20px;
}
</style>
