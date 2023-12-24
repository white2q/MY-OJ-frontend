<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
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

<script>
import { defineComponent } from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";

export default defineComponent({
  components: { GlobalHeader },
});
</script>

<style scoped>
#basicLayout .header {
}

#basicLayout .content {
  background-color: gray;
  margin-bottom: 16px;
}

#basicLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
