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
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Authentication, // TODO add condional rendering, Authentication when not logged in, Home when logged in
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
