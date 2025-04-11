<template>
  <n-grid x-gap="12" :cols="24">
    <n-gi :span="3" class="lea">
      <n-image
        class="mt-1"
        preview-disabled
        :src="Logo"
        width="240"
        height="58"
      ></n-image>
    </n-gi>
    <n-gi :span="18">
      <div class="w-full h-full flex justify-between items-center">
        <n-menu
          v-if="isClient"
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          :render-label="renderRouterLink"
          responsive
        />
      </div>
    </n-gi>
    <n-gi :span="3" class="flex items-center">
      <n-space>
        <n-icon size="24" class="cursor-pointer">
          <MoonOutline
            v-if="theme === Theme.LIGHT"
            @click="setTheme(Theme.DARK)"
          />
          <SunnyOutline
            v-if="theme === Theme.DARK"
            @click="setTheme(Theme.LIGHT)"
          />
        </n-icon>
      </n-space>
    </n-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import {
  BookOutline as BookIcon,
  MoonOutline,
  SunnyOutline,
} from "@vicons/ionicons5";
import { Theme } from "~/constants/enums";
import useAppStore from "~/stores/app";
import Logo from "@/assets/svg/a.svg";
import { NIcon, type MenuOption } from "naive-ui";
import { NuxtLink } from "#components";

const { setTheme } = useAppStore();
const { theme } = storeToRefs(useAppStore());

// 初始化主题
onMounted(() => {
  setTheme(Theme.LIGHT);
});

const activeKey = ref("home");

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "/home",
    icon: renderIcon(BookIcon),
  },
  {
    label: "政治理论",
    key: "/politics",
    icon: renderIcon(BookIcon),
  },
];

const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});

const renderRouterLink = (option: MenuOption) => {
  return h(NuxtLink, { to: option.key } as any, {
    default: () => option.label,
  });
};

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>
