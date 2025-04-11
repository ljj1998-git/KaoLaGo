import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entities/index';

export interface IDb {
  db: {
    mysql: {
      host: string;
      name: string;
      port: number;
      username: string;
      password: string;
    };
    redis: {
      host: string;
      port: number;
      name: string;
      username: string;
      password: string;
    };
  };
}

export interface IJwt {
  /** 签名密钥 */
  secret: string;
  /** 过期时间 */
  expiration: number;
}

export interface ICrypto {
  /** 加密算法 */
  algorithm: string;
  /** 加密密钥 */
  secret: string;
  /** 盐 */
  salt: string;
  hex: {
    /** hex 加密密钥 */
    key: string;
    /** hex 偏移量 */
    iv: string;
  };
}

type Config = IDb & IJwt & ICrypto;

const configYmalPath = 'src/configs/config.yaml';
const config: Config = yaml.load(readFileSync(configYmalPath, 'utf8'));
/** 导入config.yaml配置文件  */
const initConfig = () => {
  const configYmal = () => {
    return config;
  };
  return ConfigModule.forRoot({
    isGlobal: true,
    load: [configYmal],
  });
};

/** 数据库配置 */
const initDBConfig = () => {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.db.mysql.host,
    port: config.db.mysql.port,
    username: config.db.mysql.username,
    password: config.db.mysql.password,
    database: config.db.mysql.name,
    entities: entities,
    // 仅在开发中使用，生产环境请设置为 false
    synchronize: true,
    dateStrings: true,
    logging: true,
  });
};

// 使用函数来导出，因为 ConfigModule 中有一个load方法，需要导入一个函数
export default [initConfig(), initDBConfig()];
