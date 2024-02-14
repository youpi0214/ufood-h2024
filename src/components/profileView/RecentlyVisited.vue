<template>
  <div>
    <h1>Recently Visited</h1>
    <div v-for="restaurant in restaurantArray" :key="restaurant.name">
      <p>{{ restaurant.name }} - {{ restaurant.Visits }} Visits</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentlyVisited",
  data() {
    return {
      restaurantArray: [
        {
          name: "Kebab House",
          Visits: 3,
        },
        {
          name: "Breakfast Spot",
          Visits: 2,
        },
        {
          name: "POKI",
          Visits: 1,
        },
        {
          name: "Papa's Pizzeria",
          Visits: 4,
        },
        {
          name: "Dessert House",
          Visits: 5,
        },
        {
          name: "Sushi Bar",
          Visits: 6,
        },
        {
          name: "Burger House",
          Visits: 7,
        },
        {
          name: "Pasta House",
          Visits: 8,
        },
        {
          name: "American Diner",
          Visits: 9,
        },
        {
          name: "Lebanese House",
          Visits: 10,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
