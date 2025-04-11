import { defineStore } from "pinia";
import { Theme } from "~/constants/enums";

const useAppStore = defineStore("app", {
  state: () => ({
    theme: "light",
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
      const html = document.documentElement;
      const isDarkMode = html.classList.contains(Theme.LIGHT);
      if (!isDarkMode) {
        html.classList.remove(Theme.DARK);
        html.classList.add(Theme.LIGHT);
      } else {
        html.classList.remove(Theme.LIGHT);
        html.classList.add(Theme.DARK);
      }
    },
  },
  getters: {},
  persist: {
    storage: persistedState.sessionStorage, // 存储位置
  },
});

export default useAppStore;
