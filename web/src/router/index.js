import Vue from "vue";
import VueRouter from "vue-router";
import adminRoute from "@/router/admin";
import clientRoute from "@/router/client";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/reload",
    name: "Reload",
    component: () => import("@/components/Reload"),
    meta: {
      permission: ["admin", "client"],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      permission: ["admin", "client"],
    },
  },
  ...adminRoute,
  ...clientRoute,
  {
    path: "/error500",
    name: "500",
    component: () => import("@/views/Error/500"),
    meta: {
      permission: ["admin", "client"],
    },
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/Error/404"),
    meta: {
      permission: ["admin", "client"],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
