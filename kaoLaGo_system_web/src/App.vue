<template>
  <n-config-provider
    :abstract="true"
    :theme="isDark ? darkTheme : undefined"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme, GlobalThemeOverrides } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
import { useAppStore } from "./stores";
import { ELangueage } from "./constants";

const { getDicts } = useAppStore();
const { isDark, primaryColor, language } = storeToRefs(useAppStore());

/**
 * 获取字典值
 */
getDicts();

const locale = computed(() => {
  const lang = {
    [ELangueage.zh_cn]: zhCN,
  };
  return lang[language.value];
});

const dateLocale = computed(() => {
  const lang = {
    [ELangueage.zh_cn]: dateZhCN,
  };
  return lang[language.value];
});

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return {
    common: {
      primaryColor: primaryColor.value,
      primaryColorHover: primaryColor.value,
      primaryColorPressed: primaryColor.value,
      primaryColorSuppl: primaryColor.value,
    },
    Button: {
      textColorPrimary: "#fff",
      textColorHoverPrimary: "#e0e0e0",
      textColorPressedPrimary: "#c0c0c0",
      textColorFocusPrimary: "#fff",
    },
  };
});
</script>

<style scoped lang="scss"></style>
