/**
 * @description 查询部门树,使用mysql CTE递归查询
 */
export const getDepartmentTreeMysql = () => {
  return `
WITH RECURSIVE sys_department_path AS (
  SELECT
    id,
    name,
    parentId,
    created_at,
    created_by,
    status,
    sort,
    description,
    code,
    is_deleted,
    0 AS level,
    CONCAT( '', id ) AS path 
  FROM
    sys_department 
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
    dep.sort,
    dep.description,
    dep.code,
    dep.is_deleted,
    sp.level + 1 AS level,
    CONCAT( sp.path, ',', dep.id ) 
  FROM
    sys_department dep
    JOIN sys_department_path sp ON sp.id = dep.parentId 
) SELECT
* 
FROM
  sys_department_path
WHERE
  is_deleted = 0 AND ( name LIKE ? AND code LIKE ? AND status LIKE ? )
`;
};
