<template>
  <n-drawer
    v-model:show="visible.visible1"
    placement="right"
    :auto-focus="false"
    :mask-closable="false"
    :width="502"
  >
    <n-drawer-content
      :title="useFilterDrawerTitle(type)"
      :native-scrollbar="false"
    >
      <n-form :model="form" :rules="rules" ref="formRef">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <n-radio-group v-model:value="form.gender">
            <n-radio label="男">男</n-radio>
            <n-radio label="女">女</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="form.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="form.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-radio-group v-model:value="form.status">
            <n-radio label="启用">启用</n-radio>
            <n-radio label="禁用">禁用</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input v-model:value="form.remark" placeholder="请输入备注" />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { useUserManageStore } from "@/stores";
import { useFilterDrawerTitle } from "@/hooks";
import { form, rules } from "../hooks/AddOrEditor";

const { visible, type } = storeToRefs(useUserManageStore());
</script>
