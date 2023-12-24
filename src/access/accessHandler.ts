import ACCESS_ENUM from "@/access/accessEnum";

// 判断当前用户是否有权限访问该页面
const accessHandler = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  if (needAccess === ACCESS_ENUM.LOGIN_USER) {
    if (loginUser.isLogin) {
      return true;
    }
    return false;
  }

  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUser.userRole === ACCESS_ENUM.ADMIN) {
      return true;
    }
    return false;
  }

  return false;
};
export default accessHandler;
