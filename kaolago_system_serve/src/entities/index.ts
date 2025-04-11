import { CasbinRule } from './common/casbin_rule.entity';
import { UserEntity } from './user.entity';
import { QuestionTypeEntity } from './questionType.entity';
import { DictionaryEntity } from './dictionary.entity';

/**
 * 统一导出所有实体 在TypeORM中，我们需要在ormconfig.json中配置entities字段，来指定需要加载的实体类。
 */
export { UserEntity, QuestionTypeEntity, DictionaryEntity };
export default [CasbinRule, UserEntity, QuestionTypeEntity, DictionaryEntity];
