import { CasbinRule } from './casbin_rule.entity';
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { DepartmentEntity } from '@/modules/system/department/entities/department.entity';
import { MenuEntity } from '@/modules/system/menu/entities/menu.entity';
import { RoleEntity } from '@/modules/system/role/entities/role.entity';

/**
 * 统一导出所有实体 在TypeORM中，我们需要在ormconfig.json中配置entities字段，来指定需要加载的实体类。
 */
export default [
  CasbinRule,
  UserEntity,
  DepartmentEntity,
  MenuEntity,
  RoleEntity,
];
