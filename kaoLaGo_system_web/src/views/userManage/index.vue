<template>
  <KContent title="用户管理" :extraHeight="48">
    <template #TitleRight>
      <n-space>
        <n-button type="error">
          <template #icon>
            <TrashOutline />
          </template>
          {{ $t("common.button.batchDelete") }}
        </n-button>
        <n-button
          type="primary"
          @click="handleOpeartion($enums.EDrawerTitleType.add, {})"
        >
          <template #icon>
            <AddOutline />
          </template>
          {{ $t("common.button.add") }}
        </n-button>
        <n-button type="primary">
          <template #icon>
            <SearchOutline />
          </template>
          {{ $t("common.button.search") }}
        </n-button>
        <n-button type="primary">
          <template #icon>
            <ChevronDownOutline />
          </template>
          {{ $t("common.button.expand") }}
        </n-button>
      </n-space>
    </template>
    <template #TitleBottom>
      <n-flex class="mt-4">
        <n-form inline label-placement="left">
          <n-grid :x-gap="16">
            <n-gi :span="6">
              <n-form-item label="用户名:">
                <n-input placeholder="请输入用户名" />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </n-flex>
    </template>

    <template #content="{ size }"> </template>
    <template #drawer>
      <AddOrEditor />
    </template>
  </KContent>
</template>

<script setup lang="ts">
import { EDrawerTitleType } from "@/constants";
import { useUserManageStore } from "@/stores";
import {
  AddOutline,
  SearchOutline,
  ChevronDownOutline,
  TrashOutline,
} from "@vicons/ionicons5";
import AddOrEditor from "./components/AddOrEditor.vue";

const { setType, setVisible, setRow } = useUserManageStore();

const handleOpeartion = (type: EDrawerTitleType, row: DictionaryList) => {
  setType(type);
  setVisible("visible1", true);
  const { children, ...others } = row;
  row ? setRow(others) : setRow({});
};
</script>
