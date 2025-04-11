export * from "./app";
export * from "./form";
import { ELayout } from "./app";
import { EDrawerTitleType, RadioStatus, RadioStatusType } from "./form";

// -------------------------------------------------------------------------
export default {
  EDrawerTitleType,
  RadioStatus,
  RadioStatusType,
  ELayout,
};

/** 每次新增添加类型给 $enums加类型 */
export type EnumType = {
  EDrawerTitleType: typeof EDrawerTitleType;
  RadioStatus: typeof RadioStatus;
  RadioStatusType: typeof RadioStatusType;
  ELayout: typeof ELayout;
};
