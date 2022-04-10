import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import store from "../store";

function verify(next) {
  if (!store.state.JWT_TOKEN) return next({ name: "staff" });

  try {
    const token = store.state.JWT_TOKEN;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const exp = parseInt(jsonPayload.exp + "000");

    if (exp < Date.now()) next({ name: "staff" });
    else next();
  } catch {
    next({ name: "staff" });
  }
}

function scrollBehavior(to, from) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        if (to.hash) resolve({ el: to.hash, behavior: "smooth" });
      },
      from.hash ? 0 : 1000
    );
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
    path: "/staff/rooms/facilities",
    name: "roomfacilities",
    component: () => import("../views/RoomFacilitiesView.vue"),
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
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
