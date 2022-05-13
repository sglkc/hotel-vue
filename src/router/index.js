import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import store from "../store";

function decode() {
  if (!store.state.JWT_TOKEN) return false;
  if (!store.state.USER) return false;
  return store.state.USER;
}

function admin(to, from, next) {
  const decoded = decode();

  if (!decoded) return next({ name: "staff" });
  if (["admin"].includes(decoded.role_name)) return next();
  else return next({ name: "staff" });
}

function staff(to, from, next) {
  const decoded = decode();

  if (!decoded) return next({ name: "staff" });
  if (["admin", "receptionist"].includes(decoded.role_name)) {
    return next();
  } else return next({ name: "staff" });
}

function user(to, from, next) {
  const decoded = decode();

  if (!decoded) return next("/");
  if (["admin", "receptionist", "user"].includes(decoded.role_name)) {
    return next();
  } else return next("/");
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
    path: "/receipt",
    name: "receipt",
    component: () => import("../components/Receipt.vue"),
    beforeEnter: user,
  },
  {
    path: "/staff",
    name: "staff",
    component: () => import("../views/StaffView.vue"),
  },
  {
    path: "/staff/reservations",
    name: "reservations",
    component: () => import("../views/ReservationsView.vue"),
    beforeEnter: staff,
  },
  {
    path: "/staff/rooms",
    name: "rooms",
    component: () => import("../views/RoomsView.vue"),
    beforeEnter: admin,
  },
  {
    path: "/staff/rooms/types",
    name: "roomtypes",
    component: () => import("../views/RoomTypesView.vue"),
    beforeEnter: admin,
  },
  {
    path: "/staff/rooms/facilities",
    name: "roomfacilities",
    component: () => import("../views/RoomFacilitiesView.vue"),
    beforeEnter: admin,
  },
  {
    path: "/staff/facilities",
    name: "facilities",
    component: () => import("../views/FacilitiesView.vue"),
    beforeEnter: admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
