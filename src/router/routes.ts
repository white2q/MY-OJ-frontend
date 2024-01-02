import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/auth/NoAuthView.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import QuestionAddView from "@/views/question/QuestionAddView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "user",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "login",
        component: LoginView,
      },
      {
        path: "/user/register",
        name: "register",
        component: RegisterView,
      },
    ],
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: QuestionAddView,
    meta: {},
  },
  {
    path: "/noAuth",
    name: "404",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },

  // {
  //   path: "/admin",
  //   name: "admin",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //     // hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
