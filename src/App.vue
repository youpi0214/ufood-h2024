<template>
  <div id="app">
    <TopBar
      :userName="userName"
      :isLoggedIn="isLoggedIn"
      @user-logout="handleUserLogout"
    />
    <router-view @user-login="handleUserLogin"></router-view>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Cookies from "js-cookie";

export default {
  name: "App",
  components: {
    TopBar,
  },
  data() {
    return {
      userName: "",
      isLoggedIn: !!Cookies.get("token"),
    };
  },
  methods: {
    handleUserLogin(userName) {
      this.userName = userName;
      this.isLoggedIn = !!Cookies.get("token");
    },
    handleUserLogout() {
      this.userName = "";
      this.isLoggedIn = false;
    },
  },
};
</script>

<style>
/* Add global styles here */
</style>
