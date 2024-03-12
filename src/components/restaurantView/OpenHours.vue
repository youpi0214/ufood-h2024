<script>
import { formatString } from "@/components/restaurantView/PageHeaderInfos.vue";

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
  <div class="open-hours">
    <h1 style="font-weight: bold">Hours :</h1>
    <ul>
      <li v-for="(hours, day) in openingHours" :key="day">
        {{ formatString(day) + ":" }} {{ hours || "Closed" }}
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
