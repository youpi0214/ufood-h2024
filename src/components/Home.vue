<template>
  <div>
    <div class="search-filter-section">
      <input type="text" placeholder="Search restaurants..." v-model="searchQuery" />
      <select v-model="selectedPriceRange">
        <option value="">Select Price Range</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select v-model="selectedGenre">
        <option value="">Select Genre</option>
        <option value="Lebanese">Lebanese</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Asian">Japanese</option>
        <option value="Italian">Italian</option>
        <option value="American">American</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
    <RestaurantCards :filteredRestaurants="filteredRestaurants" />
  </div>
</template>

<script>
import RestaurantCards from './HomeOrg/RestaurantCards.vue';

export default {
  components: {
    RestaurantCards,
  },
  data() {
    return {
      searchQuery: '',
      selectedPriceRange: '',
      selectedGenre: '',
      restaurants: [
        {
          id: 1,
          name: "Kebab House",
          description: "Authentic Lebanese Kebab",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
          priceRange: "medium",
          genre: "Lebanese",
        },
        {
          id: 2,
          name: "Breakfast Spot",
          description: "Toast, egg benedict and more",
          image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D",
          priceRange: "low",
          genre: "Breakfast",
        },
        {
          id: 3,
          name: "POKI",
          description: "Poke bowls",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
          priceRange: "medium",
          genre: "Asian",
        },
        {
          id: 4,
          name: "Papa's Pizzeria",
          description: "The famous PAPA's pizza",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
          priceRange: "medium",
          genre: "Italian",
        },
        {
          id: 5,
          name: "Cake factory",
          description: "The spot for a sweet tooth",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D",
          priceRange: "medium",
          genre: "Dessert",
        },
        {
          id: 6,
          name: "Borgir",
          description: "Burgers.",
          image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
          priceRange: "low",
          genre: "American",
        },
        {
          id: 7,
          name: "MamaMia",
          description: "Italian Pasta.",
          image: "https://plus.unsplash.com/premium_photo-1671547330493-b07d377085ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
          priceRange: "medium",
          genre: "Italian",
        },
        {
          id: 8,
          name: "A la Japonaise",
          description: "Sushi Fresh",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
          priceRange: "high",
          genre: "Asian",
        },
      ],
    };
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter(restaurant => {
        const matchesSearchQuery = restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesPriceRange = this.selectedPriceRange ? restaurant.priceRange === this.selectedPriceRange : true;
        const matchesGenre = this.selectedGenre ? restaurant.genre === this.selectedGenre : true;
        return matchesSearchQuery && matchesPriceRange && matchesGenre;
      });
    },
  },
};
</script>

<style scoped>
.search-filter-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  gap: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  margin: 20px auto;
  max-width: 800px;
}

.search-filter-section input[type="text"],
.search-filter-section select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:active {
  background-color: #004299;
  transform: scale(0.98);
}
</style>
