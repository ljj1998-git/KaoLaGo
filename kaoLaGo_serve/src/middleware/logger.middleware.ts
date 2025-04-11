/*
 * @Description: 全局日志中间件
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
const dayjs = require('dayjs');
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    // 记录开始时间
    const start = Date.now();

    // 获取请求信息
    const { method, originalUrl, ip, httpVersion, headers } = req;
    const originalJson = res.json; // 保持原来的 json 方法
    res.json = (...args) => {
      // 将返回的信息存储到 res.locals 中
      res.locals.responseData = args[0]; // 假设返回的是一个对象
      // 调用原来的 json 方法
      return originalJson.apply(res, args);
    };

    res.on('finish', () => {
      // 获取响应信息
      const { statusCode } = res;
      const responseData = res.locals.responseData;
      // 记录结束时间
      const end = Date.now();
      // 计算时间差
      const duration = end - start;

      // 组装日志信息：[timestamp] [method] [url] HTTP/[httpVersion] [client IP] [status code] [response time]ms [user-agent]
      const logFormat = `${dayjs().format('YYYY-MM-DD HH:mm:ss')} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms ${headers['user-agent']} ### ${responseData?.message}`;

      // 根据状态码，进行日志类型区分
      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl);
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat, originalUrl);
      } else {
        this.logger.log(logFormat, originalUrl);
      }
    });

    next();
  }
}
