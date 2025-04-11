<template>
  <KContentTree :extra-height="88">
    <template #title>
      <n-flex justify="space-between">
        <n-h2>用户管理</n-h2>
        <n-space>
          <n-button type="primary">
            <template #icon>
              <AddOutline />
            </template>
            新增
          </n-button>
          <n-button type="primary">
            <template #icon>
              <SearchOutline />
            </template>
            搜索
          </n-button>
          <n-button type="primary">
            <template #icon>
              <ChevronDownOutline />
            </template>
            展开
          </n-button>
        </n-space>
      </n-flex>
      <n-flex>
        <n-form inline label-placement="left">
          <n-grid :x-gap="16">
            <n-gi :span="6">
              <n-form-item label="用户名">
                <n-input placeholder="输入用户名" />
              </n-form-item>
            </n-gi>
            <n-gi :span="6">
              <n-form-item label="用户名">
                <n-input placeholder="输入用户名" />
              </n-form-item>
            </n-gi>
            <n-gi :span="6">
              <n-form-item label="用户名">
                <n-input placeholder="输入用户名" />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </n-flex>
    </template>
    <template #tree="{ size }"> 
        
    </template>
    <template #content="{ size }"> </template>

    <!-- {{ $t("text.add") }} -->
  </KContentTree>
</template>

<script lang="ts" setup>
import {
  AddOutline,
  SearchOutline,
  ChevronDownOutline,
} from "@vicons/ionicons5";
</script>
