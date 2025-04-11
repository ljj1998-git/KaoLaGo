import _ from "lodash";

export function flattenLocales(obj, parentKey = "") {
  return _.transform(
    obj,
    (result, value, key: string) => {
      const path = parentKey ? `${parentKey}.${key}` : key;

      if (_.isPlainObject(value)) {
        // 递归处理嵌套对象
        _.merge(result, flattenLocales(value, path));
      } else if (_.isArray(value) && value.length === 2) {
        // 拆分中英文值
        _.set(result.zh_cn, path, value[0]);
        _.set(result.en, path, value[1]);
      }
    },
    { zh_cn: {}, en: {} }
  );
}
