import {
  HttpStatus,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RESPONSE_CODE, RESPONSE_MSG } from '@/constants/index';

interface IResponse<T = any> {
  code: number;
  data?: T;
  message?: string;
}

class ResponseUtil {
  private static instance: ResponseUtil;

  constructor() {}

  public static getInstance(): ResponseUtil {
    if (!ResponseUtil.instance) {
      ResponseUtil.instance = new ResponseUtil();
    }
    return ResponseUtil.instance;
  }

  // 200
  public success<T = any>(data?: T, msg?: string): IResponse<T> {
    return {
      code: RESPONSE_CODE.SUCCESS,
      data,
      message: msg || RESPONSE_MSG.SUCCESS,
    };
  }

  // 400
  public badRequest<T = null>(msg?: string): IResponse<T> {
    return {
      code: RESPONSE_CODE.BAD_REQUEST,
      message: msg || RESPONSE_MSG.PARAM_ERROR,
    };
  }

  // 500
  public error<T = null>(data?: T, msg?: string): IResponse<T> {
    return {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      data,
      message: msg || RESPONSE_MSG.FAILURE,
    };
  }
}

export const responseUtil = new ResponseUtil();

/**
 * @description 响应拦截器
 */
@Injectable()
export class HttpResponse<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<ResponseUtil> {
    return next.handle().pipe(
      map((dataOf) => {
        const response = context.switchToHttp().getResponse(); // 获取原始响应对象
        response.status(HttpStatus.OK);
        if (dataOf) {
          return dataOf;
        }
      }),
    );
  }
}
