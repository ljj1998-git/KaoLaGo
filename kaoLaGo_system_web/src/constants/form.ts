/**
 * @description 抽屉标题type值
 */
export enum EDrawerTitleType {
  "add" = 0,
  "edit" = 1,
  "view" = 2,
}

/**
 * @description 单选框状态
 */
export const RadioStatusType = {
  1: { label: "启用", type: "success", value: 1 },
  0: { label: "禁用", type: "error", value: 0 },
};

export const RadioStatus = [
  { label: RadioStatusType[1].label, value: RadioStatusType[1].value },
  { label: RadioStatusType[0].label, value: RadioStatusType[0].value },
];
