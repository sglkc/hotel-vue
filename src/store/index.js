import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "hotel",
  storage: window.localStorage,
});

export default createStore({
  state: {
    JWT: {},
    USER: {},
  },
  getters: {},
  mutations: {
    setJWT(state, object) {
      state.JWT = {
        token: object.token,
        expire: object.timestamp + (2*60*60*1000) // 2h expire
      };
    },
    setUser(state, user) {
      state.USER = user;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
