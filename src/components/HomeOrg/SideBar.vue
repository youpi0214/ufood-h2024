<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
    <ul>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <h6>Price:</h6>
            <ul>
              <li>
                <input type="radio" id="priceAll" value="All" v-model="selectedPrice">
                <label for="priceAll">All</label>
              </li>
              <li>
                <input type="radio" id="priceLow" value="$" v-model="selectedPrice">
                <label for="priceLow">$</label>
              </li>
              <li>
                <input type="radio" id="priceMedium" value="$$" v-model="selectedPrice">
                <label for="priceMedium">$$</label>
              </li>
              <li>
                <input type="radio" id="priceHigh" value="$$$" v-model="selectedPrice">
                <label for="priceHigh">$$$</label>
              </li>
            </ul>
          </div>
          <div>
            <h6>Category:</h6>
            <ul>
              <li>
                <input type="radio" id="categoryAll" value="All" v-model="selectedCategory">
                <label for="categoryAll">All</label>
              </li>
              <li>
                <input type="radio" id="categoryAsian" value="Asian" v-model="selectedCategory">
                <label for="categoryAsian">Asian Cuisine</label>
              </li>
              <li>
                <input type="radio" id="categoryItalian" value="Italian" v-model="selectedCategory">
                <label for="categoryItalian">Italian Cuisine</label>
              </li>
              <li>
                <input type="radio" id="categoryFineDinning" value="Fine Dinning" v-model="selectedCategory">
                <label for="categoryFineDinning">Fine Dinning</label>
              </li>
              <li>
                <input type="radio" id="categoryDessert" value="Dessert" v-model="selectedCategory">
                <label for="categoryDessert">Dessert</label>
              </li>
              <li>
                <input type="radio" id="categoryMediterranean" value="Mediterranean Cuisine" v-model="selectedCategory">
                <label for="categoryMediterranean">Mediterranean Cuisine</label>
              </li>
              <li>
                <input type="radio" id="categoryBreakfast" value="Breakfast" v-model="selectedCategory">
                <label for="categoryBreakfast">Breakfast</label>
              </li>
            </ul>
          </div>
          <div class="button-apply">
            <button class="btn btn-success mt-3" @click="applyFilters">Apply</button>
          </div>
          <div class="button-reset">
            <button class="btn btn-secondary mt-3" @click="resetFilters">Reset</button>
          </div>
        </div>
      </div>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    isSidebarOpen: Boolean
  },
  data() {
    return {
      selectedPrice: "All",
      selectedCategory: "All"
    };
  },
  methods: {
    applyFilters() {
      this.$emit('apply-filters', this.selectedPrice, this.selectedCategory);
    },
    resetFilters() {
      this.selectedPrice = "All";
      this.selectedCategory = "All";
      this.$emit('reset-filters');
    }
  }
};
</script>

<style scoped>
.sidebar {
  margin: 5px;
  position: fixed;
  top: 0px;
  left: -250px; /* Initially hidden */
  width: 220px;
  max-height: 100vh; /* Maximum height to fit the viewport */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: #f0f0f0;
  color: black;
  transition: left 0.5s ease;
}
.sidebar ul {
  list-style-type: none;
  padding: 0;
}
.sidebar li {
  padding: 10px;
}
.sidebar-open {
  left: 0;
}

.button-apply {
  padding-left: 20px;
}

.button-reset {
  padding-left: 20px;
}
</style>
