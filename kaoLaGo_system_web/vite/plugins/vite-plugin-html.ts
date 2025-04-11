import { createHtmlPlugin } from "vite-plugin-html";

export default (env: Record<string, string>) => {
  return createHtmlPlugin({
    minify: true,
    entry: "/src/main.ts",
    inject: {
      data: {
        // index.html 标题
        title: env.VITE_APP_TITLE,
        // index.html额外要引入的script
        injectScript: ``,
      },
    },
  });
};
