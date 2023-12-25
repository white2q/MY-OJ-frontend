<template>
  <div class="home">
    <MdEditor></MdEditor>
    <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>

<style scoped></style>
