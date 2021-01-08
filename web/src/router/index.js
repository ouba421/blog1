import Vue from "vue";
import VueRouter from "vue-router";
import adminRoute from "@/router/admin";
import clientRoute from "@/router/client";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/reload",
    name: "Reload",
    component: () => import("@/components/Reload")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login")
  },
  ...adminRoute,
  ...clientRoute,
  {
    path: "/error500",
    name: "500",
    component: () => import("@/views/Error/500")
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/Error/404")
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
