<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <a-space direction="horizontal" fill>
          <img class="logo" src="../assets/Fisherman.png" />
          <div>MY-OJ</div>
        </a-space>
        <div></div>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/white2q" target="_blank"> ppf 's github </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  name: "",
  post: "",
  isRead: false,
});
const handleSubmit = () => {
  console.log(form);
};
</script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .header {
  margin: 0 auto;
  padding: 16px;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
