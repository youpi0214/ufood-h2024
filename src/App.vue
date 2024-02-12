<template>
  <div id="app">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>

import TopBar from "@/components/HomeOrg/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },
};
</script>

<style>
/* Add global styles here */
</style>
