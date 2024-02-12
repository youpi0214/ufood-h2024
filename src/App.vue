<template>
  <div id="app">
    <!--    <Navigation />-->
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/NavigationOrg/Navigation.vue";
import TopBar from "@/components/HomeOrg/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
    // Navigation,
  },
};
</script>

<style>
/* Add global styles here */
</style>
