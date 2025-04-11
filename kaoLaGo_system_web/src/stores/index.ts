import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export * from "./modules/app";
export * from "./modules/questionType";
export * from "./modules/dictionary";
export * from "./modules/user";
export * from "./modules/timer";
export * from "./modules/userManage";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
