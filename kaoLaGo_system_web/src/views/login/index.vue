<template>
  <div class="min-h-screen flex relative">
    <!-- 左侧背景 -->
    <div class="w-3/5 bg-sky-500/100 relative">
      <n-image
        :src="image1"
        preview-disabled
        class="absolute w-full h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ></n-image>
      <div class="absolute top-8 left-8 text-white">
        <h1 class="text-4xl font-bold mb-2">能源可视化项目</h1>
        <div class="opacity-80 text-lg">MONS R</div>
      </div>
    </div>

    <div
      class="absolute left-2/5 bottom-0 w-1/5 h-full bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)] transition-colors"
    ></div>

    <!-- 右侧登录表单 -->
    <div class="flex-1 flex flex-col items-center justify-center">
      <n-h2 class="text-2xl font-semibold mb-8 text-center">管理员登录</n-h2>
      <n-card
        :bordered="false"
        content-style="display: flex; justify-content: center;"
      >
        <n-form ref="formRef" class="w-1/2" :model="formData">
          <n-form-item path="username">
            <n-input
              v-model:value="formData.username"
              placeholder="请输入登录号"
              size="large"
            />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formData.password"
              type="password"
              placeholder="请输入登录密码"
              show-password-toggle
            />
          </n-form-item>

          <n-button
            type="primary"
            size="large"
            class="w-full bg-blue-600 hover:bg-blue-700"
            @click="handleLogin"
          >
            登录
          </n-button>
        </n-form>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import image1 from "@/assets/images/2.5d.png";
import { useLogin, useGetCaptcha } from "./hooks/index";
import { ILoginForm } from "./types";

// 表单数据
const formData = reactive<ILoginForm>({
  username: "",
  password: "31.2", // 根据图片中的密码信息
});

// 角色切换
const roles = [
  { label: "仓库", value: "warehouse" },
  { label: "商务", value: "business" },
];
const activeRole = ref("warehouse");

// 登录处理
const handleLogin = () => useLogin(formData);
</script>

<style lang="scss" scoped></style>
