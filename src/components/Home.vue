<template>
  <div class="container">
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <SideBar
        :isSidebarOpen="isSidebarOpen"
        @close="isSidebarOpen = false"
        @apply-filters="applyFilters"
        @reset-filters="resetFilters"
      />
    </div>
    <div class="main-content">
      <div class="filter-button-container">
        <button
          v-if="!isMobile"
          class="btn btn-success"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          @click="toggleSidebar"
        >
          <i class="bi bi-filter-square-fill"></i>
          Filter
        </button>
      </div>
      <RestaurantCards :filteredRestaurants="selectedRestaurants" />
    </div>
  </div>
</template>

<script>
import RestaurantCards from "./HomeOrg/RestaurantCards.vue";
import SideBar from "./HomeOrg/SideBar.vue";

export default {
  components: {
    RestaurantCards,
    SideBar,
  },
  data() {
    return {
      isSidebarOpen: false,
      searchQuery: "",
      selectedPrice: "",
      selectedCategory: "",
      selectedRestaurants: [],
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
          selectedCategory: "Asian",
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
          selectedCategory: "Asian",
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
    };
  },
  created() {
    // Initialise selectedRestaurants with all the restaurants at the beginning
    this.selectedRestaurants = [...this.restaurants];
  },
  computed: {
    filteredRestaurants: function () {
      return this.restaurants.filter((restaurant) => {
        const matchesSearchQuery = restaurant.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesPrice =
          this.selectedPrice === "All" || !this.selectedPrice
            ? true
            : restaurant.selectedPrice === this.selectedPrice;

        const matchesCategory =
          this.selectedCategory === "All" || !this.selectedCategory
            ? true
            : restaurant.selectedCategory === this.selectedCategory;
        return matchesSearchQuery && matchesPrice && matchesCategory;
      });
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    applyFilters(selectedPrice, selectedCategory) {
      this.selectedPrice = selectedPrice;
      this.selectedCategory = selectedCategory;
      this.selectedRestaurants = [...this.filteredRestaurants];
    },
    resetFilters() {
      this.selectedPrice = "All";
      this.selectedCategory = "All";
      this.selectedRestaurants = [...this.filteredRestaurants];
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 250px;
  transition: width 0.3s ease-in-out;
  z-index: 9999; /* Set a high z-index value to bring the popup to the front */
  height: 100%;
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  position: relative;
}

.filter-button-container {
  position: relative;
  transform: translateX(-50%);
  z-index: 1;
}

@media (max-width: 600px) {
  .btn {
    display: none;
  }
}
</style>
