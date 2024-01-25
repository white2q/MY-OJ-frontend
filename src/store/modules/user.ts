import { StoreOptions } from "vuex";
import { UserControllerService } from "../../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {},
  }),
  getters: {},
  // 异步
  actions: {
    async getLoginUser({ commit, state }) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", { userRole: ACCESS_ENUM.NOT_LOGIN });
      }
    },
  },
  // crud
  mutations: {
    updateUser(state: { loginUser: any }, data: any) {
      state.loginUser = data;
    },
  },
} as StoreOptions<any>;
