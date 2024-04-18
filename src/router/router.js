import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import Authentication from "@/components/Authentication.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/restaurants/:restaurantId",
    name: "Restaurant",
    component: Restaurant
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Authentication
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Authentication" && !Cookies.get("token")) {
    next({ name: "Authentication" });
  } else {
    next();
  }
});
