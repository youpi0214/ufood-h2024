import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Restaurant from "@/pages/Restaurant.vue";
import User from "@/pages/User.vue";
import Authentication from "@/pages/Authentication.vue";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";

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

router.beforeEach((to, from, next) => {
  if (to.name !== "Authentication" && !Cookies.get("token")) {
    displayPopup(
      "Please Login",
      "You need to be authenticated to access this page.",
    );

    next({ name: "Authentication" });
  } else if (!Cookies.get("token") && from.name !== "Authentication" && to.name !=="Authentication"){
    displayPopup(
      "Please Login",
      "Token invalid or expired, please log in again",
    );
    next({ name: "Authentication" });
  }
    else {
    next();
  }
});

function displayPopup(title, message) {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade", "show");
  modal.setAttribute("role", "dialog");
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const modalInstance = new Modal(modal);
  modalInstance.show();
  setTimeout(() => {
    modalInstance.hide();
    document.body.removeChild(modal);
  }, 4000);
}
