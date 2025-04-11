<template>
  <n-config-provider :theme-overrides="themeOverrides" class="w-full h-full">
    <NuxtLayout />
  </n-config-provider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#4343c7",
  },
};
</script>

<style scoped lang="scss">
</style>
