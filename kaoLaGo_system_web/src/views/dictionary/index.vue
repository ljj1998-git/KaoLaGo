<template>
  <KContent title="字典管理" :extraHeight="48">
    <template #TitleRight>
      <n-space>
        <n-button
          type="primary"
          @click="handleOpeartion($enums.EDrawerTitleType.add, {})"
        >
          <template #icon>
            <AddOutline />
          </template>
          新增
        </n-button>
        <n-button
          type="primary"
          :loading="dictionary.loading"
          v-debounce="() => useDictionaryList(searchForm)"
        >
          <template #icon>
            <SearchOutline />
          </template>
          搜索
        </n-button>
        <n-button type="primary" @click="toggleSearch">
          <template #icon>
            <ChevronDownOutline
              :class="showSearch ? 'rotate-to-180' : 'rotate-to-0'"
            />
          </template>
          {{
            showSearch
              ? $t("common.button.collapse")
              : $t("common.button.expand")
          }}
        </n-button>
      </n-space>
    </template>
    <template #TitleBottom v-if="showSearch">
      <n-flex class="mt-4">
        <n-form inline label-placement="left" :model="searchForm">
          <n-grid :x-gap="16">
            <n-gi :span="6">
              <n-form-item label="字典名:">
                <n-input
                  v-model:value="searchForm.name"
                  placeholder="请输入字典名"
                />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </n-flex>
    </template>

    <template #content="{ size }">
      <n-data-table
        :data="dictionary.result"
        :loading="dictionary.loading"
        :columns="columns1"
        default-expand-all
        :max-height="size.height"
      >
      </n-data-table>
    </template>
    <template #drawer>
      <AddOrEditor />
    </template>
  </KContent>
</template>

<script setup lang="ts">
import {
  AddOutline,
  SearchOutline,
  ChevronDownOutline,
} from "@vicons/ionicons5";
import AddOrEditor from "./components/AddOrEditor.vue";
import { dictionary, useDeletDictionary, useDictionaryList } from "./hooks";
import { NPopconfirm, NTag } from "naive-ui";

import { useShowSearch, useTableOperation } from "@/hooks";
import { useAppStore, useDictionaryStore } from "@/stores";
import { EDrawerTitleType } from "@/constants";
import { DictionaryList } from "@t/dictionary";
import { deleteDictionaryApi } from "@/apis/dictionary";

const instance = getCurrentInstance();
const drawerTitleType = instance?.proxy?.$enums.EDrawerTitleType;
const { dicts } = storeToRefs(useAppStore());
const { showSearch, toggleSearch } = useShowSearch();

const { RadioStatusType } = getCurrentInstance()?.proxy?.$enums!;
const { setType, setVisible, setRow } = useDictionaryStore();
const { searchForm } = storeToRefs(useDictionaryStore());

/**
 * 搜索功能
 */
await useDictionaryList(searchForm.value);

const handleOpeartion = (type: EDrawerTitleType, row: DictionaryList) => {
  setType(type);
  setVisible("visible1", true);
  const { children, ...others } = row;
  row ? setRow(others) : setRow({});
};

const columns1 = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "key值",
    key: "key",
  },
  {
    title: "值",
    key: "value",
  },
  {
    title: "状态",
    key: "status",
    render(row: DictionaryList) {
      return h(NTag, { type: RadioStatusType[row.status!].type }, () => {
        return RadioStatusType[row.status!].label;
      });
    },
  },
  {
    title: "描述",
    key: "description",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "操作",
    key: "operation",
    render(row) {
      return h(
        NSpace,
        {
          strong: true,
          tertiary: true,
          size: "small",
        },
        {
          default: () => [
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                onClick: () => {
                  handleOpeartion(drawerTitleType!.edit, row);
                },
              },
              { default: () => "编辑" }
            ),
            h(
              NButton,
              {
                size: "small",
                onClick: () => {
                  handleOpeartion(drawerTitleType!.view, row);
                },
              },
              { default: () => "查看" }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => {
                  useDeletDictionary(row.id!);
                },
              },
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      size: "small",
                      type: "error",
                    },
                    { default: () => "删除" }
                  ),
                default: () => "确认删除？",
              }
            ),
          ],
        }
      );
    },
  },
];
</script>
