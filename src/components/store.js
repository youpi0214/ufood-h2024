import { createStore } from "vuex";

const store = createStore({
  state: {
    selectedFilters: {
      price: "",
      category: "",
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
    selectedFilters: (state) => state.selectedFilters,
    isSidebarOpen: (state) => state.isSidebarOpen,
  },
});

export default store;
