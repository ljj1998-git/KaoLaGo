import i18n from "@/locales";
const t = i18n.global.t;

export const useFilterDrawerTitle = computed(() => {
  return (type) => {
    const instance = getCurrentInstance();
    return t(`common.title.${instance?.proxy?.$enums.EDrawerTitleType[type]}`);
  };
});
