import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImportPlugin() {
  return AutoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia",
      {
        "naive-ui": [
          "useDialog",
          "useMessage",
          "useNotification",
          "useLoadingBar",
          "createDiscreteApi",
        ],
      },
      "@vueuse/core",
    ],
    dts: "types/auto-import.d.ts",
    resolvers: [NaiveUiResolver()],
  });
}
