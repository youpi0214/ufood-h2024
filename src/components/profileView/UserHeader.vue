<template>
  <div>
    <div id="userName">{{ userName }}</div>

    <div id="rating">★ {{ rating }}</div>
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

<style scoped>
#userName {
  font-weight: bold;
  font-size: large;
}
#rating {
  width: max-content;
  background-color: #f1f1f1;
  padding: 0.25rem 0.5rem;
  border-radius: 5rem;
}
</style>
