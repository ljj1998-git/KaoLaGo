<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:50:42
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <n-dropdown :options="options">
    <div id="user-dropdown" class="flex cursor-pointer items-center">
      <n-avatar class="mr-1" round :size="36" :src="info.avatar">
        <n-icon :size="20">
          <Person />
        </n-icon>
      </n-avatar>
      <div class="flex-col flex-shrink-0 items-center">
        <span>{{ info.username || "未登录" }}</span>
        <span class="opacity-50">[{{ info.roleName }}]</span>
      </div>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { ExitOutline, Person, PersonOutline } from "@vicons/ionicons5";
import { useUserStore } from "@/stores";
import { NIcon } from "naive-ui";

const { info } = storeToRefs(useUserStore());

const options = reactive([
  {
    label: "个人资料",
    key: "profile",
    icon: () => h(NIcon, { size: 20 }, { default: () => h(PersonOutline) }),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: () => h(NIcon, { size: 20 }, { default: () => h(ExitOutline) }),
  },
]);
</script>
