import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "hotel",
  storage: window.localStorage,
});

export default createStore({
  state: {
    JWT_TOKEN: 0,
    USER: {},
  },
  getters: {},
  mutations: {
    setJWT(state, token) {
      state.JWT_TOKEN = token;
    },
    setUser(state, user) {
      state.USER = user;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
