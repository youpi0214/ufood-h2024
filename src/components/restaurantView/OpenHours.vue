<script>
import { formatString } from "@/components/restaurantView/script/restaurant.utility";

export default {
  name: "OpenHours",
  props: {
    openingHours: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatString,
  },
};
</script>

<template>
  <div class="open-hours">
    <div>
      <i class="bi bi-clock"> </i>
      <span class="title">Opening Hours :</span>
    </div>
    <ul>
      <li v-for="(hours, day) in openingHours" :key="day">
        <span style="font-weight: bold">{{ formatString(day) + ":" }} </span>
        {{ hours || "Closed" }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
div span {
  font-family: "Calibri", sans-serif;
}
.open-hours {
  margin-top: 1rem;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
}
.title {
  color: black;
  font-weight: bold;
  margin-left: 5px;
  text-decoration-line: underline;
}
</style>
