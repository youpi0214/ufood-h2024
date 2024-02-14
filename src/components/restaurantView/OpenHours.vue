<script>
export default {
  name: "OpenHours",
  //TODO The data must be dynamically from the restaurant
  data() {
    return {
      openingHours: [
        "Monday: 07:20 - 21:30",
        "Tuesday: 07:20 - 21:30",
        "Wednesday: 07:20 - 21:30",
        "Thursday: 07:20 - 21:30",
        "Friday: 07:20 - 21:30",
        "Saturday: 07:20 - 21:30",
        "Sunday: 07:20 - 21:30",
      ],
    };
  },
};
</script>

<template>
  <div class="open-hours">
    <h1 style="font-weight: bold">Hours :</h1>
    <ul>
      <li v-for="(hour, index) in openingHours" :key="index">{{ hour }}</li>
    </ul>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .open-hours {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
