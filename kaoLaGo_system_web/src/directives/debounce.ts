import { debounce } from "lodash";

const debounceDirective = {
  mounted(el, binding) {
    const {
      value: handler, // 绑定的处理函数
      arg: delay = 300, // 防抖延迟时间（默认 300ms）
      modifiers,
    } = binding;

    // 配置选项（是否立即执行）
    const options = {
      leading: modifiers.leading, // 通过修饰符指定是否立即执行（例如 v-debounce.leading）
      trailing: !modifiers.leading, // 默认在延迟后执行
    };

    // 创建防抖函数
    const debouncedHandler = debounce(handler, delay, options);

    // 保存防抖函数和事件类型以便卸载时清理
    el._debouncedHandler = debouncedHandler;

    // 绑定事件监听（自动识别事件类型）
    el.addEventListener("input", debouncedHandler); // 默认处理 input 事件
    el.addEventListener("click", debouncedHandler); // 默认处理 click 事件
  },
  beforeUnmount(el) {
    if (el._debouncedHandler) {
      // 移除事件监听并取消防抖
      el.removeEventListener("input", el._debouncedHandler);
      el.removeEventListener("click", el._debouncedHandler);
      el._debouncedHandler.cancel();
      delete el._debouncedHandler;
    }
  },
};

export default debounceDirective;
