import { ConstantsProvider } from '@/constants';
import { AjaxResult } from '@/util/response.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AjaxResultService {
  constructor(private readonly constants: ConstantsProvider) {}

  success<T>(data?: T, message?: string, status?: number): AjaxResult<T> {
    return AjaxResult.success(
      data,
      (message = message || this.constants.RESPONSE_MSG.SUCCESS),
      (status = status || this.constants.RESPONSE_CODE.SUCCESS),
    );
  }

  error<T>(message?: string, status?: number): AjaxResult<T> {
    return AjaxResult.error(
      (message = message || this.constants.RESPONSE_MSG.FAILURE),
      (status = status || this.constants.RESPONSE_CODE.SUCCESS),
    );
  }
}
