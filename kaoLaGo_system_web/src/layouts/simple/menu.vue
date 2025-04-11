<template>
  <n-menu
    responsive
    mode="horizontal"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :render-icon="renderMenuIcon"
    :expand-icon="expandIcon"
    @update:value="handleUpdateValue"
    :value="currentRoute.path"
  />
</template>

<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { useAppStore } from "@/stores";
import { RouterLink } from "vue-router";
import _ from "lodash";
import router from "@/router";
const currentRoute = useRoute();
const menuOptions: MenuOption[] = [
  {
    label: "页面1",
    key: "/page1",
  },
  {
    label: "页面2",
    key: "/page2",
  },
  {
    label: "系统管理",
    key: "",
    children: [
      {
        label: "字典管理",
        key: "/dictionary",
      },
    ],
  },
];

const { setBreadcrumbList } = useAppStore();
const { collapsed } = storeToRefs(useAppStore());

const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
};
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};

const handleUpdateValue = (value: string, item: MenuOption) => {
  router.push(value);
  setBreadcrumbList({
    label: item.label as string,
    path: item.key as string,
  });
  console.log(item);

  // setBreadcrumbList({
  //   label: _.find(item, { key: value })?.label as string,
  //   path: value,
  // });
};
</script>
