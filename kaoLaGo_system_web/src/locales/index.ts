// i18n配置
import { createI18n } from "vue-i18n";
import { messages } from "./languages";

// 创建i18n
const i18n = createI18n({
  locale: localStorage.getItem("language") || "zh_cn", // 语言标识
  globalInjection: true, // 全局注入,可以直接使用$t
  legacy: false,
  messages: messages,
});

export default i18n;
