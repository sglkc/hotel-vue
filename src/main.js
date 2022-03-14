import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import mitt from "./mitt";

const app = createApp(App);

app.config.globalProperties.emitter = mitt;
loadFonts();
app.use(router).use(vuetify).mount("#app");
