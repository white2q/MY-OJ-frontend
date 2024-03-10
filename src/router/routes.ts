import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/auth/NoAuthView.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import QuestionAddView from "@/views/question/QuestionAddView.vue";
import QuestionsManageView from "@/views/question/QuestionsManageView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import QuestionContentView from "@/views/question/QuestionContentView.vue";

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
    path: "/",
    name: "主页",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览页面",
    component: QuestionsView,
  },
  {
    path: "/questions/submit",
    name: "提交记录",
    component: QuestionsSubmitView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: QuestionAddView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: QuestionAddView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: QuestionsManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/content/:id",
    component: QuestionContentView,
    props: true,
    meta: {
      hideInMenu: true,
    },
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
