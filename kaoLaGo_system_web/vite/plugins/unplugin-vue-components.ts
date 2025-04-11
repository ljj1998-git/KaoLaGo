import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default () => {
  return Components({
    dirs: ["src/components"], // 配置需要自动导入的组件目录
    dts: "types/components.d.ts", // 生成类型声明文件
    resolvers: [NaiveUiResolver()],
  });
};
