import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import vitePlugins from "./vite/plugins";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: "0.0.0.0",
      port: 8000,
      //代理
      proxy: {
        [env.VITE_APP_API_BASE]: {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          secure: false, // https请求则使用true
          rewrite: (path: string) => path.replace(/^\/klg/, ""),
        },
      },
    },
    plugins: [vue(), ...vitePlugins(env)],
    // css: {
    //   preprocessorOptions: {
    //     // scss: {
    //     //   additionalData: `@use "./src/styles/global.scss" as *;`,
    //     // },
    //   },
    // },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
