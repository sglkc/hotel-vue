import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import mitt from "./mitt";
import store from "./store";

const app = createApp(App);

loadFonts();
app.config.globalProperties.emitter = mitt;
app.config.globalProperties.store = store;
app.use(router).use(store).use(vuetify).mount("#app");
