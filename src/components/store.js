import { createStore } from "vuex";

export default createStore({
  state: {
    selectedFilters: {
      price: "All",
      category: "All",
    },
    isSidebarOpen: false,
    restaurants: [
      {
        id: 1,
        name: "Kebab House",
        description: "Authentic Lebanese Kebab",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
        selectedPrice: "$$",
        selectedCategory: "Mediterranean Cuisine",
      },
      {
        id: 2,
        name: "Breakfast Spot",
        description: "Toast, egg benedict and more",
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D",
        selectedPrice: "$",
        selectedCategory: "Breakfast",
      },
      {
        id: 3,
        name: "POKI",
        description: "Poke bowls",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
        selectedPrice: "$$",
        selectedCategory: "Asian Cuisine",
      },
      {
        id: 4,
        name: "Papa's Pizzeria",
        description: "The famous PAPA's pizza",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
        selectedPrice: "$$",
        selectedCategory: "Italian",
      },
      {
        id: 5,
        name: "Cake factory",
        description: "The spot for a sweet tooth",
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D",
        selectedPrice: "$$",
        selectedCategory: "Dessert",
      },
      {
        id: 6,
        name: "Borgir",
        description: "Burgers.",
        image:
          "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
        selectedPrice: "$",
        selectedCategory: "American",
      },
      {
        id: 7,
        name: "MamaMia",
        description: "Italian Pasta.",
        image:
          "https://plus.unsplash.com/premium_photo-1671547330493-b07d377085ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
        selectedPrice: "$$",
        selectedCategory: "Italian",
      },
      {
        id: 8,
        name: "A la Japonaise",
        description: "Sushi Fresh",
        image:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
        selectedPrice: "$$$",
        selectedCategory: "Asian Cuisine",
      },
      {
        id: 9,
        name: "DumDumling",
        description: "Dumplings in all shapes and tastes.",
        image:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGZvb2R8ZW58MHwwfDB8fHww",
        selectedPrice: "$",
        selectedCategory: "Asian Cuisine",
      },
      {
        id: 10,
        name: "SteakHouse",
        description: "Finest steaks.",
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxmb29kfGVufDB8MHwwfHx8MA%3D%3D",
        selectedPrice: "$$$",
        selectedCategory: "Fine Dinning",
      },
      {
        id: 11,
        name: "Izuka",
        description: "A burst of flavor from different cuisines",
        image:
          "https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxmb29kfGVufDB8MHwwfHx8MA%3D%3D",
        selectedPrice: "$$$",
        selectedCategory: "Fine Dinning",
      },
      {
        id: 12,
        name: "Pastry Haven",
        description: "All kind of pasties",
        image:
          "https://images.unsplash.com/photo-1586724832670-3b5ddb084c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGZvb2QlMjBkZXNlcnR8ZW58MHwwfDB8fHww",
        selectedPrice: "$$",
        selectedCategory: "Dessert",
      },
      {
        id: 13,
        name: "MakiMaki",
        description: "Macaroons",
        image:
          "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGZvb2QlMjBkZXNlcnR8ZW58MHwwfDB8fHww",
        selectedPrice: "$",
        selectedCategory: "Dessert",
      },
      {
        id: 14,
        name: "Poella",
        description: "Paella and fish dishes.",
        image:
          "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2R8ZW58MHwwfDB8fHww",
        selectedPrice: "$$",
        selectedCategory: "Mediterranean Cuisine",
      },
      {
        id: 15,
        name: "Pinnochio",
        description: "Italian gelato",
        image:
          "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2QlMjBnZWxhdG98ZW58MHwwfDB8fHww",
        selectedPrice: "$",
        selectedCategory: "Dessert",
      },
      {
        id: 16,
        name: "Cohe",
        description: "Finest coffee",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMGNvZmVlfGVufDB8MHwwfHx8MA%3D%3D",
        selectedPrice: "$",
        selectedCategory: "Dessert",
      },
      {
        id: 17,
        name: "Po",
        description: "Pho.",
        image:
          "https://images.unsplash.com/photo-1478749485505-2a903a729c63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMHBob3xlbnwwfDB8MHx8fDA%3D",
        selectedPrice: "$",
        selectedCategory: "Asian Cuisine",
      },
      {
        id: 18,
        name: "Elfonco",
        description: "Italian Fine dinning experience",
        image:
          "https://images.unsplash.com/photo-1464093515883-ec948246accb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2QlMjBmaW5lJTIwZGluaW5nfGVufDB8MHwwfHx8MA%3D%3D",
        selectedPrice: "$$$",
        selectedCategory: "Fine Dinning",
      },
    ],
  },
  mutations: {
    OPEN_SIDEBAR(state) {
      state.isSidebarOpen = true;
    },
    CLOSE_SIDEBAR(state) {
      state.isSidebarOpen = false;
    },
    //mettre à jour l'état de la sidebar lorsque vous changez de mode
    UPDATE_SIDEBAR_STATE(state, isOpen) {
      state.isSidebarOpen = isOpen;
    },
    SET_SELECTED_FILTERS(state, { price, category }) {
      state.selectedFilters = { price, category };
    },
  },
  actions: {
    // Action pour ouvrir la sidebar
    openSidebar({ commit }) {
      commit("OPEN_SIDEBAR");
    },
    // Action pour fermer la sidebar
    closeSidebar({ commit }) {
      commit("CLOSE_SIDEBAR");
    },
    // Action pour mettre à jour l'état de la sidebar lorsque vous changez de mode
    updateSidebarState({ commit }, isOpen) {
      commit("UPDATE_SIDEBAR_STATE", isOpen);
    },
    setSelectedFilters({ commit }, filters) {
      commit("SET_SELECTED_FILTERS", filters);
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
