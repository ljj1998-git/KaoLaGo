import { defineStore } from "pinia";

interface TimerItem {
  key: string | number;
  duration: number;
  type: "setTimeout" | "setInterval";
  isRunning: boolean;
  interval?: NodeJS.Timeout;
  callback?: () => void;
}

export const useTimerStore = defineStore("timer", {
  state: () => ({
    timers: new Map<string | number, TimerItem>(),
  }),
  getters: {
    /**
     * @description 获取计时器信息
     */
    getTimer: (state) => (key: string | number) => {
      return state.timers.get(key) ?? undefined;
    },
    /**
     * @description 获取计时器运行状态
     */
    getTimerStatus: (state) => (key: string | number) => {
      return state.timers.get(key)?.isRunning ?? false;
    },
  },
  actions: {
    /**
     * @description 新增定时器
     */
    addTimer(timer: Omit<TimerItem, "isRunning" | "interval">) {
      const existing = this.timers.get(timer.key);
      if (existing) {
        window.$message.error(`定时器:${timer.key} 已存在`);
        return;
      }
      this.timers.set(timer.key, {
        ...timer,
        isRunning: false,
      });
    },

    /**
     * @description 移除计时器
     */
    removeTimer(key: string | number) {
      if (!this.validateTimer(key)) return;
      const timer = this.timers.get(key);
      clearTimeout(timer!.interval);
      clearInterval(timer!.interval);
      this.timers.delete(key);
    },

    validateTimer(key: string | number) {
      let status = true;
      const timer = this.timers.get(key);
      if (!timer) {
        status = false;
        window.$message.error(`定时器:${key} 不存在`);
      }
      return status;
    },

    /**
     * @description 启动定时器
     */
    startTimer(key: string | number) {
      if (!this.validateTimer(key)) return;
      const timer = this.timers.get(key);
      if (timer!.isRunning) {
        window.$message.error(`定时器:${key} 已启动`);
        return;
      }
      timer!.isRunning = true;
      if (timer?.type === "setTimeout") {
        timer!.interval = setTimeout(() => {
          timer!.callback?.();
          this.clearTimer(key);
        }, timer!.duration);
      } else if (timer?.type === "setInterval") {
        timer!.interval = setInterval(() => {
          timer!.callback?.();
        }, timer!.duration);
      }
    },

    /**
     * @description 仅仅清除计时器，不移除定时器
     */
    clearTimer(key: string | number) {
      if (!this.validateTimer(key)) return;
      const timer = this.timers.get(key);
      clearTimeout(timer!.interval);
      clearInterval(timer!.interval);
      timer!.isRunning = false;
    },
  },
});
