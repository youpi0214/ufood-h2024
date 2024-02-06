<template>
  <nav class="navbar">
    <!-- Sidebar toggle button -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <h1 style="color: limegreen">UFood</h1>

    <!-- Search bar with dropdown -->
    <div class="search-bar">
      <input
        ref="searchInput"
        type="text"
        list="restaurants"
        placeholder="Search..."
        v-model="searchInput"
        @input="setDropdownWidth"
      />
      <datalist id="restaurants">
        <option
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :value="restaurant.name"
        ></option>
      </datalist>
      <button @click="searchRestaurants">
        <i class="fas fa-search"></i> Search
      </button>
    </div>

    <p>Menu</p>
    <!-- Cart button -->
    <button class="cart-button"><i class="fas fa-shopping-cart"></i></button>

    <!-- Account button -->
    <button class="account-button" @click="showAccountPopup">
      <i class="fas fa-user"></i>
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    toggleSidebar: Function,
    filterRestaurants: Function,
    restaurants: Array,
    showAccountPopup: Function,
  },
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    searchRestaurants() {
      this.filterRestaurants(this.searchInput);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.navbar h1 {
  margin: 0;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input[type="text"],
.search-bar button {
  margin-right: 10px;
}

.search-bar input[type="text"] {
  width: 200px;
}

.search-bar button {
  cursor: pointer;
}
</style>
