<script>
export default {
  name: "OpenHours",
  props: {
    openingHours: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  methods: {
    formatDay(day) {
      return day.charAt(0).toUpperCase() + day.slice(1);
    },
  },
};
</script>

<template>
  <div class="open-hours">
    <h1 style="font-weight: bold">Hours :</h1>
    <ul>
      <li v-for="(hours, day) in openingHours" :key="day">
        {{ formatDay(day) + ":" }} {{ hours || "Closed" }}
      </li>
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
