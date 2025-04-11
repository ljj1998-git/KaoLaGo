<template>
  <n-layout class="w-full h-full">
    <n-layout-header class="h-15 px-4" bordered>
      <Header />
    </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 60px">
      <n-layout-sider
        bordered
        :native-scrollbar="false"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="setCollapsed()"
        @expand="setCollapsed()"
      >
        <Menu />
      </n-layout-sider>
      <div class="flex-col w-full">
        <n-layout class="auto-bg2 flex-1 h-0">
          <Suspense>
            <RouterView v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <div
                  class="w-full h-full p-3 box-border"
                  :key="$route.fullPath"
                >
                  <component :is="Component"></component>
                </div>
              </transition>
            </RouterView>
          </Suspense>
        </n-layout>
      </div>
    </n-layout>
    <div id="layout_content" style="position: relative" />
  </n-layout>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";
import Header from "./header.vue";
import Breadcrumb from "../components/BreadCrumb.vue";
import Menu from "../components/Menu.vue";

const { setCollapsed } = useAppStore();
const { collapsed } = storeToRefs(useAppStore());
</script>

<style lang="scss" scoped>
.layout-header {
  height: 60px;
  padding-inline: 0px;
  background-color: var(--layout-header-background);
}
.layout-content {
  padding: 24px 16px;
  height: 100%;
}

.fade-enter-from,
.fade-leave-to {
  // transform: translateX(10px);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.7s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
