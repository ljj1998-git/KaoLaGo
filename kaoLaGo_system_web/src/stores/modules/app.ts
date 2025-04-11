import { defineStore } from "pinia";
import { useDark } from "@vueuse/core";
import { ELangueage, ELayout } from "@/constants";
import _ from "lodash";
import { getDictionaryListApi } from "@/apis/dictionary";

export const useAppStore = defineStore("app", {
  state: (): IState => ({
    collapsed: false,
    breadcrumbList: [],

    isDark: useDark().value, // 1 白色 2暗黑
    /** 主题色 */
    primaryColor: "#4343c7",
    /** 简体中文 zh_cn 英文 en */
    language: ELangueage.zh_cn,
    /** 布局模式 */
    layout: ELayout.default,
    /** 字典 */
    dicts: new Map(),
  }),
  persist: {
    omit: ["breadcrumbList"],
    storage: localStorage,
  },
  getters: {},
  actions: {
    /** 设置折叠 */
    setCollapsed() {
      this.collapsed = !this.collapsed;
    },
    setBreadcrumbList(value: IBreadcrumbList) {
      const isClude = _.some(this.breadcrumbList, value);
      if (!isClude) {
        this.breadcrumbList.push(value);
      }
    },
    removeBreadcrumbList(value: IBreadcrumbList) {
      if (this.breadcrumbList.length > 1) {
        _.remove(this.breadcrumbList, (item) => item.path === value.path);
      } else {
        window.$message.error("不可删除");
      }
    },
    /** 设置theme */
    toggleDark() {
      this.isDark = !this.isDark;
    },
    /** 设置语言 */
    setLanguage(language: ELangueage) {
      this.language = language;
      localStorage.setItem("language", language);
    },
    /** 设置主题色 */
    setPrimaryColor(color: string) {
      this.primaryColor = color;
      document.body.style.setProperty("--primary-color", color);
    },
    /** 设置布局模式 */
    setLayout(layout: ELayout) {
      this.layout = layout;
    },
    /** 获取字典值 */
    async getDicts() {
      this.dicts = new Map();
      try {
        const res = await getDictionaryListApi(null);
        _.forEach(res, (item) => {
          this.dicts.set(item.key, item.children);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});

interface IState {
  collapsed: boolean;
  breadcrumbList: IBreadcrumbList[];

  isDark: boolean;
  primaryColor: string;
  language: string;
  layout: ELayout;
  dicts: Map<string, any>;
}

export interface IBreadcrumbList {
  path: string;
  label: string;
}
