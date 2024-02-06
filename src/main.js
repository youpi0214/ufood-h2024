import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
const app = createApp(App);

app.use(router);
app.mount("#app");
