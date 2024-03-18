<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
    <ul>
      <RestaurantFilter
        :selectedPrice="selectedPrice"
        :selectedCategory="selectedCategory"
        :filterGenres="filterGenres"
        @apply-filters="handleApplyFilters"
        @reset-filters="resetFilters"
      />
    </ul>
  </aside>
</template>

<script>
import RestaurantFilter from "./RestaurantFilter.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    RestaurantFilter,
  },
  props: {
    filterGenres: Array,
    isSidebarOpen: Boolean,
  },
  computed: {
    ...mapGetters(["selectedFilters"]),
    selectedPrice: {
      get() {
        return this.selectedFilters.price;
      },
      set(value) {
        this.$emit("apply-filters", value, this.selectedCategory);
      },
    },
    selectedCategory: {
      get() {
        return this.selectedFilters.category;
      },
      set(value) {
        this.$emit("apply-filters", this.selectedPrice, value);
      },
    },
  },
  methods: {
    handleApplyFilters(price, category) {
      this.$emit("apply-filters", price, category);
    },
    resetFilters() {
      this.$emit("apply-filters", "", "");
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
.sidebar {
  margin: 5px;
  position: fixed;
  top: 6rem;
  bottom: 0;
  left: -1000px;
  width: 16rem;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #f2f2f2;
  color: black;
  transition: left 0.5s ease;
}

@media (max-width: 600px) {
  .sidebar {
    margin: 5px;
    position: fixed;
    top: 6rem;
    bottom: 0;
    left: -1000px;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    background-color: #f2f2f2;
    color: black;
    transition: left 0.5s ease;
    height: 100%;
  }
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

.button-reset {
  padding-left: 20px;
}
</style>
