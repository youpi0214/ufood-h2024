import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.css";
import store from "./components/store";

const app = createApp(App);

app.use(router).use(bootstrap);
app.use(store);
app.mount("#app");
