import Layout from "@/components/LayOut";
const routes = [
  {
    path: "/user", // 用户列表
    component: Layout,
    redirect: "/user/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/User"),
      },
      {
        path: "add",
        component: () => import("@/views/User/add"),
      },
      {
        path: "edit",
        component: () => import("@/views/User/add"),
      },
      {
        path: "detail",
        component: () => import("@/views/User/add"),
      },
    ],
  },
  {
    path: "/article", // 文章列表
    component: Layout,
    redirect: "/article/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/Article"),
      },
      {
        path: "add",
        component: () => import("@/views/Article/add"),
      },
      {
        path: "edit",
        component: () => import("@/views/Article/add"),
      },
      {
        path: "detail/:id",
        component: () => import("@/views/Article/detail"),
      },
    ],
  },
];

export default routes;
