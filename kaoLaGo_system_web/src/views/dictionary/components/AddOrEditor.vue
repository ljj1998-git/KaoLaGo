<template>
  <div>
    <n-drawer
      v-model:show="visible.visible1"
      placement="right"
      :auto-focus="false"
      :mask-closable="false"
      :width="502"
      @after-enter="toggleShow"
    >
      <n-drawer-content
        :title="useFilterDrawerTitle(type)"
        :native-scrollbar="false"
      >
        <n-form
          label-width="auto"
          :model="form"
          label-placement="left"
          :disabled="type === $enums.EDrawerTitleType.view"
        >
          <n-form-item
            label="上级字典值:"
            v-if="type !== $enums.EDrawerTitleType.edit || form.parentId"
          >
            <n-select
              v-model:value="form.parentId"
              :options="options"
              filterable
              label-field="name"
              value-field="id"
              placeholder="请选择上级字典值"
            />
          </n-form-item>
          <n-form-item label="名称:">
            <n-input
              placeholder="请输入名称"
              v-model:value="form.name"
            ></n-input>
          </n-form-item>
          <n-form-item label="key值:">
            <n-input
              placeholder="请输入key值"
              v-model:value="form.key"
            ></n-input>
          </n-form-item>
          <n-form-item label="值:">
            <n-input
              placeholder="请输入值"
              v-model:value="form.value"
            ></n-input>
          </n-form-item>
          <n-form-item label="状态:">
            <n-radio-group v-model:value="form.status" name="radiogroup">
              <n-space>
                <n-radio :value="item.value" v-for="item in $enums.RadioStatus">
                  {{ item.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="描述:">
            <n-input
              v-model:value="form.description"
              placeholder="自动调整尺寸"
              type="textarea"
              size="small"
              maxlength="200"
              show-count
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space>
            <n-button @click="handleCancel">取消</n-button>
            <n-button
              type="primary"
              v-debounce="() => handleOK(form)"
              :loading="loading"
              v-if="type != $enums.EDrawerTitleType.view"
            >
              确定
            </n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDictionaryStore } from "@/stores";
import { useFilterDrawerTitle } from "@/hooks";
import { useDictionaryOptions, useOK } from "../hooks/addOrEditor";
import _ from "lodash";
import { DictionaryList, IFormDictionary } from "@t/dictionary";

const { reset } = useDictionaryStore();
const { visible, type, row } = storeToRefs(useDictionaryStore());

const form = ref<IFormDictionary>({
  parentId: undefined,
  name: undefined,
  key: undefined,
  value: undefined,
  status: 1,
  description: undefined,
});

watchEffect(() => {
  form.value = _.cloneDeep(row.value);
});

const options = ref<DictionaryList[]>([]);
const toggleShow = async () => {
  options.value = (await useDictionaryOptions()).result;
};

const handleCancel = () => {
  form.value = {
    parentId: undefined,
    name: undefined,
    key: undefined,
    value: undefined,
    status: 1,
    description: undefined,
  };
  reset();
};

const { handleOK, loading } = await useOK();
</script>
