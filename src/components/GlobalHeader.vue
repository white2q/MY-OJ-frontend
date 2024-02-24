<template>
  <div id="globalHeader">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <div class="menu-demo">
          <a-menu
            mode="horizontal"
            :selected-keys="selectedKeys"
            @menu-item-click="doMenuClick"
          >
            <a-menu-item
              @click="doLogoClick"
              :style="{ padding: 0, marginRight: '38px' }"
            >
              <div id="title-bar">
                <img width="48px" src="../assets/Fisherman.png" />
                <div class="title">MY-OJ</div>
              </div>
            </a-menu-item>

            <a-menu-item v-for="item in canAccessViews" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col flex="100px">
        <a-dropdown
          v-if="
            store.state['user']?.loginUser?.userRole &&
            store.state['user']?.loginUser?.userRole !== ACCESS_ENUM.NOT_LOGIN
          "
          @select="handleSelect"
        >
          <a-button type="text">{{ userName }}</a-button>
          <template #content>
            <a-doption :value="{ value: 'home' }">个人主页</a-doption>
            <a-doption :value="{ value: 'setting' }">设置</a-doption>
            <a-doption :value="{ value: 'logout' }">退出登录</a-doption>
          </template>
        </a-dropdown>
        <a-button v-else @click="toLoginView" type="text">登录</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import router from "@/router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import accessHandler from "@/access/accessHandler";
import { UserControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

const store = useStore();

console.log(store.state["user"]?.loginUser?.userRole);

const userName = computed(() => {
  return store.state.user?.loginUser?.userName;
});

const selectedKeys = ref(["/"]);

const toLoginView = () => {
  router.push({
    path: "/user/login",
  });
};

// 根据用户权限展示对应可查看的页面
const canAccessViews = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return accessHandler(
      store.state.user?.loginUser,
      item?.meta?.access as string
    );
  });
});

const handleSelect = async (v: any) => {
  if ((v.value as string) === "logout") {
    await UserControllerService.userLogoutUsingPost();
    // 更新用户登录状态
    await store.dispatch("user/getLoginUser", {});
    await router.push({
      path: "/",
    });
    return;
  } else {
    console.log("TODO");
  }
};

router.afterEach((to, from, e) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 点击logo时跳转到主页面
const doLogoClick = () => {
  router.push({
    path: "/",
  });
};
</script>

<style scoped>
#globalHeader {
}

#title-bar {
  display: flex;
  align-items: center;
}

#title-bar .title {
  color: #444;
  margin-left: 16px;
}
</style>
