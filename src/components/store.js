import { createStore } from "vuex";

export default createStore({
  state: {
    selectedFilters: {
      price: "All",
      category: "All",
    },
    isSidebarOpen: false,
    restaurants: [],
  },
  mutations: {
    changeSideBarState(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSelectedFilters(state, filters) {
      state.selectedFilters = filters;
      state.selectedCategory = filters.category;
      state.selectedPrice = filters.price;
    },
    updateRestaurant(state, newRestaurants) {
      state.restaurants = newRestaurants;
    },
  },
  actions: {
    // Action to open the sidebar
    changeSideBarState({ commit }) {
      commit("changeSideBarState");
    },
    setSelectedFilters({ commit }, filters) {
      commit("setSelectedFilters", filters);
    },
  },
  getters: {
    filteredRestaurants: (state) => {
      const { price, category } = state.selectedFilters;
      return state.restaurants.filter((restaurant) => {
        const matchesPrice =
          price === "All" || restaurant.selectedPrice === price;
        const matchesCategory =
          category === "All" || restaurant.selectedCategory === category;
        return matchesPrice && matchesCategory;
      });
    },
    selectedFilters: (state) => state.selectedFilters,
    isSidebarOpen: (state) => state.isSidebarOpen,
  },
});
