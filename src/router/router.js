import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import Authentication from "@/components/Authentication.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurants/:restaurantId",
    name: "Restaurant",
    component: Restaurant,
    props: true,
  },
  {
    path: "/user/:userId",
    name: "User",
    component: User,
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Authentication,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
