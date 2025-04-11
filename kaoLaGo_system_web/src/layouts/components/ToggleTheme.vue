<template>
  <MoonOutline
    class="w-5 h-5 cursor-pointer"
    v-if="!isDark"
    @click="toggleDark2"
  />
  <SunnyOutline
    class="w-5 h-5 cursor-pointer"
    v-else
    @click="toggleDark2"
  />
</template>

<script setup lang="ts">
import {
  BookOutline as BookIcon,
  MoonOutline,
  SunnyOutline,
} from "@vicons/ionicons5";
import { useAppStore } from "@/stores";
import { useDark, useToggle } from "@vueuse/core";

const { toggleDark } = useAppStore();
const isDark = useDark();

async function toggleDark2({ clientX, clientY }) {
  function handler() {
    toggleDark();
    useToggle(isDark)();
  }

  if (!document.startViewTransition) {
    return handler();
  }

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    )}px at ${clientX}px ${clientY}px)`,
  ];

  await document.startViewTransition(handler).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
}
</script>
