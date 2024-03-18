import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";

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
    path: "/user",
    name: "User",
    component: User,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
