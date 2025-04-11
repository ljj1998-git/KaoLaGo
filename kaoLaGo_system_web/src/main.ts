import { createApp } from "vue";
import App from "./App.vue";

import 'virtual:uno.css'
import "./styles/global.css";

import router from "./router";
// 国际化
import i18n from "@/locales";
// 枚举
import enums from "./constants";
// pinia
import pinia from "./stores/";
import debounceDirective from "./directives/debounce";

const app = createApp(App).use(router).use(i18n).use(pinia);
app.directive("debounce", debounceDirective);
app.config.globalProperties.$enums = enums;

app.mount("#app");
