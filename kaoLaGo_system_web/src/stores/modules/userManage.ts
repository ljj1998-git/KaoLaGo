import { defineStore } from "pinia";
import _ from "lodash";
import { EDrawerTitleType } from "@/constants";
import { DictionaryList } from "@t/dictionary";

export const useUserManageStore = defineStore("userManage", {
  state: (): IState => ({
    type: 0,
    visible: {
      visible1: false,
    },
    searchForm: {},
    row: {},
  }),
  getters: {},
  actions: {
    setType(type: EDrawerTitleType) {
      this.type = type;
    },
    setVisible(key: string, value: boolean) {
      this.visible[key] = value;
    },
    setRow(row: any) {
      this.row = row;
    },
    reset() {
      this.type = 0;
      this.visible = {
        visible1: false,
      };
      this.row = {};
    },
  },
});

interface IState {
  type: EDrawerTitleType; // 0新增1编辑2查看
  visible: {
    visible1: boolean; // 新增编辑抽屉
  };
  searchForm: { name?: string };
  row: DictionaryList;
}
