import { createApp } from "vue";
import { router } from "./router/router";
import App from "./App.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./components/store";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
