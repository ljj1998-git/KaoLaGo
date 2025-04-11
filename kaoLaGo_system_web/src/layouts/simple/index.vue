<template>
  <n-layout class="w-full h-full">
    <n-layout-header class="h-15 px-4" bordered>
      <Header />
    </n-layout-header>
    <n-layout has-sider position="absolute" style="top: 60px">
      <n-layout-content content-class="flex-1  auto-bg2 p-4 box-border">
        <Suspense>
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div class="h-full w-full" :key="$route.fullPath">
              <component :is="Component"></component>
            </div>
          </transition>
        </RouterView>
      </Suspense>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import Header from "./header.vue";
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
