import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);

app.use(router).use(bootstrap);
// app.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyAsL466PcSItMpYQWSEs7Y56-6WNUpnoAE",
//   },
// });
app.mount("#app");
