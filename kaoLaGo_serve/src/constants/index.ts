import { Global, Module } from '@nestjs/common';

/** Casbin配置文件路径 */
export const CONFIG_PATH = 'src/config/basic_model.conf';
/** 响应码 */
export enum RESPONSE_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 请求成功
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  INTERNAL_SERVER_ERROR = 500, // 服务器错误
}
/** 请求提示语 */
export enum RESPONSE_MSG {
  SUCCESS = '请求成功',
  FAILURE = '请求失败',
  PARAM_ERROR = '参数有误',
}

@Global() // 标记为全局模块
@Module({
  providers: [
    // 注册常量（使用 Symbol 防止命名冲突）
    {
      provide: 'CONFIG_PATH',
      useValue: CONFIG_PATH,
    },
    {
      provide: 'RESPONSE_CODE',
      useValue: RESPONSE_CODE,
    },
    {
      provide: 'RESPONSE_MSG',
      useValue: RESPONSE_MSG,
    },
  ],
  exports: ['CONFIG_PATH', 'RESPONSE_CODE', 'RESPONSE_MSG'], // 必须导出才能全局使用
})
export class GlobalConstantsModule {}
