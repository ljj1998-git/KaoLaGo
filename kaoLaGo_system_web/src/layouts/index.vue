<template>
  <component :is="components[layout]"></component>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";
import { ELayout } from "@/constants";
import Default from "./default/index.vue";
import Simple from "./simple/index.vue";
import Full from "./full/index.vue";

const { layout } = storeToRefs(useAppStore());
const components = {
  [ELayout.default]: Default,
  [ELayout.simple]: Simple,
  [ELayout.full]: Full,
};

/**
 * @description: 设置message以便在setup外使用
 */
window.$message = useMessage();
</script>
