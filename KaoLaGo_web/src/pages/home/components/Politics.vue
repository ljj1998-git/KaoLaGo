<template>
  <div class="w-full h-full">
    <n-tabs type="segment" animated v-model:value="tabValue">
      <n-tab-pane :name="0" tab="基础学习">
        <n-space vertical>
          <n-space>
            <n-select
              class="w-40"
              v-model:value="searchParams.type"
              :options="options"
              placeholder="请选择类型"
            />
            <n-input
              v-model:value="searchParams.question"
              placeholder="请输入内容"
            ></n-input>
          </n-space>
          <n-list hoverable clickable>
            <n-list-item>
              <n-thing title="相见恨晚" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="info" size="small">
                      暑夜
                    </n-tag>
                    <n-tag :bordered="false" type="info" size="small">
                      晚春
                    </n-tag>
                  </n-space>
                </template>
                奋勇呀然后休息呀<br />
                完成你伟大的人生
              </n-thing>
            </n-list-item>
          </n-list>
        </n-space>
      </n-tab-pane>
      <n-tab-pane :name="1" tab="真题演练"> </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
const tabValue = ref(0);

const options = [
  {
    label: "时政热点",
    value: "1",
  },
  {
    label: "马克思主义",
    value: "2",
  },
];
const searchParams = reactive({
  type: undefined,
  question: undefined,
});
</script>
