<template>
  <div ref="boxRef" class="w-full h-full flex flex-col overflow-hidden">
    <div ref="titleRef" class="auto-bg rounded-md p-4 mb-4">
      <div class="flex-col">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="h-6 w-1.5 mr-2 bg-primary" />
            <n-h2 class="!my-0">{{ props.title }}</n-h2>
          </div>
          <slot name="TitleRight"></slot>
        </div>
        <transition
          name="slide"
          mode="out-in"
          @after-enter="calculateContentHeight"
          @after-leave="calculateContentHeight"
        >
          <slot name="TitleBottom"></slot>
        </transition>
      </div>
    </div>
    <div ref="contentRef" class="flex-1 h-0 auto-bg rounded-md p-4">
      <slot name="content" :size="{ height: contentHeight }"></slot>
    </div>
    <slot name="drawer"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
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
    // 16px为title marginbottom的高度 32为padding的高度
    const titleTotal = removePxToNumber(titleHeight) + 16 + 32;
    // 32px为content padding的高度
    contentHeight.value =
      removePxToNumber(boxHeight) - titleTotal - 32 - props.extraHeight;
  }
};

const removePxToNumber = (str: string) => {
  return Number(str.replace("px", ""));
};

const windowStyle = useWindowSize();
watch(
  () => [windowStyle],
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
