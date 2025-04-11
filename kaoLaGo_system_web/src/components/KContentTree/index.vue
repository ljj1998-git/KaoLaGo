<template>
  <div ref="boxRef" class="w-full h-full flex flex-col">
    <div ref="titleRef" class="auto-bg rounded-md p-4 mb-4 pb-0">
      <slot name="title"></slot>
    </div>
    <div ref="contentRef" class="flex-1 h-0 rounded-md p-4">
      <n-grid :cols="2" :gutter="16">
        <n-gi class="auto-bg">
          <slot name="tree" :size="{ height: contentHeight }"></slot>
        </n-gi>
        <n-gi class="auto-bg">
          <slot name="content" :size="{ height: contentHeight }"></slot>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  extraHeight: {
    type: Number,
    default: 0,
  },
});

const boxRef = ref(null);
const titleRef = ref(null);
const contentRef = ref(null);

const contentHeight = ref(0);
// 计算content高度
const calculateContentHeight = () => {
  if (contentRef.value) {
    const boxHeight = getComputedStyle(boxRef.value!).height;
    const titleHeight = getComputedStyle(titleRef.value!).height;
    const titleMarginBottom = getComputedStyle(titleRef.value!).marginBottom;
    const contentPaddingTop = getComputedStyle(contentRef.value!).paddingTop;
    const contentPaddingBottom = getComputedStyle(
      contentRef.value!
    ).paddingBottom;
    contentHeight.value =
      Number(boxHeight.replace("px", "")) -
      Number(titleHeight.replace("px", "")) -
      Number(titleMarginBottom.replace("px", "")) -
      Number(contentPaddingTop.replace("px", "")) -
      Number(contentPaddingBottom.replace("px", "")) -
      props.extraHeight;
  }
};

const windowStyle = useWindowSize();
watch(
  () => windowStyle,
  () => {
    calculateContentHeight();
  },
  {
    immediate: true,
    deep: true,
  }
);
onMounted(() => {
  calculateContentHeight();
});
</script>
