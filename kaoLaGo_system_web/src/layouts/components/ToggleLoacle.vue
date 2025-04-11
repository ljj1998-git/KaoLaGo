<template>
  <n-dropdown
    trigger="hover"
    :show-arrow="true"
    :options="options"
    @select="handleSelect"
  >
    <Language class="w-5 h-5 cursor-pointer" />
  </n-dropdown>
</template>

<script lang="ts" setup>
import { ELangueage } from "@/constants";
import { useAppStore } from "@/stores";
import { Language } from "@vicons/ionicons5";
import i18n from "@/locales";

const { setLanguage } = useAppStore();
const options = reactive([
  {
    label: "中文",
    key: ELangueage.zh_cn,
  },
  {
    label: "English",
    key: ELangueage.en,
  },
]);

function handleSelect(key: ELangueage) {
  i18n.global.locale.value = key;
  setLanguage(key);
}
</script>
