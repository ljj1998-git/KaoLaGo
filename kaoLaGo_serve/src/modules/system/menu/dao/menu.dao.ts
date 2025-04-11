/**
 * @description 查询部门树,使用mysql CTE递归查询
 */
export const getMenuTreeMysql = () => {
  return `
  WITH RECURSIVE sys_menus_path AS (
    SELECT
      id,
      name,
      parentId,
      created_at,
      created_by,
      status,
      permission,
      componentName,
      componentPath,
      sort,
      route,
      is_deleted,
      type,
      icon,
      0 AS level,
      CONCAT( '', id ) AS path 
    FROM
      sys_menus 
    WHERE
      parentId IS NULL
    
    UNION ALL 
  
    SELECT
      dep.id,
      dep.name,
      dep.parentId,
      dep.created_at,
      dep.created_by,
      dep.status,
      dep.permission,
      dep.componentName,
      dep.componentPath,
      dep.sort,
      dep.route,
      dep.is_deleted,
      dep.type,
      dep.icon,
      sp.level + 1 AS level,
      CONCAT( sp.path, ',', dep.id ) 
    FROM
      sys_menus dep
      JOIN sys_menus_path sp ON sp.id = dep.parentId 
  ) SELECT
  * 
  FROM
    sys_menus_path
  WHERE
    is_deleted = 0
  `;
};
