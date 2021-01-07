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
];

export default routes;
