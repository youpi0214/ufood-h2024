import { createStore } from "vuex";

const store = createStore({
  state: {
    selectedFilters: {
      price: "",
      category: ""
    },
    isSidebarOpen: false,
    restaurants: [],
    user: { name: "", email: "", id: "" }
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
      state.user.name = user.name;
      state.user.email = user.email;
      state.user.id = user.id;
      console.log(state.user);
    },
    clearAuthState(state) {
      state.user = { name: "", email: "", id: "" };
    }
  },
  actions: {
    changeSideBarState({ commit }) {
      commit("changeSideBarState");
    },
    setSelectedFilters({ commit }, filters) {
      commit("setSelectedFilters", filters);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    clearAuthState({ commit }) {
      commit("clearAuthState");
    }
  },
  getters: {
    selectedFilters: (state) => state.selectedFilters,
    isSidebarOpen: (state) => state.isSidebarOpen,
    user: (state) => state.user
  }
});

export default store;
