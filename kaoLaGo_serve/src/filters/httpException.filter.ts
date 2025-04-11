import { AjaxResultService } from '@/common/modules/ajax-responese/ajaxResponse.service';
import { AjaxResult } from '@/util/response.util';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @description 全局Http异常过滤器
 */
@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json(AjaxResult.error(message as string, status));
  }
}
