<template>
  <div class="auto-bg h-12 flex items-center px-4">
    <n-space>
      <n-tag
        class="cursor-pointer"
        closable
        :type="routes.path === item.path ? 'primary' : 'default'"
        v-for="item in breadcrumbList"
        @click="() => router.push(item.path)"
        @close="removeBreadcrumbList(item)"
      >
        {{ item.label }}
      </n-tag>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";
import _ from "lodash";

const { setBreadcrumbList, removeBreadcrumbList } = useAppStore();
const { breadcrumbList } = storeToRefs(useAppStore());

const router = useRouter();
const routes = useRoute();
watch(
  () => router,
  (value) => {
    const meta = value.currentRoute.value.meta;
    const path = value.currentRoute.value.path;
    if (_.isEmpty(breadcrumbList.value)) {
      setBreadcrumbList({ label: meta.title as string, path: path });
    }
  },
  { deep: true, immediate: true }
);
</script>
