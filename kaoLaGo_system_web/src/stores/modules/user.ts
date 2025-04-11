import { defineStore } from "pinia";
import _ from "lodash";

export const useUserStore = defineStore("user", {
  state: (): IState => ({
    info: {
      roleName:"超级管理员"
    },
  }),
  getters: {},
  actions: {},
  persist: true,
});

interface IState {
  info: IUserInfo;
}

interface IUserInfo {
  id?: number;
  username?: string;
  roleName?: string;
  avatar?: string;
}
