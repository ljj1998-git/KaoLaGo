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

  public success<T = any>(data?: T, msg?: string): IResponse<T> {
    return {
      code: RESPONSE_CODE.SUCCESS,
      data,
      message: msg || RESPONSE_MSG.SUCCESS,
    };
  }

  // 400
  public badRequest<T = null>(msg?: string): IResponse<T> {
    console.log('badRequest', msg);
    return {
      code: RESPONSE_CODE.BAD_REQUEST,
      message: msg || RESPONSE_MSG.PARAM_ERROR,
    };
  }

  public error<T = null>(data?: T, msg?: string): IResponse<T> {
    return {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      data,
      message: msg || RESPONSE_MSG.FAILURE,
    };
  }
}

export const responseUtil = ResponseUtil.getInstance();

/**
 * @description 响应拦截器
 */
@Injectable()
export class HttpResponse implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<IResponse> {
    return next.handle().pipe(
      map((dataOf) => {
        const response = context.switchToHttp().getResponse(); // 获取原始响应对象
        response.status(HttpStatus.OK);
        if (dataOf) {
          if (typeof dataOf === 'object') {
            const { data, message } = dataOf;
            return responseUtil.success(data, message);
          } else if (typeof dataOf === 'string') {
            return responseUtil.success(null, dataOf);
          } else {
            return responseUtil.success(dataOf);
          }
        }
      }),
    );
  }
}
