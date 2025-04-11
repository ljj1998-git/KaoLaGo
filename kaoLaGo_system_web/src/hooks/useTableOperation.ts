export const useTableOperation = (handleOpeartion: Function) => {
  const instance = getCurrentInstance();
  const drawerTitleType = instance?.proxy?.$enums.EDrawerTitleType;
  return {
    title: "操作",
    key: "operation",
    render(row) {
      return h(
        NSpace,
        {
          strong: true,
          tertiary: true,
          size: "small",
        },
        {
          default: () => [
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                onClick: () => {
                  handleOpeartion(drawerTitleType?.edit, row);
                },
              },
              { default: () => "编辑" }
            ),
            h(
              NButton,
              {
                size: "small",
                onClick: () => {
                  handleOpeartion(drawerTitleType?.view, row);
                },
              },
              { default: () => "查看" }
            ),
            h(
              NButton,
              { type: "error", size: "small" },
              { default: () => "删除" }
            ),
          ],
        }
      );
    },
  };
};
