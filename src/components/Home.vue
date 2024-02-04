<template>
  <div>
    <Navbar
      :toggleSidebar="toggleSidebar"
      :filterRestaurants="filterRestaurants"
      :restaurants="restaurants"
      :showAccountPopup="showAccountPopup"
    />
    <Sidebar :isSidebarOpen="isSidebarOpen" />
    <button class="toggleFilter" @click="toggleFilterBar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-funnel"
        viewBox="0 0 16 16"
      >
        <path
          d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
        />
      </svg>
      Filter
    </button>
    <RestaurantFilter
      :showFilterBar="showFilterBar"
      :selectedPrice="selectedPrice"
      :selectedCategory="selectedCategory"
      @update-selected-price="updateSelectedPrice"
      @update-selected-category="updateSelectedCategory"
      @filter-restaurants="filterRestaurants"
      @reset-filters="reset"
    />
    <RestaurantCards :filteredRestaurants="selectedRestaurants" />
    <AccountPopup :showPopup="showPopup" :closePopup="closePopup" />
  </div>
</template>

<script>
import Navbar from "./HomeOrg/NavBar.vue";
import Sidebar from "./HomeOrg/SideBar.vue";
import RestaurantCards from "./HomeOrg/RestaurantCards.vue";
import AccountPopup from "./HomeOrg/AccountPopuP.vue";
import RestaurantFilter from "@/components/HomeOrg/RestaurantFilter.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    RestaurantCards,
    AccountPopup,
    RestaurantFilter,
  },
  data() {
    return {
      isSidebarOpen: false,
      showPopup: false,
      showFilterBar: false,
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
          selectedCategory: "Asian Cuisine",
        },
        {
          id: 4,
          name: "Papa's Pizzeria",
          description: "The famous PAPA's pizza",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
          selectedPrice: "$",
          selectedCategory: "Fast Food",
        },
        {
          id: 5,
          name: "Cake factory",
          description: "The spot for a sweet tooth",
          image:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D",
          selectedPrice: "$$",
          selectedCategory: "Desert",
        },
        {
          id: 6,
          name: "Borgir",
          description: "Burgers.",
          image:
            "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
          selectedPrice: "$$",
          selectedCategory: "Fast food",
        },
        {
          id: 7,
          name: "MamaMia",
          description: "Italian Pasta.",
          image:
            "https://plus.unsplash.com/premium_photo-1671547330493-b07d377085ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
          selectedPrice: "$$$",
          selectedCategory: "Italian Cuisine",
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
      ],
      selectedPrice: "All",
      selectedCategory: "All",
    };
  },
  created() {
    // Initialise selectedRestaurants with all the restaurants at the beginning
    this.selectedRestaurants = this.restaurants;
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter((restaurant) => {
        const matchesPrice =
          this.selectedPrice === "All" ||
          this.selectedPrice === "" ||
          restaurant.selectedPrice === this.selectedPrice;
        const matchesCategory =
          this.selectedCategory === "All" ||
          this.selectedCategory === "" ||
          restaurant.selectedCategory === this.selectedCategory;
        console.log(
          restaurant +
            " matches price:" +
            matchesPrice +
            " matches Category:" +
            matchesCategory,
        );
        return matchesPrice && matchesCategory;
      });
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    showAccountPopup() {
      this.showPopup = !this.showPopup;
    },
    closePopup() {
      this.showPopup = false;
    },
    toggleFilterBar() {
      this.showFilterBar = !this.showFilterBar;
    },
    updateSelectedPrice(newPrice) {
      this.selectedPrice = newPrice;
    },
    updateSelectedCategory(newCategory) {
      this.selectedCategory = newCategory;
    },
    filterRestaurants() {
      this.selectedRestaurants = [...this.filteredRestaurants];
      console.log(this.selectedRestaurants);
    },
    reset() {
      this.selectedPrice = "All";
      this.selectedCategory = "All";
      this.selectedRestaurants = [...this.filteredRestaurants];
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.navbar h1 {
  margin: 0;
}

.toggleFilter{
  margin-left: 20px;
  margin-bottom: 20px;
}

.restaurant-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.restaurant-card {
  width: 200px; /* Adjust width */
  height: 250px; /* Adjust height */
  margin: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.restaurant-card img {
  width: 100%;
  height: 150px; /* Adjust height */
  border-radius: 5px;
}

.cart-button,
.account-button {
  padding: 10px 20px;
  background-color: yellow;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
}

.sidebar-toggle {
  padding: 10px 20px;
  background-color: white;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: 80px;
  left: -250px; /* Initially hidden */
  width: 220px;
  height: 100%;
  background-color: yellow;
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

.account-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 80px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-content {
  text-align: center;
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: black;
}
</style>
