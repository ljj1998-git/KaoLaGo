<template>
  <n-popover trigger="hover">
    <template #trigger>
      <SettingsOutline class="w-5 h-5 cursor-pointer" />
    </template>
    <n-space vertical class="w-[210px]">
      <div class="mt-1">布局设置</div>
      <n-divider class="!my-0" />
      <n-space>
        <n-card
          hoverable
          class="cursor-pointer"
          :content-style="{
            padding: '16px',
            paddingBottom: '14px',
            border: '1px solid',
            borderColor: layout === item ? primaryColor : 'transparent',
          }"
          v-for="item in $enums.ELayout"
          @click="setLayout(item)"
        >
          <div class="flex-col" v-if="item === $enums.ELayout.default">
            <div class="w-14 h-1 bg-bluegray"></div>
            <div class="mt-1 flex">
              <div class="w-2 h-9 bg-bluegray mr-1"></div>
              <div class="w-11 h-9 bg-bluegray"></div>
            </div>
          </div>
          <div class="flex-col" v-else-if="item === $enums.ELayout.full">
            <div class="w-14 h-1 bg-bluegray"></div>
            <div class="mt-0.5 flex">
              <div class="w-2 h-9.5 bg-bluegray mr-1"></div>
              <div>
                <div class="w-11 h-1 bg-bluegray"></div>
                <div class="w-11 h-8 mt-0.5 bg-bluegray"></div>
              </div>
            </div>
          </div>
          <div class="flex-col" v-else-if="item === $enums.ELayout.simple">
            <div class="w-14 h-1 bg-bluegray"></div>
            <div class="w-14 h-9 mt-0.5 bg-bluegray"></div>
          </div>
          <div class="mt-2">{{ $t(`layout.${item}`) }}</div>
        </n-card>
      </n-space>
    </n-space>
  </n-popover>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores";
import { SettingsOutline } from "@vicons/ionicons5";

const { setLayout } = useAppStore();
const { primaryColor, layout } = storeToRefs(useAppStore());
</script>
