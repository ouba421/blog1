import Layout from "@/components/LayOut";
const routes = [
  {
    path: "/home", // 首页
    component: Layout,
    redirect: "/home/index/1",
    children: [
      {
        path: "index/:type",
        component: () => import("@/views/Home"),
        meta: {
          permission: ["client"]
        }
      },
    ],
  },
];

export default routes;
