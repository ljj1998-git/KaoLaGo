<template>
  <n-grid class="h-full" x-gap="12">
    <n-gi class="h-full" :span="3">
      <i class="i-c:github w-[200px] h-full cursor-pointer" />
    </n-gi>
    <n-gi class="h-full" :span="12">
      <div class="w-full h-full flex justify-between items-center"></div>
    </n-gi>
    <n-gi class="h-full flex justify-end items-center" :span="9">
      <div class="f-c-c gap-x-4">
        <SetLayout />
        <ToggleTheme />
        <FullScreen />
        <ToggleColor />
        <ToggleLoacle />
        <UserAvatar />
      </div>
    </n-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import ToggleColor from "../components/ToggleColor.vue";
import ToggleTheme from "../components/ToggleTheme.vue";
import ToggleLoacle from "../components/ToggleLoacle.vue";
import FullScreen from "../components/FullScreen.vue";
import UserAvatar from "../components/UserAvatar.vue";
import SetLayout from "../components/SetLayout.vue";

const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>
