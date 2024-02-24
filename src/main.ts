import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/access";
import "bytemd/dist/index.css";

// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

createApp(App)
  .use(store)
  .use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .mount("#app");
