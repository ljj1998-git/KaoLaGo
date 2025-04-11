<template>
  <n-layout class="w-full h-full">
    <n-layout-header class="h-[64px]" bordered>
      <Header />
    </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 64px">
      <n-layout-sider
        bordered
        :native-scrollbar="false"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
      >
        475
      </n-layout-sider>
      <n-layout
        class="relative"
        content-style="height: calc(100vh - 64px)"
        :native-scrollbar="false"
      >
        <n-layout-content
          class="bg-layout_bg w-full h-full"
          content-style="padding: 12px;height:100%"
          :native-scrollbar="false"
        >
          <NuxtPage />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import Header from "./components/Header/index.vue";
// import useAppStore from "@/stores/modules/app";

// const { setCollapsed } = useAppStore();
// const { collapsed } = storeToRefs(useAppStore());
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
