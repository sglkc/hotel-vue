import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    incrementCount(state, amount) {
      state.count += amount;
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit("incrementCount");
    },
  },
  modules: {},
});
