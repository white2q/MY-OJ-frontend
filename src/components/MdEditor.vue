<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";
import { ref } from "vue";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";

const plugins = [gfm(), highlight(), math()];

const value = ref();

const handleChange = (v: string) => {
  value.value = v;
};
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
