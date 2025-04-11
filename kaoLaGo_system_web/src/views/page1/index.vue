<template>
  <KContent title="页面标题" :extra-height="86">
    <template #TitleRight>
      <n-space>
        <n-button type="primary">
          <template #icon>
            <AddOutline />
          </template>
          {{ $t("common.button.add") }}
        </n-button>
        <n-button type="primary" @click="add">
          <template #icon>
            <SearchOutline />
          </template>
          新加倒计时
        </n-button>
        <n-button type="primary" @click="startTimer('1')">
          <template #icon>
            <SearchOutline />
          </template>
          运行倒计时
        </n-button>
        <n-button @click="add2">
          <template #icon>
            <SearchOutline />
          </template>
          新加计时器
        </n-button>
        <n-button type="primary" @click="startTimer('2')">
          <template #icon>
            <SearchOutline />
          </template>
          运行计时器
        </n-button>
        <n-button type="primary">
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
    <template #content="{ size }">
      <n-data-table
        :columns="columns"
        :data="data"
        :max-height="size.height"
        :bordered="false"
        :pagination="pagination"
      />
    </template>

    <template #drawer> </template>
    <!-- {{ $t("text.add") }} -->
  </KContent>
</template>

<script lang="ts" setup>
import {
  AddOutline,
  SearchOutline,
  ChevronDownOutline,
} from "@vicons/ionicons5";
import { useShowSearch } from "@/hooks";
import { useQuestionTypeStore, useTimerStore } from "@/stores";

const { setVisible } = useQuestionTypeStore();
const { addTimer, startTimer, removeTimer } = useTimerStore();
const { getTimerStatus } = storeToRefs(useTimerStore());

const handleAdd = () => {
  setVisible("visible1", true);
};

const { showSearch, toggleSearch } = useShowSearch();

interface Song {
  name: number;
  age: string;
  address: string;
}
const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
];

const pagination = {
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
};
const data: Song[] = [
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
  { name: 3, age: "Wonderwall", address: "4:18" },
  { name: 4, age: "Don't Look Back in Anger", address: "4:48" },
  { name: 12, age: "Champagne Supernova", address: "7:27" },
];

const add = () => {
  addTimer({
    key: "1",
    type: "setTimeout",
    duration: 2000,
    callback: () => {
      console.log("定时器1执行");
    },
  });
};

const add2 = () => {
  addTimer({
    key: "2",
    type: "setInterval",
    duration: 1000,
    callback: () => {
      console.log("定时器2执行");
    },
  });
};
</script>
