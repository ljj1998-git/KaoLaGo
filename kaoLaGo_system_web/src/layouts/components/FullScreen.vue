<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <Scan class="w-5 h-5 cursor-pointer" @click="toggle" />
    </template>
    {{ $t("layout.fullScreen") }}
  </n-tooltip>
</template>

<script setup>
import { Scan } from "@vicons/ionicons5";
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, toggle } = useFullscreen();
</script>
