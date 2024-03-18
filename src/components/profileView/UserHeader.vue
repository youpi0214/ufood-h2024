<template>
  <div>
    <h1>{{ userName }}</h1>

    <div>Rating: {{ rating }} &star;</div>
  </div>
</template>

<script>
export default {
  name: "UserHeader",
  props: {
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    id: { type: String, required: true },
  },
};
</script>

<style scoped></style>
