<template>
  <div id="app">
    <TopBar :userName="userName" :isLoggedIn="isLoggedIn" @user-logout="handleUserLogout" />
    <router-view @user-login="handleUserLogin"></router-view>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar
  },
  data() {
    return {
      userName: "",
      isLoggedIn: true
    };
  },
  methods: {
    handleUserLogin(userName, isLoggedIn) {
      this.userName = userName;
      this.isLoggedIn = isLoggedIn;
    },
    handleUserLogout() {
      this.userName = "";
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
/* Add global styles here */
</style>
