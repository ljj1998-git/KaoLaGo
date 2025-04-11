<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-color-picker
        id="theme-setting"
        class="h-6 w-6"
        :value="primaryColor"
        :on-update:value="(v) => setPrimaryColor(v)"
        :render-label="() => ''"
      />
    </template>
    {{ $t("layout.primaryColor") }}
  </n-tooltip>
</template>

<script setup>
import { useAppStore } from "@/stores";

const { setPrimaryColor } = useAppStore();
const { primaryColor } = storeToRefs(useAppStore());

setPrimaryColor(primaryColor.value);
</script>
