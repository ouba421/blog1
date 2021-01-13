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
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "add",
        component: () => import("@/views/User/add"),
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "edit",
        component: () => import("@/views/User/add"),
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "detail",
        component: () => import("@/views/User/add"),
        meta: {
          permission: ["admin"]
        }
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
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "add",
        component: () => import("@/views/Article/add"),
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "edit",
        component: () => import("@/views/Article/add"),
        meta: {
          permission: ["admin"]
        }
      },
      {
        path: "detail",
        component: () => import("@/views/Article/detail"),
        meta: {
          permission: ["admin", "client"]
        }
      },
    ],
  },
];

export default routes;
