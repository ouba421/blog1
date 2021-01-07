import Layout from "@/components/LayOut";
const routes = [
  {
    path: "/home", // 首页
    component: Layout,
    redirect: "/home/index/JavaScript",
    children: [
      {
        path: "index/:type",
        component: () => import("@/views/Home"),
      },
      {
        path: "detail/:id",
        component: () => import("@/views/Detail"),
      },
    ],
  },
];

export default routes;
