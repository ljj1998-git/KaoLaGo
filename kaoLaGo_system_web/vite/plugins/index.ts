import creatRemovelogPlugin from "./vite-plugin-removelog";
import createAutoImportPlugin from "./unplugin-auto-import";
import createVueDevToolsPlugin from "./vite-plugin-vue-devtools";
import createHtmlPlugin from "./vite-plugin-html";
import createImageMinPlugin from "./vite-plugin-imagemin";
import createUnpluginComponentsPlugin from "./unplugin-vue-components";
import createViteRestartPlugin from "./vite-plugin-restart";
import createUnoCSSPlugin from "./unocss";

export default (env: Record<string, string>) => {
  return [
    creatRemovelogPlugin(),
    createAutoImportPlugin(),
    createVueDevToolsPlugin(),
    createHtmlPlugin(env),
    createImageMinPlugin(),
    createUnpluginComponentsPlugin(),
    createViteRestartPlugin(),
    createUnoCSSPlugin(),
  ];
};
