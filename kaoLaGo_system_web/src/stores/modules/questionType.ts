import { defineStore } from "pinia";
import _ from "lodash";
import { EDrawerTitleType } from "@/constants";

export const useQuestionTypeStore = defineStore("questionType", {
  state: (): IState => ({
    type: 0,
    visible: {
      visible1: false,
    },
  }),
  getters: {},
  actions: {
    setVisible(key: string, value: boolean) {
      this.visible[key] = value;
    },
  },
});

interface IState {
  type: EDrawerTitleType; // 0新增1编辑2查看
  visible: {
    visible1: boolean; // 新增编辑抽屉
  };
}
