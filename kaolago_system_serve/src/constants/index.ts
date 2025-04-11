import { Global, Module } from '@nestjs/common';

// Casbin
export const CONFIG_PATH = 'src/configs/basic_model.conf';
// Mysql
export const MYSQL_CONFIG = {
  HOST: 'localhost',
  PORT: 3306,
  USERNAME: 'root',
  PASSWORD: 'root',
  DATABASE: 'kaolago',
};

export const REDIS_CONFIG = {
  HOST: 'localhost',
  PORT: 6379,
  username: 'root',
  PASSWORD: 'root',
  name: 0,
};

export const JWT_CONFIG = {
  SECRET: 'kaolago',
  EXPIRATION: 6000,
};

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
  PARAM_ERROR = '参数错误',
}

@Global() // 标记为全局模块
@Module({
  providers: [
    {
      provide: 'RESPONSE_CODE',
      useValue: RESPONSE_CODE,
    },
    {
      provide: 'RESPONSE_MSG',
      useValue: RESPONSE_MSG,
    },
  ],
  exports: ['RESPONSE_CODE', 'RESPONSE_MSG'], // 必须导出才能全局使用
})
export class GlobalConstantsModule {}
