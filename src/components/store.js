import { createStore } from "vuex";

const store = createStore({
  state: {
    selectedFilters: {
      price: "",
      category: "",
    },
    isSidebarOpen: false,
    restaurants: [],
    user: null,
    isAuthenticated: false,
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
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    clearAuthState(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    changeSideBarState({ commit }) {
      commit("changeSideBarState");
    },
    setSelectedFilters({ commit }, filters) {
      commit("setSelectedFilters", filters);
    },
    loginUser({ commit }, user) {
      commit("setUser", user);
    },
    logoutUser({ commit }) {
      commit("clearAuthState");
    },
  },
  getters: {
    selectedFilters: (state) => state.selectedFilters,
    isSidebarOpen: (state) => state.isSidebarOpen,
    isAuthenticated: (state) => state.isAuthenticated,
    userName: (state) => (state.user ? state.user.name : ""),
  },
});

export default store;
