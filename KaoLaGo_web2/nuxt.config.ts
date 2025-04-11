import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
  },
  imports: {
    dirs: ["src/stores"],
  },
  tailwindcss: {
    config: "~/tailwind.config.js",
  },
  css: ["~/styles/global.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  vite: {
    plugins: [
      AutoImport({
        imports: [
          // {
          //   "naive-ui": [
          //     "useDialog",
          //     "useMessage",
          //     "useNotification",
          //     "useLoadingBar",
          //     "createDiscreteApi",
          //   ],
          // },
        ],
        dts: "types/auto-import.d.ts",
      }),
      Components({
        dirs: ["components"],
        dts: "types/components.d.ts",
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  build: {
    // 持久化插件配置 必需
    transpile: ["pinia-plugin-persistedstate/nuxt"],
  },
});
