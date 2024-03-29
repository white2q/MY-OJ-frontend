import router from "@/router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import accessHandler from "@/access/accessHandler";

// 全局监控：在页面跳转之前对用户登录态做检查，并检测要查看的页面是否有权限
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let loginUser = store.state.user.loginUser;

  // 如果没有登录，则自动登录
  if (!loginUser.userRole) {
    await store.dispatch("user/getLoginUser", {});
    loginUser = store.state.user.loginUser;
  }

  const needAccess = (to.meta?.access as string) || ACCESS_ENUM.NOT_LOGIN;
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 要跳转的页面必须要登陆
    if (!loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!accessHandler(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
