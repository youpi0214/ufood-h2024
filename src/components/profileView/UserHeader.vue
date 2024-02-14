<template>
  <div>
    <h1>{{ userName }}</h1>

    <div>Rating: 4.5 &star;</div>
  </div>
</template>

<script>
export default {
  name: "UserHeader",
  props: {
    userName: String
  }
};
</script>


<style scoped>

</style>
