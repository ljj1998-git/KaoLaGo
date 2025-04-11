export function buildTreeByPath(res: any[]) {
  const map = {};
  res.forEach((department) => {
    map[department.id] = { ...department }; // 初始化每个部门的 children 数组
  });
  const tree = [];
  res.forEach((department) => {
    const pathParts = department.path.split(','); // 分割 path
    const parentId =
      pathParts.length > 1 ? +pathParts[pathParts.length - 2] : null; // 找到父级 ID
    if (parentId === null) {
      tree.push(map[department.id]); // 直接推入树根
    } else {
      if (map[parentId]) {
        map[parentId].children = map[parentId].children || []; // 初始化父级的 children 数组
        map[parentId].children.push(map[department.id]); // 加入到父级的 children
      }
    }
  });
  return tree;
}
