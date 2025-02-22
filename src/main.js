import { createApp } from "vue";
import { router } from "./router/router";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./pages/store";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
