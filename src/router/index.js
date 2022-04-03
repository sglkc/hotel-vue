import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import axios from "axios";
import store from "../store";

function verify(next) {
  axios
    .post(import.meta.env.VITE_API + "/auth/verify", {
      token: store.state.JWT_TOKEN,
    })
    .then(() => {
      next();
    })
    .catch(() => {
      next({ name: "admin" });
    });
}

const routes = [
  {
    path: "/",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/rooms",
    name: "rooms",
    component: () => import("../views/RoomsView.vue"),
    beforeEnter: (to, from, next) => {
      verify(next);
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
