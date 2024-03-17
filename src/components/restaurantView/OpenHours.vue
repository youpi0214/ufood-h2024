<script>

import { formatString } from "@/components/restaurantView/script/utils";

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
    formatString,
  },
};
</script>

<template>
  <div class="open-hours" style="margin: 15px">
    <div style="color: black; font-weight: bold">
      <i class="bi bi-clock"> </i>
      <span style="margin-left: 5px; text-decoration-line: underline"
        >Opening Hours :</span
      >
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
@media (max-width: 600px) {
  .open-hours {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
