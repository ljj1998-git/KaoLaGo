import { ComponentCustomProperties } from "@vue/runtime-core";
import type { EnumType } from "@/constants";
import type { I18nGlobal } from "vue-i18n";
import { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";

declare module "vue" {
  const { t } = useI18n();
  typeof StorePersistEnum;
  interface ComponentCustomProperties {
    $enums: EnumType;
    $t: I18nGlobal["t"];
    $route: RouteLocationNormalizedLoadedGeneric;
  }
}

declare global {
  interface Window {
    $message: MessageApiInjection;
  }
}
// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;
