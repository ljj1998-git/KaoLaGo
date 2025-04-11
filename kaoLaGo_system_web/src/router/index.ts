import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/",
      component: () => import("@/layouts/index.vue"),
      children: [
        {
          path: "/dictionary",
          component: () => import("@/views/dictionary/index.vue"),
          meta: {
            title: "字典管理",
          },
        },
        {
          path: "/user",
          component: () => import("@/views/userManage/index.vue"),
          meta: {
            title: "用户管理",
          },
        },
        {
          path: "/page1",
          component: () => import("@/views/page1/index.vue"),
          meta: {
            title: "页面1",
          },
        },
        {
          path: "/page2",
          component: () => import("@/views/page2/index.vue"),
          meta: {
            title: "页面2",
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
