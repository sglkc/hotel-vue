import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import axios from "axios";
import store from "../store";

function verify(next) {
  if (!store.state.JWT_TOKEN) return next({ name: "staff" });

  console.info("Verifying token...");

  axios
    .post(import.meta.env.VITE_API + "/auth/verify", {
      token: store.state.JWT_TOKEN,
    })
    .then(() => {
      next();
    })
    .catch(() => {
      next({ name: "staff" });
    });
}

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },
  {
    path: "/staff",
    name: "staff",
    component: () => import("../views/StaffView.vue"),
  },
  {
    path: "/staff/rooms",
    name: "rooms",
    component: () => import("../views/RoomsView.vue"),
    beforeEnter: (to, from, next) => {
      verify(next);
    },
  },
  {
    path: "/staff/rooms/types",
    name: "roomtypes",
    component: () => import("../views/RoomTypesView.vue"),
    beforeEnter: (to, from, next) => {
      verify(next);
    },
  },
  {
    path: "/staff/facilities",
    name: "facilities",
    component: () => import("../views/FacilitiesView.vue"),
    beforeEnter: (to, from, next) => {
      verify(next);
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
